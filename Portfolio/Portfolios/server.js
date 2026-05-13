const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'portfolio.html'));
});

app.listen(1200, '0.0.0.0', () => {
    console.log('Servidor rodando na porta 1200');
});