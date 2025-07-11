'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface Letter {
  symbol: string
  name: string
  value: number
  meaning: string
}

export default function LearnPage() {
  const [letters, setLetters] = useState<Letter[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [correct, setCorrect] = useState<boolean | null>(null)

  useEffect(() => {
    axios.get('http://localhost:8000/letters').then((res) => {
      setLetters(res.data)
    })
  }, [])

  useEffect(() => {
    if (letters.length > 0) {
      generateOptions()
    }
  }, [letters, currentIndex])

  const generateOptions = () => {
    const correct = letters[currentIndex].name
    const others = letters
      .filter((_, i) => i !== currentIndex)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map((l) => l.name)
    const all = [...others, correct].sort(() => 0.5 - Math.random())
    setOptions(all)
    setSelected(null)
    setCorrect(null)
  }

  const handleSelect = (name: string) => {
    setSelected(name)
    const isCorrect = name === letters[currentIndex].name
    setCorrect(isCorrect)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % letters.length)
    }, 5200)
  }

  if (letters.length === 0) return <div className="p-10 text-white">Cargando...</div>

  const current = letters[currentIndex]

  return (
    <main className="bg-black text-white flex flex-col items-center justify-center p-6" style={{ minHeight: 'calc(100vh - 116px)' }}>
      <h1 className="text-3xl font-bold mb-8">🧠 Aprende el alfabeto hebreo</h1>

      <div className="sm:text-[8rem] md:text-[10rem] lg:text-[12rem] mb-4 font-extrabold">{current.symbol}</div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            disabled={selected !== null}
            className={`p-4 rounded-xl border transition-all duration-200 font-semibold
              ${selected === option
                ? correct
                  ? 'bg-green-600 border-green-500'
                  : 'bg-red-600 border-red-500'
                : 'bg-white/10 hover:bg-white/20 border-white/20'}`}
          >
            {option}
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-6 text-center">
          {correct ? (
            <p className="text-green-400 font-medium">✅ ¡Correcto! {current.name}</p>
          ) : (
            <p className="text-red-400 font-medium">❌ Incorrecto. Era {current.name}</p>
          )}
          <p className="text-zinc-300 mt-2 italic">{current.meaning}</p>
        </div>
      )}
    </main>
  )
}
