// Responsável por iniciar e encerrar o servidor da aplicação, verificando a conexão com o banco de dados e tratando o encerramento de forma segura.

import app from './app.js'
import pool from './database/connection.js'

const port = Number(process.env.PORT) || 3000

// Inicia a aplicação.
async function start() {
  try {
    const connection = await pool.getConnection() // Obtém uma conexão com o banco de dados para verificar a disponibilidade.

    app.log.info('Conexão com o banco de dados estabelecida')

    connection.release()  // Libera a conexão para que possa ser reutilizada pelo pool.

    // Inicia o servidor na porta e no endereço definidos.
    await app.listen({
      port,
      host: '0.0.0.0'
    })
  } catch (error) {
    app.log.error(error)
    process.exit(1) // Encerra a aplicação indicando que ocorreu um erro.
  }
}

// Encerra a aplicação de forma controlada quando recebe um sinal do sistema.
async function shutdown(signal) {
  app.log.info(`${signal} recebido. Encerrando aplicação...`)

  try {
    await app.close(0) // Fecha o servidor e executa os hooks de encerramento configurados. Quando app.close() é executado, o hook onClosetambém executará pool.end()
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

process.on('SIGINT', () => shutdown('SIGINT')) // Define o comportamento para o encerramento manual da aplicação.
process.on('SIGTERM', () => shutdown('SIGTERM')) // Define o comportamento para o encerramento da aplicação pelo sistema.

await start() // Executa a inicialização da aplicação.