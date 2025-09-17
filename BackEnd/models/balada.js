const { get } = require('../routes/baladaRoutes');

//Balada.js 
const sqlite3 = require('sqlite3').verbose(); 
const dbPath = './infra/database.db'; 
// Função para abrir conexão com o banco de dados 
function openDbConnection() { 
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => { if (err) { 
console.error('Erro ao abrir o banco de dados:', err.message); 
} 
}); 
return db; 
} 
// Função para buscar todos as baladas 
function getAllBaladas(callback) { 
const db = openDbConnection(); 
db.all("SELECT * FROM Baladas", [], (err, rows) => {
db.close(); 
callback(err, rows); 
}); 
} 
// Função para buscar uma balada por cidade 
function getBaladaByCidade(cidade, callback) { 
const db = openDbConnection(); 
db.get("SELECT * FROM Baladas WHERE cidade = ?", [cidade], (err, row) => { 
db.close(); 
callback(err, row); 
}); 
} 
// Função para buscar uma balada por data 
function getBaladaByData(data, callback) { 
const db = openDbConnection(); 
db.get("SELECT * FROM Baladas WHERE data = ?", [data], (err, row) => { 
db.close(); 
callback(err, row); 
}); 
}
// Função para criar uma nova balada 
function createBalada(cliente, callback) { 
const { endereco, data, tipo, cidade } = cliente; 
const db = openDbConnection(); 
db.run("INSERT INTO Baladas (endereco, data, tipo, cidade) VALUES (?, ?, ?, ?)", [endereco, data, tipo, cidade], function (err) { 
db.close(); 
callback(err, { id: this.lastID }); 
}); 
} 
// Função para atualizar um cliente existente 
function updateBalada(id, cliente, callback) { 
const { endereco, data, tipo, cidade } = cliente; 
const db = openDbConnection(); 
db.run("UPDATE Baladas SET endereco = ?, data = ?, tipo = ?, cidade = ? WHERE id = ?", [endereco, data, tipo, cidade, id], function (err) { 
db.close(); 
callback(err, { changes: this.changes }); 
}); 
} 
// Função para deletar um cliente 
function deleteBalada(id, callback) { 
const db = openDbConnection(); 
db.run("DELETE FROM Baladas WHERE id = ?", [id], function (err) { 
db.close(); 
callback(err, { changes: this.changes }); 
}); 
} 
module.exports = { 
getAllBaladas, 
getBaladaByCidade, 
getBaladaByData,
createBalada, 
updateBalada, 
deleteBalada 
};
