const express = require("express");
const { User } = require("../models/index");

const { authenticateToken } = require("../middlewares/authentication");

const router = express.Router();

router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    const user = await User.findByPk(userId, {attributes: {exclude:['password', 'createdAt', 'updatedAt']}});

    if (!user) {
        return res.sendStatus(404);
    }

    res.json(user);
})

module.exports = router