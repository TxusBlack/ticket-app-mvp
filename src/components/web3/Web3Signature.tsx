// 0x39978200DF7Ff5C64E8d8E2CB3F2314226A0D557

import { Barcode, BarcodeFormat, BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import { IonButton, IonItem, IonLabel } from "@ionic/react";
import { ethers } from "ethers";
import { useContext, useState } from "react";
import QRCode from "react-qr-code";
import { SignatureQrContext } from "../../context/SignatureQrContexts";

function Web3Signature(props: any) {
  const [userConnected, setUserConnected] = useState(false);
  const [address, setAddress] = useState(null);
  const [signer, setSigner] = useState(null);
  const [signature, setSignature] = useState(null);
  const { signatureQr, setSignatureQr } = useContext(SignatureQrContext);

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
      ? new (ethers as any).providers.Web3Provider((window as any).ethereum)
      : (ethers as any).providers.getDefaultProvider();

  let smartContractInstance = new ethers.Contract(
    smartContractAddress,
    smartContractAbi,
    provider
  );

  async function requestAccount() {
    if ((window as any).ethereum) {
      console.log("METAMASK IS INSTALLED.");
      let accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });

      const _signer: any = await provider.getSigner();
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
    console.log(ethers.utils.arrayify(hash));

    let signature = await (signer as any).signMessage(
      ethers.utils.arrayify(hash)
    );
    console.log("signature");
    console.log(signature);

    setSignature(signature);
  }

  const requestPermissions = async () => {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === "granted" || camera === "limited";
  };

  const scan = async () => {
    try {
      const granted = await requestPermissions();
      if (!granted) {
        alert("Permiso de cámara denegado");
        return;
      }
      const ress = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
      console.log(ress);
      if (!ress.available) {
        await BarcodeScanner.installGoogleBarcodeScannerModule();
      }
      const { barcodes } = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode],
      });
      console.log(barcodes);
      alert(barcodes[0].displayValue);
      setSignatureQr(barcodes[0].displayValue);
      return barcodes;
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <div>
        <h2 style={{ textAlign: "center" }}>//WEB3SIGNATURE COMPONENT///</h2>
        {/* <IonButton onClick={scan}>Escanear QR</IonButton> */}
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

              <div style={{ display: 'flex', flexDirection: 'column', paddingTop: "15px" }}>
                <h2>SIGNATURE: {signature}</h2>
                {signature && <QRCode value={signature} />}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="item-text-wrap">
                <h3>SCANNER QR:</h3>
                <div style={{ width: '100vw' }}>
                  <IonItem>
                    <IonLabel text-wrap>
                      {signatureQr}
                    </IonLabel>
                  </IonItem>
                </div>
                {signature && <QRCode value={signature} />}
                <IonButton onClick={scan}>Escanear QR</IonButton>
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
