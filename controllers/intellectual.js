const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const usersController = require("./users");

const getAll = async (req, res, next) => {
    try {
        const result = await mongodb.getDatabase().db("challenging").collection("intellectual").find();
        result.toArray().then((intellectual) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(intellectual);
        });
    } catch (err) {
        next(err);
    }
};

const getUsersForIntellectual = async (req, res, next) => {
    try {
        const intellectualListsCursor = await mongodb.getDatabase().db("challenging").collection("intellectual").find();
        const intellectualLists = await intellectualListsCursor.toArray();
        const allIntellectualUsers = intellectualLists.flatMap((intellectualList) => intellectualList.users || []);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(allIntellectualUsers);
    } catch (err) {
        next(err);
    }
};

const getSingle = async (req, res, next) => {
    try {
        const intellectualListId = new ObjectId(req.params.listId);
        const result = await mongodb.getDatabase().db("challenging").collection('intellectual').find({ _id: intellectualListId });
        result.toArray().then((intellectual) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(intellectual[0]);
        });
    } catch (err) {
        next(err);
    }
};

const createIntellectual = async (req, res, next) => {
    try {
        const intellectual = {
            users: [],
            dailyChallenges: req.body.dailyChallenges,
            listDifficulty: req.body.listDifficulty,
            title: req.body.title,
            description: req.body.description,
        };

        const response = await mongodb.getDatabase().db("challenging").collection('intellectual').insertOne(intellectual);
        if (response.acknowledged > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error creating intellectual");
        }
    } catch (err) {
        next(err);
    }
};

const updateIntellectual = async (req, res, next) => {
    try {
        const listId = new ObjectId(req.params.listId);

        const intellectual = {
            users: req.body.users,
            dailyChallenges: req.body.dailyChallenges,
            listDifficulty: req.body.listDifficulty,
            title: req.body.title,
            description: req.body.description,
        };

        const response = await mongodb.getDatabase().db("challenging").collection('intellectual').replaceOne({ _id: listId }, intellectual);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error updating intellectual");
        }
    } catch (err) {
        next(err);
    }
};

const updateIntellectualWithNewUser = async (req, res, next) => {
    try {
        const listId = new ObjectId(req.params.listId);
        const username = req.params.username;

        const user = await mongodb.getDatabase().db("challenging").collection('users').findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const response = await mongodb.getDatabase().db("challenging").collection('intellectual').updateOne(
            { _id: listId },
            { $addToSet: { users: user } }
        );
        // add new category to user.categories without having duplicates
        await usersController.updateUser({ ...user, categories: [...(new Set([...user.categories, "intellectual"]))] });

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error updating intellectual");
        }
    } catch (err) {
        next(err);
    }
};

const deleteIntellectual = async (req, res, next) => {
    try {
        const listId = new ObjectId(req.params.listId);
        const response = await mongodb.getDatabase().db("challenging").collection('intellectual').deleteOne({ _id: listId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error deleting intellectual");
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    createIntellectual,
    deleteIntellectual,
    updateIntellectual,
    getSingle,
    getUsersForIntellectual,
    updateIntellectualWithNewUser
};
