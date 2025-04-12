const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    try {
        const result = await mongodb.getDatabase().db("challenging").collection("users").find();
        result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users);
        });
    } catch (err) {
        next(err);
    }
};

const getSingle = async (req, res, next) => {
    try {
        const userUserName = req.params.username;
        const result = await mongodb.getDatabase().db("challenging").collection('users').find({ username: userUserName });
        result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users[0]);
        });
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        console.log(req.body);
        const user = {
            username: req.body.username,
            categories: req.body.categories,
            challenges: req.body.challenges,
            githubUrl: req.body.githubUrl,
            bio: req.body.bio,
            age: req.body.age,
        };

        const response = await mongodb.getDatabase().db("challenging").collection('users').insertOne(user);
        if (response.acknowledged > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error creating user");
        }
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const userUserName = req.params.username;

        const user = {
            username: req.body.username,
            categories: req.body.categories,
            challenges: req.body.challenges,
            githubUrl: req.body.githubUrl,
            bio: req.body.bio,
            age: req.body.age,
        };

        const response = await mongodb.getDatabase().db("hunter").collection('users').replaceOne({ username: userUserName }, user);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error updating user");
        }
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const userUserName = req.params.username;
        const response = await mongodb.getDatabase().db("challenging").collection('users').deleteOne({ username: userUserName });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error deleting user");
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { getAll, createUser, deleteUser, updateUser, getSingle };
