# Players-Manager

CRUD application designed to manage a database of football players and their agents.

If you have any kind of feedback, please let me know, I will appreciate it.  
Feel free to send me an
<a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=yuvr99@email.com" target="_blank"> email </a>
or message me on
<a href="https://www.linkedin.com/in/yuval-ron1/" target="_blank">Linkedin</a>.

## Built with:

<b>Frontend:</b> React, Typescript, scss  
<b>Backend:</b> Express, Typescript, PostgreSQL

---

## Live Application

https://players-manager.herokuapp.com/

---

## Run Locally:

1. In the backend folder, run the following command:  
   `npm ci`
2. Create an '.env' file in the backend folder.
3. Add the following text to the '.env' file you just created:  
   `DATABASE_URL = URL`  
   URL should be your own PostgreSQL database's connection string.

4. If you don't want to generate players and clubs for the local db, you can skip this step.  
   Add the following text to the '.env' file:  
    `FOOTBALL_API_KEY = KEY`  
   KEY should be your own football-api key.  
    You can get one <a href="http://dashboard.api-football.com">here</a>.

5. In the root folder, run the following command:  
   `node backend/scripts/initdb.js`  
   Now your database should be ready.

6. In the backend folder, run the following command:  
   `npm start`  
   Now your server should be up and running.  
   <b>Note: all the following steps should be run from a different terminal.</b>

7. In the frontend folder, run the following command:  
   `npm ci`

8. In the frontend folder, run the following command:  
   `npm ci`

9. In the frontend folder, run the following command:  
   `npm start`  
   If all steps were executed correctly, you should be done.

Enjoy!
