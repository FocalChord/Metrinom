# Metrinom (Group 13)

![Build](https://github.com/Dinith1/SOFTENG750-Project/workflows/Build/badge.svg?branch=master)

![MetrinomLogo](https://user-images.githubusercontent.com/34013038/82750926-df81b200-9e07-11ea-873e-412003591e0d.png)

A web app for viewing spotify statistics curated for the user.

We are using the [React framework](https://reactjs.org/) to manage the front-end UI and using a [Node JS](https://nodejs.org/en/) server utilising the [Express framework](https://expressjs.com/) and [MongoDB database](https://www.mongodb.com/what-is-mongodb) for the back-end. The back-end calls the [Spotify API](https://developer.spotify.com/documentation/web-api/) endpoints and returns the relevant information to the frontend.

This app work well when a user has a Spotify account (preferably with a **premium subscription**) with some listening history.

## Team Members in Group 13 (Emerald Elephant)

| Name             | Github Username | UoA Upi |
| ---------------- | --------------- | ------- |
| Hong Shi         | HongShi10       | hshi952 |
| Dinith Wannigama | Dinith1         | dwan609 |
| Nisarag Bhatt    | FocalChord      | nbha702 |

## How to use this app?

Open https://metrinom.herokuapp.com/ in Google Chrome and login to start viewing your statistics!

## How do I run this app locally?

### Prerequisites:

-   You have cloned this repository onto your local machine

-   [Node.js](https://nodejs.org/en/) (Make sure your node version is more than `11` or the server might crash, this is because some functions such as `flat()` (which is used in the backend) from ES2019 require node version `11` or higher)

-   [Npm](https://www.npmjs.com/get-npm) (However this does come with Node.js)

-   [MongoDB community server](https://www.mongodb.com/download-center/community)

-   A code editor ([VS code](https://code.visualstudio.com/) was used in the development of this project)

### Project setup:

#### Server

1. Open your terminal and `cd` into the server directory in server
2. Run `npm install` inside of the server directory

3. Create a `.env` file in the ./client folder with the following attributes:

```
SPOTIFY_CLIENT_ID=<your id>
SPOTIFY_CLIENT_SECRET=<your secret>
```

<details closed>
<summary> Steps to generate these secrets</summary>
<br>
<p>

Go to: https://developer.spotify.com/dashboard/applications and create a new application, after the application has been created you will see that a Client Id and a Client Secret has been generated. Paste these into the environment file above.

-   A sample file `.env` will look like this

```
SPOTIFY_CLIENT_ID=asf124asfasf112
SPOTIFY_CLIENT_SECRET=fasfj25j122
```

</p>
</details>

4. Add redirect URI to the spotify application

<details closed>
<summary> Steps to add redirect URI </summary>
<br>

To do this, go to your application the spotify dashboard; you will see this at the top of your page:

![Screen Shot 2020-05-24 at 5 22 47 PM](https://user-images.githubusercontent.com/31643423/82746387-31fca780-9de3-11ea-89a0-61ba31a649e3.png)

Click on Edit Settings and add http://localhost:3001/auth/spotify/callback as a redirect URI:

![Screen Shot 2020-05-24 at 5 40 06 PM](https://user-images.githubusercontent.com/31643423/82746587-9de00f80-9de5-11ea-9007-a1833e788ca4.png)

You will then see this when added:

![Screen Shot 2020-05-24 at 5 18 32 PM](https://user-images.githubusercontent.com/31643423/82746338-99febe00-9de2-11ea-98de-7099d9c8cbf5.png)

</details>

5. Make sure your MongoDB database is running locally by using the relevant commands to your operating system (Note this step is important else the server might crash if Mongo is not running on your computer). See [here](https://docs.mongodb.com/manual/administration/install-community/) for more on details on running MongoDB locally.

<details><summary> Terminal output when database is not running locally and you attempt to start the server    </summary>
<p>

![Screen Shot 2020-05-24 at 8 00 38 PM](https://user-images.githubusercontent.com/31643423/82748863-42b81800-9df9-11ea-9dd1-164fc84f5d61.png)

To fix this ensure MongoDB is running locally on your computer.

</p>
</details>

6. After the `.env` file has been filled in and the redirect URI has been added. Ensure that `port 3001` is not occupied else you will have to change the redirect URI above accordingly. In the server directory, run `npm start` in terminal to start the server.

<details closed>
<summary> Expected terminal output after starting server </summary>
<br>

![Screen Shot 2020-05-24 at 5 34 17 PM](https://user-images.githubusercontent.com/31643423/82746536-f2cf5600-9de4-11ea-8432-545e83d203e4.png)

</details>

#### Client

1. Open your terminal (while your server is running) and `cd` into the `client` directory for this project.
2. Run `npm install` inside of the client directory
3. Run `npm start` inside of the client directory and ensure you are on `port 3000`

<details closed>
<summary> Expected terminal output after starting client </summary>
<br>

![Screen Shot 2020-05-24 at 5 40 06 PM](https://user-images.githubusercontent.com/31643423/82746587-9de00f80-9de5-11ea-9007-a1833e788ca4.png)

</details>

<details closed>
<summary> Expected browser output when going to http://localhost:3000/ on your browser </summary>
<br>

![Screen Shot 2020-05-24 at 5 45 54 PM](https://user-images.githubusercontent.com/31643423/82746664-6de53c00-9de6-11ea-9004-0be95457fedf.png)

</details>

After the client and server have started running, you can start using the app.

## FAQ:

<details><summary> Can I use a MongoDB cloud instance? </summary>
<p>

Yes you can, in the server `.env` file, on a new line add `DEV_DB_CONN=<your-connection-string>`

</p>
</details>

<details><summary> How do I know that the server responds to requests? </summary>
<p>

While the server is running, open up your browser and go to `localhost:3001/heartbeat`

You should see a response as such:

![Screen Shot 2020-05-24 at 5 58 12 PM](https://user-images.githubusercontent.com/31643423/82746822-252e8280-9de8-11ea-8f81-99fcd61e54bc.png)

</p>
</details>

<details><summary> When trying to login, I get an "Invalid redirect URI" error. How can I fix this? </summary>
<p>

If you encounter this error:

![Screen Shot 2020-05-24 at 5 59 53 PM](https://user-images.githubusercontent.com/31643423/82746854-6161e300-9de8-11ea-90f0-fbf782288650.png)

Ensure that the spotify URI you have registered on your application matches line 9 inside of the `passport.js` file in the server directory. Ensure that the server is also running on that port you have mentioned (in our case `3001`)

For example the URI on my console:

![Screen Shot 2020-05-24 at 6 02 28 PM](https://user-images.githubusercontent.com/31643423/82746892-be5d9900-9de8-11ea-832c-e28bb0778f9d.png)

matches the URI on my `passport.js` file

![Screen Shot 2020-05-24 at 6 04 13 PM](https://user-images.githubusercontent.com/31643423/82746920-fc5abd00-9de8-11ea-9777-4e65d1103a2f.png)

</p>
</details>

<details><summary> I get a "OAuth2Strategy requires a clientID option" when trying to start the server   </summary>
<p>

If you encounter this error

![Screen Shot 2020-05-24 at 6 07 27 PM](https://user-images.githubusercontent.com/31643423/82747005-6ffcca00-9de9-11ea-83f9-1ddfefb44e9c.png)

Ensure that the the `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` is set in the .env for the client.

</p>
</details>

<details><summary> I can't view statistics on certain pages :(   </summary>
<p>

When you login and browse around the app and see empty screens (like the screenshots below), you probably do not have enough music history (i.e. you need to listen to more music!)

![Screen Shot 2020-05-24 at 6 12 31 PM](https://user-images.githubusercontent.com/31643423/82747095-252f8200-9dea-11ea-8231-cb5655b4e4dd.png)

![Screen Shot 2020-05-24 at 6 11 39 PM](https://user-images.githubusercontent.com/31643423/82747081-0630f000-9dea-11ea-94e3-4a6d1435fda3.png)

</p>
</details>

<details><summary> Top Artists Graph page is unresponsive   </summary>
<p>

When the top artists graph load it should look like this and be responsive:

![Screen Shot 2020-05-24 at 6 21 35 PM](https://user-images.githubusercontent.com/31643423/82747272-696f5200-9deb-11ea-8bea-d85f60b32653.png)

However when you zoom in and out on your browser page then it _could_ look like this

![Screen Shot 2020-05-24 at 6 23 57 PM](https://user-images.githubusercontent.com/31643423/82747309-bce1a000-9deb-11ea-99da-18550b2f297d.png)

If this does happen, then refresh the page and it should be fine :)

</p>
</details>

<details><summary> How do I test the app?   </summary>
<p>

#### Client

-   `> cd client`
-   `> npm test`

#### Server

-   `> cd server`
-   `> npm test`

</p>
</details>

<details><summary> Help! something is not working!  </summary>
<p>

Feel free to contact Nisarag on his university email address (UPI) can be found above.

</p>
</details>

---

## Project Questions:

### How well have you mastered React, git, and other tools / frameworks introduced in this course?

-   We used Git extensively throughout the project, including features such as branching, merging, rebasing
-   We used `React`, `Express`, `MongoDb`, `Mongoose`, `MaterialUI`, `Jest` and `Enzyme`

### Have you shown the ability to carry out further learning beyond the course material to add value to your prototype?

-   We used `MaterialUi`, `mockingoose`, `React Context API` and many smaller frameworks for various aspects of the app
-   We added Continuous Integration through `GitHub Actions`
-   We deployed the app using `Heroku`

### Has your code been developed according to best-practices within your applied frameworks? Is it understandable and maintainable?

-   We applied best practices to our React components by abstracting functionality into smaller components
-   We used JS best practices, such as using `const` to enforce immutability
-   We applied best practices to our Express API by minimising URL path branching
-   Other best practices were applied throughout the project for other frameworks

### Has your code been tested? How?

-   The [backend](https://github.com/Dinith1/SOFTENG750-Project/wiki/Backend-Tests) was tested extensively
-   The [frontend](https://github.com/Dinith1/SOFTENG750-Project/wiki/Frontend-Tests) was tested extensively

### Is there evidence of good project management, and appropriate contribution from all team members?

-   We used GitHub issues to track tasks
-   We used merge rules for PRs, meaning code-review had to take place
-   We had regular meetings and information sessions to discuss development; see the [wiki](https://github.com/Dinith1/SOFTENG750-Project/wiki/Meetings) for more info
-   Each team member was fully involved throughout the project's development, and contribution was roughly equal among everyone in terms of coding, management, code-review and research
