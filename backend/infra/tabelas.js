class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.inserirLivros('Call of Cthullhu', 39.99, 'H.P. Lovecraft', 1950, 'Tentaculos', '123-01239213');
        this.inserirLivros('Nas Montanhas da Loucura', 29.99, 'H.P. Lovecraft', 1962, 'Tentaculos', '123-01099013');
        console.log("Tabelas populadas");
    }

    inserirLivros(nome, preco, autor, ano_pub, editora, isbn) {
        const sql = `
        INSERT INTO livro (
            nome,
            preco,
            autor,
            ano_pub,
            editora,
            isbn
        ) SELECT '${nome}', ${preco}, '${autor}',${ano_pub},'${editora}', '${isbn}' WHERE NOT EXISTS (SELECT * FROM livro WHERE isbn LIKE '${isbn}')`;

        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                //    console.log(`Anotação ${name} inserida com sucesso`);
            }
        })
    }

    /* criarImpressoras() {
         const sql = `CREATE TABLE IF NOT EXISTS Impressoras
         (id int NOT NULL AUTO_INCREMENT,
             id_way VARCHAR(50) NOT NULL UNIQUE,
             tipo_conexao VARCHAR(20) NOT NULL,
             status VARCHAR(20) NOT NULL,
             serialNumber VARCHAR(50) NOT NULL,
             lastCommunication VARCHAR(50),
             installationPoint VARCHAR(60),
             observation TEXT,
             ipAddress VARCHAR(50),
             manufacturer VARCHAR(30),
             model VARCHAR(30),
             customer_name VARCHAR(50),
             scan_status VARCHAR(50),
             scan_observation TEXT,
             PRIMARY KEY(id))`;
 
         this.conexao.query(sql, erro => {
             if (erro) {
                 console.log(erro)
             } else {
                 console.log('Tabela Impressoras criada com sucesso')
             }
         })
     }^*/

}

module.exports = new Tabelas