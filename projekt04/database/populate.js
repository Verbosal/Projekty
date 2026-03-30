Array.prototype.random = function () { //:P uwielbiam tego typu odpowiedzi z internetu
  return this[Math.floor((Math.random()*this.length))];
}//stack overflow my beloved

import databaseFunctions from "./functions.js";

const templates = {//mhm
    usernames : ["John Doe", "Jane Doe"],
    passwords : ["1234", "password"],

    titles : ["Hello world!", "New post"],
    contents : ["Lorem ipsum", "Placeholder"]
}

export default function populate() { //YO MOŻNA WYEKSPORTOWAĆ PLIK JAKO FUNKCJĘ
    templates.usernames.forEach((username)=>{
        databaseFunctions.addUser(username, templates.passwords.random()).then(async ()=>{
            databaseFunctions.addPost(await databaseFunctions.fetchUserId(username), templates.titles.random(), templates.contents.random());
        });
    })
}