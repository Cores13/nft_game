import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import useNFTBalance from "../../components/NFTBalance/hooks/useNFTBalance";

export const Game = () => {
  const [address, setAddress] = useState();
  const [chainId, setChainId] = useState();

  const { fetchNFTBalance } = useNFTBalance();
  const { isInitialized, Moralis, walletAddress, chain } = useMoralis();
  const [NFTBalance, setNFTBalance] = useState();

  const options = {
    address: "0xA858BB51834A9a030409d3F353a10bCaA3eda272",
    chain: "rinkeby",
  };

  useEffect(() => {
    setAddress(walletAddress);
    setChainId(chain);
    init();
  }, [walletAddress, chain]);

  const init = async () => {
    let NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
    if (NFTs) {
      setNFTBalance(NFTs);
      if (NFTBalance) {
        console.log(NFTBalance.result);
      }
    }
  };
  useEffect(() => {
    // if (isInitialized)
    //   fetchNFTBalance()
    //     .then((balance) => setNFTBalance(balance))
    //     .catch((e) => alert(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  return <></>;
};
