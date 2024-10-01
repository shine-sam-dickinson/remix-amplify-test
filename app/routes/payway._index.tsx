import { RefObject, useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";

const PubKey =
  "T19008_PUB_p8uvsnus5afatyawgkce399mi8aqtw6u7ki3ntgzh3dh9rbj5yiv6a37ejy5";
// const SecretKey =
//   "T19008_SEC_nc2q75gnwk9ygeukcufeuibqc8hz73teg8nx9wr32dtk96eywe2sv72dy68n";
// const AuthHeader =
//   "Basic VDE5MDA4X1NFQ19uYzJxNzVnbndrOXlnZXVrY3VmZXVpYnFjOGh6NzN0ZWc4bng5d3IzMmR0azk2ZXl3ZTJzdjcyZHk2OG46";

type CreditCardFrame = {
  destroy: () => void;
  getToken: (callback: (err: Error, data: PayWayData) => void) => void;
};

type PayWayData = {
  singleUseTokenId: string;
};

let creditCardFrame: CreditCardFrame | undefined;
let pendingCreate = false;

const tokenCallback = (err: Error, data: PayWayData) => {
  if (err) {
    console.error("Error getting token: " + err.message);
  } else {
    // TODO: send token to server with ajax
    console.log("singleUseTokenId: " + data.singleUseTokenId);
    creditCardFrame?.destroy();
    creditCardFrame = undefined;
  }
};

const createdCallback = (err: Error, frame: CreditCardFrame) => {
  pendingCreate = false;
  if (err) {
    console.error("Error creating frame: " + err.message);
  } else {
    // Save the created frame for when we get the token
    creditCardFrame = frame;
  }
};

const createCreditCardFrame = (payBtnRef: RefObject<HTMLButtonElement>) => {
  console.log("Create Frame");
  const options = {
    // TODO: Replace {publishableApiKey} with your key
    publishableApiKey: PubKey,
    tokenMode: "callback",
    cvnRequired: true,
    onValid: function () {
      console.log("Valid");
      payBtnRef!.current!.disabled = false;
    },
    onInvalid: function () {
      console.log("Invalid");
      payBtnRef!.current!.disabled = true;
    },
  };

  if (!pendingCreate) {
    pendingCreate = true;
    // @ts-expect-error external import
    payway.createCreditCardFrame(options, createdCallback);
  }
};

export default function PayWay() {
  const payBtnRef = useRef<HTMLButtonElement>(null);
  const cardDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    createCreditCardFrame(payBtnRef);
  }, [payBtnRef]);

  return (
    <div>
      <div id="payway-credit-card" ref={cardDivRef}></div>
      <Button
        className=""
        ref={payBtnRef}
        onClick={(e) => {
          e.currentTarget.disabled = true;
          creditCardFrame?.getToken(tokenCallback);
        }}
      >
        Pay
      </Button>
    </div>
  );
}
