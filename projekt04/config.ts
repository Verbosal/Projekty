// Customizable variables
export default {
    port : 1337,        // Port at which you'd like to locally host, like localhost:1337

    optional : { // Optional operations at the start of every runtime

        // Whether to create something, as defined in eachfile in the ./templates folder
        create : {
            users : true,   // Create example users
            posts : true,   // Create example posts
            admins : true,  // Create admin account(s)
        },

        // Whether to clear something
        clear : {
            users : true,               // Clear all users
            posts : true,               // Clear all posts
            admin_privileges : true,    // Clear all admins' privileges
        }

    }
}

// Used a typescript file so that I can put comments here! How does JSON not accept comments bro