const express = require('express');
const axios = require('axios');
const public_users = express.Router();

public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:3000');
        const books = response.data.books;
        return res.status(200).json({ books: books });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

public_users.get('/isbn/:isbn', async function (req, res) {
    const { isbn } = req.params;
    try {
        const response = await axios.get(`http://localhost:3000/isbn/${isbn}`);
        const book = response.data.book;
        return res.status(200).json({ book: book });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ message: "Book not found" });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
});

public_users.get('/author/:author', async function (req, res) {
    const { author } = req.params;
    try {
        const response = await axios.get(`http://localhost:3000/author/${author}`);
        const books = response.data.books;
        return res.status(200).json({ books: books });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ message: "Author not found" });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
});

public_users.get('/title/:title', async function (req, res) {
    const { title } = req.params;
    try {
        const response = await axios.get(`http://localhost:3000/title/${title}`);
        const books = response.data.books;
        return res.status(200).json({ books: books });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ message: "Title not found" });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
});

module.exports.general = public_users;
