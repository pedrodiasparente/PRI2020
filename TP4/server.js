var http = require('http')
var fs = require('fs')

var servidor = http.createServer(function(req,res) {
    if(req.url == '/'){
        fs.readFile('arqsite/index.html', function (err, data) {
            if (err) {
                console.log('' + err)
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write("Error: Falha a ler o ficheiro")
                res.end()
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(data)
                res.end()
            }
        })
    }
    else if(req.url == '/arqs/*') {
        fs.readFile('arqsite/index.html', function (err, data) {
            if (err) {
                console.log('' + err)
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write("Error: Falha a ler o ficheiro")
                res.end()
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(data)
                res.end()
            }
        })
    }
    else {
        fs.readFile('arqsite/arq' + req.url.split('/')[2] + '.html', function(err,data){
            if (err) {
                console.log('' + err)
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write("Error: Falha a ler o ficheiro")
                res.end()
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(data)
                res.end()
            }
        })
    }
    
})

servidor.listen(7777)
console.log('Waiting on port 7777...')