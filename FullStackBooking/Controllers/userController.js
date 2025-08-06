const User = require('../models/users');

exports.createUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const user = await User.create({ name, email, phone });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllUsers = async (_, res) => {
    const users = await User.findAll();
    if (!users) return res.json({ message: "NO user Found" })
    return res.json(users);
};
exports.getUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.json({ message: "NO user Found" })
    return res.json(user);
};


exports.deleteUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        const { name, email, phone } = req.body;
        user.name = name;
        user.email = email;
        user.phone = phone;
        await user.save();
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
