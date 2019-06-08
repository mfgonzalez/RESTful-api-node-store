var express = require('express');
var router = express.Router();
const Store = require('data-store');
const store = new Store({ path: 'store.json' });
const util = require('util');
const URL = 'http://localhost:3000';

router.put('/', function(req, res, next) {
    let territorio = req.body;
    territorio.href = `${URL}/territorio/${territorio.nome}`;
    store.set(territorio.nome, territorio);
    
    res.setHeader('Content-Type', 'application/json');
    res.status(201);
    res.send(JSON.stringify(territorio));
});

router.get('/:nome', function(req, res, next) {
    let nome = req.params['nome'];
    let territorio = store.get(nome);
    res.setHeader('Content-Type', 'application/json');
    if (territorio) {
        res.status(200);
        res.send(JSON.stringify(territorio));
    } else {
        res.status(404);
        res.send('');
    }
});

module.exports = router;
