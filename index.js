const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'hey' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);


/**
 * In Package.json we have defined the engines for Herouku so that
 * it can run our app with specified verisons
 */