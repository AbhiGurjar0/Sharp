
exports.getAllProducts = (req, res) => {
    res.send("Fetching all products");
};

exports.getProductById = (req, res) => {
    const { id } = req.params;
    res.send(`Fetching product with ID: ${id}`);
};

exports.addNewProduct = (req, res) => {
    res.send("Adding a new product");
};
