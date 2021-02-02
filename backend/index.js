const customExpress = require('./config/customExpress');
const conexao = require('./infra/conexao');
const Tabelas = require('./infra/tabelas');
var http = require('http');
const app = customExpress();
conexao.connect(erro => {
    if(erro) {
        console.log(erro)

    } else {
        console.log('conectado com sucesso')
        
        Tabelas.init(conexao)
        
        const app = customExpress()
        const httpServer = http.createServer(app)
        httpServer.listen(3001);
    }
});