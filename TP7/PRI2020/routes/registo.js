var express = require('express');
var express = require('express');
var router = express.Router();

const aluno = require('../controllers/aluno')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('registo', { title: 'Registo de Aluno' });
});

router.post('/', function(req,res) {
  aluno.inserir({ Número: req.body.numero, Nome: req.body.nome, Git: req.body.git, tpc: [] })
    .then(response => {
        res.render('registado', { nome: req.body.nome})
    })
    .catch(e => res.render('error', { error: e }))
})

module.exports = router;
