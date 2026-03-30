Array.prototype.random = function () { //:P uwielbiam tego typu odpowiedzi z internetu
  return this[Math.floor((Math.random()*this.length))];
}//stack overflow my beloved

import databaseFunctions from "./functions.js";

const templates = {//mhm
    usernames : ["John", "Jane"],
    passwords : ["1234", "password"],

    titles : ["Hello world!", "New post"],
    contents : ["Lorem ipsum", "Placeholder"]
}

export default function populate() { //YO MOŻNA WYEKSPORTOWAĆ PLIK JAKO FUNKCJĘ
    templates.usernames.forEach((username)=>{
        databaseFunctions.addUser(username, templates.passwords.random());
    })

    templates.titles.forEach((title)=>{//uwielbiam ten syntax, .forEach(()=>{})...
        databaseFunctions.addPost((databaseFunctions.fetchUserIds()).random(), title, templates.contents.random());
    })
}