'use client'

import { useState } from 'react'
import axios from 'axios'

export default function GematriaPage() {
  const [input, setInput] = useState('')
  const [hebrew, setHebrew] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [letters, setLetters] = useState<LetterInfo[]>([])


  type LetterInfo = {
    symbol: string
    name: string
    value: number
    meaning: string
  }

  const handleCalculate = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    setHebrew('')

    try {
      // 1. Transcripción
      const trans = await axios.post('http://localhost:8000/transcribe', { text: input })
      const hebrewText = trans.data.hebrew
      setHebrew(hebrewText)

      // 2. Gematría
      const gematria = await axios.post('http://localhost:8000/gematria', { word: hebrewText })
      setResult(gematria.data.gematria)
      setLetters(gematria.data.letters)

    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Error en el proceso')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="px-6 py-12 bg-black text-white flex flex-col items-center"  style={{ minHeight: 'calc(100vh - 116px)' }}>
      <h1 className="text-3xl font-bold mb-6">🔠 Calculadora de Gematría</h1>

      <input
        className="bg-zinc-900 border border-zinc-700 rounded px-4 py-2 text-center w-full max-w-md"
        placeholder="Escribe una palabra o frase..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleCalculate}
        disabled={!input || loading}
        className="mt-4 bg-white text-black px-6 py-2 rounded hover:bg-zinc-200 transition-all disabled:opacity-50"
      >
        {loading ? 'Calculando...' : 'Traducir y calcular'}
      </button>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {hebrew && (
        <div className="mt-8 text-center">
          <p className="text-lg">✡️ <strong>Hebreo:</strong> {hebrew}</p>
          {result !== null && (
            <p className="text-xl mt-2">💎 <strong>Gematría:</strong> {result}</p>
          )}
        </div>
      )}

      {letters.length > 0 && (
        <div className="mt-6 w-full max-w-md space-y-2">
            <h2 className="text-lg font-semibold mb-2 text-center">🔍 Desglose letra por letra</h2>
            {letters.map((letter, idx) => (
            <div
                key={idx}
                className="bg-white/10 p-3 rounded-xl flex justify-between items-center"
            >
                <div className="text-2xl font-bold">{letter.symbol}</div>
                <div className="text-sm text-right">
                <p className="font-semibold">{letter.name} — {letter.value}</p>
                <p className="text-zinc-300 italic">{letter.meaning}</p>
                </div>
            </div>
            ))}
        </div>
      )}

    </main>
  )
}
