// Imports & declarations
import statements from '../statements.ts';
const ops = statements.admin

import initRandom from './random.ts';
initRandom();

export function checkIf(userId : number) : boolean {
    return ops.check(userId);
}

export function grant(userId : number) {
    ops.grant.run(userId);
}

export function populate() {
    let templates = populationTemplates

    templates.usernames.forEach((username)=>{
        let operation = addUser(username, templates.passwords.random()).then(async ()=>{
            addPost(await operation.userId, templates.titles.random(), templates.contents.random());
        });
    })
}

export function populateAAAAAAAAAAAAA() {
    admins.forEach(async (admin)=>{
        grantAdmin(await addUser(admin.username, admin.password).userId);
    })
}

export function revoke(userId : number) {
    ops.revoke.run(userId);
}