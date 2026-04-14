if (process.env.PEPPER) {
    const HASH_PARAMS = {
        secret: Buffer.from(process.env.PEPPER, "hex"),
    };
}

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