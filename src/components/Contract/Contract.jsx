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
  const [callback, setCallback] = store.callback;

  useEffect(() => {
    setCallback(!callback);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(NFTWallet);
    // eslint-disable-next-line
  }, [walletAddress, isAuthenticatedD, authenticateD, logoutD, contract]);

  const flip = async (e) => {
    try {
      let flipedNFT = await contract.methods
        .flip(e.target.value)
        .send({ from: address });
      if (flipedNFT) {
        console.log(flipedNFT);
        console.log(e.target.value);
        setCallback(!callback);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isAuthenticatedD && (
        <>
          <div className='nfts'>
            {NFTWallet &&
              NFTWallet.map((nft) => {
                return (
                  <div className='nftCard' key={nft.id}>
                    <img src={`${nft.image}`} alt='' className='nftImg' />
                    <h4 className='nftName'>Name: {nft.name}</h4>
                    <h4 className='nftName'>Id: {nft.id}</h4>
                    <h4 className='nftStamina'>
                      Nation: {nft.attributes[0]?.value}
                    </h4>
                    <h4 className='nftStrength'>Flips: {nft.flips}</h4>
                    <button
                      className='flipBtn'
                      value={nft.id}
                      onClick={(e) => flip(e)}>
                      Flip
                    </button>
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
