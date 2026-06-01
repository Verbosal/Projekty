# Simple silly forum
## Once you make an account and log in, you can:
- Make a post,
- Modify or delete your own posts,
- See all posts and users,
- Or you can be an admin and ban other people and delete their posts!

## The Gimmick
Making a post will get you banned!1!!1!!!1! (Can be turned off)

## Setup
Before doing anything, run ```npm install```.

If you'd like to be an admin, set up your desired credentials in ```./database/templates/admins.json```.  
Accounts listed there will be created on startup.  
  
Then, simply run ```node index.ts``` to start locally hosting the website @ localhost:1337 (by default).

## Extra functions that you can set on startup:
- Whether to clear a section of the database (or more),
- Whether to populate the database with a few example posts, users and admins,
- Whether to even ban people for using the website.

To customize, simply modify ```./config.ts``` and ```./database/config.ts```.  
You can also use them by simply running the corresponding files whose ancestor is ```./database/functions```.

## Explanation of the naming convention:  
I use the approach of hierarchical context, which means a given file or function is related to its parent.

I'm also pleased to say that I didn't use any AI in the making of this :D