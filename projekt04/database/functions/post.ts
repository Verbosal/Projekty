// Imports & declarations
import statements from '../statements';
const ops = statements.post

import initRandom from './random';
initRandom();

export function createPost(userId : number, title : string, content : string) {
    ops.create.run(userId, title, content, Date.now());
}

export function removePost(postId : number) {
    ops.remove.run(postId);
}

export function fetchPost(postId : number) {
    return ops.fetch.get(postId);
}

export function fetchPosts() {
    return ops.fetchAll.get(); 
}

function populate() {
    let templates = populationTemplates

    templates.usernames.forEach((username)=>{
        let operation = createUser(username, templates.passwords.random()).then(async ()=>{
            createUser(await operation.userId, templates.titles.random(), templates.contents.random());
        });
    })
}