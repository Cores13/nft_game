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
    address: address,
    chain: chainId,
  };

  useEffect(() => {
    setAddress(walletAddress);
    setChainId(chain);
    init();
    console.log(address);
    console.log(chainId);
  }, [walletAddress, chain]);

  const init = async () => {
    let NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
    console.log(NFTs);
  };
  useEffect(() => {
    if (isInitialized)
      fetchNFTBalance()
        .then((balance) => setNFTBalance(balance))
        .catch((e) => alert(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  return <></>;
};
