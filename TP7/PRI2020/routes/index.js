var express = require('express');
var router = express.Router();

const aluno = require('../controllers/aluno')

/* GET home page. */
router.get('/alunos', function(req, res, next) {
  aluno.listar()
    .then(dados => res.render('index', { lista: dados, title: 'Lista de Alunos' }))
    .catch(e => res.render('error', { error: e }))
});

router.post('/alunos', function (req, res) {
  aluno.inserir({ Número: req.body.numero, Nome: req.body.nome, Git: req.body.git, tpc: [] })
    .then(response => {
      aluno.listar()
        .then(dados => res.render('index', { lista: dados, title: 'Lista de Alunos' }))
        .catch(e => res.render('error', { error: e }))
    })
    .catch(e => res.render('error', { error: e }))
})

router.get(/\/alunos\/A[0-9]+/, function (req, res, next) {
  var id = req.url.split('/')[2]
  aluno.consultar(id)
    .then(aluno => res.render('aluno', { aluno: aluno, title: 'Detalhes de Aluno' }))
    .catch(e => res.render('error', { error: e }))
});

router.get('/alunos/editar', function (req, res, next) {
  var id = req.url.split('=')[1]
  aluno.consultar(id)
    .then(aluno => res.render('editar', { aluno: aluno, title: 'Editar Aluno' }))
    .catch(e => res.render('error', { error: e }))
});

router.post(/\/alunos\/A[0-9]+/, function (req, res, next) {
  var id = req.url.split('/')[2]
  console.log(id)
  aluno.update({ Número: id, Nome: req.body.nome, Git: req.body.git, tpc: [] })
    .then(response => {
      aluno.consultar(id)
        .then(aluno => res.render('aluno', { aluno: aluno, title: 'Detalhes de Aluno' }))
        .catch(e => res.render('error', { error: e }))
    })
    .catch(e => res.render('error', { error: e }))

});


module.exports = router;
