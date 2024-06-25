import { ethers } from "ethers";
import { createContext, useState } from "react";

interface SignatureQrContextValue {
  signatureQr: string;
  userAddressToValidate: any;
  setSignatureQr: (signatureQr: string) => void;
  setSmartContractAddress: (smartContractAddress: any) => void;
  setProvider: (provider: any) => void;
  setUserAddressToValidate: (userAddressToValidate: any) => void;
  setSmartContractInstance: (smartContractInstance: any) => void;
  validateNFTicketFunc: () => void;
}

const SignatureQrContext = createContext<SignatureQrContextValue>({
  signatureQr: "",
  userAddressToValidate: null,
  setSignatureQr: () => {},
  setSmartContractAddress: () => {},
  setProvider: () => {},
  setUserAddressToValidate: () => {},
  setSmartContractInstance: () => {},
  validateNFTicketFunc: () => {},
});

const SignatureQrProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [signatureQr, setSignatureQr] = useState("");
  const [smartContractAddress, setSmartContractAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [userAddressToValidate, setUserAddressToValidate] = useState(null);
  const [smartContractInstance, setSmartContractInstance] = useState(null);

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
    let nonce = await (provider as any).getTransactionCount(fromAddress, "latest");
    let gasPrice = await (provider as any).getFeeData();
    let gasLimit = 25000000;
    let chainId = 80002;
    let abi = [
      "function validateAllNFTickets(address userAddress, bytes memory signature)",
    ];
    let iface = new ethers.utils.Interface(abi);
    let data = iface.encodeFunctionData("validateAllNFTickets", [
      userAddressToValidate,
      signatureQr,
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

    let submittedTx = await (provider as any).sendTransaction(promiseTx);
    console.log("SUBMITTED TX");
    console.log(submittedTx);

    const txReceipt = await submittedTx.wait(1);
    console.log("TX RECEIPT");
    console.log(txReceipt);

    let txBlock = txReceipt.blockNumber;
    const events: any = await (smartContractInstance as any).queryFilter(
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

  return (
    <SignatureQrContext.Provider
      value={{
        signatureQr,
        userAddressToValidate,
        setSignatureQr,
        validateNFTicketFunc,
        setSmartContractAddress,
        setProvider,
        setUserAddressToValidate,
        setSmartContractInstance,
      }}
    >
      {children}
    </SignatureQrContext.Provider>
  );
};

export { SignatureQrProvider, SignatureQrContext };
