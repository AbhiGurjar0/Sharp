const Book = require('../models/book')
const path = require('path')
const dayjs = require("dayjs");
const Returned = require('../models/return');


exports.show = async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/HTML/index.html'));

}
exports.sendData = async (req, res) => {
    const books = await Book.findAll();

    books.forEach(book => {
        const dueDate = new Date(book.dueDate);
        const diffMs = new Date() - dueDate;
        const diffHrs = Math.max(0, Math.floor(diffMs / 1000 / 60 / 60));
        book.totalFine += (diffHrs * 100);
        
    });



    res.json(
        books
        ,


    );
}
exports.addbook = async (req, res) => {
    const { bookName } = req.body;

    const alloteDate = new Date();
    const dueDate = new Date(alloteDate);
    dueDate.setHours(alloteDate.getHours() + 1);
    const book = await Book.create({
        bookName,
        alloteDate,
        dueDate,

    })
    res.redirect('/');
}

exports.payFine = async (req, res) => {
    const { id } = req.body;
    const book = await Book.findByPk(id);
    const deleted = await Book.destroy({ where: { id: id } });
    const returned = await Returned.create({
        bookName: book.bookName,
        returnDate: new Date(),
        totalFine: book.totalFine,
    })
    const Allreturns = await Returned.findAll();

    return res.json(Allreturns);


}
exports.slip = async (req, res) => {

    const Allreturns = await Returned.findAll();

    return res.json(Allreturns);


}

