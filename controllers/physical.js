const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const usersController = require("./users");

const getAll = async (req, res, next) => {
    try {
        const result = await mongodb.getDatabase().db("challenging").collection("physical").find();
        result.toArray().then((physical) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(physical);
        });
    } catch (err) {
        next(err);
    }
};

const getUsersForPhysical = async (req, res, next) => {
    try {
        const physicalLists = await mongodb.getDatabase().db("challenging").collection("physical").find();
        const allPhysicalUsers = physicalLists.flatMap((physicalList) => physicalList.users || []);
        console.log("allPhysicalUsers", allPhysicalUsers);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(allPhysicalUsers);
    } catch (err) {
        next(err);
    }
};

const getSingle = async (req, res, next) => {
    try {
        const physicalListId = new ObjectId(req.params.listId);
        const result = await mongodb.getDatabase().db("challenging").collection('physical').find({ _id: physicalListId });
        result.toArray().then((physical) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(physical[0]);
        });
    } catch (err) {
        next(err);
    }
};

const createPhysical = async (req, res, next) => {
    try {
        const physical = {
            users: [],
            dailyChallenges: req.body.dailyChallenges,
            listDifficulty: req.body.listDifficulty,
            title: req.body.title,
            description: req.body.description,
        };

        const response = await mongodb.getDatabase().db("challenging").collection('physical').insertOne(physical);
        if (response.acknowledged > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error creating physical");
        }
    } catch (err) {
        next(err);
    }
};

const updatePhysical = async (req, res, next) => {
    try {
        const listId = new ObjectId(req.params.listId);

        const physical = {
            users: req.body.users,
            dailyChallenges: req.body.dailyChallenges,
            listDifficulty: req.body.listDifficulty,
            title: req.body.title,
            description: req.body.description,
        };

        const response = await mongodb.getDatabase().db("challenging").collection('physical').replaceOne({ _id: listId }, physical);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error updating physical");
        }
    } catch (err) {
        next(err);
    }
};

const updatePhysicalWithNewUser = async (req, res, next) => {
    try {
        const listId = new ObjectId(req.params.listId);
        const username = req.params.username;

        const user = await mongodb.getDatabase().db("challenging").collection('users').findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // add new category to user.categories without having duplicates
        await mongodb.getDatabase().db("challenging").collection('users').updateOne(
            { username },
            { $addToSet: { categories: "physical" } }
        );

        const response = await mongodb.getDatabase().db("challenging").collection('physical').updateOne(
            { _id: listId },
            { $addToSet: { users: user } }
        );

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error updating physical");
        }
    } catch (err) {
        next(err);
    }
};

const deletePhysical = async (req, res, next) => {
    try {
        const listId = new ObjectId(req.params.listId);
        const response = await mongodb.getDatabase().db("challenging").collection('physical').deleteOne({ _id: listId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error deleting physical");
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    createPhysical,
    deletePhysical,
    updatePhysical,
    getSingle,
    getUsersForPhysical,
    updatePhysicalWithNewUser
};
