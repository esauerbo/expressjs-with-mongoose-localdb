const { v4: uuidv4 } = require('uuid');
const express = require('express');
const { useReducer } = require('react');
const cors = require('cors');
const app = express();
const PORT = 5001;

const users = {
   users_list:
      [
         {
            id: 'xyz789',
            name: 'Charlie',
            job: 'Janitor',
         },
         {
            id: 'abc123',
            name: 'Mac',
            job: 'Bouncer',
         },
         {
            id: 'ppp222',
            name: 'Mac',
            job: 'Professor',
         },
         {
            id: 'yat999',
            name: 'Dee',
            job: 'Aspring actress',
         },
         {
            id: 'zap555',
            name: 'Dennis',
            job: 'Bartender',
         }
      ]
}

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
   console.log(`Example app listening at http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
   res.send('Hello World!');
});

/*app.get('/users', (req, res) => {
   const name = req.query.name;
   if (name != undefined){
       let result = findUserByName(name);
       result = {users_list: result};
       res.send(result);
   } 
   else{
       res.send(users);
   }
}); */

/*const findUserByName = (name) => { 
   return users['users_list'].filter( (user) => user['name'] === name); 
} */

const findUserByNameAndJob = (name, job) => {
   return users['users_list'].filter((user) => user['name'] === name && user['job'] === job);
}

app.get('/users', (req, res) => {
   const name = req.query.name;
   const job = req.query.job;
   if (name != undefined && job != undefined) {
      let result = findUserByNameAndJob(name, job);
      result = { users_list: result };
      res.send(result);
   }
   else {
      res.send(users);
   }
});

function findUserById(id) {
   return users['users_list'].find((user) => user['id'] === id);
}

app.get('/users/:id', (req, res) => {
   const id = req.params['id'];
   let result = findUserById(id);
   if (result === undefined || result.length == 0)
      res.status(404).send('Resource not found.');
   else {
      result = { users_list: result };
      res.send(result);
   }
});

function addUser(user) {
   users['users_list'].push(user);
}


app.post('/users', (req, res) => {
   const userToAdd = req.body;
   userToAdd.id = uuidv4();
   addUser(userToAdd);
   res.status(201).send(userToAdd);
});

function removeUser(id) {
   const array = users['users_list'];
   array.forEach(user => {
      if (user.id === id) {
         console.log(id);
         array.pop(user);
      }
   });
}

app.delete('/users/:id', (req, res) => {
   const id = req.params['id'];
   if (id === undefined)
      res.status(404).send('Resource not found.');
   else {
      removeUser(id);
   }
   res.status(204).end();
});
