const express = require("express");
const exe = require("./../conn");
const path = require("path");
const route = express.Router();
const router = express.Router(); // ✅ THIS is what you're missing

// Home Page
route.get("/", (req, res) => {
    res.render("admin/home.ejs");
});

// Hero Section

// Save Hero
route.post("/save_hero", async (req, res) => {
    const d = req.body;
    const photo = new Date().getTime() + ".jpg";
    req.files.photo.mv("public/" + photo);

    const sql = `INSERT INTO hero_section (title, sub_title, details, photo) VALUES (?, ?, ?, ?)`;
    await exe(sql, [d.title, d.sub_title, d.details, photo]);

    res.redirect("/admin/hero");
});

// Show Hero List
route.get("/hero", async (req, res) => {
    const sql = `SELECT * FROM hero_section`;
    const data = await exe(sql);
    res.render("admin/hero.ejs", { list_hero: data });
});

// Edit Hero
route.get("/edit_hero/:id", async (req, res) => {
    const sql = `SELECT * FROM hero_section WHERE hero_id='${req.params.id}'`;
    const data = await exe(sql);
    res.render("admin/hero_edit.ejs", { data });
});

// Update Hero
route.post("/update_hero", async (req, res) => {
    const d = req.body;

    if (req.files && req.files.photo) {
        const photo = new Date().getTime() + ".jpg";
        req.files.photo.mv("public/" + photo);
        const sqlPhoto = `UPDATE hero_section SET photo=? WHERE hero_id='${d.hero_id}'`;
        await exe(sqlPhoto, [photo]);
    }

    const sql = `UPDATE hero_section SET title=?, sub_title=?, details=? WHERE hero_id=?`;
    await exe(sql, [d.title, d.sub_title, d.details, d.hero_id]);

    res.redirect("/admin/hero");
});

// Delete Hero
route.get("/hero_delete/:id", async (req, res) => {
    const sql = `DELETE FROM hero_section WHERE hero_id='${req.params.id}'`;
    await exe(sql);
    res.redirect("/admin/hero");
});

// About Section

// Show About
route.get("/about", async (req, res) => {
    const sql = `SELECT * FROM about_me`;
    const data = await exe(sql);
    res.render("admin/about.ejs", { data });
});

// Save About
route.post("/save_about", async (req, res) => {
    const d = req.body;
    const photo = new Date().getTime() + ".jpg";
    req.files.photo.mv("public/" + photo);

    const sql = `INSERT INTO about_me (details, photo) VALUES (?, ?)`;
    await exe(sql, [d.details, photo]);

    res.redirect("/admin/about");
});

// Delete About
route.get("/delete_about/:id", async (req, res) => {
    const sql = `DELETE FROM about_me WHERE about_id='${req.params.id}'`;
    await exe(sql);
    res.redirect("/admin/about");
});

// Edit About
route.get("/edit_about/:id", async (req, res) => {
    const sql = `SELECT * FROM about_me WHERE about_id='${req.params.id}'`;
    const data = await exe(sql);
    res.render("admin/edit_about.ejs", { data });
});

// Update About
route.post("/update_about", async (req, res) => {
    const d = req.body;

    if (req.files && req.files.photo) {
        const photo = new Date().getTime() + ".jpg";
        req.files.photo.mv("public/" + photo);
        const sqlPhoto = `UPDATE about_me SET photo=? WHERE about_id='${d.about_id}'`;
        await exe(sqlPhoto, [photo]);
    }

    const sql = `UPDATE about_me SET details=? WHERE about_id=?`;
    await exe(sql, [d.details, d.about_id]);

    res.redirect("/admin/about");
});

// Skills Section

// Save Skills
route.post("/save_skills", async (req, res) => {
    const d = req.body;
    const sql = `INSERT INTO skills (skill_type, technologies) VALUES (?, ?)`;
    await exe(sql, [d.skills_type, d.technologies]);
    res.redirect("/admin/skills");
});

// Show Skills
route.get("/skills", async (req, res) => {
    const sql = `SELECT * FROM skills`;
    const data = await exe(sql);
    res.render("admin/skills.ejs", { data });
});

// Delete Skills
route.get("/delete_skills/:id", async (req, res) => {
    const sql = `DELETE FROM skills WHERE skill_id='${req.params.id}'`;
    await exe(sql);
    res.redirect("/admin/skills");
});

// Edit Skills
route.get("/edit_skills/:id", async (req, res) => {
    const sql = `SELECT * FROM skills WHERE skill_id='${req.params.id}'`;
    const data = await exe(sql);
    res.render("admin/edit_skills.ejs", { data });
});

// Update Skills
route.post("/update_skills", async (req, res) => {
    const d = req.body;
    const sql = `UPDATE skills SET skill_type=?, technologies=? WHERE skill_id=?`;
    await exe(sql, [d.skills_type, d.technologies, d.skill_id]);
    res.redirect("/admin/skills");
});

// Other Pages (Static)

route.get("/service", (req, res) => {
    res.render("admin/service.ejs");
});

route.get("/projects", (req, res) => {
    res.render("admin/projects.ejs");
});

route.get("/education", (req, res) => {
    res.render("admin/education.ejs");
});

route.get("/contact", (req, res) => {
    res.render("admin/contact.ejs");
});


// Show login page
router.get("/login", (req, res) => {
    res.render("admin/login"); // Make sure the file is in views/admin/login.ejs
});

// Show login page
router.get("/login", (req, res) => {
    res.render("admin/login"); // Make sure the file is views/admin/login.ejs
});

// Handle login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Simple check (can connect with DB later)
    if (email === "admin@gmail.com" && password === "admin123") {
        res.send("Login successful!");
    } else {
        res.send("Invalid email or password.");
    }
});



module.exports = route;
