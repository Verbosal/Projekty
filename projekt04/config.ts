// Customizable variables

export default {
    port : 1337,        // Port at which you'd like to locally host, like localhost:1337

    optional : { // Optional operations at the start of every runtime
        create : {          // Whether to create something
            users : true,   // Create example users, defined in ./templates/users.json
            posts : true,   // Create example posts, defined in ./templates/posts.json
            admins : true,  // Create admin account(s), defined in ./templates/admins.json
        },

        clear : {                       // Whether to clear something
            users : true,               // Clear all users
            posts : true,               // Clear all posts
            admin_privileges : true,    // Clear all admins' privileges
        }
    }
}

// Used a typescript file so that I can put comments here! How does JSON not accept comments bro