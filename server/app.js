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
    console.log("Received login request for username:", username, "and password:", password);

    db.serialize(() => {
        db.get(`SELECT * FROM users WHERE username=? AND password=?`, [username, password], (err, row) => {
            if (err) {
                res.status(500).send({ message: "Internal server error" });
                console.error(err);
            } else {
                console.log("Query result:", row);
                if (row) {
                    res.status(200).send({ message: "Login successful" });
                } else {
                    res.status(401).send({ message: "Invalid username or password" });
                }
            }
        });
    });
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log("Received login request for username:", username, "and password:", password);

    // Vulnerable to SQL injection!
    const sqlQuery = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;

    db.serialize(() => {
        db.get(sqlQuery, (err, row) => {
            if (err) {
                res.status(500).send({ message: "Internal server error" });
                console.error(err);
            } else {
                console.log("Query result:", row);
                if (row) {
                    res.status(200).send({ message: "Login successful" });
                } else {
                    res.status(401).send({ message: "Invalid username or password" });
                }
            }
        });
    });
});

// Using parameterized queries to avoid sql injection attack

// router.post("/login", (req, res) => {
//     const { username, password } = req.body;
//     console.log("Received login request for username:", username, "and password:", password);

//     db.serialize(() => {
//         db.get(`SELECT * FROM users WHERE username=? AND password=?`, [username, password], (err, row) => {
//             if (err) {
//                 res.status(500).send({ message: "Internal server error" });
//                 console.error(err);
//             } else {
//                 console.log("Query result:", row);
//                 if (row) {
//                     res.status(200).send({ message: "Login successful" });
//                 } else {
//                     res.status(401).send({ message: "Invalid username or password" });
//                 }
//             }
//         });
//     });
// });

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


router.get("/", (req, res) => {
    db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
            res.status(500).send({ message: "Internal server error" });
            console.error(err);
        } else {
            res.status(200).send(rows);
        }
    });
});

app.post('/api/payment', (req, res) => {
    const { cardNumber, expiryDate, cvv } = req.body;
    if (cardNumber && expiryDate && cvv) {
        res.status(200).json({ message: 'Payment successful' });
    } else {
        res.status(400).json({ error: 'Invalid payment details' });
    }
});


app.post('/echo', (req, res) => {
    const { userInput } = req.body;
    // Echo back the user input without sanitization
    res.status(200).send(userInput);
});


app.use("/users", router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
