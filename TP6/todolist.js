var http = require('http')
var axios = require('axios')
var fs = require('fs')

var static = require('./static.js')

var { parse } = require("querystring")

function recuperaInfo(request, callback) {
    if (request.headers['content-type'] == 'application/x-www-form-urlencoded') {
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', () => {
            console.log(body)
            callback(parse(body))
        })
    }
}


function geraFormNovaTarefa(d){
    return `
    <html>
    <head>
        <title>To Do List</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="/public/w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Registo de uma nova Tarefa em ${d}</h1>
            </header>

            <form class="w3-container" action="/" method="POST">
                <label class="w3-text-teal"><b>Descricao</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">
          
                <label class="w3-text-teal"><b>Responsavel</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="responsavel">

                <label class="w3-text-teal"><b>Data Limite</b></label>
                <input class="w3-input w3-border w3-light-grey" type="date" name="data-limite">

                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>

            
        </div>
    `
}

function geraListaTarefas(tarefas){
    let pagHTML = `
        <header class="w3-container w3-teal">
            <h1>Lista de Tarefas</h1>
        </header>
    </body>
    </html>
    `
    return pagHTML
}

var server = http.createServer(function (req,res) {
    var d = new Date().toISOString().substr(0, 16)
    console.log('Method: ' + req.method + ' url: ' + req.url)


    if (static.recursoEstatico(req)) {
        static.sirvoRecursoEstatico(req, res)
    }
    else{
        switch (req.method) {
            case "GET":
                // GET / --------------------------------------------------------------------
                if (req.url == "/") {
                    axios.get("http://localhost:3000/tarefas?_sort=data-limite,responsavel&_order=asc,desc")
                        .then(response => {
                            var tarefas = response.data

                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write(geraFormNovaTarefa(d))
                            res.write(geraListaTarefas(tarefas))
                            res.end()
                        })
                        .catch(function (erro) {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Não foi possível obter a lista de alunos...")
                            res.end()
                        })
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                    res.end()
                }
                break
            case "POST":
                // POST / --------------------------------------------------------------------
                if (req.url == "/") {
                    recuperaInfo(req, function (info) {
                        console.log('POST de tarefa: ' + JSON.stringify(info))
                        axios.post('http://localhost:3000/tarefas', info)
                            .then(resp => {
                                axios.get("http://localhost:3000/tarefas?_sort=data-limite,responsavel&_order=asc,desc")
                                    .then(response => {
                                        var tarefas = response.data

                                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                        res.write(geraFormNovaTarefa(d))
                                        res.end()
                                    })
                                    .catch(function (erro) {
                                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                        res.write("<p>Não foi possível obter a lista de alunos...")
                                        res.end()
                                    })
                            })
                            .catch(erro => {
                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                res.write('<p>Erro no POST ' + erro + '</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                    })
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                    res.end()
                }
                break
            default:
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                res.write("<p>" + req.method + " não suportado neste serviço.</p>")
                res.end()
        }
    }
})
server.listen(7777)
console.log("listening on 7777")