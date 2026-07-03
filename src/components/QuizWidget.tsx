import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, CheckCircle, XCircle, Trophy, RotateCcw, ArrowRight } from 'lucide-react'

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface Props {
  questions: QuizQuestion[]
  topicTitle: string
}

export default function QuizWidget({ questions, topicTitle }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return
    
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
  }

  if (questions.length === 0) return null

  if (quizCompleted) {
    const percentage = (score / questions.length) * 100

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-8 text-center border-2 border-green-300 dark:border-green-700"
      >
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-text dark:text-text-dark mb-2">Quiz Complete!</h3>
        <p className="text-4xl font-bold text-primary mb-4">{percentage.toFixed(0)}%</p>
        <p className="text-lg text-text dark:text-text-dark mb-6">
          You scored {score} out of {questions.length}
        </p>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Retake Quiz
        </button>
      </motion.div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-primary/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Brain className="w-6 h-6 text-primary" />
          <h3 className="font-bold text-lg text-text dark:text-text-dark">Quick Quiz: {topicTitle}</h3>
        </div>
        <div className="text-sm font-semibold text-muted dark:text-muted-dark">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <div className="mb-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          className="bg-primary h-2 rounded-full"
        />
      </div>

      <p className="text-xl font-medium text-text dark:text-text-dark mb-6">{question.question}</p>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrect = index === question.correctAnswer
          const showCorrect = showResult && isCorrect
          const showWrong = showResult && isSelected && !isCorrect

          return (
            <motion.button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
              whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
              className={`w-full text-left p-4 rounded-lg border-2 font-medium transition-all ${
                showCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : showWrong
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    : isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border dark:border-border-dark hover:border-primary/50 bg-white dark:bg-gray-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-text dark:text-text-dark">{option}</span>
                {showCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                {showWrong && <XCircle className="w-5 h-5 text-red-600" />}
              </div>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-lg mb-4 ${
              selectedAnswer === question.correctAnswer
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700'
            }`}
          >
            <p className="font-semibold text-text dark:text-text-dark mb-2">
              {selectedAnswer === question.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            <p className="text-text dark:text-text-dark text-sm">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {showResult && (
        <button
          onClick={handleNext}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
        >
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
          <ArrowRight className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
