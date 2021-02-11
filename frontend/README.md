Como instalar:
Dentro da pasta /backend, execute: 'npm install'

Dentro da pasta /frontend, execute também o 'npm install'

crie um arquivo chamado '.env' dentro do /backend, contendo:
CHAVE_JWT="(insira uma chave aqui)";

no arquivo 'frontend/communication/api.js' coloque o ip e a porta em que o backend vai rodar.

para rodar o sistema:

no /backend/ usar npm start

no /frontend/ usar npm run build e depois npm run start, é possível também apenas com o npm run dev, mas não é recomendado.