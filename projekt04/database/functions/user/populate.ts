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