import express from "express";
import { userModel } from "./models";
import { Keypair, Transaction, Connection } from "@solana/web3.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import bs58 from "bs58";

const app = express();
const port = 3000;
const connection = new Connection(
  "https://solana-mainnet.g.alchemy.com/v2/3rfmMavadnzN8nDMYPCHgAviwLd4FSDs"
);

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  const { username, password, privateKey, publicKey } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const existingUser = await userModel.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const keypair = new Keypair();
  const newUser = new userModel({
    username,
    password: hashedPassword,
    publicKey: keypair.publicKey.toString(),
    privateKey: keypair.secretKey.toString(),
  });
  res.status(200).json({
    message: keypair.publicKey.toString(),
    user: newUser,
  });
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const userExists = await userModel.findOne({
    username,
  });
  if (!userExists || !userExists.password) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, userExists.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  if (userExists) {
    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      message: "User authenticated successfully",
      token,
    });
  } else {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
});

app.post("/api/v1/txn/sign", async (req, res) => {
  const { message, retry } = req.body;
  const tx = Transaction.from(Buffer.from(message));
  //   const user = await userModel.findOne({
  //     where: {
  //       _id: "YOUR_USER_ID_HERE",
  //     },
  //   });
  //     if (!user || user.privateKey === undefined) {
  //         return res.status(404).json({ message: "User not found" });
  //     }
  const keypair = Keypair.fromSecretKey(
    bs58.decode(
      "2ghr5pbFGYmxb94afjvxmmrNQEVAb1MXDpMQTAkMTFthDTyxXgm88eriFbc18HSV7Sy1EtGD7TzSasygSZ6kzZNS"
    )
  );
  const { blockhash } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = keypair.publicKey;
  tx.sign(keypair);

  const signature = await connection.sendTransaction(tx, [keypair]);
  res.status(200).json({
    message: "Transaction sign endpoint hit successfully",
    signature,
  });
});

app.get("/api/v1/txn", (req, res) => {
  res.status(200).json({
    message: "Transaction endpoint hit successfully",
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
