import React, { useEffect, useContext } from "react";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { GlobalState } from "../../GlobalState";

const Contract = () => {
  const store = useContext(GlobalState);
  const { walletAddress, isAuthenticatedD, authenticateD, logoutD } =
    useMoralisDapp();
  const [address] = store.address;
  const [contract] = store.contract;
  const [web3] = store.web3;
  const [NFTWallet] = store.NFTWallet;
  const [NFTFlips] = store.NFTFlips;
  const [callback, setCallback] = store.callback;

  useEffect(() => {
    setCallback(!callback);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(NFTWallet);
    console.log("flips", NFTFlips);
  }, [walletAddress, isAuthenticatedD, authenticateD, logoutD, contract]);

  const mint = async () => {
    const mintedNFT = await contract.methods.mint().send({
      from: address,
      value: web3.utils.toWei("0.005", "ether"),
    });
    console.log(mintedNFT);
  };

  return (
    <div>
      {isAuthenticatedD && (
        <>
          <button onClick={() => mint()}>Mint</button>
          <div className='nfts'>
            {NFTWallet &&
              NFTWallet.map((nft) => {
                return (
                  <div className='nftCard' key={nft.name}>
                    <img src={`${nft.image}`} alt='' className='nftImg' />
                    <h4 className='nftName'>Name: {nft.name}</h4>
                    <h4 className='nftStamina'>
                      Nation:{nft.attributes[0]?.value}
                    </h4>
                    <h4 className='nftStrength'>Flips: {NFTFlips[1]?.flips}</h4>
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
