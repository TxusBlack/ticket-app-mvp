import { useState } from "react";

import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { polygonAmoy } from "thirdweb/chains";
import {
  createThirdwebClient,
  defineChain,
  hexToBytes,
  hexToUint8Array,
} from "thirdweb";

import { useActiveAccount } from "thirdweb/react";
import { getUserEmail } from "thirdweb/wallets/in-app";
import { getWalletBalance } from "thirdweb/wallets";

import { useDisconnect, useActiveWallet } from "thirdweb/react";

import { getContract, prepareContractCall } from "thirdweb";
import { readContract } from "thirdweb";
import { sendTransaction, waitForReceipt } from "thirdweb";
import { IonButton } from "@ionic/react";
import QRCode from "react-qr-code";

function Web2SignatureComponent(props: any) {
  const [userConnected, setUserConnected] = useState(false);
  const [signature, setSignature] = useState(null);

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
          internalType: "address",
          name: "paramNfticketContractAddress",
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
          indexed: false,
          internalType: "string",
          name: "msg",
          type: "string",
        },
        {
          indexed: false,
          internalType: "address",
          name: "nfticketValidator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "nfticketOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "nfticketId",
          type: "uint256",
        },
      ],
      name: "nfticketUsedEvent",
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
          name: "nfticketValidator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "nfticketOwner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "totalNfticketUsed",
          type: "uint256",
        },
      ],
      name: "totalNFTicketUsedInTxEvent",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "NFTicketAlreadyUsed",
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
      name: "admin",
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
          name: "paramOwnerAddress",
          type: "address",
        },
      ],
      name: "checkUserAvailableNftickets",
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
          internalType: "bytes32",
          name: "_messageHash",
          type: "bytes32",
        },
      ],
      name: "getEthSignedMessageHash",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "userAddress",
          type: "address",
        },
      ],
      name: "getHashToSignForUser",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "message",
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
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      name: "messsageHahsesUsed",
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
      name: "nfticketContractAddress",
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
          name: "",
          type: "address",
        },
      ],
      name: "usersNounces",
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
          name: "userAddress",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "validateAllNFTickets",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "userAddress",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
        {
          internalType: "uint256",
          name: "paramNumberOfTicketsToValidate",
          type: "uint256",
        },
      ],
      name: "validateNFTickets",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_signer",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "signature",
          type: "bytes",
        },
      ],
      name: "verify",
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
          name: "paramAddressToWhitelist",
          type: "address",
        },
      ],
      name: "whitelistValidator",
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
      name: "whitelistedValidators",
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
  ];

  const contract = getContract({
    // the client you have created via `createThirdwebClient()`
    client: clientObject,
    // the chain the contract is deployed on
    chain: amoyChain,
    // the contract's address
    address: "0x39978200DF7Ff5C64E8d8E2CB3F2314226A0D557",
    // OPTIONAL: the contract's abi
    abi: smartContractAbi,
  });

  async function connect() {
    setUserConnected(true);

    // let _mintedNfts = await readContract({contract: contract, method: "function totalSupply() view returns (uint256)",});
    // setMintedNfts(_mintedNfts.toString());
  }

  async function signNFTicketHash() {
    // let hash = await readContract({contract: contract, method: "function getHashToSignForUser(address userAddress) view returns(bytes32)", params: [address],});
    // const bytesHash = hexToUint8Array(hash);
    // console.log("bytesHash");
    // console.log(bytesHash);

    // let _signature = await account.signTypedData(message: bytesHash);
    // console.log("SIG");
    // console.log(_signature);

    // setSignature(_signature);

    let address = account.address;
    let chain = amoyChain;
    let client = clientObject;

    let hash = await readContract({
      contract: contract,
      method:
        "function getHashToSignForUser(address userAddress) view returns(bytes32)",
      params: [address],
    });
    // let formatHash = await readContract({contract: contract, method: "function getEthSignedMessageHash(bytes32 _messageHash) pure returns (bytes32)", params: [hash],});

    console.log("scHash");
    console.log(hash);

    // let _signature = signKeyRequest({ account: account, hash });
    // let eip712Data = getKeyRequestData(hash);
    // let _signature = signKeyRequest({account: account, message: eip712Data});
    // let _signature = await account.signMessage({message: formatHash});

    // const bytes = hexToBytes("0x1a4");

    const bytesHash = hexToUint8Array(hash);
    const bytesHashTwo = hexToBytes(hash);
    console.log("bytesHash");
    console.log(bytesHash);

    // let _signature = await account.signMessage(bytesHash);
    // let _signature = await account.signMessage({message: hexToBytes(hash)});
    let _signature = await account.signMessage({
      message: { raw: hexToBytes(hash) },
    });

    console.log("SIG");
    console.log(_signature);

    // let _signature = await account.inAppWallet.sign(hash);
    setSignature(_signature);

    // console.log("NFT HASH SIGNATURE:");
    // console.log(_signature);

    // console.log("STATE HASH:");
    // console.log(signature);
  }

  // async function getUserData()
  // {
  //     // const account = useActiveAccount();
  //     console.log("wallet address", account.address);

  //     let address = account.address;
  //     let chain = amoyChain;
  //     let client = clientObject;

  //     let balance = await getWalletBalance({
  //         client,
  //         chain,
  //         address,
  //       });

  //     console.log("Balance", balance);

  //     console.log("hello");

  //     // let signature = await account.signMessage("hello");
  //     let signature = await account.signMessage({message: 'hello'});

  //     // property) signMessage: ({ message }: {
  //     //     message: SignableMessage;
  //     // }) => Promise<`0x${string}`>

  //     console.log("SIGNATURE:");
  //     console.log(signature);

  //     // let _mintedNfts = await readContract({contract: contract, method: "function totalSupply() view returns (uint256)", params: [],});
  //     // setMintedNfts(_mintedNfts.toString());

  //     // console.log("MINTED NFTS");
  //     // console.log(mintedNfts);
  // }

  function Disconnect() {
    const { disconnect } = useDisconnect();
    const wallet: any = useActiveWallet();

    disconnect(wallet);
  }

  // getUserData();

  return (
    <div>
      <div>
        <h2 style={{ textAlign: "center" }}>/// WEB2INFRA COMPONENT ///</h2>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {account ? (
          <>
            <div
              style={{
                paddingTop: "1rem",
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <ConnectButton
                client={clientObject}
                chain={amoyChain}
                onClick={connect}
              />
              Info:
              {/* <div>
                                <IonButton onClick={getUserData}>getData</IonButton>
                            </div> */}
              {/* <iframe src="https://embedded-wallet.thirdweb.com/sdk/2022-08-12/embedded-wallet/export?clientId=193451e5ca239a3cb30a2c548f8bf08c" allow="clipboard-read; clipboard-write"/> */}
              <div>
                <h3>SIGNATURE: {signature}</h3>
                {signature && <QRCode value={signature} />}
              </div>
              <div>
                <h2>Sign NFTicketHash:</h2>
                <IonButton onClick={signNFTicketHash}>sign</IonButton>
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
}

export default Web2SignatureComponent;
