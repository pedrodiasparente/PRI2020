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
            callback(parse(body))
        })
    }
}


function geraFormNovaTarefa(){
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
                <h1>Registo de uma nova Tarefa</h1>
            </header>

            <form class="w3-container" action="/" method="POST">
                <label class="w3-text-teal"><b>Descricao</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">
          
                <label class="w3-text-teal"><b>Responsavel</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="responsavel">

                <label class="w3-text-teal"><b>Data Limite</b></label>
                <input class="w3-input w3-border w3-light-grey" type="date" name="datalimite">

                <input type="hidden" name="resolvido" value="false"/>
                <input type="hidden" name="cancelado" value="false"/>

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

        <table class="w3-table w3-bordered">
                <tr>
                    <th>Data Limite</th>
                    <th>Responsável</th>
                    <th>Descrição</th>
                    <td>Estado</td>
                </tr>
  `
    tarefas.forEach(t => {
        if(t.resolvido == false && t.cancelado == false){
            pagHTML += `
            <tr>
                <td>${t.datalimite}</td>
                <td>${t.responsavel}</td>
                <td>${t.descricao}</td>
                <td width="20%">
                    <form action="/" method="POST">
                        <input type=hidden name="id" value="${t.id}"/>
                        <select name="estado">
                            <option></option>
                            <option>Resolvido</option>
                            <option>Cancelado</option>
                        </select>
                        <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                    </form>
                </td>
            </tr>
        `
        }  
    })

    pagHTML+= `
        </table>
    `
    return pagHTML
}

function geraTarefasDone(tarefas){
    let pagHTML = `
        <header class="w3-container w3-teal">
            <h1>Lista de Tarefas Resolvidas/Canceladas</h1>
        </header>

        <ul>
    `

    tarefas.forEach(t=> {
        if (t.resolvido) pagHTML+=`
                <li>${t.descricao} foi resolvido</li>
        `
        else if (t.cancelado) pagHTML+=`
                <li>${t.descricao} foi cancelado</li>
        `
    })

    pagHTML+= `
        </ul>
    </body>
    </html>
    `
    return pagHTML
}

var server = http.createServer(function (req,res) {
    console.log('Method: ' + req.method + ' url: ' + req.url)


    if (static.recursoEstatico(req)) {
        static.sirvoRecursoEstatico(req, res)
    }
    else{
        switch (req.method) {
            case "GET":
                // GET / --------------------------------------------------------------------
                if (req.url == "/") {
                    axios.get("http://localhost:3000/tarefas?_sort=datalimite,responsavel&_order=asc,asc")
                        .then(response => {
                            var tarefas = response.data

                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write(geraFormNovaTarefa())
                            res.write(geraListaTarefas(tarefas))
                            axios.get("http://localhost:3000/tarefas?_sort=resolvido&_order=desc")
                                .then(resp => {
                                    var tarefasR = resp.data

                                    res.write(geraTarefasDone(tarefasR))
                                    res.end()
                                })
                                .catch(function (erro) {
                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.write("<p>Não foi possível obter a lista de tarefas...")
                                    res.end()
                                })
                        })
                        .catch(function (erro) {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Não foi possível obter a lista de tarefas...")
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
                        if (info.descricao != null){
                            info.resolvido = false
                            info.cancelado = false
                            axios.post('http://localhost:3000/tarefas', info)
                                .then(resp => {
                                    axios.get("http://localhost:3000/tarefas?_sort=datalimite,responsavel&_order=asc,asc")
                                        .then(response => {
                                            var tarefas = response.data

                                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                            res.write(geraFormNovaTarefa())
                                            res.write(geraListaTarefas(tarefas))


                                            axios.get("http://localhost:3000/tarefas?_sort=resolvido&_order=desc")
                                                .then(response => {
                                                    var tarefasR = response.data

                                                    res.write(geraTarefasDone(tarefasR))
                                                    res.end()
                                                })
                                                .catch(function (erro) {
                                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                                    res.write("<p>Não foi possível obter a lista de tarefas...")
                                                    res.end()
                                                })
                                        })
                                        .catch(function (erro) {
                                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                            res.write("<p>Não foi possível obter a lista de tarefas...")
                                            res.end()
                                        })
                                })
                                .catch(erro => {
                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.write('<p>Erro no POST ' + erro + '</p>')
                                    res.write('<p><a href="/">Voltar</a></p>')
                                    res.end()
                                })
                        }
                        else{
                            axios.get("http://localhost:3000/tarefas")
                                .then(response => {
                                    var tarefas = response.data
                                    var rState = false
                                    var cState = false
                                    if(info.estado == "Resolvido") rState = true
                                    else if(info.estado == "Cancelado") cState = true
                                    else {}

                                    tarefas.forEach(t => {
                                        if(t.id == info.id) {
                                            axios.put('http://localhost:3000/tarefas/' + info.id, {
                                                "descricao": t.descricao,
                                                "responsavel": t.responsavel,
                                                "datalimite": t.datalimite,
                                                "resolvido": rState,
                                                "cancelado": cState,
                                                "id": t.id
                                            }).then(resp => {
                                            })
                                                .catch(error => {
                                                    console.log("ERRO: " + error)
                                                });
                                        }
                                    })

                                    axios.get("http://localhost:3000/tarefas?_sort=datalimite,responsavel&_order=asc,asc")
                                        .then(response => {
                                            var tarefas = response.data

                                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                            res.write(geraFormNovaTarefa())
                                            res.write(geraListaTarefas(tarefas))
                                            axios.get("http://localhost:3000/tarefas?_sort=resolvido&_order=desc")
                                                .then(resp => {
                                                    var tarefasR = resp.data

                                                    res.write(geraTarefasDone(tarefasR))
                                                    res.end()
                                                })
                                                .catch(function (erro) {
                                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                                    res.write("<p>Não foi possível obter a lista de tarefas...")
                                                    res.end()
                                                })
                                        })
                                        .catch(function (erro) {
                                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                            res.write("<p>Não foi possível obter a lista de tarefas...")
                                            res.end()
                                        })

                                })
                                .catch(function (erro) {
                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.write("<p>Não foi possível obter a lista de tarefas...")
                                    res.end()
                                })
                        }
                        
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