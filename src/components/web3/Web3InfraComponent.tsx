import { ethers } from "ethers";
import { useState } from "react";

import NFTicketComponent from "./NFTicketComponent";
import { IonButton } from "@ionic/react";

function Web3InfraComponent(props: any) {
  const [userConnected, setUserConnected] = useState(false);
  const [address, setAddress] = useState(null);
  const [signer, setSigner] = useState(null);

  let provider = new ethers.providers.Web3Provider((window as any).ethereum);

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

  return (
    <div>
      <div>
        <h2 style={{ textAlign: "center" }}>/// WEB3INFRA COMPONENT ///</h2>
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
              <h3>addressConnected:</h3>
              <h2>{address}</h2>

              <div style={{ paddingTop: "15px" }}>
                <NFTicketComponent addressData={address} signerData={signer} />
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

export default Web3InfraComponent;
