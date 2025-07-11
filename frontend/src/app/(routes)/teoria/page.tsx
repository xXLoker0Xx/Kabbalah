'use client'

import { useState } from 'react'
import axios from 'axios'

export default function GematriaPage() {
  const [error, setError] = useState<string | null>(null)
  const [letters, setLetters] = useState<LetterInfo[]>([])


  type LetterInfo = {
    symbol: string
    name: string
    value: number
    meaning: string
    action: string
  }

  const handleCalculate = async () => {
    setError(null)

    try {
      // 2. Gematría
      const allletters = await axios.get('http://localhost:8000/letters')
      setLetters(allletters.data)

    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Error en el proceso')
    } 
  }

  return (
    <main className="px-6 py-12 bg-black text-white flex flex-col items-center"  style={{ minHeight: 'calc(100vh - 116px)' }}>
      <h1 className="text-3xl font-bold mb-6">Teoria de las letras Ebreas</h1>

      <button
        onClick={handleCalculate}
        className="mt-4 bg-white text-black px-6 py-2 rounded hover:bg-zinc-200 transition-all disabled:opacity-50"
      >Muestramelas</button>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {letters.length > 0 && (
        <div className="mt-6 w-full max-w-md space-y-2">
            {letters.map((letter, idx) => (
              <div className="bg-white/10 p-3 rounded-xl flex-row space-y-2">
                <div
                    key={idx}
                    className="flex justify-between items-center"
                >
                    <div className="text-2xl font-bold">{letter.symbol}</div>
                    <div className="text-sm text-right">
                      <p className="font-semibold">{letter.name} — {letter.value}</p>
                      <p className="text-zinc-300 italic">{letter.meaning}</p>
                    </div>
                    
                  </div>
                  <div className="text-sm text-right">{letter.action}</div>
              </div>
            ))}
        </div>
      )}

    </main>
  )
}
