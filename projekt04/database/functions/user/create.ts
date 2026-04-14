import argon2 from "argon2";
import env from "dotenv";
env.config();

if (process.env.PEPPER === undefined) {
    console.error(`Environment file isn't attached.`,);
    process.exit(1);
}

const HASH_PARAMS = {
    secret: Buffer.from(process.env.PEPPER, "hex"),
};

async function addUser(username, password) {
    var error = null;

    try {
        await getResult(`
            INSERT INTO users
            (username, passhash, createdAt)
            VALUES ("${username}", "${await argon2.hash(password, HASH_PARAMS)}", ${Date.now()});
        `);
    } catch(caughtError) {
        error = caughtError;
    } finally {
        return {
            successful: error == null ? true : false,
            reason: error,
            userId : fetchUserId(username)
        };
    };
}