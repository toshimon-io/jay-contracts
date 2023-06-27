/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  JayFeeSplitter,
  JayFeeSplitterInterface,
} from "../../../contracts/JayDerivFeeSplitter.sol/JayFeeSplitter";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
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
    inputs: [],
    name: "MIN",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardToken",
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
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "setLPWallet",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "setNFTWallet",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "setTEAMWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "splitFees",
    outputs: [],
    stateMutability: "nonpayable",
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
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061002d61002261003960201b60201c565b61004160201b60201c565b60018081905550610105565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6111b9806101146000396000f3fe60806040526004361061008a5760003560e01c80637425beed116100595780637425beed1461012a5780638da5cb5b14610153578063f2fde38b1461017e578063f6151089146101a7578063f7c618c1146101be57610091565b806329de6d201461009657806337a7f2b7146100bf5780633b0aacbc146100ea578063715018a61461011357610091565b3661009157005b600080fd5b3480156100a257600080fd5b506100bd60048036038101906100b89190610b2d565b6101e9565b005b3480156100cb57600080fd5b506100d461026e565b6040516100e19190610b73565b60405180910390f35b3480156100f657600080fd5b50610111600480360381019061010c9190610b2d565b610279565b005b34801561011f57600080fd5b506101286102fe565b005b34801561013657600080fd5b50610151600480360381019061014c9190610b2d565b610312565b005b34801561015f57600080fd5b50610168610397565b6040516101759190610b9d565b60405180910390f35b34801561018a57600080fd5b506101a560048036038101906101a09190610b2d565b6103c0565b005b3480156101b357600080fd5b506101bc610443565b005b3480156101ca57600080fd5b506101d3610596565b6040516101e09190610c17565b60405180910390f35b6101f16105bc565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361022a57600080fd5b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b66038d7ea4c6800081565b6102816105bc565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036102ba57600080fd5b80600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6103066105bc565b610310600061063a565b565b61031a6105bc565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361035357600080fd5b80600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6103c86105bc565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610437576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161042e90610cb5565b60405180910390fd5b6104408161063a565b50565b61044b6106fe565b60006003600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016104aa9190610b9d565b602060405180830381865afa1580156104c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104eb9190610d01565b6104f59190610d5d565b905066038d7ea4c6800081111561058b57610532600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168261074d565b61055e600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168261074d565b61058a600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168261074d565b5b5061059461079e565b565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6105c46107a7565b73ffffffffffffffffffffffffffffffffffffffff166105e2610397565b73ffffffffffffffffffffffffffffffffffffffff1614610638576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161062f90610dda565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600260015403610743576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161073a90610e46565b60405180910390fd5b6002600181905550565b61079a8282600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166107af9092919063ffffffff16565b5050565b60018081905550565b600033905090565b6108308363a9059cbb60e01b84846040516024016107ce929190610e66565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610835565b505050565b6000610897826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166108fd9092919063ffffffff16565b90506000815114806108b95750808060200190518101906108b89190610ec7565b5b6108f8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108ef90610f66565b60405180910390fd5b505050565b606061090c8484600085610915565b90509392505050565b60608247101561095a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161095190610ff8565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516109839190611089565b60006040518083038185875af1925050503d80600081146109c0576040519150601f19603f3d011682016040523d82523d6000602084013e6109c5565b606091505b50915091506109d6878383876109e2565b92505050949350505050565b60608315610a44576000835103610a3c576109fc85610a57565b610a3b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a32906110ec565b60405180910390fd5b5b829050610a4f565b610a4e8383610a7a565b5b949350505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600082511115610a8d5781518083602001fd5b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ac19190611161565b60405180910390fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610afa82610acf565b9050919050565b610b0a81610aef565b8114610b1557600080fd5b50565b600081359050610b2781610b01565b92915050565b600060208284031215610b4357610b42610aca565b5b6000610b5184828501610b18565b91505092915050565b6000819050919050565b610b6d81610b5a565b82525050565b6000602082019050610b886000830184610b64565b92915050565b610b9781610aef565b82525050565b6000602082019050610bb26000830184610b8e565b92915050565b6000819050919050565b6000610bdd610bd8610bd384610acf565b610bb8565b610acf565b9050919050565b6000610bef82610bc2565b9050919050565b6000610c0182610be4565b9050919050565b610c1181610bf6565b82525050565b6000602082019050610c2c6000830184610c08565b92915050565b600082825260208201905092915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000610c9f602683610c32565b9150610caa82610c43565b604082019050919050565b60006020820190508181036000830152610cce81610c92565b9050919050565b610cde81610b5a565b8114610ce957600080fd5b50565b600081519050610cfb81610cd5565b92915050565b600060208284031215610d1757610d16610aca565b5b6000610d2584828501610cec565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610d6882610b5a565b9150610d7383610b5a565b925082610d8357610d82610d2e565b5b828204905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000610dc4602083610c32565b9150610dcf82610d8e565b602082019050919050565b60006020820190508181036000830152610df381610db7565b9050919050565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b6000610e30601f83610c32565b9150610e3b82610dfa565b602082019050919050565b60006020820190508181036000830152610e5f81610e23565b9050919050565b6000604082019050610e7b6000830185610b8e565b610e886020830184610b64565b9392505050565b60008115159050919050565b610ea481610e8f565b8114610eaf57600080fd5b50565b600081519050610ec181610e9b565b92915050565b600060208284031215610edd57610edc610aca565b5b6000610eeb84828501610eb2565b91505092915050565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b6000610f50602a83610c32565b9150610f5b82610ef4565b604082019050919050565b60006020820190508181036000830152610f7f81610f43565b9050919050565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b6000610fe2602683610c32565b9150610fed82610f86565b604082019050919050565b6000602082019050818103600083015261101181610fd5565b9050919050565b600081519050919050565b600081905092915050565b60005b8381101561104c578082015181840152602081019050611031565b60008484015250505050565b600061106382611018565b61106d8185611023565b935061107d81856020860161102e565b80840191505092915050565b60006110958284611058565b915081905092915050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b60006110d6601d83610c32565b91506110e1826110a0565b602082019050919050565b60006020820190508181036000830152611105816110c9565b9050919050565b600081519050919050565b6000601f19601f8301169050919050565b60006111338261110c565b61113d8185610c32565b935061114d81856020860161102e565b61115681611117565b840191505092915050565b6000602082019050818103600083015261117b8184611128565b90509291505056fea2646970667358221220dd883a8804a3bbceacbed507c2c604cc381369cd26388752ad780cfd120cf62f64736f6c63430008100033";

type JayFeeSplitterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: JayFeeSplitterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class JayFeeSplitter__factory extends ContractFactory {
  constructor(...args: JayFeeSplitterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string }
  ): Promise<JayFeeSplitter> {
    return super.deploy(overrides || {}) as Promise<JayFeeSplitter>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): JayFeeSplitter {
    return super.attach(address) as JayFeeSplitter;
  }
  override connect(signer: Signer): JayFeeSplitter__factory {
    return super.connect(signer) as JayFeeSplitter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): JayFeeSplitterInterface {
    return new utils.Interface(_abi) as JayFeeSplitterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): JayFeeSplitter {
    return new Contract(address, _abi, signerOrProvider) as JayFeeSplitter;
  }
}