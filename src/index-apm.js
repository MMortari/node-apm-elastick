
const { createServer } = require('http')
// Bibliotecas
const winston = require('winston')
const { Client } = require('@elastic/elasticsearch')


// Configuraçāo para o APM
var apm = require('elastic-apm-node').start({
    serviceName: 'app-test-apm-02',                                   // serviceName pode ser alterado conforme servico
    serverUrl: 'http://apm-server.elastic.svc.cluster.local:8200',    // URL do apm-server
    environment: 'sandbox-dev'                                         // ambiente da aplicaçāo
})





//App Teste APM + Elastic
class App {
  constructor() {
    this.server = createServer((req, res) => {
      // http://localhost:8080/stop -> Parar o servidor.
      if (req.url === '/stop') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
        message: 'Servidor parou'
      }))
        return this.stop()
      }

      if (req.url === '/test') {
        
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
        message: "Test error: " + users  // variável nao declarada para simular erro e mostrar no apm
  
      }))
        
      }
      if (req.url === '/users/:index-apm') {
        const { index } = req.params
        const { name } = req.body
        users[index] = name

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
        message: users
      }))
        return null
      }


// Resposta do servidor
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        message: 'Servidor node rodando'
      }))
    })
  }

//Iniciar o servidor
  
  start() {
    this.server.listen(8080)
  }

//Parar o Servidor
  stop() {
    this.server.close()
    process.exit(0)
  }
}
let app = new App()
app.start()



















