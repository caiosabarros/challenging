const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId
const usersController = require("./users");

const getAll = async (req, res) => {
    // find all the lists of emotional challenges
    const result = await mongodb.getDatabase().db("challenging").collection("emotional").find();
    // return as a json
    result.toArray().then((emotional) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(emotional)
    })
}

const getUsersForEmotional = async (req, res) => {
    // find all the lists of emotional challenges
    const emotionalLists = await mongodb.getDatabase().db("challenging").collection("emotional").find();
    // get all the users from each emotional list
    const allEmotionalUsers = emotionalLists.flatMap((emotionalList) => emotionalList.users || []);
    console.log("allEmotionalUsers", allEmotionalUsers);
    // return as a json
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(allEmotionalUsers);
}

const getSingle = async (req, res) => {
    // get list identifier
    const emotionalListId = new ObjectId(req.params.listId);
    // find the correlated list
    const result = await mongodb.getDatabase().db("challenging").collection('emotional').find({ _id: emotionalListId });
    // return it.
    result.toArray().then((emotional) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(emotional[0]);
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
const createEmotional = async (req, res) => {
    const emotional = {
        users: [], // new list will be an empty list
        dailyChallenges: emotionalList.dailyChallenges,
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
}

const updateEmotional = async (req, res) => {
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
}

const updateEmotionalWithNewUser = async (req, res) => {
    const listId = new ObjectId(req.params.listId);
    const username = req.params.username;
    const user = await mongodb.getDatabase().db("challenging").collection('emotional').find({ _id: emotionalListId });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const emotionalList = await this.getSingle(listId);

    const emotional = {
        users: [...emotionalList.users, user],
        dailyChallenges: req.body.dailyChallenges,
        listDifficulty: req.body.listDifficulty,
        title: req.body.title,
        description: req.body.description,
    };
    const response = await mongodb.getDatabase().db("challenging").collection('emotional').updateOne({ _id: listId }, { $addToSet: { users: user } });
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error updating emotional");
    }
}

const deleteEmotional = async (req, res) => {
    const listId = new ObjectId(req.params.listId);
    const response = await mongodb.getDatabase().db("challenging").collection('emotional').deleteOne({ _id: listId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error deleting emotional");
    }
}



module.exports = { getAll, createEmotional, deleteEmotional, updateEmotional, getSingle, getUsersForEmotional, updateEmotionalWithNewUser }