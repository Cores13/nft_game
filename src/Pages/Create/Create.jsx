import React, { useEffect, useState } from "react";

const Create = () => {
  const create = () => {};

  return (
    <div>
      <img src='./SilverLuckyCoing.svg' alt='' />
      <button
        className='createBtn'
        onClick={() => {
          create();
        }}>
        CREATE
      </button>
    </div>
  );
};
export default Create;