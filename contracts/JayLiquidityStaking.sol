// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {IERC20, SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import {JayFeeSplitter} from "./JayFeeSplitter.sol";

contract JayLiquidityStaking is ReentrancyGuard, Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    JayFeeSplitter FEE_ADDRESS;

    uint256 private FACTOR = 10 ** 18;

    IERC20 public immutable liquidityToken;

    struct UserInfo {
        uint256 shares; // shares of token staked
        uint256 rewardPerTokenOnEntry; // user reward per token paid
    }

    // Reward per token stored
    uint256 public rewardPerTokenStored;

    uint256 public totalAmountStaked;

    uint256 public previusRewardTotal;

    mapping(address => UserInfo) public userInfo;

    event Deposit(address indexed user, uint256 amount);
    event Harvest(address indexed user, uint256 harvestedAmount);
    event Withdraw(address indexed user, uint256 amount);

    constructor(address _liquidityToken) {
        liquidityToken = IERC20(_liquidityToken);
    }

    function setFeeAddress(address _address) external onlyOwner {
        FEE_ADDRESS = JayFeeSplitter(payable(_address));
    }

    function initalize(
        uint256 _initialLPs,
        address[] memory _addresses,
        uint256[] memory _balances
    ) public onlyOwner {
        require(totalAmountStaked == 0, "Contract already initialized");
        uint256 total = 0;
        for (uint256 i = 0; i < _addresses.length; i++) {
            userInfo[_addresses[i]] = UserInfo({
                shares: _balances[i],
                rewardPerTokenOnEntry: 0
            });

            total += _balances[i];
        }
        require(total == _initialLPs, "Totals dont match");
        totalAmountStaked = total;
        liquidityToken.safeTransferFrom(msg.sender, address(this), _initialLPs);
    }

    /*
     * Name: sendEth
     * Purpose: Tranfer ETH tokens
     * Parameters:
     *    - @param 1: Address
     *    - @param 2: Value
     * Return: n/a
     */
    function sendEth(address _address, uint256 _value) private {
        (bool success, ) = _address.call{value: _value}("");
        require(success, "ETH Transfer failed.");
    }

    /**
     * @notice Claim reward tokens that are pending
     */
    function claim() internal {
        // Retrieve pending rewards
        FEE_ADDRESS.splitFees();

        rewardPerTokenStored =
            rewardPerTokenStored +
            (address(this).balance.sub(previusRewardTotal)).mul(FACTOR).div(
                totalAmountStaked
            );

        uint256 pendingRewards = userInfo[msg.sender]
            .shares
            .mul(
                rewardPerTokenStored.sub(
                    userInfo[msg.sender].rewardPerTokenOnEntry
                )
            )
            .div(FACTOR);

        // Transfer reward token to sender
        if (pendingRewards > 0) {
            sendEth(msg.sender, pendingRewards);
        }
        previusRewardTotal = address(this).balance;
        emit Harvest(msg.sender, pendingRewards);
    }

    /**
     * @notice Deposit staked tokens (and collect reward tokens if requested)
     * @dev There is a limit of 1 LOOKS per deposit to prevent potential manipulation of current shares
     */
    function deposit(uint256 amount) external nonReentrant {
        if (totalAmountStaked > 0) claim();
        else {
            rewardPerTokenStored = 0;
            previusRewardTotal = 0;
        }

        // Transfer LOOKS tokens to this address
        liquidityToken.safeTransferFrom(msg.sender, address(this), amount);

        userInfo[msg.sender].shares += amount;

        _setUserEntry();

        // Increase totalAmountStaked
        totalAmountStaked += amount;

        emit Deposit(msg.sender, amount);
    }

    /**
     * @notice Withdraw staked tokens (and collect reward tokens if requested)
     */
    function withdraw(uint256 amount) external nonReentrant {
        claim();

        // Transfer LOOKS tokens to the sender
        liquidityToken.safeTransfer(msg.sender, userInfo[msg.sender].shares);

        userInfo[msg.sender].shares -= amount;

        _setUserEntry();

        // Adjust total amount staked
        totalAmountStaked -= amount;

        emit Withdraw(msg.sender, amount);
    }

    function getReward(address _address) public view returns (uint256) {
        if (totalAmountStaked > 0) {
            uint256 _rewardPerTokenStored = rewardPerTokenStored +
                (address(this).balance.sub(previusRewardTotal)).mul(FACTOR).div(
                    totalAmountStaked
                );

            return
                userInfo[_address]
                    .shares
                    .mul(
                        _rewardPerTokenStored.sub(
                            userInfo[_address].rewardPerTokenOnEntry
                        )
                    )
                    .div(FACTOR);
        } else {
            return 0;
        }
    }

    function getStaked(address _address) public view returns (uint256) {
        return userInfo[_address].shares;
    }

    function getTotalStaked() public view returns (uint256) {
        return totalAmountStaked;
    }

    function getBal() public view returns (uint256) {
        return address(this).balance;
    }

    function getRewardPerTokenStored() public view returns (uint256) {
        if (totalAmountStaked > 0)
            return
                rewardPerTokenStored +
                (address(this).balance.sub(previusRewardTotal)).mul(FACTOR).div(
                    totalAmountStaked
                );
        else return 0;
    }

    function _setUserEntry() internal {
        if (userInfo[msg.sender].shares == 0) {
            userInfo[msg.sender].rewardPerTokenOnEntry = 0;
        } else {
            userInfo[msg.sender].rewardPerTokenOnEntry = rewardPerTokenStored;
        }
    }

    receive() external payable {}
}
