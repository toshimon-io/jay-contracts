/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  JayMart,
  JayMartInterface,
} from "../../../contracts/JayMart.sol/JayMart";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_jayAddress",
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
    inputs: [
      {
        internalType: "address[]",
        name: "erc721TokenAddress",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "erc721Ids",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "erc1155TokenAddress",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "erc1155Ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "erc1155Amounts",
        type: "uint256[]",
      },
    ],
    name: "buyJay",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "erc721TokenAddress",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "erc721Ids",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "erc1155TokenAddress",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "erc1155Ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "erc1155Amounts",
        type: "uint256[]",
      },
    ],
    name: "buyNFTs",
    outputs: [],
    stateMutability: "payable",
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
    name: "getFees",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
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
    name: "getLatestPrice",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "total",
        type: "uint256",
      },
    ],
    name: "getPriceBuy",
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
        internalType: "uint256",
        name: "total",
        type: "uint256",
      },
    ],
    name: "getPriceSell",
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
    name: "getTotals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
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
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
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
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "setTEAMWallet",
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
    inputs: [],
    name: "updateFees",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60c0604052662386f26fc10000600655678ac7230489e8000060075566038d7ea4c6800060085562093a804262000037919062000390565b6009553480156200004757600080fd5b506040516200281d3803806200281d83398181016040528101906200006d919062000435565b6200008d620000816200017d60201b60201c565b6200018560201b60201c565b600180819055508073ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250506200012173985b6b9064212091b4b325f68746b77262801bcb6200024960201b60201c565b735f4ec3df9cbd43714fe2740f5e3616155c5b8419600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050620004ea565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b620002596200029d60201b60201c565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b620002ad6200017d60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff16620002d36200032e60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff16146200032c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200032390620004c8565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006200039d8262000357565b9150620003aa8362000357565b9250828201905080821115620003c557620003c462000361565b5b92915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620003fd82620003d0565b9050919050565b6200040f81620003f0565b81146200041b57600080fd5b50565b6000815190506200042f8162000404565b92915050565b6000602082840312156200044e576200044d620003cb565b5b60006200045e848285016200041e565b91505092915050565b600082825260208201905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000620004b060208362000467565b9150620004bd8262000478565b602082019050919050565b60006020820190508181036000830152620004e381620004a1565b9050919050565b60805160a0516122f862000525600039600081816104f2015281816106f90152610cb30152600081816104cb01526106d201526122f86000f3fe6080604052600436106100ec5760003560e01c80638da5cb5b1161008a578063db8d55f111610059578063db8d55f1146102b0578063f23a6e61146102de578063f2fde38b1461031b578063fc9fc6c714610344576100f3565b80638da5cb5b146102135780638e15f4731461023e57806395b6712814610269578063d0e30db0146102a6576100f3565b80634ef26f6a116100c65780634ef26f6a14610198578063666566e8146101b4578063715018a6146101d057806384e10a90146101e7576100f3565b8063150b7a02146100f557806329de6d201461013257806343a43ec81461015b576100f3565b366100f357005b005b34801561010157600080fd5b5061011c600480360381019061011791906115cf565b610372565b604051610129919061168d565b60405180910390f35b34801561013e57600080fd5b50610159600480360381019061015491906116a8565b610386565b005b34801561016757600080fd5b50610182600480360381019061017d91906116d5565b6103d2565b60405161018f9190611711565b60405180910390f35b6101b260048036038101906101ad91906117e2565b6103e9565b005b6101ce60048036038101906101c991906117e2565b6105a0565b005b3480156101dc57600080fd5b506101e561079c565b005b3480156101f357600080fd5b506101fc6107b0565b60405161020a9291906118ff565b60405180910390f35b34801561021f57600080fd5b506102286107c1565b6040516102359190611937565b60405180910390f35b34801561024a57600080fd5b506102536107ea565b604051610260919061196b565b60405180910390f35b34801561027557600080fd5b50610290600480360381019061028b91906116d5565b61088b565b60405161029d9190611711565b60405180910390f35b6102ae6108a2565b005b3480156102bc57600080fd5b506102c56108a4565b6040516102d59493929190611986565b60405180910390f35b3480156102ea57600080fd5b50610305600480360381019061030091906119cb565b6108c4565b604051610312919061168d565b60405180910390f35b34801561032757600080fd5b50610342600480360381019061033d91906116a8565b6108d9565b005b34801561035057600080fd5b5061035961095c565b6040516103699493929190611986565b60405180910390f35b600063150b7a0260e01b9050949350505050565b61038e610d90565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000600654826103e29190611a91565b9050919050565b6103f1610e0e565b60008a8a905090506104058b8b8b8b610e5d565b610413878787878787610f34565b8161041e9190611aeb565b905080600460008282546104329190611aeb565b925050819055506000600654826104499190611a91565b90508034101561048e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161048590611b7c565b60405180910390fd5b6104c6600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166002346104c19190611bcb565b61105c565b6104f07f00000000000000000000000000000000000000000000000000000000000000004761105c565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166379cc6790336007548561053b9190611a91565b6040518363ffffffff1660e01b8152600401610558929190611bfc565b600060405180830381600087803b15801561057257600080fd5b505af1158015610586573d6000803e3d6000fd5b50505050505061059461110d565b50505050505050505050565b6105a8610e0e565b60006004346105b79190611bcb565b905060006004346105c89190611bcb565b905060006002346105d99190611bcb565b905060008d8d905090506105ef8e8e8e8e611116565b6105fd8a8a8a8a8a8a6111ed565b816106089190611aeb565b9050806005600082825461061c9190611aeb565b9250508190555060006064821015610641576008548261063c9190611a91565b61065c565b6002600854836106519190611a91565b61065b9190611bcb565b5b9050803410156106a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161069890611b7c565b60405180910390fd5b6106cd600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168661105c565b6106f77f00000000000000000000000000000000000000000000000000000000000000008561105c565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663f088d54784336040518363ffffffff1660e01b81526004016107519190611937565b6000604051808303818588803b15801561076a57600080fd5b505af115801561077e573d6000803e3d6000fd5b5050505050505050505061079061110d565b50505050505050505050565b6107a4610d90565b6107ae6000611315565b565b600080600454600554915091509091565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600080600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663feaf968c6040518163ffffffff1660e01b815260040160a060405180830381865afa15801561085a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061087e9190611ca8565b5050509150508091505090565b60006008548261089b9190611a91565b9050919050565b565b600080600080600854600654600754600954935093509350935090919293565b600063f23a6e6160e01b905095945050505050565b6108e1610d90565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610950576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161094790611d95565b60405180910390fd5b61095981611315565b50565b60008060008061096a610e0e565b600080600080600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663feaf968c6040518163ffffffff1660e01b815260040160a060405180830381865afa1580156109dd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a019190611ca8565b94509450509350935060008313610a4d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a4490611e01565b60405180910390fd5b8369ffffffffffffffffffff168169ffffffffffffffffffff161015610aa8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a9f90611e6d565b60405180910390fd5b60008203610aeb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ae290611ed9565b60405180910390fd5b60006402540be40084610afe9190611a91565b90506009548311610b44576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b3b90611f45565b60405180910390fd5b6000671bc16d674ec80000821115610b8a576000671bc16d674ec8000083610b6c9190611bcb565b905080670de0b6b3a7640000610b829190611bcb565b915050610ba1565b81671bc16d674ec80000610b9e9190611bcb565b90505b3373ffffffffffffffffffffffffffffffffffffffff16610bc06107c1565b73ffffffffffffffffffffffffffffffffffffffff161480610c085750806002600854610bed9190611bcb565b108015610c075750806096600854610c059190611a91565b115b5b610c47576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c3e90611fb1565b60405180910390fd5b80600881905550678ac7230489e80000821115610c96576000678ac7230489e8000083610c749190611bcb565b905080670de0b6b3a7640000610c8a9190611bcb565b60068190555050610cb1565b81678ac7230489e80000610caa9190611bcb565b6006819055505b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663f57557476006546040518263ffffffff1660e01b8152600401610d0c9190611711565b602060405180830381865afa158015610d29573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d4d9190611fd1565b6007819055506201518084610d629190611aeb565b6009819055506008546006546007546009549950995099509950505050505050610d8a61110d565b90919293565b610d986113d9565b73ffffffffffffffffffffffffffffffffffffffff16610db66107c1565b73ffffffffffffffffffffffffffffffffffffffff1614610e0c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e039061204a565b60405180910390fd5b565b600260015403610e53576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e4a906120b6565b60405180910390fd5b6002600181905550565b60005b82829050811015610f2d57848482818110610e7e57610e7d6120d6565b5b9050602002016020810190610e9391906116a8565b73ffffffffffffffffffffffffffffffffffffffff166342842e0e3033868686818110610ec357610ec26120d6565b5b905060200201356040518463ffffffff1660e01b8152600401610ee893929190612105565b600060405180830381600087803b158015610f0257600080fd5b505af1158015610f16573d6000803e3d6000fd5b505050508080610f259061213c565b915050610e60565b5050505050565b6000806000905060005b8686905081101561104d57848482818110610f5c57610f5b6120d6565b5b9050602002013582610f6e9190611aeb565b9150888882818110610f8357610f826120d6565b5b9050602002016020810190610f9891906116a8565b73ffffffffffffffffffffffffffffffffffffffff1663f242432a30338a8a86818110610fc857610fc76120d6565b5b90506020020135898987818110610fe257610fe16120d6565b5b905060200201356040518563ffffffff1660e01b815260040161100894939291906121bb565b600060405180830381600087803b15801561102257600080fd5b505af1158015611036573d6000803e3d6000fd5b5050505080806110459061213c565b915050610f3e565b50809150509695505050505050565b60008273ffffffffffffffffffffffffffffffffffffffff168260405161108290612241565b60006040518083038185875af1925050503d80600081146110bf576040519150601f19603f3d011682016040523d82523d6000602084013e6110c4565b606091505b5050905080611108576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110ff906122a2565b60405180910390fd5b505050565b60018081905550565b60005b828290508110156111e657848482818110611137576111366120d6565b5b905060200201602081019061114c91906116a8565b73ffffffffffffffffffffffffffffffffffffffff166342842e0e333086868681811061117c5761117b6120d6565b5b905060200201356040518463ffffffff1660e01b81526004016111a193929190612105565b600060405180830381600087803b1580156111bb57600080fd5b505af11580156111cf573d6000803e3d6000fd5b5050505080806111de9061213c565b915050611119565b5050505050565b6000806000905060005b8686905081101561130657848482818110611215576112146120d6565b5b90506020020135826112279190611aeb565b915088888281811061123c5761123b6120d6565b5b905060200201602081019061125191906116a8565b73ffffffffffffffffffffffffffffffffffffffff1663f242432a33308a8a86818110611281576112806120d6565b5b9050602002013589898781811061129b5761129a6120d6565b5b905060200201356040518563ffffffff1660e01b81526004016112c194939291906121bb565b600060405180830381600087803b1580156112db57600080fd5b505af11580156112ef573d6000803e3d6000fd5b5050505080806112fe9061213c565b9150506111f7565b50809150509695505050505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611420826113f5565b9050919050565b61143081611415565b811461143b57600080fd5b50565b60008135905061144d81611427565b92915050565b6000819050919050565b61146681611453565b811461147157600080fd5b50565b6000813590506114838161145d565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6114dc82611493565b810181811067ffffffffffffffff821117156114fb576114fa6114a4565b5b80604052505050565b600061150e6113e1565b905061151a82826114d3565b919050565b600067ffffffffffffffff82111561153a576115396114a4565b5b61154382611493565b9050602081019050919050565b82818337600083830152505050565b600061157261156d8461151f565b611504565b90508281526020810184848401111561158e5761158d61148e565b5b611599848285611550565b509392505050565b600082601f8301126115b6576115b5611489565b5b81356115c684826020860161155f565b91505092915050565b600080600080608085870312156115e9576115e86113eb565b5b60006115f78782880161143e565b94505060206116088782880161143e565b935050604061161987828801611474565b925050606085013567ffffffffffffffff81111561163a576116396113f0565b5b611646878288016115a1565b91505092959194509250565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61168781611652565b82525050565b60006020820190506116a2600083018461167e565b92915050565b6000602082840312156116be576116bd6113eb565b5b60006116cc8482850161143e565b91505092915050565b6000602082840312156116eb576116ea6113eb565b5b60006116f984828501611474565b91505092915050565b61170b81611453565b82525050565b60006020820190506117266000830184611702565b92915050565b600080fd5b600080fd5b60008083601f84011261174c5761174b611489565b5b8235905067ffffffffffffffff8111156117695761176861172c565b5b60208301915083602082028301111561178557611784611731565b5b9250929050565b60008083601f8401126117a2576117a1611489565b5b8235905067ffffffffffffffff8111156117bf576117be61172c565b5b6020830191508360208202830111156117db576117da611731565b5b9250929050565b60008060008060008060008060008060a08b8d031215611805576118046113eb565b5b60008b013567ffffffffffffffff811115611823576118226113f0565b5b61182f8d828e01611736565b9a509a505060208b013567ffffffffffffffff811115611852576118516113f0565b5b61185e8d828e0161178c565b985098505060408b013567ffffffffffffffff811115611881576118806113f0565b5b61188d8d828e01611736565b965096505060608b013567ffffffffffffffff8111156118b0576118af6113f0565b5b6118bc8d828e0161178c565b945094505060808b013567ffffffffffffffff8111156118df576118de6113f0565b5b6118eb8d828e0161178c565b92509250509295989b9194979a5092959850565b60006040820190506119146000830185611702565b6119216020830184611702565b9392505050565b61193181611415565b82525050565b600060208201905061194c6000830184611928565b92915050565b6000819050919050565b61196581611952565b82525050565b6000602082019050611980600083018461195c565b92915050565b600060808201905061199b6000830187611702565b6119a86020830186611702565b6119b56040830185611702565b6119c26060830184611702565b95945050505050565b600080600080600060a086880312156119e7576119e66113eb565b5b60006119f58882890161143e565b9550506020611a068882890161143e565b9450506040611a1788828901611474565b9350506060611a2888828901611474565b925050608086013567ffffffffffffffff811115611a4957611a486113f0565b5b611a55888289016115a1565b9150509295509295909350565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611a9c82611453565b9150611aa783611453565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611ae057611adf611a62565b5b828202905092915050565b6000611af682611453565b9150611b0183611453565b9250828201905080821115611b1957611b18611a62565b5b92915050565b600082825260208201905092915050565b7f596f75206e65656420746f20706179206d6f7265204554482e00000000000000600082015250565b6000611b66601983611b1f565b9150611b7182611b30565b602082019050919050565b60006020820190508181036000830152611b9581611b59565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611bd682611453565b9150611be183611453565b925082611bf157611bf0611b9c565b5b828204905092915050565b6000604082019050611c116000830185611928565b611c1e6020830184611702565b9392505050565b600069ffffffffffffffffffff82169050919050565b611c4481611c25565b8114611c4f57600080fd5b50565b600081519050611c6181611c3b565b92915050565b611c7081611952565b8114611c7b57600080fd5b50565b600081519050611c8d81611c67565b92915050565b600081519050611ca28161145d565b92915050565b600080600080600060a08688031215611cc457611cc36113eb565b5b6000611cd288828901611c52565b9550506020611ce388828901611c7e565b9450506040611cf488828901611c93565b9350506060611d0588828901611c93565b9250506080611d1688828901611c52565b9150509295509295909350565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000611d7f602683611b1f565b9150611d8a82611d23565b604082019050919050565b60006020820190508181036000830152611dae81611d72565b9050919050565b7f436861696e6c696e6b207072696365203c3d2030000000000000000000000000600082015250565b6000611deb601483611b1f565b9150611df682611db5565b602082019050919050565b60006020820190508181036000830152611e1a81611dde565b9050919050565b7f5374616c65207072696365000000000000000000000000000000000000000000600082015250565b6000611e57600b83611b1f565b9150611e6282611e21565b602082019050919050565b60006020820190508181036000830152611e8681611e4a565b9050919050565b7f526f756e64206e6f7420636f6d706c6574650000000000000000000000000000600082015250565b6000611ec3601283611b1f565b9150611ece82611e8d565b602082019050919050565b60006020820190508181036000830152611ef281611eb6565b9050919050565b7f4665652075706461746520657665727920323420687273000000000000000000600082015250565b6000611f2f601783611b1f565b9150611f3a82611ef9565b602082019050919050565b60006020820190508181036000830152611f5e81611f22565b9050919050565b7f466565207377696e6720746f6f20686967680000000000000000000000000000600082015250565b6000611f9b601283611b1f565b9150611fa682611f65565b602082019050919050565b60006020820190508181036000830152611fca81611f8e565b9050919050565b600060208284031215611fe757611fe66113eb565b5b6000611ff584828501611c93565b91505092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000612034602083611b1f565b915061203f82611ffe565b602082019050919050565b6000602082019050818103600083015261206381612027565b9050919050565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b60006120a0601f83611b1f565b91506120ab8261206a565b602082019050919050565b600060208201905081810360008301526120cf81612093565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060608201905061211a6000830186611928565b6121276020830185611928565b6121346040830184611702565b949350505050565b600061214782611453565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361217957612178611a62565b5b600182019050919050565b600082825260208201905092915050565b50565b60006121a5600083612184565b91506121b082612195565b600082019050919050565b600060a0820190506121d06000830187611928565b6121dd6020830186611928565b6121ea6040830185611702565b6121f76060830184611702565b818103608083015261220881612198565b905095945050505050565b600081905092915050565b600061222b600083612213565b915061223682612195565b600082019050919050565b600061224c8261221e565b9150819050919050565b7f455448205472616e73666572206661696c65642e000000000000000000000000600082015250565b600061228c601483611b1f565b915061229782612256565b602082019050919050565b600060208201905081810360008301526122bb8161227f565b905091905056fea264697066735822122014d5ab8e61e64bf7eb92aaab183cf3388bae27880a31e1775953af5ca7cfdece64736f6c63430008100033";

type JayMartConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: JayMartConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class JayMart__factory extends ContractFactory {
  constructor(...args: JayMartConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _jayAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<JayMart> {
    return super.deploy(_jayAddress, overrides || {}) as Promise<JayMart>;
  }
  override getDeployTransaction(
    _jayAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_jayAddress, overrides || {});
  }
  override attach(address: string): JayMart {
    return super.attach(address) as JayMart;
  }
  override connect(signer: Signer): JayMart__factory {
    return super.connect(signer) as JayMart__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): JayMartInterface {
    return new utils.Interface(_abi) as JayMartInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): JayMart {
    return new Contract(address, _abi, signerOrProvider) as JayMart;
  }
}
