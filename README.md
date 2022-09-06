# Players-Manager

CRUD application designed to manage a database of football players and their agents.

If you have any kind of feedback, please let me know, I will appreciate it.  
Feel free to send me an
<a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=yuvr99@email.com" target="_blank"> email</a> or message me on
<a href="https://www.linkedin.com/in/yuval-ron1/" target="_blank">Linkedin</a>.

## Built with:

<b>Frontend:</b> React, Typescript, scss  
<b>Backend:</b> Express, Typescript, PostgreSQL

---

## Live Application

https://players-manager.herokuapp.com

---

## Run Locally:

1. Get yourself a PostgreSQL database, and make sure you have its connection string.  
   (You can ask me for my own database connection string)

2. In the backend folder, create a ".env" file, add the following text:  
   `DATABASE_URL=<connection_string>`

3. If you don't want to generate players and clubs for the local db, you can skip this step.  
   Add the following text to the '.env' file:  
    `FOOTBALL_API_KEY=<key>`  
   "key" should be your own football-api key.  
    You can get one <a href="http://dashboard.api-football.com">here</a>.

4. In the backend folder, run the following commands:

   ```console
   npm ci
   npm run initDb
   npm start
   ```

   Now your server should be up and running.  
   <b>Note: all the following steps should be run from a different terminal.</b>

5. In the frontend folder, run the following commands:
   ```console
   npm ci
   npm start
   ```

### <b>Now your own local players-manager should be up and running!</b>
