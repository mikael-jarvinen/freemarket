// renders a list of questions and an input for posting questions

import React, { useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import AvatarImage from '../AvatarImage'
import { Form } from 'informed'
import TextInput from '../TextInput'
import { post, patch } from '../../services/questionService'

const QuestionView = ({ listing, ...rest }) => {
  const [asked, setAsked] = useState(false)
  const user = useSelector(state => state.auth.user)
  const [questions, setQuestions] = useState(listing.questions)

  const handleQuestionSubmit = async ({ question }) => {
    const response = await post(listing.id, question)
    setQuestions(questions.concat(response))
    setAsked(true)
    setTimeout(() => setAsked(false), 5000)
  }

  const handleReplySubmit = async (id, reply) => {
    const question = await patch(id, { reply })
    setQuestions(questions.map(q => {
      if (q.id === question.id) {
        return question
      } else {
        return q
      }
    }))
  }

  return (
    <Box {...rest}>
      <Box
        paddingBottom={1}
        paddingTop={1}
        borderBottom='1px solid lightgrey'
      >
        <Typography variant='h6'>Questions</Typography>
      </Box>
      {user && !asked ?
        <Box paddingY={3} display='flex'>
          <Box padding={1}>
            <AvatarImage
              src={user.avatar}
              alt={user.display_name}
              radius={15}
            />
          </Box>
          <Box display='flex' flexGrow={1} alignItems='center'>
            <Form onSubmit={handleQuestionSubmit}>
              <TextInput
                placeholder='Ask a Question?'
                field='question'
              />
            </Form>
          </Box>
        </Box>
        : null}
      {asked ?
        <Typography>
          succesfully asked a question
        </Typography> 
        : null}
      <Box>
        {questions.map(q => 
          <Box
            key={q.id}
            margin={1}
            marginLeft={0}
            border='1px solid lightgrey'
          >
            <Box display='flex' padding={1}>
              <Box>
                <AvatarImage
                  src={q.author.avatar}
                  alt={q.author.display_name}
                  radius={15}
                />
              </Box>
              <Box display='flex' flexGrow={1} alignItems='center'>
                <Typography>
                  {q.author.display_name}
                </Typography>
              </Box>
            </Box>
            <Box
              padding={1}
              borderBottom='1px solid lightgrey'
            >
              <Typography>
                {q.question}
              </Typography>
            </Box>
            {user && user.id === listing.owner && !q.reply ?
              <Box
                padding={1}
                display='flex'
                flexGrow={1}
                alignItems='center'
              >
                <Form
                  onSubmit={({ reply }) => handleReplySubmit(q.id, reply)}
                >
                  <TextInput
                    placeholder='reply...'
                    field='reply'
                  />
                </Form>
              </Box>
              : null}
            {q.reply ?
              <Box padding={1}>
                <Typography variant='h6'>
                  Reply: 
                </Typography>
                <Typography>
                  {q.reply}
                </Typography>
              </Box>
              : null}
          </Box>
        )}
      </Box>
    </Box>
  )
}

QuestionView.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.number.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      listing: PropTypes.number,
      author: PropTypes.shape({
        id: PropTypes.number,
        display_name: PropTypes.string,
        avatar: PropTypes.string
      }),
      created: PropTypes.string,
      question: PropTypes.string,
      reply: PropTypes.string
    })).isRequired,
    owner: PropTypes.number.isRequired
  })
}

export default QuestionView