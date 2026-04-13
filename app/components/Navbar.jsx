"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 py-4 px-6 md:px-12 flex justify-between items-center backdrop-blur-md bg-neutral-950/70 border-b border-white/5">
        <Link href="/" className="font-bold text-xl tracking-tighter hover:text-[#FFE500] transition-colors">
          HMZ
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-white/70">
          <Link href="/trabajo" className="hover:text-[#FFE500] transition-colors">Trabajo</Link>
          <Link href="/contact" className="hover:text-[#FFE500] transition-colors">Contacto</Link>
          <Link href="/about" className="hover:text-[#FFE500] transition-colors">Sobre Mí</Link>
        </nav>

        {/* Botón Burger Mobile (Touch Target Ampliado) */}
        <button 
          className="md:hidden text-white focus:outline-none flex flex-col justify-center items-center gap-[5px] w-12 h-12 -mr-3 relative z-[60]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menú"
          aria-expanded={isOpen}
        >
          <span className={`h-[2px] w-6 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`h-[2px] w-6 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`h-[2px] w-6 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </header>

      {/* Overlay Menú Mobile */}
      <div 
        className={`fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <nav className="flex flex-col gap-8 text-2xl font-bold text-white text-center">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-[#FFE500] transition-colors">Inicio</Link>
          <Link href="/trabajo" onClick={() => setIsOpen(false)} className="hover:text-[#FFE500] transition-colors">Trabajo</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-[#FFE500] transition-colors">Contacto</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-[#FFE500] transition-colors">Sobre Mí</Link>
        </nav>
      </div>
    </>
  );
}
