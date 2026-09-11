const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Vulnerability: Exposing sensitive information in console
    console.log(`Username: ${username}, Password: ${password}`);

    res.send(`<p>Welcome, ${username}!</p>`);
});

app.post('/search', (req, res) => {
    const query = req.body.query;

    // Vulnerability: Reflected XSS
    res.send(`<p>Search results for: ${query}</p>`);
});

app.post('/contact', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    // Vulnerability: Storing email addresses in server-side logs
    console.log(`Contact form submitted by: ${name}, Email: ${email}, Message: ${message}`);

    res.send(`<p>Thank you for your message, ${name}!</p>`);
});

app.post('/command', (req, res) => {
    const command = req.body.command;

    // Vulnerability: Use of eval() - Command Injection
    try {
        const result = eval(command);
        res.send(`<p>Command output: ${result}</p>`);
    } catch (error) {
        res.send(`<p>Error executing command: ${error.message}</p>`);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
