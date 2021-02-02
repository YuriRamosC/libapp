const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'libapp'
})  

module.exports = conexao;

/*
    Para que os valores do ID(auto incrementável) do seu banco de dados não fiquem absurdamente gigantes,
    é recomendado que utilize o comando: innodb-autoinc-lock-mode=0, nas configurações do seu banco de dados.
*/