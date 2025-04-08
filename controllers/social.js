const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const usersController = require("./users");

const getAll = async (req, res, next) => {
    try {
        const result = await mongodb.getDatabase().db("challenging").collection("social").find();
        result.toArray().then((social) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(social);
        });
    } catch (err) {
        next(err);
    }
};

const getUsersForSocial = async (req, res, next) => {
    try {
        const socialListsCursor = await mongodb.getDatabase().db("challenging").collection("social").find();
        const socialLists = await socialListsCursor.toArray();
        const allSocialUsers = socialLists.flatMap((socialList) => socialList.users || []);
        console.log("allSocialUsers", allSocialUsers);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(allSocialUsers);
    } catch (err) {
        next(err);
    }
};

const getSingle = async (req, res, next) => {
    try {
        const socialListId = new ObjectId(req.params.listId);
        const result = await mongodb.getDatabase().db("challenging").collection('social').find({ _id: socialListId });
        result.toArray().then((social) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(social[0]);
        });
    } catch (err) {
        next(err);
    }
};

const createSocial = async (req, res, next) => {
    try {
        const social = {
            users: [],
            dailyChallenges: req.body.dailyChallenges,
            listDifficulty: req.body.listDifficulty,
            title: req.body.title,
            description: req.body.description,
        };

        const response = await mongodb.getDatabase().db("challenging").collection('social').insertOne(social);
        if (response.acknowledged > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error creating social");
        }
    } catch (err) {
        next(err);
    }
};

const updateSocial = async (req, res, next) => {
    try {
        const listId = new ObjectId(req.params.listId);

        const social = {
            users: req.body.users,
            dailyChallenges: req.body.dailyChallenges,
            listDifficulty: req.body.listDifficulty,
            title: req.body.title,
            description: req.body.description,
        };

        const response = await mongodb.getDatabase().db("challenging").collection('social').replaceOne({ _id: listId }, social);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error updating social");
        }
    } catch (err) {
        next(err);
    }
};

const updateSocialWithNewUser = async (req, res, next) => {
    try {
        const listId = new ObjectId(req.params.listId);
        const username = req.params.username;

        const user = await mongodb.getDatabase().db("challenging").collection('users').findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const response = await mongodb.getDatabase().db("challenging").collection('social').updateOne(
            { _id: listId },
            { $addToSet: { users: user } }
        );

        // add new category to user.categories without having duplicates
        await mongodb.getDatabase().db("challenging").collection('users').updateOne(
            { username },
            { $addToSet: { categories: "social" } }
        );

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error updating social");
        }
    } catch (err) {
        next(err);
    }
};

const deleteSocial = async (req, res, next) => {
    try {
        const listId = new ObjectId(req.params.listId);
        const response = await mongodb.getDatabase().db("challenging").collection('social').deleteOne({ _id: listId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Error deleting social");
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    createSocial,
    deleteSocial,
    updateSocial,
    getSingle,
    getUsersForSocial,
    updateSocialWithNewUser
};
