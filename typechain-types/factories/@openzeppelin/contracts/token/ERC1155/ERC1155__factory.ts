/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ERC1155,
  ERC1155Interface,
} from "../../../../../@openzeppelin/contracts/token/ERC1155/ERC1155";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "uri_",
        type: "string",
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
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
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
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002a8138038062002a818339818101604052810190620000379190620001f7565b62000048816200004f60201b60201c565b506200057a565b806002908162000060919062000493565b5050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620000cd8262000082565b810181811067ffffffffffffffff82111715620000ef57620000ee62000093565b5b80604052505050565b60006200010462000064565b9050620001128282620000c2565b919050565b600067ffffffffffffffff82111562000135576200013462000093565b5b620001408262000082565b9050602081019050919050565b60005b838110156200016d57808201518184015260208101905062000150565b60008484015250505050565b6000620001906200018a8462000117565b620000f8565b905082815260208101848484011115620001af57620001ae6200007d565b5b620001bc8482856200014d565b509392505050565b600082601f830112620001dc57620001db62000078565b5b8151620001ee84826020860162000179565b91505092915050565b60006020828403121562000210576200020f6200006e565b5b600082015167ffffffffffffffff81111562000231576200023062000073565b5b6200023f84828501620001c4565b91505092915050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200029b57607f821691505b602082108103620002b157620002b062000253565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200031b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620002dc565b620003278683620002dc565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620003746200036e62000368846200033f565b62000349565b6200033f565b9050919050565b6000819050919050565b620003908362000353565b620003a86200039f826200037b565b848454620002e9565b825550505050565b600090565b620003bf620003b0565b620003cc81848462000385565b505050565b5b81811015620003f457620003e8600082620003b5565b600181019050620003d2565b5050565b601f82111562000443576200040d81620002b7565b6200041884620002cc565b8101602085101562000428578190505b620004406200043785620002cc565b830182620003d1565b50505b505050565b600082821c905092915050565b6000620004686000198460080262000448565b1980831691505092915050565b600062000483838362000455565b9150826002028217905092915050565b6200049e8262000248565b67ffffffffffffffff811115620004ba57620004b962000093565b5b620004c6825462000282565b620004d3828285620003f8565b600060209050601f8311600181146200050b5760008415620004f6578287015190505b62000502858262000475565b86555062000572565b601f1984166200051b86620002b7565b60005b8281101562000545578489015182556001820191506020850194506020810190506200051e565b8683101562000565578489015162000561601f89168262000455565b8355505b6001600288020188555050505b505050505050565b6124f7806200058a6000396000f3fe608060405234801561001057600080fd5b50600436106100875760003560e01c80634e1273f41161005b5780634e1273f414610138578063a22cb46514610168578063e985e9c514610184578063f242432a146101b457610087565b8062fdd58e1461008c57806301ffc9a7146100bc5780630e89341c146100ec5780632eb2c2d61461011c575b600080fd5b6100a660048036038101906100a191906113b0565b6101d0565b6040516100b391906113ff565b60405180910390f35b6100d660048036038101906100d19190611472565b610298565b6040516100e391906114ba565b60405180910390f35b610106600480360381019061010191906114d5565b61037a565b6040516101139190611592565b60405180910390f35b610136600480360381019061013191906117b1565b61040e565b005b610152600480360381019061014d9190611943565b6104af565b60405161015f9190611a79565b60405180910390f35b610182600480360381019061017d9190611ac7565b6105c8565b005b61019e60048036038101906101999190611b07565b6105de565b6040516101ab91906114ba565b60405180910390f35b6101ce60048036038101906101c99190611b47565b610672565b005b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610240576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161023790611c50565b60405180910390fd5b60008083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061036357507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610373575061037282610713565b5b9050919050565b60606002805461038990611c9f565b80601f01602080910402602001604051908101604052809291908181526020018280546103b590611c9f565b80156104025780601f106103d757610100808354040283529160200191610402565b820191906000526020600020905b8154815290600101906020018083116103e557829003601f168201915b50505050509050919050565b61041661077d565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16148061045c575061045b8561045661077d565b6105de565b5b61049b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049290611d42565b60405180910390fd5b6104a88585858585610785565b5050505050565b606081518351146104f5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104ec90611dd4565b60405180910390fd5b6000835167ffffffffffffffff811115610512576105116115b9565b5b6040519080825280602002602001820160405280156105405781602001602082028036833780820191505090505b50905060005b84518110156105bd5761058d85828151811061056557610564611df4565b5b60200260200101518583815181106105805761057f611df4565b5b60200260200101516101d0565b8282815181106105a05761059f611df4565b5b602002602001018181525050806105b690611e52565b9050610546565b508091505092915050565b6105da6105d361077d565b8383610aa6565b5050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b61067a61077d565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614806106c057506106bf856106ba61077d565b6105de565b5b6106ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106f690611d42565b60405180910390fd5b61070c8585858585610c12565b5050505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b81518351146107c9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107c090611f0c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610838576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082f90611f9e565b60405180910390fd5b600061084261077d565b9050610852818787878787610ead565b60005b8451811015610a0357600085828151811061087357610872611df4565b5b60200260200101519050600085838151811061089257610891611df4565b5b60200260200101519050600080600084815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610933576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161092a90612030565b60405180910390fd5b81810360008085815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508160008085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546109e89190612050565b92505081905550505050806109fc90611e52565b9050610855565b508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610a7a929190612084565b60405180910390a4610a90818787878787610eb5565b610a9e818787878787610ebd565b505050505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610b14576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b0b9061212d565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610c0591906114ba565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610c81576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c7890611f9e565b60405180910390fd5b6000610c8b61077d565b90506000610c9885611094565b90506000610ca585611094565b9050610cb5838989858589610ead565b600080600088815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905085811015610d4c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d4390612030565b60405180910390fd5b85810360008089815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508560008089815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610e019190612050565b925050819055508773ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628a8a604051610e7e92919061214d565b60405180910390a4610e94848a8a86868a610eb5565b610ea2848a8a8a8a8a61110e565b505050505050505050565b505050505050565b505050505050565b610edc8473ffffffffffffffffffffffffffffffffffffffff166112e5565b1561108c578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b8152600401610f229594939291906121da565b6020604051808303816000875af1925050508015610f5e57506040513d601f19601f82011682018060405250810190610f5b9190612257565b60015b61100357610f6a612291565b806308c379a003610fc65750610f7e6122b3565b80610f895750610fc8565b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fbd9190611592565b60405180910390fd5b505b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ffa906123b5565b60405180910390fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461108a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161108190612447565b60405180910390fd5b505b505050505050565b60606000600167ffffffffffffffff8111156110b3576110b26115b9565b5b6040519080825280602002602001820160405280156110e15781602001602082028036833780820191505090505b50905082816000815181106110f9576110f8611df4565b5b60200260200101818152505080915050919050565b61112d8473ffffffffffffffffffffffffffffffffffffffff166112e5565b156112dd578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b8152600401611173959493929190612467565b6020604051808303816000875af19250505080156111af57506040513d601f19601f820116820180604052508101906111ac9190612257565b60015b611254576111bb612291565b806308c379a00361121757506111cf6122b3565b806111da5750611219565b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161120e9190611592565b60405180910390fd5b505b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161124b906123b5565b60405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146112db576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112d290612447565b60405180910390fd5b505b505050505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006113478261131c565b9050919050565b6113578161133c565b811461136257600080fd5b50565b6000813590506113748161134e565b92915050565b6000819050919050565b61138d8161137a565b811461139857600080fd5b50565b6000813590506113aa81611384565b92915050565b600080604083850312156113c7576113c6611312565b5b60006113d585828601611365565b92505060206113e68582860161139b565b9150509250929050565b6113f98161137a565b82525050565b600060208201905061141460008301846113f0565b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61144f8161141a565b811461145a57600080fd5b50565b60008135905061146c81611446565b92915050565b60006020828403121561148857611487611312565b5b60006114968482850161145d565b91505092915050565b60008115159050919050565b6114b48161149f565b82525050565b60006020820190506114cf60008301846114ab565b92915050565b6000602082840312156114eb576114ea611312565b5b60006114f98482850161139b565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561153c578082015181840152602081019050611521565b60008484015250505050565b6000601f19601f8301169050919050565b600061156482611502565b61156e818561150d565b935061157e81856020860161151e565b61158781611548565b840191505092915050565b600060208201905081810360008301526115ac8184611559565b905092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6115f182611548565b810181811067ffffffffffffffff821117156116105761160f6115b9565b5b80604052505050565b6000611623611308565b905061162f82826115e8565b919050565b600067ffffffffffffffff82111561164f5761164e6115b9565b5b602082029050602081019050919050565b600080fd5b600061167861167384611634565b611619565b9050808382526020820190506020840283018581111561169b5761169a611660565b5b835b818110156116c457806116b0888261139b565b84526020840193505060208101905061169d565b5050509392505050565b600082601f8301126116e3576116e26115b4565b5b81356116f3848260208601611665565b91505092915050565b600080fd5b600067ffffffffffffffff82111561171c5761171b6115b9565b5b61172582611548565b9050602081019050919050565b82818337600083830152505050565b600061175461174f84611701565b611619565b9050828152602081018484840111156117705761176f6116fc565b5b61177b848285611732565b509392505050565b600082601f830112611798576117976115b4565b5b81356117a8848260208601611741565b91505092915050565b600080600080600060a086880312156117cd576117cc611312565b5b60006117db88828901611365565b95505060206117ec88828901611365565b945050604086013567ffffffffffffffff81111561180d5761180c611317565b5b611819888289016116ce565b935050606086013567ffffffffffffffff81111561183a57611839611317565b5b611846888289016116ce565b925050608086013567ffffffffffffffff81111561186757611866611317565b5b61187388828901611783565b9150509295509295909350565b600067ffffffffffffffff82111561189b5761189a6115b9565b5b602082029050602081019050919050565b60006118bf6118ba84611880565b611619565b905080838252602082019050602084028301858111156118e2576118e1611660565b5b835b8181101561190b57806118f78882611365565b8452602084019350506020810190506118e4565b5050509392505050565b600082601f83011261192a576119296115b4565b5b813561193a8482602086016118ac565b91505092915050565b6000806040838503121561195a57611959611312565b5b600083013567ffffffffffffffff81111561197857611977611317565b5b61198485828601611915565b925050602083013567ffffffffffffffff8111156119a5576119a4611317565b5b6119b1858286016116ce565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6119f08161137a565b82525050565b6000611a0283836119e7565b60208301905092915050565b6000602082019050919050565b6000611a26826119bb565b611a3081856119c6565b9350611a3b836119d7565b8060005b83811015611a6c578151611a5388826119f6565b9750611a5e83611a0e565b925050600181019050611a3f565b5085935050505092915050565b60006020820190508181036000830152611a938184611a1b565b905092915050565b611aa48161149f565b8114611aaf57600080fd5b50565b600081359050611ac181611a9b565b92915050565b60008060408385031215611ade57611add611312565b5b6000611aec85828601611365565b9250506020611afd85828601611ab2565b9150509250929050565b60008060408385031215611b1e57611b1d611312565b5b6000611b2c85828601611365565b9250506020611b3d85828601611365565b9150509250929050565b600080600080600060a08688031215611b6357611b62611312565b5b6000611b7188828901611365565b9550506020611b8288828901611365565b9450506040611b938882890161139b565b9350506060611ba48882890161139b565b925050608086013567ffffffffffffffff811115611bc557611bc4611317565b5b611bd188828901611783565b9150509295509295909350565b7f455243313135353a2061646472657373207a65726f206973206e6f742061207660008201527f616c6964206f776e657200000000000000000000000000000000000000000000602082015250565b6000611c3a602a8361150d565b9150611c4582611bde565b604082019050919050565b60006020820190508181036000830152611c6981611c2d565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611cb757607f821691505b602082108103611cca57611cc9611c70565b5b50919050565b7f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60008201527f6572206f7220617070726f766564000000000000000000000000000000000000602082015250565b6000611d2c602e8361150d565b9150611d3782611cd0565b604082019050919050565b60006020820190508181036000830152611d5b81611d1f565b9050919050565b7f455243313135353a206163636f756e747320616e6420696473206c656e67746860008201527f206d69736d617463680000000000000000000000000000000000000000000000602082015250565b6000611dbe60298361150d565b9150611dc982611d62565b604082019050919050565b60006020820190508181036000830152611ded81611db1565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611e5d8261137a565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611e8f57611e8e611e23565b5b600182019050919050565b7f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060008201527f6d69736d61746368000000000000000000000000000000000000000000000000602082015250565b6000611ef660288361150d565b9150611f0182611e9a565b604082019050919050565b60006020820190508181036000830152611f2581611ee9565b9050919050565b7f455243313135353a207472616e7366657220746f20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000611f8860258361150d565b9150611f9382611f2c565b604082019050919050565b60006020820190508181036000830152611fb781611f7b565b9050919050565b7f455243313135353a20696e73756666696369656e742062616c616e636520666f60008201527f72207472616e7366657200000000000000000000000000000000000000000000602082015250565b600061201a602a8361150d565b915061202582611fbe565b604082019050919050565b600060208201905081810360008301526120498161200d565b9050919050565b600061205b8261137a565b91506120668361137a565b925082820190508082111561207e5761207d611e23565b5b92915050565b6000604082019050818103600083015261209e8185611a1b565b905081810360208301526120b28184611a1b565b90509392505050565b7f455243313135353a2073657474696e6720617070726f76616c2073746174757360008201527f20666f722073656c660000000000000000000000000000000000000000000000602082015250565b600061211760298361150d565b9150612122826120bb565b604082019050919050565b600060208201905081810360008301526121468161210a565b9050919050565b600060408201905061216260008301856113f0565b61216f60208301846113f0565b9392505050565b61217f8161133c565b82525050565b600081519050919050565b600082825260208201905092915050565b60006121ac82612185565b6121b68185612190565b93506121c681856020860161151e565b6121cf81611548565b840191505092915050565b600060a0820190506121ef6000830188612176565b6121fc6020830187612176565b818103604083015261220e8186611a1b565b905081810360608301526122228185611a1b565b9050818103608083015261223681846121a1565b90509695505050505050565b60008151905061225181611446565b92915050565b60006020828403121561226d5761226c611312565b5b600061227b84828501612242565b91505092915050565b60008160e01c9050919050565b600060033d11156122b05760046000803e6122ad600051612284565b90505b90565b600060443d10612340576122c5611308565b60043d036004823e80513d602482011167ffffffffffffffff821117156122ed575050612340565b808201805167ffffffffffffffff81111561230b5750505050612340565b80602083010160043d038501811115612328575050505050612340565b612337826020018501866115e8565b82955050505050505b90565b7f455243313135353a207472616e7366657220746f206e6f6e2d4552433131353560008201527f526563656976657220696d706c656d656e746572000000000000000000000000602082015250565b600061239f60348361150d565b91506123aa82612343565b604082019050919050565b600060208201905081810360008301526123ce81612392565b9050919050565b7f455243313135353a204552433131353552656365697665722072656a6563746560008201527f6420746f6b656e73000000000000000000000000000000000000000000000000602082015250565b600061243160288361150d565b915061243c826123d5565b604082019050919050565b6000602082019050818103600083015261246081612424565b9050919050565b600060a08201905061247c6000830188612176565b6124896020830187612176565b61249660408301866113f0565b6124a360608301856113f0565b81810360808301526124b581846121a1565b9050969550505050505056fea2646970667358221220b88c4eff2d147784fd2a0b7052e2918363f6f6afe84c06825da27fbd616a2f3664736f6c63430008100033";

type ERC1155ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1155ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1155__factory extends ContractFactory {
  constructor(...args: ERC1155ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    uri_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC1155> {
    return super.deploy(uri_, overrides || {}) as Promise<ERC1155>;
  }
  override getDeployTransaction(
    uri_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(uri_, overrides || {});
  }
  override attach(address: string): ERC1155 {
    return super.attach(address) as ERC1155;
  }
  override connect(signer: Signer): ERC1155__factory {
    return super.connect(signer) as ERC1155__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155Interface {
    return new utils.Interface(_abi) as ERC1155Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1155 {
    return new Contract(address, _abi, signerOrProvider) as ERC1155;
  }
}
