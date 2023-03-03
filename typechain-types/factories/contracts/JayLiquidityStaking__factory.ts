/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  JayLiquidityStaking,
  JayLiquidityStakingInterface,
} from "../../contracts/JayLiquidityStaking";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_liquidityToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "harvestedAmount",
        type: "uint256",
      },
    ],
    name: "Harvest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getReward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRewardPerTokenStored",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getStaked",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalStaked",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "init",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_initialLPs",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_addresses",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_balances",
        type: "uint256[]",
      },
    ],
    name: "initalize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "liquidityToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "previusRewardTotal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardPerTokenStored",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "setFeeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAmountStaked",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardPerTokenOnEntry",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60a06040526000600760006101000a81548160ff0219169083151502179055503480156200002c57600080fd5b50604051620024f1380380620024f18339818101604052810190620000529190620001ed565b60016000819055506200007a6200006e620000b560201b60201c565b620000bd60201b60201c565b8073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050506200021f565b600033905090565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001b58262000188565b9050919050565b620001c781620001a8565b8114620001d357600080fd5b50565b600081519050620001e781620001bc565b92915050565b60006020828403121562000206576200020562000183565b5b60006200021684828501620001d6565b91505092915050565b6080516122a1620002506000396000818161050301528181610602015281816107cb0152610a4a01526122a16000f3fe60806040526004361061010d5760003560e01c80638d86934211610095578063df136d6511610064578063df136d6514610363578063e1c7392a1461038e578063e34d5d27146103b9578063f2fde38b146103e4578063fe961f611461040d57610114565b80638d869342146102a75780638da5cb5b146102d2578063b6b55f25146102fd578063c00007b01461032657610114565b8063399080ec116100dc578063399080ec146101d657806343cd8f7e1461021357806354cde9f81461023e578063715018a6146102675780638705fcd41461027e57610114565b80630917e776146101195780631959a0021461014457806325caa262146101825780632e1a7d4d146101ad57610114565b3661011457005b600080fd5b34801561012557600080fd5b5061012e610438565b60405161013b91906115cd565b60405180910390f35b34801561015057600080fd5b5061016b6004803603810190610166919061165a565b610442565b604051610179929190611687565b60405180910390f35b34801561018e57600080fd5b50610197610466565b6040516101a491906115cd565b60405180910390f35b3480156101b957600080fd5b506101d460048036038101906101cf91906116dc565b61046e565b005b3480156101e257600080fd5b506101fd60048036038101906101f8919061165a565b6105b4565b60405161020a91906115cd565b60405180910390f35b34801561021f57600080fd5b50610228610600565b6040516102359190611768565b60405180910390f35b34801561024a57600080fd5b506102656004803603810190610260919061199f565b610624565b005b34801561027357600080fd5b5061027c610870565b005b34801561028a57600080fd5b506102a560048036038101906102a0919061165a565b610884565b005b3480156102b357600080fd5b506102bc6108d0565b6040516102c991906115cd565b60405180910390f35b3480156102de57600080fd5b506102e761096a565b6040516102f49190611a39565b60405180910390f35b34801561030957600080fd5b50610324600480360381019061031f91906116dc565b610994565b005b34801561033257600080fd5b5061034d6004803603810190610348919061165a565b610afc565b60405161035a91906115cd565b60405180910390f35b34801561036f57600080fd5b50610378610c4b565b60405161038591906115cd565b60405180910390f35b34801561039a57600080fd5b506103a3610c51565b6040516103b09190611a6f565b60405180910390f35b3480156103c557600080fd5b506103ce610c64565b6040516103db91906115cd565b60405180910390f35b3480156103f057600080fd5b5061040b6004803603810190610406919061165a565b610c6a565b005b34801561041957600080fd5b50610422610ced565b60405161042f91906115cd565b60405180910390f35b6000600454905090565b60066020528060005260406000206000915090508060000154908060010154905082565b600047905090565b610476610cf3565b6000610480610d42565b905081600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008282546104d49190611ab9565b925050819055506104e3610f28565b81600460008282546104f59190611ab9565b9250508190555061054733837f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1661100b9092919063ffffffff16565b600081111561055a5761055981611091565b5b3373ffffffffffffffffffffffffffffffffffffffff167f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a9424364836040516105a091906115cd565b60405180910390a2506105b1611141565b50565b6000600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001549050919050565b7f000000000000000000000000000000000000000000000000000000000000000081565b61062c61114b565b600760009054906101000a900460ff161561067c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067390611b4a565b60405180910390fd5b6001600760006101000a81548160ff0219169083151502179055506000805b835181101561077f5760405180604001604052808483815181106106c2576106c1611b6a565b5b602002602001015181526020016000815250600660008684815181106106eb576106ea611b6a565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015181600001556020820151816001015590505082818151811061075757610756611b6a565b5b60200260200101518261076a9190611b99565b9150808061077790611bcd565b91505061069b565b508381146107c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107b990611c61565b60405180910390fd5b806004819055507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd3330876040518463ffffffff1660e01b815260040161082693929190611c81565b6020604051808303816000875af1158015610845573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108699190611ce4565b5050505050565b61087861114b565b61088260006111c9565b565b61088c61114b565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600080600454111561096257600454670de0b6b3a7640000600554600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1631476109309190611b99565b61093a9190611ab9565b6109449190611d11565b61094e9190611d82565b60035461095b9190611b99565b9050610967565b600090505b90565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b61099c610cf3565b60008060045411156109b7576109b0610d42565b90506109c8565b600060038190555060006005819055505b81600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000016000828254610a1a9190611b99565b92505081905550610a29610f28565b8160046000828254610a3b9190611b99565b92505081905550610a8f3330847f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1661128f909392919063ffffffff16565b6000811115610aa257610aa181611091565b5b3373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c83604051610ae891906115cd565b60405180910390a250610af9611141565b50565b6000806004541115610c41576000600454670de0b6b3a7640000610b209190611d82565b600554600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163147610b689190611b99565b610b729190611ab9565b600354610b7f9190611b99565b610b899190611ab9565b9050670de0b6b3a7640000600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015482610be29190611ab9565b600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154610c2f9190611d11565b610c399190611d82565b915050610c46565b600090505b919050565b60035481565b600760009054906101000a900460ff1681565b60055481565b610c7261114b565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610ce1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cd890611e25565b60405180910390fd5b610cea816111c9565b50565b60045481565b600260005403610d38576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d2f90611e91565b60405180910390fd5b6002600081905550565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f61510896040518163ffffffff1660e01b8152600401600060405180830381600087803b158015610dae57600080fd5b505af1158015610dc2573d6000803e3d6000fd5b505050506000479050600454670de0b6b3a764000060055483610de59190611ab9565b610def9190611d11565b610df99190611d82565b600354610e069190611b99565b6003819055506000670de0b6b3a7640000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154600354610e679190611ab9565b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154610eb49190611d11565b610ebe9190611d82565b90508082610ecc9190611ab9565b6005819055503373ffffffffffffffffffffffffffffffffffffffff167fc9695243a805adb74c91f28311176c65b417e842d5699893cef56d18bfa48cba82604051610f1891906115cd565b60405180910390a2809250505090565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015403610fbf576000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010181905550611009565b600354600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055505b565b61108c8363a9059cbb60e01b848460405160240161102a929190611eb1565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611318565b505050565b60003373ffffffffffffffffffffffffffffffffffffffff16826040516110b790611f0b565b60006040518083038185875af1925050503d80600081146110f4576040519150601f19603f3d011682016040523d82523d6000602084013e6110f9565b606091505b505090508061113d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161113490611f6c565b60405180910390fd5b5050565b6001600081905550565b6111536113df565b73ffffffffffffffffffffffffffffffffffffffff1661117161096a565b73ffffffffffffffffffffffffffffffffffffffff16146111c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111be90611fd8565b60405180910390fd5b565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b611312846323b872dd60e01b8585856040516024016112b093929190611c81565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611318565b50505050565b600061137a826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166113e79092919063ffffffff16565b90506000815111156113da578080602001905181019061139a9190611ce4565b6113d9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113d09061206a565b60405180910390fd5b5b505050565b600033905090565b60606113f684846000856113ff565b90509392505050565b606082471015611444576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161143b906120fc565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff16858760405161146d9190612182565b60006040518083038185875af1925050503d80600081146114aa576040519150601f19603f3d011682016040523d82523d6000602084013e6114af565b606091505b50915091506114c0878383876114cc565b92505050949350505050565b6060831561152e576000835103611526576114e685611541565b611525576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161151c906121e5565b60405180910390fd5b5b829050611539565b6115388383611564565b5b949350505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000825111156115775781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115ab9190612249565b60405180910390fd5b6000819050919050565b6115c7816115b4565b82525050565b60006020820190506115e260008301846115be565b92915050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611627826115fc565b9050919050565b6116378161161c565b811461164257600080fd5b50565b6000813590506116548161162e565b92915050565b6000602082840312156116705761166f6115f2565b5b600061167e84828501611645565b91505092915050565b600060408201905061169c60008301856115be565b6116a960208301846115be565b9392505050565b6116b9816115b4565b81146116c457600080fd5b50565b6000813590506116d6816116b0565b92915050565b6000602082840312156116f2576116f16115f2565b5b6000611700848285016116c7565b91505092915050565b6000819050919050565b600061172e611729611724846115fc565b611709565b6115fc565b9050919050565b600061174082611713565b9050919050565b600061175282611735565b9050919050565b61176281611747565b82525050565b600060208201905061177d6000830184611759565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6117d182611788565b810181811067ffffffffffffffff821117156117f0576117ef611799565b5b80604052505050565b60006118036115e8565b905061180f82826117c8565b919050565b600067ffffffffffffffff82111561182f5761182e611799565b5b602082029050602081019050919050565b600080fd5b600061185861185384611814565b6117f9565b9050808382526020820190506020840283018581111561187b5761187a611840565b5b835b818110156118a457806118908882611645565b84526020840193505060208101905061187d565b5050509392505050565b600082601f8301126118c3576118c2611783565b5b81356118d3848260208601611845565b91505092915050565b600067ffffffffffffffff8211156118f7576118f6611799565b5b602082029050602081019050919050565b600061191b611916846118dc565b6117f9565b9050808382526020820190506020840283018581111561193e5761193d611840565b5b835b81811015611967578061195388826116c7565b845260208401935050602081019050611940565b5050509392505050565b600082601f83011261198657611985611783565b5b8135611996848260208601611908565b91505092915050565b6000806000606084860312156119b8576119b76115f2565b5b60006119c6868287016116c7565b935050602084013567ffffffffffffffff8111156119e7576119e66115f7565b5b6119f3868287016118ae565b925050604084013567ffffffffffffffff811115611a1457611a136115f7565b5b611a2086828701611971565b9150509250925092565b611a338161161c565b82525050565b6000602082019050611a4e6000830184611a2a565b92915050565b60008115159050919050565b611a6981611a54565b82525050565b6000602082019050611a846000830184611a60565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611ac4826115b4565b9150611acf836115b4565b9250828203905081811115611ae757611ae6611a8a565b5b92915050565b600082825260208201905092915050565b7f436f6e747261637420616c726561647920696e697469616c697a656400000000600082015250565b6000611b34601c83611aed565b9150611b3f82611afe565b602082019050919050565b60006020820190508181036000830152611b6381611b27565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000611ba4826115b4565b9150611baf836115b4565b9250828201905080821115611bc757611bc6611a8a565b5b92915050565b6000611bd8826115b4565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611c0a57611c09611a8a565b5b600182019050919050565b7f546f74616c7320646f6e74206d61746368000000000000000000000000000000600082015250565b6000611c4b601183611aed565b9150611c5682611c15565b602082019050919050565b60006020820190508181036000830152611c7a81611c3e565b9050919050565b6000606082019050611c966000830186611a2a565b611ca36020830185611a2a565b611cb060408301846115be565b949350505050565b611cc181611a54565b8114611ccc57600080fd5b50565b600081519050611cde81611cb8565b92915050565b600060208284031215611cfa57611cf96115f2565b5b6000611d0884828501611ccf565b91505092915050565b6000611d1c826115b4565b9150611d27836115b4565b9250828202611d35816115b4565b91508282048414831517611d4c57611d4b611a8a565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611d8d826115b4565b9150611d98836115b4565b925082611da857611da7611d53565b5b828204905092915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000611e0f602683611aed565b9150611e1a82611db3565b604082019050919050565b60006020820190508181036000830152611e3e81611e02565b9050919050565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b6000611e7b601f83611aed565b9150611e8682611e45565b602082019050919050565b60006020820190508181036000830152611eaa81611e6e565b9050919050565b6000604082019050611ec66000830185611a2a565b611ed360208301846115be565b9392505050565b600081905092915050565b50565b6000611ef5600083611eda565b9150611f0082611ee5565b600082019050919050565b6000611f1682611ee8565b9150819050919050565b7f455448205472616e73666572206661696c65642e000000000000000000000000600082015250565b6000611f56601483611aed565b9150611f6182611f20565b602082019050919050565b60006020820190508181036000830152611f8581611f49565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000611fc2602083611aed565b9150611fcd82611f8c565b602082019050919050565b60006020820190508181036000830152611ff181611fb5565b9050919050565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b6000612054602a83611aed565b915061205f82611ff8565b604082019050919050565b6000602082019050818103600083015261208381612047565b9050919050565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b60006120e6602683611aed565b91506120f18261208a565b604082019050919050565b60006020820190508181036000830152612115816120d9565b9050919050565b600081519050919050565b60005b8381101561214557808201518184015260208101905061212a565b60008484015250505050565b600061215c8261211c565b6121668185611eda565b9350612176818560208601612127565b80840191505092915050565b600061218e8284612151565b915081905092915050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b60006121cf601d83611aed565b91506121da82612199565b602082019050919050565b600060208201905081810360008301526121fe816121c2565b9050919050565b600081519050919050565b600061221b82612205565b6122258185611aed565b9350612235818560208601612127565b61223e81611788565b840191505092915050565b600060208201905081810360008301526122638184612210565b90509291505056fea2646970667358221220beea3f239540a4166961e31d0d90596f09d378c5ba165a50f3145431df9f135164736f6c63430008110033";

type JayLiquidityStakingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: JayLiquidityStakingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class JayLiquidityStaking__factory extends ContractFactory {
  constructor(...args: JayLiquidityStakingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _liquidityToken: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<JayLiquidityStaking> {
    return super.deploy(
      _liquidityToken,
      overrides || {}
    ) as Promise<JayLiquidityStaking>;
  }
  override getDeployTransaction(
    _liquidityToken: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_liquidityToken, overrides || {});
  }
  override attach(address: string): JayLiquidityStaking {
    return super.attach(address) as JayLiquidityStaking;
  }
  override connect(signer: Signer): JayLiquidityStaking__factory {
    return super.connect(signer) as JayLiquidityStaking__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): JayLiquidityStakingInterface {
    return new utils.Interface(_abi) as JayLiquidityStakingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): JayLiquidityStaking {
    return new Contract(address, _abi, signerOrProvider) as JayLiquidityStaking;
  }
}
