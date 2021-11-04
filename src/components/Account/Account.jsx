import React, { useContext } from "react";
import { useMoralis } from "react-moralis";
import Address from "../Address/Address";
import NativeBalance from "../NativeBalance";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { GlobalState } from "../../GlobalState";
import { useEffect } from "react/cjs/react.development";
const styles = {
  account: {
    height: "42px",
    gap: "5px",
    width: "fit-content",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    fontWeight: "700",
    fontSize: "16px",
    color: "white",
    backgroundColor: "#041836",
    cursor: "pointer",
  },
  wrapper: { padding: "0 3px 0 10px" },
};

function Account() {
  const store = useContext(GlobalState);
  const { isAuthenticated } = useMoralis();
  const { authenticateD, isAuthenticatedD, logoutD } = useMoralisDapp();
  const [callback, setCallback] = store.callback;

  useEffect(() => {
    setCallback(!callback);
  }, [isAuthenticatedD, isAuthenticated]);

  if (!isAuthenticatedD) {
    return (
      <div style={styles.account}>
        <p
          onClick={() => {
            authenticateD({ signingMessage: "Log in" });
            setCallback(!callback);
          }}
          style={{ padding: "0 10px" }}>
          Login
        </p>
      </div>
    );
  }

  return (
    <div
      style={{ ...styles.account, ...styles.wrapper }}
      onClick={() => {
        logoutD();
      }}>
      <NativeBalance />
      <Address avatar size='5' />
    </div>
  );
}

export default Account;
