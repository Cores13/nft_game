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
  }, [walletAddress, isAuthenticatedD, authenticateD, logoutD, contract]);

  const mint = async () => {
    try {
      const mintedNFT = await contract.methods.mint().send({
        from: address,
        value: web3.utils.toWei("0.005", "ether"),
      });
      console.log(mintedNFT);
    } catch (error) {
      console.log(error);
    }
  };
  const flip = async (e) => {
    try {
      const flipedNFT = await contract.methods.flip(e.target.value).call();
      console.log(flipedNFT);
    } catch (error) {
      console.log(error);
    }
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
