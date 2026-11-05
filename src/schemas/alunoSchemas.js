// JSON Schema para validação das requisições.

export const alunoParamsSchema = { // Validação dos parâmetros da rota (ex: /alunos/:id)
    type: 'object',

    properties: {
        id: {
            type: 'integer',
            minimum: 1
        }
    },

    required: ['id'],

    additionalProperties: false
}

export const alunoBodySchema = { // Validação do corpo da requisição 
    type: 'object',

    properties: {
        nome: {
            type: 'string',
            minLength: 2,
            maxLength: 100
        },

        curso: {
            type: 'string',
            minLength: 2,
            maxLength: 100
        }
    },

    required: ['nome', 'curso'],

    additionalProperties: false
}
