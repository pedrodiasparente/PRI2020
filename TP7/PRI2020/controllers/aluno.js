var Aluno = require('../models/aluno')

module.exports.listar = () => {
    return Aluno
        .find()
        .exec()
}

module.exports.consultar = id => {
    return Alunos
        .findOne({ _id: id })
        .exec()
}

module.exports.inserir = a => {
    var novo = new Aluno(a)
    return novo.save()
}