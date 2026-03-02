import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./database.db");

function addPost(userId, title, content) {
    db.exec(`
        INSERT INTO posts
        (posts.userId, posts.title, posts.content, posts.postedAt)
        VALUES (${userId}, ${title}, ${content}, datetime('now'));
    `);
}

function removePost(postId) {
    db.exec(`
        DELETE FROM posts
        WHERE posts.id = ${postId};
    `);
}

function addUser(login, password) {
    db.exec(`
        INSERT INTO users
        (users.login, users.password, users.joinedAt)
        VALUES (${login}, ${password}, datetime('now'));
    `);

    console.log(`Created account!
        Login: ${login}
        Password: ${password}`);
}

function fetchPosts() {
    console.log(db.exec(`SELECT * FROM sqlite_master;`));
    return db.exec(`
        SELECT posts.userId, posts.title, posts.content
        FROM posts;
    `);
}

function fetchPost(postId) {
    return db.exec(`
        SELECT posts.userId, posts.title, posts.content
        FROM posts
        WHERE posts.postId = ${postId};
    `);
}

function fetchLogin(userId) {
    return db.exec(`
        SELECT users.login
        FROM users
        WHERE users.userId = ${userId};
    `);
}

function login(login, password) {
    if (db.exec(`
        SELECT users.password
        FROM users
        WHERE users.login = ${login}
    `) == password) {
        console.log(`${login} successfully logged in using password ${password}!`)
    } else {
        console.log(`Someone tried to log in but failed with credentials:
            Login: ${login}
            Password: ${password}`)
    }
}

export default {
    addPost,
    removePost,
    fetchPost,
    fetchPosts,
    fetchLogin,
    addUser,
    login
}