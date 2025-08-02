const cartService = require('../services/cartServices');

exports.getCartForUser = (req, res, next) => {
    try {
        const { userId } = req.params;
        const result = cartService.getCartForUser(userId);
        res.send(result);
    } catch (err) {
        next(err);
    }
};

exports.addProductToCart = (req, res, next) => {
    try {
        const { userId } = req.params;
        const result = cartService.addProductToCart(userId); 
        res.send(result);
    } catch (err) {
        next(err);
    }
};
