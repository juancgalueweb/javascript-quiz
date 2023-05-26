import { useQuestionsStore } from '../store/questions'

export function useQuestionData() {
  const questions = useQuestionsStore(state => state.questions)
  let correct = 0
  let incorrect = 0
  let unanswered = 0
  questions.forEach(question => {
    const { userSelectedAnswer, correctAnswer } = question
    if (userSelectedAnswer === -1) incorrect++
    else if (userSelectedAnswer == null) unanswered++
    else if (userSelectedAnswer === correctAnswer) correct++
    else incorrect++
  })
  return { correct, incorrect, unanswered }
}
