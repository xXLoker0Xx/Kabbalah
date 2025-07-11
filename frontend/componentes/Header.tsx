'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="h-16 fixed top-0 left-0 w-full backdrop-blur bg-black/50 text-white border-b border-white/10 z-50">
      <div className="h-full max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-widest">
          אֵירִיקס
        </Link>
        <nav className="space-x-6 text-sm font-medium">
          <Link href="/gematria" className="hover:underline">
            Gematría
          </Link>
          <Link href="/learn" className="hover:underline">
            Letras
          </Link>
          <Link href="/logic" className="hover:underline">
            Lógica
          </Link>
          <Link href="/interpreter" className="hover:underline">
            Lenguaje
          </Link>
        </nav>
      </div>
    </header>
  )
}
