const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db("challenging").collection("users").find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(users)
    })
}

const getSingle = async (req, res) => {
    const userUserName = new ObjectId(req.params.username);
    const result = await mongodb.getDatabase().db("challenging").collection('users').find({ username: userUserName });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(users[0]);
    });
};

const createUser = async (req, res) => {
    const user = {
        username: req.body.username, // eg: deadrosesxyz
        categories: req.body.categories, // eg: [emotional, physical, social] 
        challenges: req.body.challenges, // eg: [id121, id124, id19], i.e., list ids for the user
        githubUrl: req.body.githubUrl,
        bio: req.body.bio, // eg: I have high IQ, but trying to improve my life elsewhere. 
        age: req.body.age, // eg: 19
    };
    const response = await mongodb.getDatabase().db("challenging").collection('users').insertOne(user);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error creating user");
    }
}

const updateUser = async (req, res) => {
    const userUserName = new ObjectId(req.params.username);

    const user = {
        username: req.body.username, // eg: deadrosesxyz
        categories: req.body.categories, // eg: [emotional, physical, social] 
        challenges: req.body.challenges, // eg: [id121, id124, id19], i.e., list ids for the user
        githubUrl: req.body.githubUrl,
        bio: req.body.bio, // eg: I have high IQ, but trying to improve my life elsewhere. 
        age: req.body.age, // eg: 19
    };
    const response = await mongodb.getDatabase().db("hunter").collection('users').replaceOne({ username: userUserName }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error updating user");
    }
}

const deleteUser = async (req, res) => {
    const userUserName = new ObjectId(req.params.username);
    const response = await mongodb.getDatabase().db("challenging").collection('users').deleteOne({ username: userUserName });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error deleting user");
    }
}

module.exports = { getAll, createUser, deleteUser, updateUser }