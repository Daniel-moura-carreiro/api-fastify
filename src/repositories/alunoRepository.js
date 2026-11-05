// Executa operações relacionadas ao banco de dados.

import pool from "../database/connection.js"

class AlunoRepository {
    async findAll() {
        const [rows] = await pool.execute(  // O mysql2 retorna um array semelhante a: [ rows, fields ]. Com const [rows] pegamos apenas o primeiro elemento.
            'SELECT id, nome, curso FROM alunos'
        )

        return rows
    }

    
  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, nome, curso FROM alunos WHERE id = ?',
      [id]
    )

    return rows[0] ?? null // Se o aluno existir: rows[0] será o objeto. Caso contrário: rows[0] será undefined.
  }

  async create({ nome, curso }) {
    const [result] = await pool.execute(
      'INSERT INTO alunos (nome, curso) VALUES (?, ?)',
      [nome, curso]
    )

    return this.findById(result.insertId)
  }

  async update(id, { nome, curso }) {
    const [result] = await pool.execute(
      `
        UPDATE alunos
        SET nome = ?, curso = ?
        WHERE id = ?
      `,
      [nome, curso, id]
    )

    if (result.affectedRows === 0) {
      return null
    }

    return this.findById(id)
  }

  async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM alunos WHERE id = ?',
      [id]
    )

    return result.affectedRows > 0
  }
}

export default new AlunoRepository()