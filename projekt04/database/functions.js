import argon2 from "argon2";
import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./database/database.db");

const HASH_PARAMS = {
  secret: Buffer.from(process.env.PEPPER, "hex"),
};

const getResult = query => new Promise((resolve, reject) => {
  db.all(query, (err, row) => {
    if (err) {
      reject(err);
    } else {
      resolve(row);
    }
  })
});

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
            reason: error
        };
    };
}

async function fetchUsername(userId) {
    return await getResult(`
        SELECT username
        FROM users
        WHERE id = ${userId};
    `);
}

async function addPost(userId, title, content) {
    db.exec(`
        INSERT INTO posts
        (userId, title, content, createdAt)
        VALUES (${userId}, "${title}", "${content}",  ${Date.now()});
    `);
}

async function removePost(postId) {
    db.exec(`
        DELETE FROM posts
        WHERE id = ${postId};
    `);
}

async function fetchPosts() {
    return await getResult(`
        SELECT id, title, content
        FROM posts;
    `);
}

async function fetchPost(postId) {
    return await getResult(`
        SELECT userId, title, content
        FROM posts
        WHERE id = ${postId};
    `);
}

async function login(username, password) {
    var loginResult = (await getResult(`
        SELECT passhash
        FROM users
        WHERE username = "${username}"
    `))[0];

    return {successful : ((await argon2.verify(loginResult.passhash, password, HASH_PARAMS)) ? true : false)};
}

async function fetchUserId(username) {
    return (await getResult(`
        SELECT userId
        FROM users
        WHERE username = ${username};
    `)).userId;
}

async function checkIfAdmin(userId) {
    return false;
}

async function fetchUserId(username) {
    
}

async function clear() {
    db.exec("DELETE FROM users");
    db.exec("DELETE FROM posts");
    db.exec("DELETE FROM session");
    db.exec("DELETE FROM admins");
}

export default {
    addPost,
    removePost,
    fetchPost,
    fetchPosts,
    fetchUsername,
    fetchUserId,
    addUser,
    login,
    logout,
    checkIfAdmin,
    clear
}