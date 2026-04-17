// Imports
import argon2 from "argon2";
import env from "dotenv";
env.config();

if (process.env.PEPPER === undefined) {
    console.error(`Environment file is not attached.`,);
    process.exit(1);
}

export default Buffer.from(process.env.PEPPER, "hex");