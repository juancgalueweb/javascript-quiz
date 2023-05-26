import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { errorToast } from '../helpers/ErrorToast'
import { successToast } from '../helpers/SuccessToast'
import { type Question } from '../types.d'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number, fileName: string) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  answerNotSelected: (questionId: number) => void
  reset: () => void
}

const API_URL = import.meta.env.PROD
  ? 'https://javascript-quiz-juancgalueweb.vercel.app/'
  : 'http://localhost:5173/'

export const useQuestionsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          loading: false,
          questions: [],
          currentQuestion: 0,
          fetchQuestions: async (limit: number, fileName: string) => {
            const res = await fetch(`${API_URL}/${fileName}`)
            const json = await res.json()

            const questions = json
              .sort(() => Math.random() - 0.5)
              .slice(0, limit)
            set({ questions }, false, 'FETCH_QUESTIONS')
          },
          selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get()
            // usar el structuredClone para clonar el objeto
            const newQuestions: Question[] = structuredClone(questions)
            // encontramos el índice de la pregunta
            const questionIndex = newQuestions.findIndex(
              q => q.id === questionId
            )
            // obtenemos la información de la pregunta
            const questionInfo = newQuestions[questionIndex]
            // averiguamos si el usuario ha seleccionado la respuesta correcta
            const isCorrectUserAnswer =
              questionInfo.correctAnswer === answerIndex
            // Si es correcta, lanzamos el confetti
            if (isCorrectUserAnswer) {
              successToast()
            } else {
              errorToast()
            }
            // Cambiar esta información en la copia de la pregunta
            newQuestions[questionIndex] = {
              ...questionInfo,
              isCorrectUserAnswer,
              userSelectedAnswer: answerIndex
            }
            // Actualizamos el estado
            set({ questions: newQuestions }, false, 'SELECT_ANSWER')
          },
          answerNotSelected: (questionId: number) => {
            const { questions } = get()
            const newQuestions: Question[] = structuredClone(questions)
            const questionIndex = newQuestions.findIndex(
              q => q.id === questionId
            )
            const questionInfo = newQuestions[questionIndex]
            newQuestions[questionIndex] = {
              ...questionInfo,
              isCorrectUserAnswer: false,
              userSelectedAnswer: -1
            }
            errorToast()
            set({ questions: newQuestions }, false, 'ANSWER_NOT_SELECTED')
          },
          goNextQuestion: () => {
            const { currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1
            if (nextQuestion < questions.length) {
              set({ currentQuestion: nextQuestion }, false, 'GO_NEXT_QUESTION')
            }
          },
          reset: () => {
            set({ currentQuestion: 0, questions: [] }, false, 'RESET')
          }
        }
      },
      { name: 'questions' }
    )
  )
)
