// Imports & declarations
import statements from '../statements.ts';
const ops = statements.user

import hashSecret from "../secret.ts";
import argon2 from "argon2";
import initRandom from './random.ts';
initRandom();

export function create(username : string, password : string) {
    var error = null;

    try {
        ops.create.run(username, argon2.hash(password, hashSecret), Date.now());
    } catch(caughtError) {
        error = caughtError;
    } finally {
        return {
            successful: error == null ? true : false,
            reason: error,
            userId : ops.fetch.get(username)
        };
    };
}

export function fetchUsername(userId : number) {
    ops.fetch.username.get(userId);
}

export function fetchAllUsernames() {
    ops.fetch.allUsernames.get();
}

export async function login(username : string, password : string) {
    var loginResult = statements.user.fetch

    return {successful : (loginResult && (await argon2.verify(loginResult.passhash, password, hashSecret)) ? true : false)}; 
}

export function logout(userId : number) {
    if (userId !== null) {
        session.deleteSession(userId);
    }
}

export function populate() { //only users
    let templates = populationTemplates

    templates.usernames.forEach((username)=>{
        let operation = addUser(username, templates.passwords.random()).then(async ()=>{
            addPost(await operation.userId, templates.titles.random(), templates.contents.random());
        });
    })
}

export function remove(userId : number) {
    ops.remove.run(userId);
}