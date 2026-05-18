// Customizable variables

export default { // Optional operations at the start of every runtime, as defined in each file in the ./templates folder
    // Whether to create something
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

// Used a typescript file so that I can put comments here! How does JSON not accept comments bro