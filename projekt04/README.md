Major revision WIP!!!

# Simple silly forum
## Once you make an account and log in, you can:
- Make a post,
- Modify or delete your own posts,
- See all posts,
- Or you can be an admin and modify/delete other people's posts!

First, if you'd like to be an admin, set up your desired credentials in ```/templates/admins.json```. Accounts listed there will be created on startup.\
Then, simply run\
```node --env-file=./parameters.env --no-warnings index.js```\
to start hosting the website @ localhost:1337.\

Extra functions you can set:
- Whether to clear the database on startup,\
- Whether to create admin accounts on startup,\
- Whether to populate the database with a few example users and posts.\
To customize, simply modify ```./parameters.env```.
You can also use them at runtime by simply running the corresponding scripts located in ```/database/functions```.