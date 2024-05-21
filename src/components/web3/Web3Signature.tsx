// 0x39978200DF7Ff5C64E8d8E2CB3F2314226A0D557

import { IonButton } from "@ionic/react";
import { ethers } from "ethers";
import { useState } from "react";

function Web3Signature(props: any) {
  const [userConnected, setUserConnected] = useState(false);
  const [address, setAddress] = useState(null);
  const [signer, setSigner] = useState(null);

  let smartContractAddress = "0x39978200DF7Ff5C64E8d8E2CB3F2314226A0D557";
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

  const provider =
    (window as any).ethereum != null
      ? new ethers.providers.Web3Provider((window as any).ethereum)
      : ethers.providers.getDefaultProvider();

  let smartContractInstance = new ethers.Contract(
    smartContractAddress,
    smartContractAbi,
    provider
  );

  const [signature, setSignature] = useState(null);

  async function requestAccount() {
    if ((window as any).ethereum) {
      console.log("METAMASK IS INSTALLED.");
      let accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });

      const _signer = await (provider as any).getSigner();
      const _address = accounts[0];

      setAddress(_address);
      setSigner(_signer);
      setUserConnected(true);

      console.log("signer");
      console.log(_signer);
      console.log("address:");
    } else {
      console.log("Metamask isnt installed.");
    }

    console.log("userObject:");
    console.log(signer);
  }

  async function signNFTicketHash() {
    let hash = await smartContractInstance.getHashToSignForUser(address);
    console.log("User hash:");
    console.log(hash);

    let signature = await (signer as any).signMessage(
      ethers.utils.arrayify(hash)
    );
    console.log("signature");
    console.log(signature);

    setSignature(signature);
  }

  return (
    <div>
      <div>
        <h2 style={{ textAlign: "center" }}>//WEB3SIGNATURE COMPONENT///</h2>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {userConnected ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <h3>addressConnected: {address}</h3>

              <div style={{ paddingTop: "15px" }}>
                <h2>SIGNATURE: {signature}</h2>
              </div>

              <div>
                <IonButton onClick={signNFTicketHash}>sign</IonButton>
              </div>
            </div>
          </>
        ) : (
          <>
            <IonButton onClick={requestAccount}>connectMetamask</IonButton>
          </>
        )}
      </div>
    </div>
  );
}

export default Web3Signature;
