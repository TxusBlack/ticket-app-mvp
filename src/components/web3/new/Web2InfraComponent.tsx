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

function Web2InfraComponent(props) {
  const [userConnected, setUserConnected] = useState(false);
  const [mintedNfts, setMintedNfts] = useState(0);

  const clientId = "193451e5ca239a3cb30a2c548f8bf08c";
  const amoyChain = defineChain(polygonAmoy);
  const wallets = [inAppWallet()];

  const clientObject = createThirdwebClient({
    clientId: "193451e5ca239a3cb30a2c548f8bf08c",
  });

  const account = useActiveAccount();

  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();

  async function connect() {
    setUserConnected(true);

    // let _mintedNfts = await readContract({contract: contract, method: "function totalSupply() view returns (uint256)",});
    // setMintedNfts(_mintedNfts.toString());
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

    console.log("hello");

    // let signature = await account.signMessage("hello");
    let signature = await account.signMessage({ message: "hello" });

    // property) signMessage: ({ message }: {
    //     message: SignableMessage;
    // }) => Promise<`0x${string}`>

    console.log("SIGNATURE:");
    console.log(signature);

    // let _mintedNfts = await readContract({contract: contract, method: "function totalSupply() view returns (uint256)", params: [],});
    // setMintedNfts(_mintedNfts.toString());

    // console.log("MINTED NFTS");
    // console.log(mintedNfts);
  }

  function Disconnect() {
    const { disconnect } = useDisconnect();
    const wallet = useActiveWallet();

    disconnect(wallet);
  }

  getUserData();

  return (
    <div>
      <div>
        <h2>//WEB2INFRA COMPONENT///</h2>
      </div>

      <div>
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

export default Web2InfraComponent;
