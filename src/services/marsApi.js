import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export async function postMove(instruction) {
  try {
    await axios.post(`${BASE_URL}/moves`, { instruction: instruction, date: new Date() })
  } catch (error) {
    throw new Error(
      'Erro ao salvar instrução!'
    )
  }
}