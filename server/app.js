const express = require('express');
const cors = require('cors');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(cors());

// SQLite Connection
const dbPath = path.resolve(__dirname, 'banking_db.sqlite');
const db = new sqlite3.Database(dbPath);

// Create users table
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
});

const router = express.Router();

router.post("/getdetails", (req, res) => {
    const { username, password } = req.body;

    db.serialize(() => {
        db.get(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`, (err, row) => {
            if (err) {
                res.status(500).send({ message: "Internal server error" });
                console.error(err);
            } else {
                if (row) {
                    res.status(200).send([row]);
                } else {
                    res.status(401).send({ message: "Wrong username/password combination!" });
                }
            }
        });
    });
});

router.post("/signup", (req, res) => {
    const { username, password } = req.body;

    db.serialize(() => {
        db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password], (err) => {
            if (err) {
                res.status(500).send({ message: "Internal server error" });
                console.error(err);
            } else {
                res.status(201).send({ message: "User created successfully" });
            }
        });
    });
});

app.use("/users", router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
