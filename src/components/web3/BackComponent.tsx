import { useState } from "react";
import { ethers } from "ethers";
import { IonButton } from "@ionic/react";

function BackComponent(props) {
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

  let provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-amoy.infura.io/v3/408559c55ba7479b9f3adee094af9d80"
  );
  let smartContractInstance = new ethers.Contract(
    smartContractAddress,
    smartContractAbi,
    provider
  );

  const [whitelistCheckersInput, setWhitelistCheckersInput] = useState(null);
  const [sigParam, setSigParam] = useState(null);
  const [userAddressToValidate, setUserAddressToValidate] = useState(null);
  const [numberOfNftickets, setNumberOfNftickets] = useState(null);

  async function whitelistCheckersFunc() {
    // console.log(whitelistCheckersInput);
    // const tx = await smartContractInstance.connect(signer).whitelistValidator(whitelistCheckersInput);
    // await tx.wait();
  }

  async function getAvailableNftickets() {
    let availableNftickets =
      await smartContractInstance.checkUserAvailableNftickets(
        userAddressToValidate
      );
    console.log(availableNftickets);
    alert(availableNftickets);
  }

  async function validateNFTicketFunc() {
    // let mnemonic = "shy neither deputy offer draw plunge exercise fatigue devote pulse rich blind";
    // let wallet = ethers.Wallet.fromMnemonic(mnemonic)
    let privateKey =
      "d429bcdf42aefdbb1aa00f86b0d4b6eef8e9616cd1004d9b22d88df34381f415";
    const wallet = new ethers.Wallet(privateKey);

    console.log(wallet);

    console.log("WALLET DATA:");
    console.log(wallet);
    console.log(wallet.address);

    let fromAddress = wallet.address;
    let toAddress = smartContractAddress;
    let nonce = await provider.getTransactionCount(fromAddress, "latest");
    let gasPrice = await provider.getFeeData();
    let gasLimit = 25000000;
    let chainId = 80002;
    let abi = [
      "function validateAllNFTickets(address userAddress, bytes memory signature)",
    ];
    let iface = new ethers.utils.Interface(abi);
    let data = iface.encodeFunctionData("validateAllNFTickets", [
      userAddressToValidate,
      sigParam,
    ]);

    const tx: any = {
      nonce: nonce,
      gasPrice: gasPrice.gasPrice,
      gasLimit: gasLimit,
      // EIP-1559 fields
      // maxFeePerGas: gasPrice.maxFeePerGas,
      // maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas,
      to: toAddress,
      value: 0,
      data: data,
      chainId: chainId,
      // EIP-2718
      // type: 0
    };

    console.log("TX");
    console.log(tx);

    let promiseTx = await wallet.signTransaction(tx);
    console.log("PROMISE TX");
    console.log(promiseTx);

    let submittedTx = await provider.sendTransaction(promiseTx);
    console.log("SUBMITTED TX");
    console.log(submittedTx);

    const txReceipt = await submittedTx.wait(1);
    console.log("TX RECEIPT");
    console.log(txReceipt);

    let txBlock = txReceipt.blockNumber;
    const events: any = await smartContractInstance.queryFilter(
      "totalNFTicketUsedInTxEvent",
      txBlock,
      txBlock
    );

    console.log("txEvents:");
    console.log("Events length: ", events.length);
    console.log(events);

    console.log(events[0].event);
    console.log(events[0].args);

    console.log(events[0].args[0]);
    console.log(events[0].args[1]);
    console.log(events[0].args[2]);
    console.log(events[0].args[3].toString());

    // let args = events[0].args;
    // let msg = args[0];
    // let buyer = args[1];
    // let nfticketId = args[2];

    // console.log("ARGS");
    // console.log(args);

    // console.log("MSG: ", msg);
    // console.log("BUYER: ", buyer);
    // // console.log(buyer);

    // // console.log(msg);
    // console.log("NFTICKET ID: ", nfticketId.toString());
    // // console.log(nfticketId);

    alert(
      events[0].args[0] +
        "\n" +
        " " +
        "\n" +
        `Validator: ${events[0].args[1]}` +
        "\n" +
        " " +
        "\n" +
        `NFTs validated for user: ${events[0].args[2]}` +
        "\n" +
        " " +
        "\n" +
        `NFTicketBoughtQuantity: ${events[0].args[3].toString()}`
    );
  }

  async function validateNumberOfNFTicketFunc() {
    // let mnemonic = "shy neither deputy offer draw plunge exercise fatigue devote pulse rich blind";
    // let wallet = ethers.Wallet.fromMnemonic(mnemonic)
    let privateKey =
      "d429bcdf42aefdbb1aa00f86b0d4b6eef8e9616cd1004d9b22d88df34381f415";
    const wallet = new ethers.Wallet(privateKey);

    console.log(wallet);

    console.log("WALLET DATA:");
    console.log(wallet);
    console.log(wallet.address);

    let fromAddress = wallet.address;
    let toAddress = smartContractAddress;
    let nonce = await provider.getTransactionCount(fromAddress, "latest");
    let gasPrice = await provider.getFeeData();
    let gasLimit = 25000000;
    let chainId = 80002;
    let abi = [
      "function validateNFTickets(address userAddress, bytes memory signature, uint256 paramNumberOfTicketsToValidate)",
    ];
    let iface = new ethers.utils.Interface(abi);
    let data = iface.encodeFunctionData("validateNFTickets", [
      userAddressToValidate,
      sigParam,
      numberOfNftickets,
    ]);

    const tx: any = {
      nonce: nonce,
      gasPrice: gasPrice.gasPrice,
      gasLimit: gasLimit,
      // EIP-1559 fields
      // maxFeePerGas: gasPrice.maxFeePerGas,
      // maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas,
      to: toAddress,
      value: 0,
      data: data,
      chainId: chainId,
      // EIP-2718
      // type: 0
    };

    console.log("TX");
    console.log(tx);

    let promiseTx = await wallet.signTransaction(tx);
    console.log("PROMISE TX");
    console.log(promiseTx);

    let submittedTx = await provider.sendTransaction(promiseTx);
    console.log("SUBMITTED TX");
    console.log(submittedTx);

    const txReceipt = await submittedTx.wait(1);
    console.log("TX RECEIPT");
    console.log(txReceipt);

    let txBlock = txReceipt.blockNumber;
    const events: any = await smartContractInstance.queryFilter(
      "totalNFTicketUsedInTxEvent",
      txBlock,
      txBlock
    );

    console.log("txEvents:");
    console.log("Events length: ", events.length);
    console.log(events);

    console.log(events[0].event);
    console.log(events[0].args);

    console.log(events[0].args[0]);
    console.log(events[0].args[1]);
    console.log(events[0].args[2]);
    console.log(events[0].args[3].toString());

    // let args = events[0].args;
    // let msg = args[0];
    // let buyer = args[1];
    // let nfticketId = args[2];

    // console.log("ARGS");
    // console.log(args);

    // console.log("MSG: ", msg);
    // console.log("BUYER: ", buyer);
    // // console.log(buyer);

    // // console.log(msg);
    // console.log("NFTICKET ID: ", nfticketId.toString());
    // // console.log(nfticketId);

    alert(
      events[0].args[0] +
        "\n" +
        " " +
        "\n" +
        `Validator: ${events[0].args[1]}` +
        "\n" +
        " " +
        "\n" +
        `NFTs validated for user: ${events[0].args[2]}` +
        "\n" +
        " " +
        "\n" +
        `NFTicketBoughtId: ${events[0].args[3].toString()}`
    );
  }

  async function getMnemonicAddress() {
    // let mnemonic = "shy neither deputy offer draw plunge exercise fatigue devote pulse rich blind";
    let privateKey =
      "d429bcdf42aefdbb1aa00f86b0d4b6eef8e9616cd1004d9b22d88df34381f415";
    const wallet = new ethers.Wallet(privateKey);

    console.log("WALLET OBJECT");
    console.log(wallet);
    console.log("WALLET ADDRESS");
    console.log(wallet.address);
  }

  return (
    <div>
      <div>
        <div>
          <h2 style={{ textAlign: "center" }}>//BACKEND COMPONENT///</h2>
          <IonButton onClick={getMnemonicAddress}>getMnemonicAddress</IonButton>
        </div>

        <div style={{ paddingTop: "1rem" }}>
          <h3>Whitelist addressChecker:</h3>
          <input
            type="text"
            placeholder="address"
            onChange={(e: any) => setWhitelistCheckersInput(e.target.value)}
          ></input>
          <IonButton onClick={whitelistCheckersFunc}>whitelist</IonButton>
        </div>

        <div style={{ paddingTop: "2rem" }}>
          <h3>validateAllNFTickets of a user:</h3>
          <IonButton onClick={getAvailableNftickets}>getAvailableNftickets</IonButton>
          <input
            type="text"
            placeholder="userAddress"
            onChange={(e: any) => setUserAddressToValidate(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="signature"
            onChange={(e: any) => setSigParam(e.target.value)}
          ></input>
          <IonButton onClick={validateNFTicketFunc}>validateAll</IonButton>
        </div>

        <div style={{ paddingTop: "2rem" }}>
          <h3>validate # of NFTickets of a user:</h3>
          <IonButton onClick={getAvailableNftickets}>getAvailableNftickets</IonButton>
          <input
            type="text"
            placeholder="userAddress"
            onChange={(e: any) => setUserAddressToValidate(e.target.value)}
          ></input>
          <input
            type="number"
            placeholder="quantity"
            onChange={(e: any) => setNumberOfNftickets(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="signature"
            onChange={(e: any) => setSigParam(e.target.value)}
          ></input>
          <IonButton onClick={validateNumberOfNFTicketFunc}>validateNumber</IonButton>
        </div>
      </div>
    </div>
  );
}

export default BackComponent;
