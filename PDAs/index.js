const {PublicKey} =  require("@solana/web3.js");
const {ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID} = require("@solana/spl-token");

const userAddress = new PublicKey("D8s7u78KKwKVDywGgwZyTQBcLiQ6UnVQjgTxyEebj6Gc");
const mintAddress = new PublicKey("5vEmkt3V6K3fcU6woLaj1NBTUASwWXTqKoqXV87Jv6Z4"); 

const getAssociatedTokenAddress = (userAddress, mintAddress) => {
  return PublicKey.findProgramAddressSync(
    [
      userAddress.toBuffer(),
      TOKEN_PROGRAM_ID.toBuffer(),
      mintAddress.toBuffer(),
    ],
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
};

const [associatedTokenAddress, bump] = getAssociatedTokenAddress(userAddress, mintAddress);
console.log("Associated Token Address:", associatedTokenAddress.toBase58(), "bump:", bump);