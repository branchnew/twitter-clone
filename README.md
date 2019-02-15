# Twitter

This is a Twitter clone.

## Requirements

In order to install and run the application, your machine needs to have [Node.js](https://nodejs.org) and [Docker](https://docker.com).

## Install

To install the application, do the following:

```bash
npm install
docker-compose up -d
```

This will install all the dependencies and spin up the required Docker containers.
At this point, you can connect to your [localhost:5000](http://localhost:5000) to access the application.

Based on [this requirement](https://github.com/themaxsandelin/wsp2).

## Endpoints
`GET /users` gives a list of all the users.  
`POST /users` creates a new user.  
`DELETE /users/:username` deletes a specific user.  
`GET /tweets/:author` lists all the tweets of a given author.  
`POST /tweets` creates a new tweet.  
`DELETE /tweets/:id` deletes a specific tweet.  

