// service for posting questions and patching questions

import axios from 'axios'

const baseUrl = '/api/questions/'

// posts a new question
export const post = async (listing, question) => {
  const response = await axios.post(
    baseUrl,
    {
      listing,
      question
    }
  )
  return response.data
}

// patches a question
export const patch = async (id, body) => {
  const response = await axios.patch(
    `${baseUrl}${id}/`,
    body
  )
  return response.data
}