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

    uint256 private constant FACTOR = 10 ** 18;

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

    bool public init = false;

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
        require(!init, "Contract already initialized");
        init = true;
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
    function sendEth(uint256 _value) private {
        (bool success, ) = msg.sender.call{value: _value}("");
        require(success, "ETH Transfer failed.");
    }

    /**
     * @notice Claim reward tokens that are pending
     */
    function claim() private returns (uint256) {
        // Retrieve pending rewards
        FEE_ADDRESS.splitFees();

        uint256 contactBalance = address(this).balance;

        rewardPerTokenStored =
            rewardPerTokenStored +
            (contactBalance.sub(previusRewardTotal)).mul(FACTOR).div(
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

        previusRewardTotal = contactBalance.sub(pendingRewards);

        emit Harvest(msg.sender, pendingRewards);
        return pendingRewards;
    }

    /**
     * @notice Deposit staked tokens (and collect reward tokens if requested)
     * @dev There is a limit of 1 LOOKS per deposit to prevent potential manipulation of current shares
     */
    function deposit(uint256 amount) external nonReentrant {
        uint256 pendingRewards = 0;
        if (totalAmountStaked > 0) pendingRewards = claim();
        else {
            rewardPerTokenStored = 0;
            previusRewardTotal = 0;
        }

        userInfo[msg.sender].shares += amount;

        _setUserEntry();

        // Increase totalAmountStaked
        totalAmountStaked += amount;

        liquidityToken.safeTransferFrom(msg.sender, address(this), amount);

        if (pendingRewards > 0) {
            sendEth(pendingRewards);
        }
        emit Deposit(msg.sender, amount);
    }

    /**
     * @notice Withdraw staked tokens (and collect reward tokens if requested)
     */
    function withdraw(uint256 amount) external nonReentrant {
        uint256 pendingRewards = claim();

        // Transfer LOOKS tokens to the sender

        userInfo[msg.sender].shares -= amount;

        _setUserEntry();

        // Adjust total amount staked
        totalAmountStaked -= amount;

        liquidityToken.safeTransfer(msg.sender, userInfo[msg.sender].shares);

        if (pendingRewards > 0) {
            sendEth(pendingRewards);
        }

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
