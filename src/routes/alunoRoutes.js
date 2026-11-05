// Define os endpoints HTTP da aplicação.
// Plugin de rotas de alunos

import alunoController from '../controllers/alunoController.js'
import { alunoBodySchema, alunoParamsSchema } from '../schemas/alunoSchemas.js'

async function alunoRoutes(fastify) {
    fastify.get('/', alunoController.index)

    fastify.get('/:id',
        {
            schema: {
                params: alunoParamsSchema // Valida os parâmetros da rota usando o schema definido em alunoSchemas.js
            }
        },
        alunoController.show
    )

    fastify.post('/',
        {
            schema: {
                body: alunoBodySchema // Valida o corpo da requisição usando o schema definido em alunoSchemas.js
            }
        },
        alunoController.store
    )

    fastify.put('/:id',
    {
      schema: {
        params: alunoParamsSchema,
        body: alunoBodySchema
      }
    },
    alunoController.update
  )

  fastify.delete('/:id',
    {
      schema: {
        params: alunoParamsSchema
      }
    },
    alunoController.delete
  )

}

export default alunoRoutes