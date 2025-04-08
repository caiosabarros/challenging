const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId
const usersController = require("./users");

const getAll = async (req, res) => {
    // find all the lists of intellectual challenges
    const result = await mongodb.getDatabase().db("challenging").collection("intellectual").find();
    // return as a json
    result.toArray().then((intellectual) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(intellectual)
    })
}

const getUsersForIntellectual = async (req, res) => {
    // find all the lists of intellectual challenges
    const intellectualLists = await mongodb.getDatabase().db("challenging").collection("intellectual").find();
    // get all the users from each intellectual list
    const allIntellectualUsers = intellectualLists.flatMap((intellectualList) => intellectualList.users || []);
    console.log("allIntellectualUsers", allIntellectualUsers);
    // return as a json
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(allIntellectualUsers);
}

const getSingle = async (req, res) => {
    // get list identifier
    const intellectualListId = new ObjectId(req.params.listId);
    // find the correlated list
    const result = await mongodb.getDatabase().db("challenging").collection('intellectual').find({ id: intellectualListId });
    // return it.
    result.toArray().then((intellectual) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(intellectual[0]);
    });
};

/**
 * id = ObjectId
 * users = []
 * dailyChallenges = []
 * listDifficulty = number
 * description =
 * title = 
 */
const createIntellectual = async (req, res) => {
    const intellectual = {
        users: [], // new list will be an empty list
        dailyChallenges: intellectualList.dailyChallenges,
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
}

const updateIntellectual = async (req, res) => {
    const listId = new ObjectId(req.params.listId);

    const intellectual = {
        users: req.body.users,
        dailyChallenges: req.body.dailyChallenges,
        listDifficulty: req.body.listDifficulty,
        title: req.body.title,
        description: req.body.description,
    };
    const response = await mongodb.getDatabase().db("challenging").collection('intellectual').replaceOne({ id: listId }, intellectual);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error updating intellectual");
    }
}

const updateIntellectualWithNewUser = async (req, res) => {
    const listId = new ObjectId(req.params.listId);
    const username = req.params.username;
    const user = await mongodb.getDatabase().db("challenging").collection('intellectual').find({ id: intellectualListId });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const intellectualList = await this.getSingle(listId);

    const intellectual = {
        users: [...intellectualList.users, user],
        dailyChallenges: req.body.dailyChallenges,
        listDifficulty: req.body.listDifficulty,
        title: req.body.title,
        description: req.body.description,
    };
    const response = await mongodb.getDatabase().db("challenging").collection('intellectual').updateOne({ _id: listId }, { $addToSet: { users: user } });
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error updating intellectual");
    }
}

const deleteIntellectual = async (req, res) => {
    const listId = new ObjectId(req.params.listId);
    const response = await mongodb.getDatabase().db("challenging").collection('intellectual').deleteOne({ id: listId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error deleting intellectual");
    }
}



module.exports = { getAll, createIntellectual, deleteIntellectual, updateIntellectual, getSingle, getUsersForIntellectual, updateIntellectualWithNewUser }