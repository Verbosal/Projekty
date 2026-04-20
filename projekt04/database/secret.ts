// Imports
import argon2 from "argon2";
import env from "dotenv";
env.config();

export default Buffer.from(process.env.PEPPER, "hex");