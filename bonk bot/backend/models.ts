import { password } from "bun";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    privateKey: String,
    publicKey: String,  
})

const userModel = mongoose.model("User", userSchema);

export { userModel };