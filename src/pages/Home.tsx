import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";

import Web3InfraComponent from "../components/web3/Web3InfraComponent";
import { ThirdwebProvider } from "thirdweb/react";
import Web2InfraComponent from "../components/web3/Web2InfraComponent";
import Web3Signature from "../components/web3/Web3Signature";
import Web2SignatureComponent from "../components/web3/Web2SignatureComponent";
import BackComponent from "../components/web3/BackComponent";
import { createContext, useState } from "react";

const Home: React.FC = () => {
  const SignatureContext = createContext(null);
  const [signatureQr, setSignatureQr] = useState(null);

  return (
    <IonPage>
      <SignatureContext.Provider value={signatureQr}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Ticket MVP Mobile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <div>
            <div>
              <div>
                <h1 style={{ textAlign: 'center' }}>/// NFT ///</h1>
              </div>

              {/* <div>
                <Web3InfraComponent />
              </div> */}

              <div style={{ paddingTop: "25px" }}>
                <ThirdwebProvider>
                  <Web2InfraComponent />
                </ThirdwebProvider>
              </div>
            </div>

            <div style={{ paddingTop: "35px" }}>
              <div>
                <h1 style={{ textAlign: 'center' }}>/// SIGNATURE ///</h1>

                {/* <div>
                  <Web3Signature setSignatureQr={setSignatureQr} />
                </div> */}

                <div>
                  <ThirdwebProvider>
                    <Web2SignatureComponent setSignatureQr={setSignatureQr} SignatureContext={SignatureContext} />
                  </ThirdwebProvider>
                </div>
              </div>
            </div>

            <div style={{ paddingTop: "35px" }}>
              <div>
                <h1 style={{ color: "red" }}>
                  ////////////////////////////---//BACK///---////////////////////////////
                </h1>

                <div>
                  <BackComponent />
                </div>
              </div>
            </div>
          </div>
        </IonContent>
      </SignatureContext.Provider>
    </IonPage>
  );
};

export default Home;
