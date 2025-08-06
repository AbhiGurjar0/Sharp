const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.delete('/:id', userController.deleteUser);
router.put('/update/:id', userController.updateUser);


module.exports = router;
