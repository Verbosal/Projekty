async function login(username, password) {
    var loginResult = (await getResult(`
        SELECT passhash
        FROM users
        WHERE username = "${username}"
    `))[0];

    return {successful : (loginResult && (await argon2.verify(loginResult.passhash, password, HASH_PARAMS)) ? true : false)}; 
}