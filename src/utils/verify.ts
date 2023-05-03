import * as util from "ethereumjs-util";

export const verifySig = (challenge: string, address: string, sig: string) => {
  let nonce: string | Buffer =
    "\x19Ethereum Signed Message:\n" + challenge.length + challenge;

  nonce = util.keccak(Buffer.from(nonce, "utf-8"));
  const { v, r, s } = util.fromRpcSig(sig);
  const pubKey = util.ecrecover(util.toBuffer(nonce), v, r, s);
  const addrBuffer = util.publicToAddress(pubKey);
  const addr = util.bufferToHex(addrBuffer);
  if (addr === address) {
    return address;
  } else {
    console.log("Received address", addr);
    return null;
  }
};
