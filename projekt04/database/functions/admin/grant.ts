async function grantAdmin(userId) {
    db.exec(`
        INSERT INTO admins
        (userID)
        VALUES ("${userId}");
    `);
}