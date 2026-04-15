# Major revision WIP!!!

# Simple silly forum
## Once you make an account and log in, you can:
- Make a post,
- Modify or delete your own posts,
- See all posts and users,
- Or you can be an admin and modify/delete other people's posts!

## Setup
First, if you'd like to be an admin, set up your desired credentials in ```./templates/admins.json```. Accounts listed there will be created on startup.  
Then, simply run ```node index.ts``` to start hosting the website @ localhost:1337 (by default).

## Extra functions you can set:
- Whether to clear a section of the database on startup (or more),
- Whether to create admin account(s) on startup,
- Whether to populate the database with a few example users and posts.

To customize, simply modify ```./config.ts```.  
You can also use them at runtime by simply running the corresponding files located in ```./database/functions```.
