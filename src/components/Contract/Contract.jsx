import React, { useEffect, useState, useContext } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import { useMoralis } from "react-moralis";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { GlobalState } from "../../GlobalState";

const Contract = () => {
  const store = useContext(GlobalState);
  const { isAuthenticated } = useMoralis();
  const [address] = store.address;
  const [contract] = store.contract;
  const [web3] = store.web3;
  const [NFTWallet] = store.NFTWallet;
  const NFTArray = store.NFTArray;

  useEffect(() => {}, [NFTWallet, NFTArray, address, isAuthenticated]);

  const mint = async () => {
    const mintedNFT = await contract.methods.mint().send({
      from: address,
      value: web3.utils.toWei("0.005", "ether"),
    });
    console.log(mintedNFT);
  };

  return (
    <div>
      {isAuthenticated && (
        <>
          <button onClick={() => mint()}>Mint</button>
          <div className='nfts'>
            {NFTArray &&
              NFTArray.map((nft) => {
                return (
                  <div className='nftCard' key={nft.name}>
                    <img src={nft?.image} alt='' className='nftImg' />
                    <h4 className='nftName'>Stamina:{nft?.name}</h4>
                    <h4 className='nftStamina'>
                      Stamina:{nft?.attributes[0]?.value}
                    </h4>
                    <h4 className='nftStrength'>
                      Strength:{nft?.attributes[1]?.value}
                    </h4>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default Contract;
