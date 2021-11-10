import React, { useEffect, useContext, useState } from "react";
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
  const [countdown, setCountdown] = useState(false);

  useEffect(() => {
    setCallback(!callback);
    setTimeout(() => {
      if (NFTWallet && !countdown) {
        continueTimer();
      }
    }, 1000);
    // eslint-disable-next-line
  }, [walletAddress, isAuthenticatedD, authenticateD, logoutD]);

  useEffect(() => {
    console.log(NFTWallet);
    setTimeout(() => {
      if (NFTWallet && !countdown) {
        continueTimer();
      }
    }, 1000);
    // eslint-disable-next-line
  }, [walletAddress, isAuthenticatedD, authenticateD, logoutD, contract]);

  const startTimer = (duration, display) => {
    var timer = duration,
      // minutes,
      seconds;
    setCountdown(true);
    var interval = setInterval(() => {
      // minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      // minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = seconds + "seconds";

      if (--timer < 0) {
        timer = 0;
        setCountdown(false);
        clearInterval(interval);
      }
    }, 1000);
  };

  const continueTimer = () => {
    var now = Date.now();
    now = now.toString();
    now = now.slice(0, -3);
    now = parseInt(now);
    console.log(now);
    for (let i = 0; i < NFTWallet.length; i++) {
      let duration =
        parseInt(parseInt(NFTWallet[i].lastFlip) + 60) - parseInt(now);
      console.log("duration", duration);
      console.log("next flip", NFTWallet[i].lastFlip);
      const display = document.querySelector(
        `h4.timer${String(NFTWallet[i].id)}`
      );
      if (duration > 0 && duration <= 60) {
        startTimer(duration, display);
      } else {
        continue;
      }
    }
  };

  const flip = async (e) => {
    try {
      let flipedNFT = await contract.methods
        .flip(e.target.value)
        .send({ from: address });
      if (flipedNFT) {
        console.log(flipedNFT.events.Fliped.returnValues.side);
        setCallback(!callback);
        var duration =
          flipedNFT.events.Fliped.returnValues.nextFlip -
          flipedNFT.events.Fliped.returnValues.fliped;
        const display = document.querySelector(
          `h4.timer${String(e.target.value)}`
        );
        if (!countdown) {
          startTimer(duration, display);
        }
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
                    <h4 className={`timer${String(nft.id)}`} id={nft.id}>
                      {}
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
