Revision WIP!!!

# Simple silly forum
## Once you make an account and log in, you can:
- Make a post,
- Modify or delete your own posts,
- See all posts,
- Or you can be an admin and modify/delete other people's posts!

First, if you'd like to be an admin, set up your desired credentials in ```/database/admin.json```. That account will be created on startup.\
Then, simply run\
```node --env-file=./parameters.env --no-warnings index.js```\
to start hosting the website @ localhost:1337.\

Extra functions:
- You can set whether to clear the database every time the program is ran
- You can also populate the database with a few example users and posts.\
```./parameters.env```.\