import React, { useEffect, useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";

const Create = () => {
  const store = useContext(GlobalState);
  const [contract] = store.contract;
  const [callback, setCallback] = store.callback;
  const [supply, setSupply] = store.supply;

  // var supply = contract.methods.totalSupply().call + 1;

  const str = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
 <g>
  <title>Layer 1</title>
  <rect fill="url(#svg_90)" x="0.9091" y="-28.1819" width="800" height="800" id="svg_15"/>
  <path stroke-width="2" stroke="#0f0f00" stroke-opacity="0.5" fill="url(#svg_29)" opacity="undefined" d="m394.5,531c-126.24309,0 -228.5,-101.36187 -228.5,-226.5c0,-125.13813 102.25691,-226.5 228.5,-226.5c126.24309,0 228.5,101.36187 228.5,226.5c0,125.13813 -102.25691,226.5 -228.5,226.5z" id="svg_17"/>
  <path stroke-width="2" stroke-opacity="0.5" stroke="#000000" fill="#f4f4f4" opacity="undefined" d="m400.55556,531c-123.20442,0 -223,-100.91436 -223,-225.5c0,-124.58564 99.79558,-225.5 223,-225.5c123.20442,0 223,100.91436 223,225.5c0,124.58564 -99.79558,225.5 -223,225.5z" id="svg_1"/>
  <path stroke="#000000" stroke-width="2" stroke-opacity="0.5" fill="url(#svg_21)" opacity="undefined" d="m400.55557,527.32285c-120.69311,0 -218.45452,-99.06309 -218.45452,-221.36321c0,-122.30012 97.76141,-221.36321 218.45452,-221.36321c120.6931,0 218.45451,99.06309 218.45451,221.36321c0,122.30012 -97.76141,221.36321 -218.45451,221.36321z" id="svg_4"/>
  <path stroke="#000000" id="svg_93" d="m401.35233,387.00369l-119.6918,86.95303l45.75342,-140.65536l-119.66486,-86.95303l147.91719,0.02695l39.31345,-120.94475l6.41302,-19.64325l45.67258,140.56105l147.95761,0l-119.71875,86.95303l45.76689,140.69578l-119.71875,-86.99345l0,0z" stroke-opacity="0.1" stroke-width="2" fill="url(#svg_102)"/>
  <text font-weight="bold" fill="url(#svg_23)" x="283.26866" y="287.56447" id="svg_18" stroke-width="0" font-size="16" font-family="'Cinzel'" text-anchor="start" xml:space="preserve" stroke="#000" transform="matrix(1.14169 0 0 2.29233 -116.913 -385.053)">"${Math.floor(
    Math.random() * 361
  )}"</text>
  <rect transform="rotate(14.3186 179.985 245.156)" stroke-width="0.1" stroke="#000000" id="svg_2" height="9" width="9.06828" y="240.65644" x="175.4504" stroke-opacity="0.5" fill="#969696"/>
  <rect transform="rotate(-15.2478 181.91 372.863)" stroke="#000000" stroke-width="0.1" id="svg_3" height="9" width="8.53228" y="368.36347" x="177.64363" stroke-opacity="0.5" fill="#7a7a7a"/>
  <text xml:space="preserve" text-anchor="start" font-family="'Cinzel'" font-size="54" id="svg_27" y="150.00133" x="313.63849" stroke-width="0" stroke="#000" fill="url(#svg_23)">#${supply}</text>
 </g>
 <defs>
  <linearGradient y2="0.29688" x2="1" y1="0" x1="0" id="svg_21">
   <stop offset="0" stop-color="#e5e5e5"/>
   <stop offset="0.49609" stop-opacity="0.99219" stop-color="#ffffff"/>
   <stop offset="1" stop-opacity="0.99609" stop-color="#d6d6d6"/>
  </linearGradient>
  <linearGradient y2="0" x2="1" y1="0" x1="0" id="svg_23">
   <stop offset="0" stop-opacity="0.98828" stop-color="#7c7c7c"/>
   <stop offset="0.51953" stop-opacity="0.99609" stop-color="#999999"/>
   <stop offset="1" stop-opacity="0.98828" stop-color="#7c7c7c"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
  </linearGradient>
  <linearGradient spreadMethod="pad" y2="0" x2="0" y1="1" x1="0" id="svg_29">
   <stop offset="0" stop-opacity="0.99609" stop-color="#00000"/>
   <stop offset="0.54688" stop-opacity="0.98828" stop-color="#c1c1c1"/>
   <stop offset="1" stop-opacity="0.99219" stop-color="#a0a0a0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
   <stop offset="NaN" stop-opacity="0" stop-color="0"/>
  </linearGradient>
  <linearGradient y2="1" x2="0.55469" y1="0" x1="0" id="svg_90">
   <stop offset="0" stop-opacity="0.99609" stop-color="hsl(${Math.floor(
     Math.random() * 361
   )}, 48%, 36%)"/>
   <stop offset="1" stop-opacity="0.99219" stop-color="hsl(${Math.floor(
     Math.random() * 361
   )}, 55%, 18%)"/>
  </linearGradient>
  <linearGradient y2="0.29688" x2="1" y1="0" x1="0" id="svg_102">
   <stop stop-opacity="0.99609" offset="0" stop-color="#ffffaa"/>
   <stop offset="0.49609" stop-opacity="0.99219" stop-color="#ffffef"/>
   <stop offset="1" stop-opacity="0.99219" stop-color="#ffffce"/>
  </linearGradient>
 </defs>
</svg>`;
  // private property
  const _keyStr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  // public method for encoding
  const encode = (input) => {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = _utf8_encode(input);

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output =
        output +
        _keyStr.charAt(enc1) +
        _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) +
        _keyStr.charAt(enc4);
    }
    return output;
  };

  // public method for decoding
  const decode = (input) => {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }

    output = _utf8_decode(output);

    return output;
  };

  // private method for UTF-8 encoding
  const _utf8_encode = (string) => {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };

  // private method for UTF-8 decoding
  const _utf8_decode = (utftext) => {
    var string = "";
    var i = 0;
    var c = 0;
    var c1 = 0;
    var c2 = 0;

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c1 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(
          ((c & 15) << 12) | ((c2 & 63) << 6) | (c1 & 63)
        );
        i += 3;
      }
    }
    return string;
  };

  useEffect(() => {
    setCallback(!callback);
  }, [supply]);

  const create = async () => {
    var supply = await contract.methods.totalSupply().call();
    setSupply(supply);
    let encodedStr = encode(str);
    console.log("data:image/svg+xml;base64,", encodedStr);
  };

  return (
    <div>
      <img src='./SilverLuckyCoin.svg' alt='' />
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
