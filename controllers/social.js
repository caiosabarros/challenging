const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId
const usersController = require("./users");

const getAll = async (req, res) => {
    // find all the lists of social challenges
    const result = await mongodb.getDatabase().db("challenging").collection("social").find();
    // return as a json
    result.toArray().then((social) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(social)
    })
}

const getUsersForSocial = async (req, res) => {
    // find all the lists of social challenges
    const socialLists = await mongodb.getDatabase().db("challenging").collection("social").find();
    // get all the users from each social list
    const allSocialUsers = socialLists.flatMap((socialList) => socialList.users || []);
    console.log("allSocialUsers", allSocialUsers);
    // return as a json
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(allSocialUsers);
}

const getSingle = async (req, res) => {
    // get list identifier
    const socialListId = new ObjectId(req.params.listId);
    // find the correlated list
    const result = await mongodb.getDatabase().db("challenging").collection('social').find({ id: socialListId });
    // return it.
    result.toArray().then((social) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(social[0]);
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
const createSocial = async (req, res) => {
    const social = {
        users: [], // new list will be an empty list
        dailyChallenges: socialList.dailyChallenges,
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
}

const updateSocial = async (req, res) => {
    const listId = new ObjectId(req.params.listId);

    const social = {
        users: req.body.users,
        dailyChallenges: req.body.dailyChallenges,
        listDifficulty: req.body.listDifficulty,
        title: req.body.title,
        description: req.body.description,
    };
    const response = await mongodb.getDatabase().db("challenging").collection('social').replaceOne({ id: listId }, social);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error updating social");
    }
}

const updateSocialWithNewUser = async (req, res) => {
    const listId = new ObjectId(req.params.listId);
    const username = req.params.username;
    const user = await mongodb.getDatabase().db("challenging").collection('social').find({ id: socialListId });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const socialList = await this.getSingle(listId);

    const social = {
        users: [...socialList.users, user],
        dailyChallenges: req.body.dailyChallenges,
        listDifficulty: req.body.listDifficulty,
        title: req.body.title,
        description: req.body.description,
    };
    const response = await mongodb.getDatabase().db("challenging").collection('social').updateOne({ _id: listId }, { $addToSet: { users: user } });
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error updating social");
    }
}

const deleteSocial = async (req, res) => {
    const listId = new ObjectId(req.params.listId);
    const response = await mongodb.getDatabase().db("challenging").collection('social').deleteOne({ id: listId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error deleting social");
    }
}



module.exports = { getAll, createSocial, deleteSocial, updateSocial, getSingle, getUsersForSocial, updateSocialWithNewUser }