var express = require('express');
var router = express.Router();

const aluno = require('../controllers/aluno')

/* GET home page. */
router.get('/', function(req, res, next) {
  aluno.listar()
    .then(dados => res.render('index', { lista: dados, title: 'Lista de Alunos' }))
    .catch(e => res.render('error', { error: e }))
});

module.exports = router;
