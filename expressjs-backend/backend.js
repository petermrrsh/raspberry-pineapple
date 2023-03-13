const cors = require('cors');
const express = require('express');
const fs = require('fs');
const app = express();
const port = 5005;

const users = { 
    users_list :
    [
       { 
          name : 'Charlie',
          password: 'Janitor',
       },
       {
          name: 'Mac',
          password: 'Bouncer',
       },
       {
          name: 'Mac',
          password: 'Professor',
       }, 
       {
          name: 'Dee',
          password: 'Aspring actress',
       },
       {
          name: 'Dennis',
          password: 'Bartender',
       }
    ]
 }

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    filteredUsers = users['users_list'];
    if (name != undefined){
        filteredUsers = filteredUsers.filter((user) =>
            user['name'] === name
        );
    } if (job != undefined) {
        filteredUsers = filteredUsers.filter((user) =>
            user['job'] === job
        );
    } 
    result = {users_list: filteredUsers};
    res.send(result);
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userJson = addUser(userToAdd);
    console.log(`\nEmail: "${userToAdd.name}"\nPassword: "${userToAdd.password}"\n`);
    res.status(201).send(userJson).end();
});

function generateRandomUniqueID() {
    allowedCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    id = "";
    id_length = 6;
    do {
        for (i = 0; i < id_length; i++) {
            index = Math.floor(Math.random()*allowedCharacters.length);
            id += allowedCharacters[index];
        }
    } while (users.users_list.filter(user => user.id == id).length > 0)
    return id;
}

function addUser(user){
    users['users_list'].push(user);
    fs.appendFileSync("users.txt", JSON.stringify(user) + "\n");
    return user;
}

app.delete('/users', (req, res) => {
    const id = req.query.id;
    if (id === undefined) {
        res.status(500).send("No ID specified").end();
    } else {
        console.log(users.users_list);
        index = users.users_list.findIndex(user => user.id == id);
        if (index == -1) {
            res.status(404).statusMessage(`ID "${id}" does not exist`).end();
        }
        console.log(index);
        users.users_list.splice(index, 1);
        console.log(users.users_list);
    }
    res.status(204).end();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      