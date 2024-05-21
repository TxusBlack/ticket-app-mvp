import { useState } from "react";

import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { polygonAmoy } from "thirdweb/chains";
import { createThirdwebClient, defineChain } from "thirdweb";

import { useActiveAccount } from "thirdweb/react";
import { getUserEmail } from "thirdweb/wallets/in-app";
import { getWalletBalance } from "thirdweb/wallets";

import { useDisconnect, useActiveWallet } from "thirdweb/react";

import { getContract, prepareContractCall } from "thirdweb";
import { readContract } from "thirdweb";
import { sendTransaction, waitForReceipt } from "thirdweb";
import { IonButton } from "@ionic/react";

interface ContainerProps {}

const Web2InfraComponent: React.FC<ContainerProps> = (props: any) => {
  const [userConnected, setUserConnected] = useState(false);
  const [mintedNfts, setMintedNfts] = useState(0);
  const [userMintedNfts, setUserMintedNfts] = useState(0);

  const clientId = "193451e5ca239a3cb30a2c548f8bf08c";
  const amoyChain = defineChain(polygonAmoy);
  const wallets = [inAppWallet()];

  const clientObject = createThirdwebClient({
    clientId: "193451e5ca239a3cb30a2c548f8bf08c",
  });

  const account: any = useActiveAccount();

  const { disconnect } = useDisconnect();
  const wallet: any = useActiveWallet();

  let smartContractAbi = [
    {
      inputs: [
        {
          internalType: "string",
          name: "name_",
          type: "string",
        },
        {
          internalType: "string",
          name: "symbol_",
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
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
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
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "msg",
          type: "string",
        },
        {
          indexed: false,
          internalType: "address",
          name: "buyerAddress",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "nfticketIdBought",
          type: "uint256",
        },
      ],
      name: "nfticketBought",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
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
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
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
      inputs: [
        {
          internalType: "address",
          name: "paramAddressToCheck",
          type: "address",
        },
      ],
      name: "getOwnedNFTicketsId",
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
          name: "owner",
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
      inputs: [],
      name: "maxSupply",
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
          name: "paramAddressToMint",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "paramQuantityToMint",
          type: "uint256",
        },
      ],
      name: "mintNFTicket",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
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
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
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
          name: "tokenId",
          type: "uint256",
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
          name: "tokenId",
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
      inputs: [],
      name: "symbol",
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
    {
      inputs: [
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenByIndex",
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
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "tokenOfOwnerByIndex",
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
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
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
    {
      inputs: [],
      name: "totalSupply",
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
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const contract = getContract({
    // the client you have created via `createThirdwebClient()`
    client: clientObject,
    // the chain the contract is deployed on
    chain: amoyChain,
    // the contract's address
    address: "0x93A8fE00B91829763A797E933686318e89401c46",
    // OPTIONAL: the contract's abi
    abi: smartContractAbi,
  });

  async function connect() {
    setUserConnected(true);

    // let _mintedNfts = await readContract({contract: contract, method: "function totalSupply() view returns (uint256)",});
    // setMintedNfts(_mintedNfts.toString());
  }

  async function mintNft() {
    const tx = prepareContractCall({
      contract: contract,
      // Pass the method signature that you want to call
      method:
        "function mintNFTicket(address paramAddressToMint, uint256 paramQuantityToMint)",
      // and the params for that method
      // Their types are automatically inferred based on the method signature
      params: [account.address, 1],
    });

    console.log(tx);

    let accountForTx = account;

    let txOptions = {
      account: accountForTx,
      // TODO: update this to `Transaction<"prepared">` once the type is available to ensure only prepared transactions are accepted
      // biome-ignore lint/suspicious/noExplicitAny: library function that accepts any prepared transaction type
      transaction: tx,
    };

    const transactionResult = await sendTransaction(txOptions);
    console.log("TX RESULT");
    console.log(transactionResult);

    alert("MINTED", transactionResult.transactionHash);
    console.log("MINTED NFT");
    // console.log(receipt);

    await getUserData();
  }

  async function getUserData() {
    // const account = useActiveAccount();
    console.log("wallet address", account.address);

    let address = account.address;
    let chain = amoyChain;
    let client = clientObject;

    let balance = await getWalletBalance({
      client,
      chain,
      address,
    });

    console.log("Balance", balance);

    // console.log("hello");

    // let signature = await account.signMessage("hello");
    // let signature = await account.signMessage({message: 'hello'});

    // property) signMessage: ({ message }: {
    //     message: SignableMessage;
    // }) => Promise<`0x${string}`>

    // console.log("SIGNATURE:");
    // console.log(signature);
    console.log("NONFUNGIBLE");

    let _mintedNfts: any = await readContract({
      contract: contract,
      method: "function totalSupply() view returns (uint256)",
      params: [],
    });
    setMintedNfts(_mintedNfts.toString());

    let _userMintedNfts: any = await readContract({
      contract: contract,
      method: "function balanceOf(address owner) view returns (uint256)",
      params: [account.address],
    });
    setUserMintedNfts(_userMintedNfts.toString());

    console.log("MINTED NFTS");
    console.log(mintedNfts);
  }

  function Disconnect() {
    const { disconnect } = useDisconnect();
    const wallet: any = useActiveWallet();

    disconnect(wallet);
  }

  getUserData();

  return (
    <div>
      <div>
        <h1 style={{ textAlign: "center" }}>/// WEB2INFRA COMPONENT ///</h1>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {account ? (
          <>
            <div style={{ paddingTop: "1rem" }}>
              <ConnectButton
                client={clientObject}
                chain={amoyChain}
                onClick={connect}
              />
              Info:
              <div>
                <IonButton onClick={getUserData}>getData</IonButton>
              </div>
              <div>
                <h3>Actual NFTickets sold: {mintedNfts}</h3>
                <h3>User mintedNfts: {userMintedNfts} </h3>
              </div>
              <div>
                <h2>MINT NFT:</h2>
                <IonButton onClick={mintNft}>mint</IonButton>
              </div>
              <div style={{ paddingTop: "45px" }}>
                <IonButton onClick={() => disconnect(wallet)}>
                  Disconnect
                </IonButton>
              </div>
            </div>
          </>
        ) : (
          <>
            <ConnectButton
              client={clientObject}
              chain={amoyChain}
              onClick={connect}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Web2InfraComponent;
