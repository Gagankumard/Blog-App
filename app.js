const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port=3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = []; // Array to hold posts in memory

// Route to display all posts
app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

// Route to display form to create a new post
app.get('/new', (req, res) => {
    res.render('new');
});

// Route to handle new post submission
app.post('/new', (req, res) => {
    const post = {
        id: Date.now().toString(),
        title: req.body.title,
        content: req.body.content
    };
    posts.push(post);
    res.redirect('/');
});

// Route to display edit form
app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    res.render('edit', { post: post });
});

// Route to handle edit submission
app.post('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect('/');
});

// Route to handle post deletion
app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id !== req.params.id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
