var Aluno = require('../models/aluno')

module.exports.listar = () => {
    return Aluno
        .find()
        .exec()
}

module.exports.consultar = id => {
    return Aluno
        .findOne({ Número: id })
        .exec()
}

module.exports.inserir = a => {
    var novo = new Aluno(a)
    return novo.save()
}

module.exports.update = a => {
    return Aluno.findOne({ Número: a.Número }, function (err, doc) {
        doc.Nome = a.Nome
        doc.Git = a.Git
        doc.tpc = a.tpc
        doc.save()
    });
}

module.exports.delete = id => {
    return Aluno.remove({ Número: id})
}