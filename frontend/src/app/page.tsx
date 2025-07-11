'use client'

import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="h-full bg-black text-white flex flex-col items-center justify-center px-6 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight">
          אֵירִיקס – Lenguaje Cabalístico Vivo
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-lg">
          Explora la sabiduría oculta de las letras hebreas y crea sistemas con alma.
        </p>
      </div>

      <nav className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full max-w-4xl">
        <NavCard title="🔠 Cálculo de Gematría" href="/gematria" />
        <NavCard title="🌀 Letras Hebreas" href="/learn" />
        <NavCard title="🧠 Lógica Cabalística" href="/logic" />
        <NavCard title="💻 Lenguaje Propio" href="/interpreter" />
        <NavCard title="Teoria de las letras" href="/teoria" />
      </nav>
    </main>
  )
}

function NavCard({ title, href }: { title: string; href: string }) {
  return (
    <Link href={href} className="bg-white/5 border border-white/10 hover:bg-white/10 transition-all p-6 rounded-2xl text-center shadow-lg">
      <span className="text-xl font-medium">{title}</span>
    </Link>
  )
}
