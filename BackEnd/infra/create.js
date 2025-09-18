// Importa o pacote sqlite3 e ativa mensagens de log detalhadas
const sqlite3 = require('sqlite3').verbose();

// Cria/abre o arquivo do banco de dados 'database.db'
// Se não existir, ele será criado automaticamente
const db = new sqlite3.Database(
  './database.db',
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, // Permite leitura e escrita
  (err) => {
    if (err) {
      return console.error('Erro ao abrir o banco de dados:', err.message);
    }
    console.log('Conectado ao banco de dados SQLite.');
  }
);
