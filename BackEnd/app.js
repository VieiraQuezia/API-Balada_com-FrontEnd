// app.js 
const express = require('express'); 
const app = express(); 
const port = 3000; 
// Middleware para analisar o corpo das requisições em JSON 
app.use(express.json()); 
// Importando as rotas da balada 
const baladaRoutes = require('./routes/baladaRoutes'); 
// Usando as rotas da balada com o prefixo '/Baladas' 
app.use('/Baladas', baladaRoutes); 
// Iniciando o servidor na porta especificada 
app.listen(port, () => { 
console.log(`Servidor rodando em http://localhost:${port}`); 
});