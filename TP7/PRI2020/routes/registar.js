var express = require('express');
var express = require('express');
var router = express.Router();

const aluno = require('../controllers/aluno')

router.get('/', function(req, res, next) {
  res.render('registar', { title: 'Registo de Aluno' });
});

module.exports = router;
