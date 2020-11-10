var http = require('http')
const axios = require('axios')

var servidor = http.createServer(function (req, res) {
    console.log('METHOD: ' + req.method + ' ' + req.url)
    if(req.method == 'GET'){
        if(req.url == "/"){
            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            })
            res.write('<h2>Escola de Música</h2>')
            res.write('<ul>')
            res.write('<li><a href="http://localhost:3001/alunos">LISTA DE ALUNOS</a></li>')
            res.write('<li><a href="http://localhost:3001/cursos">LISTA DE CURSOS</a></li>')
            res.write('<li><a href="http://localhost:3001/instrumentos">LISTA DE INSTRUMENTOS</a></li>')
            res.write('</ul>')
            res.end()
        }
        else if(req.url == '/alunos'){
            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            })
            axios.get('http://localhost:3000/alunos')
                .then(resp => {
                    alunos = resp.data;
                    res.write('<h2>LISTA DE ALUNOS</h2>')
                    res.write('<ul>')
                    alunos.forEach(a => {
                        res.write('<a href="http://localhost:3001/alunos/' + a.id + '"><li>ID: ' + a.id + ' NOME: ' + a.nome + '</li></a>')
                    });
                    res.write('</ul>')
                    res.write('<a href="http://localhost:3001"><h2>VOLTAR AO INICIO</h2></a>')
                    res.end()
                })
                .catch(error => {
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    })
                    res.write('<p>NAO CONSEGUI OBTER A LISTA DE ALUNOS</p>')
                    res.end()
                });
        }
        else if (req.url.split("/")[1] == "alunos" && req.url.split("/")[2] != null) {
            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            })
            axios.get('http://localhost:3000/alunos/' + req.url.split("/")[2])
                .then(resp => {
                    aluno = resp.data;
                    res.write('<p>ID: ' + aluno.id + '</p>')
                    res.write('<p>NOME: ' + aluno.nome + '</p>')
                    res.write('<p>DATA DE NASCIMENTO: ' + aluno.dataNasc + '</p>')
                    res.write('<p>CURSO: ' + aluno.curso + '</p>')
                    res.write('<p>ANO DO CURSO: ' + aluno.anoCurso + '</p>')
                    res.write('<p>INSTRUMENTO: ' + aluno.instrumento + '</p>')
                    res.write('<a href="http://localhost:3001/alunos"><h2>VOLTAR AO INDICE</h2></a>')
                    res.end()
                })
                .catch(error => {
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    })
                    res.write('<p>NAO CONSEGUI OBTER O ALUNO</p>')
                    res.end()
                });
        }
        else if (req.url == '/cursos') {
            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            })
            axios.get('http://localhost:3000/cursos')
                .then(resp => {
                    cursos = resp.data;
                    res.write('<h2>LISTA DE CURSOS</h2>')
                    res.write('<ul>')
                    cursos.forEach(c => {
                        res.write('<a href="http://localhost:3001/cursos/' + c.id + '"><li>ID: ' + c.id + ' NOME: ' + c.designacao + '</li></a>')
                    });
                    res.write('</ul>')
                    res.write('<a href="http://localhost:3001"><h2>VOLTAR AO INICIO</h2></a>')
                    res.end()
                })
                .catch(error => {
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    })
                    res.write('<p>NAO CONSEGUI OBTER A LISTA DE CURSOS</p>')
                    res.end()
                });
        }
        else if (req.url.split("/")[1] == "cursos" && req.url.split("/")[2] != null) {
            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            })
            axios.get('http://localhost:3000/cursos/' + req.url.split("/")[2])
                .then(resp => {
                    curso = resp.data;
                    res.write('<p>ID: ' + curso.id + '</p>')
                    res.write('<p>NOME: ' + curso.designacao + '</p>')
                    res.write('<p>DURAÇÃO: ' + curso.duracao + '</p>')
                    res.write('<a href="http://localhost:3001/instrumentos/' + curso.instrumento.id + '"><p>INSTRUMENTO: ' + curso.instrumento.id + '</p></a>')
                    res.write('<a href="http://localhost:3001/cursos"><h2>VOLTAR AO INDICE</h2></a>')
                    res.end()
                })
                .catch(error => {
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    })
                    res.write('<p>NAO CONSEGUI OBTER O CURSO</p>')
                    res.end()
                });
        }
        else if (req.url == '/instrumentos') {
            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            })
            axios.get('http://localhost:3000/instrumentos')
                .then(resp => {
                    instrumentos = resp.data;
                    res.write('<h2>LISTA DE INSTRUMENTOS</h2>')
                    res.write('<ul>')
                    instrumentos.forEach(i => {
                        res.write('<a href="http://localhost:3001/instrumentos/' + i.id + '"><li>ID: ' + i.id + ' NOME: ')
                        for (key in i) {
                            if (i.hasOwnProperty(key) && key == '#text') {
                                var value = i[key];
                                res.write(value)
                            }
                        }
                        res.write('</li></a>')
                        
                    });
                    res.write('</ul>')
                    res.write('<a href="http://localhost:3001"><h2>VOLTAR AO INICIO</h2></a>')
                    res.end()
                })
                .catch(error => {
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    })
                    res.write('<p>NAO CONSEGUI OBTER A LISTA DE INSTRUMENTOS</p>')
                    res.end()
                });
        }
        else if (req.url.split("/")[1] == "instrumentos" && req.url.split("/")[2] != null) {
            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            })
            axios.get('http://localhost:3000/instrumentos/' + req.url.split("/")[2])
                .then(resp => {
                    instrumento = resp.data;
                    res.write('<p>ID: ' + instrumento.id + '</p>')
                    for (key in instrumento) {
                        if (instrumento.hasOwnProperty(key) && key == '#text') {
                            var value = instrumento[key];
                            res.write('<p>NOME: ' + value + '</p>')
                        }
                    }
                    res.write('<a href="http://localhost:3001/instrumentos"><h2>VOLTAR AO INDICE</h2></a>')
                    res.end()
                })
                .catch(error => {
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    })
                    res.write('<p>NAO CONSEGUI OBTER O INSTRUMENTO</p>')
                    res.end()
                });
        }
        else {
            res.writeHead(200, {
                "Content-Type": "text/html"
            })
            res.write('<p>URL NAO CONHECIDO ' + req.url + '</p>')
            res.end()
        }
    }
    else {
        res.writeHead(200, {
            "Content-Type": "text/html"
        })
        res.write('<p>PEDIDO NAO SUPORTADO: ' + req.method + '</p>')
        res.end()
    }
})
servidor.listen(3001)
console.log("A ESCUTA NA PORTA 3001...")