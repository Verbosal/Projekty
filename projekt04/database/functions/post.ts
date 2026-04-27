// Imports & declarations
import statements from '../statements.ts';
const ops = statements.post

import initRandom from './random.ts';
initRandom();

export function create(userId : number, title : string, content : string) {
    ops.create.run(userId, title, content, Date.now());
}

export function remove(postId : number) {
    ops.remove.run(postId);
}

export function fetch(postId : number) {
    return ops.fetch.get(postId);
}

export function fetchAll() {
    return ops.fetchAll.get(); 
}

export function populate() {
    let templates = populationTemplates

    templates.usernames.forEach((username)=>{
        let operation = createUser(username, templates.passwords.random()).then(async ()=>{
            createUser(await operation.userId, templates.titles.random(), templates.contents.random());
        });
    })
}

export function clear() {
    ops.clear.run();
}