const mongoose = require('mongoose');
const userModel = require("./user");

mongoose.connect(
    'mongodb://localhost:27017/users',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
).catch(error => console.log(error));

async function getUsers(name, job){
    let result;
    console.log("getusers and name=" + name);
    if (name === undefined && job === undefined){
        result = await userModel.find();
    }
    else if (name && (job === undefined)) {
        result = await findUserByName(name);
    }
    else if (job && (name === undefined)){
        result = await findUserByJob(job);
    }
    else {
        result = await findUserByNameAndJob(name, job);
    }    
    return result;  
}

async function findUserById(id){
    console.log("get users by id " + id);
    try{
        return await userModel.findById(id);
    }catch(error) {
        console.log(error);
        return undefined;
    }
}

async function addUser(user){
    console.log("add user " + user);
    try{
        const userToAdd = new userModel(user);
        const savedUser = await userToAdd.save()
        return savedUser;
    }catch(error) {
        console.log(error);
        return false;
    }   
}

async function findUserByName(name){
    return await userModel.find({'name':name});
}

async function findUserByJob(job){
    return await userModel.find({'job':job});
}

async function findUserByNameAndJob(name, job) {
    return await userModel.find({'name':name,
                                'job':job});
}

async function deleteUserById(id) {
    await userModel.findByIdAndDelete(id);
}

exports.deleteUserById = deleteUserById;
exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;