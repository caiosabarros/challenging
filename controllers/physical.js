const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId
const usersController = require("./users");

const getAll = async (req, res) => {
    // find all the lists of physical challenges
    const result = await mongodb.getDatabase().db("challenging").collection("physical").find();
    // return as a json
    result.toArray().then((physical) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(physical)
    })
}

const getUsersForPhysical = async (req, res) => {
    // find all the lists of physical challenges
    const physicalLists = await mongodb.getDatabase().db("challenging").collection("physical").find();
    // get all the users from each physical list
    const allPhysicalUsers = physicalLists.flatMap((physicalList) => physicalList.users || []);
    console.log("allPhysicalUsers", allPhysicalUsers);
    // return as a json
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(allPhysicalUsers);
}

const getSingle = async (req, res) => {
    // get list identifier
    const physicalListId = new ObjectId(req.params.listId);
    // find the correlated list
    const result = await mongodb.getDatabase().db("challenging").collection('physical').find({ _id: physicalListId });
    // return it.
    result.toArray().then((physical) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(physical[0]);
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
const createPhysical = async (req, res) => {
    const physical = {
        users: [], // new list will be an empty list
        dailyChallenges: physicalList.dailyChallenges,
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
}

const updatePhysical = async (req, res) => {
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
}

const updatePhysicalWithNewUser = async (req, res) => {
    const listId = new ObjectId(req.params.listId);
    const username = req.params.username;
    const user = await mongodb.getDatabase().db("challenging").collection('physical').find({ _id: physicalListId });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const physicalList = await this.getSingle(listId);

    const physical = {
        users: [...physicalList.users, user],
        dailyChallenges: req.body.dailyChallenges,
        listDifficulty: req.body.listDifficulty,
        title: req.body.title,
        description: req.body.description,
    };
    const response = await mongodb.getDatabase().db("challenging").collection('physical').updateOne({ _id: listId }, { $addToSet: { users: user } });
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error updating physical");
    }
}

const deletePhysical = async (req, res) => {
    const listId = new ObjectId(req.params.listId);
    const response = await mongodb.getDatabase().db("challenging").collection('physical').deleteOne({ _id: listId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error deleting physical");
    }
}



module.exports = { getAll, createPhysical, deletePhysical, updatePhysical, getSingle, getUsersForPhysical, updatePhysicalWithNewUser }