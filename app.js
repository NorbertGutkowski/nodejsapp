const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

const filePath = './data.json';

app.use(express.json());
app.use(express.static('public'));

function readData() {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

app.get('/fights', (req, res) => {
    const data = readData();
    res.json(data);
});

app.post('/add-fight', (req, res) => {
    const data = readData();
    const newFight = req.body;

    newFight.id = data.length ? data[data.length - 1].id + 1 : 1;

    data.push(newFight);
    writeData(data);
    res.status(201).send('Dodano nowego zawodnika i walki');
});

app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
