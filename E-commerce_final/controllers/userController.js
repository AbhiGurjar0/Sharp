const userService = require('../services/userServices.js');

exports.getAllUsers = (req, res, next) => {
    try {
        const result = userService.getAllUsers();
        res.send(result);
    } catch (err) {
        next(err);
    }
};

exports.addUser = (req, res, next) => {
    try {
        const userData = req.body;
        const result = userService.addUser(userData);
        res.send(result);
    } catch (err) {
        next(err);
    }
};

exports.getUserById = (req, res, next) => {
    try {
        const { id } = req.params;
        const result = userService.getUserById(id);
        res.send(result);
    } catch (err) {
        next(err);
    }
};
