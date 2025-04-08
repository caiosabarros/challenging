const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const usersController = require("./users");

const getAll = async (req, res, next) => {
    try {
        const result = await mongodb.getDatabase().db("challenging").collection("emotional").find();
        result.toArray().then((emotional) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(emotional);
        });
    } catch (err) {
        next(err);
    }
};

const getUsersForEmotional = async (req, res, next) => {
    try {
        const emotionalListsCursor = await mongodb.getDatabase().db("challenging").collection("emotional").find();
        const emotionalLists = await emotionalListsCursor.toArray();
        const allEmotionalUsers = emotionalLists.flatMap((emotionalList) => emotionalList.users || []);
        console.log("allEmotionalUsers", allEmotionalUsers);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(allEmotionalUsers);
    } catch (err) {
        next(err);
    }
};

const getSingle = async (req, res, next) => {
    try {
        const emotionalListId = new ObjectId(req.params.listId);
        const result = await mongodb.getDatabase().db("challenging").collection('emotional').find({ _id: emotionalListId });
        result.toArray().then((emotional) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(emotional[0]);
        });
    } catch (err) {
        next(err);
    }
};

const createEmotional = async (req, res, next) => {
    try {
        const emotional = {
            users: [],
            dailyChallenges: req.body.dailyChallenges,
            listDifficulty: req.body.listDifficulty,
            title: req.body.title,
            description: req.body.description,
        };

        const response = await mongodb.getDatabase().db("challenging").collection('emotional').insertOne(emotional);
        if (response.acknowledged > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error creating emotional");
        }
    } catch (err) {
        next(err);
    }
};

const updateEmotional = async (req, res, next) => {
    try {
        const listId = new ObjectId(req.params.listId);

        const emotional = {
            users: req.body.users,
            dailyChallenges: req.body.dailyChallenges,
            listDifficulty: req.body.listDifficulty,
            title: req.body.title,
            description: req.body.description,
        };

        const response = await mongodb.getDatabase().db("challenging").collection('emotional').replaceOne({ _id: listId }, emotional);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error updating emotional");
        }
    } catch (err) {
        next(err);
    }
};

const updateEmotionalWithNewUser = async (req, res, next) => {
    try {
        const listId = new ObjectId(req.params.listId);
        const username = req.params.username;

        const user = await mongodb.getDatabase().db("challenging").collection('users').findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const response = await mongodb.getDatabase().db("challenging").collection('emotional').updateOne(
            { _id: listId },
            { $addToSet: { users: user } }
        );

        // add new category to user.categories without having duplicates
        await usersController.updateUser({ ...user, categories: [...(new Set([...user.categories, "emotional"]))] });

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error updating emotional");
        }
    } catch (err) {
        next(err);
    }
};

const deleteEmotional = async (req, res, next) => {
    try {
        const listId = new ObjectId(req.params.listId);
        const response = await mongodb.getDatabase().db("challenging").collection('emotional').deleteOne({ _id: listId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error deleting emotional");
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    createEmotional,
    deleteEmotional,
    updateEmotional,
    getSingle,
    getUsersForEmotional,
    updateEmotionalWithNewUser
};
