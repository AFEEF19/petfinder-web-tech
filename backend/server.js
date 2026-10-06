const express = require("express");
const session = require("express-session");
const cors = require("cors");
const db = require("./db");
const multer = require("multer");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(
    session({
        secret: "petfinder-secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);
app.use("/uploads", express.static("uploads"));

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

// Test route
app.get("/", (req, res) => {
    res.json({ message: "PetFinder backend is running!" });
});

// Add pet report
app.post("/api/pets", upload.single("image"), (req, res) => {

    const {
        pet_name,
        pet_type,
        breed,
        color,
        location,
        description,
        report_type,
        contact
    } = req.body || {};

    const image = req.file
        ? `/uploads/${req.file.filename}`
        : null;

    const sql = `
        INSERT INTO pet_reports
        (pet_name, pet_type, breed, color, location, description, report_type, contact, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        pet_name,
        pet_type,
        breed,
        color,
        location,
        description,
        report_type,
        contact,
        image
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            console.error("Database error:", err);

            return res.status(500).json({
                message: "Failed to add pet report"
            });
        }

        res.status(201).json({
            message: "Pet report added successfully!",
            id: result.insertId,
            image: image
        });
    });
});

// Get all pet reports
app.get("/api/pets", (req, res) => {

    const sql = "SELECT * FROM pet_reports ORDER BY created_at DESC";

    db.query(sql, (err, results) => {

        if (err) {
            console.error("Database error:", err);

            return res.status(500).json({
                message: "Failed to fetch pet reports"
            });
        }

        res.json(results);
    });
});
// Register user
app.post("/api/register", async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [name, email, hashedPassword],
            (err, result) => {

                if (err) {

                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(400).json({
                            message: "Email already registered"
                        });
                    }

                    console.error("Registration error:", err);

                    return res.status(500).json({
                        message: "Registration failed"
                    });
                }

                res.status(201).json({
                    message: "Registration successful"
                });
            }
        );

    } catch (error) {

        console.error("Password hashing error:", error);

        res.status(500).json({
            message: "Registration failed"
        });
    }
});
// Login user
app.post("/api/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {

        if (err) {
            console.error("Login error:", err);

            return res.status(500).json({
                message: "Login failed"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = results[0];

        try {

            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            // Create session
            req.session.userId = user.id;
            req.session.userName = user.name;
            req.session.userEmail = user.email;

            res.json({
                message: "Login successful",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });

        } catch (error) {

            console.error("Password comparison error:", error);

            res.status(500).json({
                message: "Login failed"
            });
        }
    });
});

// Check current session
app.get("/api/session", (req, res) => {

    if (!req.session.userId) {

        return res.status(401).json({
            message: "Not authenticated"
        });

    }

    res.json({
        user: {
            id: req.session.userId,
            name: req.session.userName,
            email: req.session.userEmail
        }
    });

});
// Logout user
app.post("/api/logout", (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            console.error("Logout error:", err);

            return res.status(500).json({
                message: "Logout failed"
            });
        }

        res.clearCookie("connect.sid");

        res.json({
            message: "Logout successful"
        });
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});