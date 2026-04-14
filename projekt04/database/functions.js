// Imports
import argon2 from "argon2";
import sqlite3 from "sqlite3";
import session from "./session.js";
import populationTemplates from "./populate.json" with {type: "json"};
import admins from "./admins.json" with { type: "json" };
const db = new sqlite3.Database("./database/database.db");

if (process.env.PEPPER) {
    const HASH_PARAMS = {
        secret: Buffer.from(process.env.PEPPER, "hex"),
    };
}

// Prepare statements here plsssss :p

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
            reason: error,
            userId : fetchUserId(username)
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
        VALUES (${userId}, "${title}", "${content}", ${Date.now()});
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

    return {successful : (loginResult && (await argon2.verify(loginResult.passhash, password, HASH_PARAMS)) ? true : false)}; 
}

async function fetchUserId(username) {
    var fetchResult = (await getResult(`
        SELECT id
        FROM users
        WHERE username = "${username}";
    `))[0];

    return (fetchResult !== undefined ? fetchResult.id : null); //javascript moment
}

async function fetchUserIds() {
    return (await getResult(`
        SELECT id
        FROM users;
    `));
}

async function checkIfAdmin(userId) {
    return (await getResult(`
        SELECT userId
        FROM admins
        WHERE userId = "${userId}";
    `)).length == 1;
}

async function logout(user) {
    if (user !== null) {
        session.deleteSession(user);
    }
}

async function grantAdmin(userId) {
    db.exec(`
        INSERT INTO admins
        (userID)
        VALUES ("${userId}");
    `);
}

async function revokeAdmin(userId) {
    db.exec(`
        DELETE FROM admins
        WHERE userId = "${userId}";
    `);
}

async function clear() {
    ["users", "posts", "session", "admins"].forEach((table)=>{
        db.exec(`DELETE FROM ${table}`);
    });
}

Array.prototype.random = function () { //stack overflow my beloved
  return this[Math.floor((Math.random()*this.length))];
}

function populate() {
    let templates = populationTemplates

    templates.usernames.forEach((username)=>{
        let operation = addUser(username, templates.passwords.random()).then(async ()=>{
            addPost(await operation.userId, templates.titles.random(), templates.contents.random());
        });
    })
}

function createAdmins() {
    admins.forEach(async (admin)=>{
        grantAdmin(await addUser(admin.username, admin.password).userId);
    })
}

export default {
    addPost,
    removePost,
    fetchPost,
    fetchPosts,
    fetchUsername,
    fetchUserId,
    fetchUserIds,
    addUser,
    login,
    logout,
    checkIfAdmin,
    grantAdmin,
    revokeAdmin,
    clear,
    populate,
    createAdmins
}

// I use linux by the way