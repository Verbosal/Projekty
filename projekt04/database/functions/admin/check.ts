async function checkIfAdmin(userId) {
    return (await getResult(`
        SELECT userId
        FROM admins
        WHERE userId = "${userId}";
    `)).length == 1;
}