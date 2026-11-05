// Responsável por configurar a aplicação, registrando rotas, tratamento de erros e hooks.

import Fastify from 'fastify'
import pool from './database/connection.js'
import alunoRoutes from './routes/alunoRoutes.js'

const app = Fastify({ // Fastify() cria a instância da aplicação. 
    logger: true // O parâmetro ativa o sistema de logs integrado do Fastify.
})

app.register(alunoRoutes, { // Registra o plugin de rotas.
    prefix: '/api/alunos' // Define um prefixo para todas as rotas do plugin alunoRoutes.
}) 

// Define um tratamento global de erros da aplicação.
app.setErrorHandler((error, request, reply) => {
    request.log.error(error) // Registra o erro no sistema de logs.

    // Verifica se o erro foi causado por uma falha de validação.
    if (error.validation) {
        return reply.code(404).send({
            message: 'Dados inválidos',
            errors: error.validation
        })
    }

    // Retorna erro 500 para erros internos do servidor.
    return reply.code(500).send({
        message: 'Erro interno do servidor'
    })
})

app.addHook('onClose', async () => { // Fecha o pool de conexões quando o servidor for encerrado
    await pool.end()
})

export default app