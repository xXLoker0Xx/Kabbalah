'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="heigth-12 bg-black text-white flex flex-col items-center justify-center text-sm text-zinc-600 py-4">
        © {new Date().getFullYear()} Eirix. Conectando símbolos con código.
    </footer>
  )
}
