/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  JayFeeSplitter,
  JayFeeSplitterInterface,
} from "../../contracts/JayFeeSplitter";

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
    stateMutability: "payable",
    type: "fallback",
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
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
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
  "0x608060405273985b6b9064212091b4b325f68746b77262801bcb600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073985b6b9064212091b4b325f68746b77262801bcb600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073985b6b9064212091b4b325f68746b77262801bcb600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034801561010f57600080fd5b5061012c61012161013860201b60201c565b61014060201b60201c565b60018081905550610204565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b610a4f806102136000396000f3fe60806040526004361061008a5760003560e01c80637425beed116100595780637425beed146101275780638da5cb5b14610150578063d0e30db01461017b578063f2fde38b14610185578063f6151089146101ae57610091565b806329de6d201461009357806337a7f2b7146100bc5780633b0aacbc146100e7578063715018a61461011057610091565b3661009157005b005b34801561009f57600080fd5b506100ba60048036038101906100b59190610701565b6101c5565b005b3480156100c857600080fd5b506100d1610211565b6040516100de9190610747565b60405180910390f35b3480156100f357600080fd5b5061010e60048036038101906101099190610701565b61021c565b005b34801561011c57600080fd5b50610125610268565b005b34801561013357600080fd5b5061014e60048036038101906101499190610701565b61027c565b005b34801561015c57600080fd5b506101656102c8565b6040516101729190610771565b60405180910390f35b6101836102f1565b005b34801561019157600080fd5b506101ac60048036038101906101a79190610701565b6102f3565b005b3480156101ba57600080fd5b506101c3610376565b005b6101cd610435565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b66038d7ea4c6800081565b610224610435565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b610270610435565b61027a60006104b3565b565b610284610435565b80600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b565b6102fb610435565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361036a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103619061080f565b60405180910390fd5b610373816104b3565b50565b61037e610577565b60006103946003476105c690919063ffffffff16565b905066038d7ea4c6800081111561042a576103d1600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16826105dc565b6103fd600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16826105dc565b610429600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16826105dc565b5b5061043361068d565b565b61043d610696565b73ffffffffffffffffffffffffffffffffffffffff1661045b6102c8565b73ffffffffffffffffffffffffffffffffffffffff16146104b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104a89061087b565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6002600154036105bc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105b3906108e7565b60405180910390fd5b6002600181905550565b600081836105d49190610936565b905092915050565b60008273ffffffffffffffffffffffffffffffffffffffff168260405161060290610998565b60006040518083038185875af1925050503d806000811461063f576040519150601f19603f3d011682016040523d82523d6000602084013e610644565b606091505b5050905080610688576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067f906109f9565b60405180910390fd5b505050565b60018081905550565b600033905090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006106ce826106a3565b9050919050565b6106de816106c3565b81146106e957600080fd5b50565b6000813590506106fb816106d5565b92915050565b6000602082840312156107175761071661069e565b5b6000610725848285016106ec565b91505092915050565b6000819050919050565b6107418161072e565b82525050565b600060208201905061075c6000830184610738565b92915050565b61076b816106c3565b82525050565b60006020820190506107866000830184610762565b92915050565b600082825260208201905092915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006107f960268361078c565b91506108048261079d565b604082019050919050565b60006020820190508181036000830152610828816107ec565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b600061086560208361078c565b91506108708261082f565b602082019050919050565b6000602082019050818103600083015261089481610858565b9050919050565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b60006108d1601f8361078c565b91506108dc8261089b565b602082019050919050565b60006020820190508181036000830152610900816108c4565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006109418261072e565b915061094c8361072e565b92508261095c5761095b610907565b5b828204905092915050565b600081905092915050565b50565b6000610982600083610967565b915061098d82610972565b600082019050919050565b60006109a382610975565b9150819050919050565b7f455448205472616e73666572206661696c65642e000000000000000000000000600082015250565b60006109e360148361078c565b91506109ee826109ad565b602082019050919050565b60006020820190508181036000830152610a12816109d6565b905091905056fea26469706673582212205637613bf487be2fc93b903cc6ba031757ba72ef4771d7abd6e9a25d6b32ed5964736f6c63430008110033";

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
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<JayFeeSplitter> {
    return super.deploy(overrides || {}) as Promise<JayFeeSplitter>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
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