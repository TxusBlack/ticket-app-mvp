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

const Home: React.FC = () => {
  return (
    <IonPage>
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

            <div>
              <Web3InfraComponent />
            </div>

            <div style={{ paddingTop: "25px" }}>
              <ThirdwebProvider>
                <Web2InfraComponent />
              </ThirdwebProvider>
            </div>
          </div>

          <div style={{ paddingTop: "35px" }}>
            <div>
              <h1 style={{ textAlign: 'center' }}>/// SIGNATURE ///</h1>

              <div>
                <Web3Signature />
              </div>

              <div>
                <ThirdwebProvider>
                  <Web2SignatureComponent />
                </ThirdwebProvider>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
