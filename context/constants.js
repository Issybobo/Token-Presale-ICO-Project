import { ethers } from "ethers";
import Web3Modal from "web3modal";

// INTERNAL IMPORTS
import tokenICO from "./TokenICO.json";
import erc20 from "./ERC20.json";


export const TOKEN_ADDRESS = "";

export const ERC20_ABI = "";

export const CONTRACT_ADDRESS = "";

export const CONTRACT_ABI = "";

const networks = {
  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.infura.io/v3/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
  holesky: {
    chainId: `0x${Number(17000).toString(16)}`,
    chainName: "Holesky",
    nativeCurrency: {
      name: "holesky",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/eth_holesky"],
    blockExplorerUrls: ["https://holesky.etherscan.io/"],
  },
  polygon_amoy: {
    chainId: `0x${Number(80002).toString(16)}`,
    chainName: "Polygon Amoy",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    blockExplorerUrls: ["https://www.oklink.com/amoy"],
  },
  polygon_mumbai: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/bsc"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  base_mainnet: {
    chainId: `0x${Number(8453).toString(16)}`,
    chainName: "Base Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.base.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  base_sepolia: {
    chainId: `0x${Number(84532).toString(16)}`,
    chainName: "Base Sepolia",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.base.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  localhost: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "GO",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

// FUNCTION TO CHANGE NETWORK
export const changeNetwork = async ({network}) => {
  try {
    // CHECK IF WALLET IS INSTALLED
    if(!window.ethereum) throw new Error("No crypto wallet found");

    // ADD NETWORK TO WALLET
    await window.ethereum.request({
      
      method: "wallet_addEthereumChain",
//
      params: [{ 
        ...network[networkName],
       
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
  
};

// FUNCTION TO SWITCH NETWORK
export const handleNetworkSwitch = async ({network}) => {
  const networkName = "sepolia"; // CHANGE NETWORK NAME
  await changeNetwork({networkName});
};

// funcion to check connected wallet
export const CHECK_WALLET_CONNECTED = async () => {
  // CHECK IF WALLET IS INSTALLED & CONNECTED
  if(!window.ethereum) return console.log("Please install Metamask"); //

    // SWITCH NETWORK
  await handleNetworkSwitch();

  // CONNECT WALLET
  const account = await window.ethereum.request({method: "eth_requestAccounts"});
   // CHECK IF ACCOUNT IS CONNECTED
  if(account.length){
    return account[0];
  } else {
    console.log("Please install Metamask & Connect, Reload");
  }

}


export const CONNECT_WALLET = async () => {
  try {
    // CHECK IF WALLET IS INSTALLED
    if(!window.ethereum) return console.log("No crypto wallet found, Please install Metamask");
    
    // CONNECT WALLET
    const account = await window.ethereum.request({method: "eth_accounts"});
    
    // it will reload the page
    window.location.reload();
    
    // RETURN ACCOUNT
      return account[0];
   
  } catch (error) {
    console.log(error);
  }
}
 
// FUNCTION TO FETCH CONTRACT 
const fetchContract = (address, abi, signer) => new ethers.Contract(address, abi, signer);
  
// FUNCTION TO FETCH TOKEN ICO CONTRACT
export const TOKEN_ICO_CONTRACT = async () => {
  try {
    // CHECK IF WALLET IS INSTALLED & CONNECTED
   const web3Modal = new Web3Modal(); // CREATE NEW WEB3MODAL INSTANCE
   const connection = await web3Modal.connect(); // CONNECT TO WALLET
   const provider = new ethers.providers.Web3Provider(connection); // CREATE NEW PROVIDER
   const signer = provider.getSigner(); // GET SIGNER

   // FETCH CONTRACT
    const contract = fetchContract(CONTRACT_ADDRESS, CONTRACT_ABI, signer); // FETCH CONTRACT

   return contract; // RETURN CONTRACT
   
  } catch (error) {
    console.log(error);
  }
}


export const ERC20 = async () => {
  try {
    // CHECK IF WALLET IS INSTALLED & CONNECTED
   const web3Modal = new Web3Modal(); // CREATE NEW WEB3MODAL INSTANCE
   const connection = await web3Modal.connect(); // CONNECT TO WALLET
   const provider = new ethers.providers.Web3Provider(connection); // CREATE NEW PROVIDER
   // GET NETWORK
   const network = await provider.getNetwork(); // GET NETWORK
   // GET SIGNER
   const signer = provider.getSigner(); // GET SIGNER

   // GET USER ADDRESS
    const userAddress = signer.getAddress(); // GET USER ADDRESS
    // GET BALANCE
    const balance = await provider.balanceOf(userAddress); // GET BALANCE

    const name = await contract.name(); // GET NAME
    const symbol = await contract.symbol(); // GET SYMBOL
    const supply = await contract.totalSupply(); // GET TOTAL SUPPLY
    const decimals = await contract.decimals(); // GET DECIMALS
    const address = await contract.address; // GET ADDRESS


    // CREATE TOKEN OBJECT with all the details fetched from the contract
    const token = {
      address: address,
      name: name,
      symbol: symbol,
      decimals: decimals,
      supply: ethers.utils.formatEther(supply.toString()), // CONVERT TO ETH
      balance: ethers.utils.formatEther(balance.toString()),
      chainId: network.chainId,
    }

   console.log(token);
   return token; // RETURN TOKEN
   
  } catch (error) {
    console.log(error);
  }
}


// function to fetch erc 20 contract
export const ERC20_CONTRACT = async (CONTRACT_ADDRESS) => {
  try {
    // CHECK IF WALLET IS INSTALLED & CONNECTED
   const web3Modal = new Web3Modal(); // CREATE NEW WEB3MODAL INSTANCE
   const connection = await web3Modal.connect(); // CONNECT TO WALLET
   const provider = new ethers.providers.Web3Provider(connection); // CREATE NEW PROVIDER
   const signer = provider.getSigner(); // GET SIGNER

   // FETCH CONTRACT
    const contract = fetchContract(CONTRACT_ADDRESS, ERC20_ABI, signer); // FETCH CONTRACT

   return contract; // RETURN CONTRACT
   
  } catch (error) {
    console.log(error);
  }
}


// FUNCTION TO GET USER BALANCE
export const GET_BALANCE = async (CONTRACT_ADDRESS) => {
  try {
    // CHECK IF WALLET IS INSTALLED & CONNECTED
   const web3Modal = new Web3Modal(); // CREATE NEW WEB3MODAL INSTANCE
   const connection = await web3Modal.connect(); // CONNECT TO WALLET
   const provider = new ethers.providers.Web3Provider(connection); // CREATE NEW PROVIDER
   const signer = provider.getSigner(); // GET SIGNER

   // GET USER ADDRESS
    const maticBal  = await provider.getBalance(); // GET USER ADDRESS

    return ethers.utils.formatEther(maticBal.toString()); // RETURN BALANCE and convert to ether
  } catch (error) {
    console.log(error);
  }
};
  

export const CHECK_ACCOUNT_BALANCE = async (ADDRESS) => {
  try {
    // CHECK IF WALLET IS INSTALLED & CONNECTED
   const web3Modal = new Web3Modal(); // CREATE NEW WEB3MODAL INSTANCE
   const connection = await web3Modal.connect(); // CONNECT TO WALLET
   const provider = new ethers.providers.Web3Provider(connection); // CREATE NEW PROVIDER

   const maticBal  = await provider.getBalance(ADDRESS); // GET USER ADDRESS

   return ethers.utils.formatEther(maticBal.toString()); // RETURN BALANCE and convert to ether
  } catch (error) {
    console.log(error);
  }
}

// FUNCTION TO ADD TOKEN TO METAMASK
export const addTokenToMetamask = async (CONTRACT_ADDRESS, ADDRESS) => {
  //
  if(window.ethereum){
    const tokenDetails = await ERC20_CONTRACT(CONTRACT_ADDRESS);

    const tokenDecimals = tokenDetails?.decimals();
    const tokenAddress = TOKEN_ADDRESS;
    const tokenSymbol = await tokenDetails?.symbol();
    const tokenImage = "";

    try{
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          }
        }
      })

      if(wasAdded){
        return "Token added to Metamask";
      } else {
        return "Token not added to Metamask";
      }
    } catch (error) {
      console.log(error);
    }
    
  }
}
