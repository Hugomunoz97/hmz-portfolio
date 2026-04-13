"use client";

import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://formspree.io/f/xbdqjaga", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      
      if (response.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("idle");
        alert("Ocurrió un error al enviar el mensaje. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      setStatus("idle");
      alert("Ocurrió un error de red al intentar conectar.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-[#FFE500] selection:text-neutral-950 w-full mb-16">

      {/* Navbar Minimalista */}
      <header className="fixed top-0 w-full z-50 py-4 px-6 md:px-12 flex justify-between items-center backdrop-blur-md bg-neutral-950/70 border-b border-white/5">
        <Link href="/" className="font-bold text-xl tracking-tighter hover:text-[#FFE500] transition-colors">HMZ</Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-white/70">
          <Link href="/trabajo" className="hover:text-[#FFE500] transition-colors">Trabajo</Link>
          <Link href="/contact" className="text-[#FFE500] transition-colors">Contacto</Link>
          <Link href="/about" className="hover:text-[#FFE500] transition-colors">Sobre Mí</Link>
        </nav>
      </header>

      <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto w-full relative">
        {/* Glow de fondo */}
        <div className="absolute top-40 left-0 md:left-20 w-[300px] h-[300px] bg-[#FFE500]/5 rounded-full blur-[100px] -z-10 cursor-default" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 pt-12">

          {/* Columna Izquierda - Información */}
          <div className="flex flex-col">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6 text-white">
              Iniciemos un <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">proyecto.</span>
            </h1>

            <p className="text-neutral-400 text-lg md:text-xl font-light mb-12 max-w-md leading-relaxed">
              Ya sea para diseño industrial, desarrollo web, UX/UI, o una colaboración especial. Estoy listo para llevar tus ideas al siguiente nivel.
            </p>

            <div className="mb-12">
              <h3 className="text-white/80 font-bold mb-4 text-sm uppercase tracking-wider">Encuéntrame en</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "LinkedIn", href: "#" },
                  { name: "Behance", href: "#" },
                  { name: "Upwork", href: "#" },
                  { name: "Workana", href: "#" }
                ].map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="flex justify-center items-center py-4 px-2 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:border-[#FFE500] hover:text-[#FFE500] hover:bg-[#FFE500]/5 text-sm font-medium text-white/70 shadow-sm shadow-black/20"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-neutral-500 uppercase tracking-wider font-semibold mb-2">Email directo</span>
              <a href="mailto:hugo.raul.mz@gmail.com" className="text-2xl font-medium text-white hover:text-[#FFE500] transition-colors inline-block w-max">
                hugo.raul.mz@gmail.com
              </a>
            </div>
          </div>

          {/* Columna Derecha - Formulario */}
          <div className="flex flex-col justify-center">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl shadow-black/40 relative overflow-hidden group">
              {/* Leve brillo superior en la tarjeta de contacto */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#FFE500]/50 to-transparent opacity-50" />

              <form action="https://formspree.io/f/xbdqjaga" method="POST" className="flex flex-col gap-6" onSubmit={handleSubmit}>

                <div className="flex flex-col gap-2 relative">
                  <label htmlFor="nombre" className="text-sm font-medium text-white/70 ml-1">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Tu nombre completo"
                    className="bg-neutral-900 border border-white/5 rounded-xl px-5 py-4 text-white placeholder-white/20 outline-none focus:border-[#FFE500] transition-colors"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2 relative">
                  <label htmlFor="email" className="text-sm font-medium text-white/70 ml-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="tucorreo@ejemplo.com"
                    className="bg-neutral-900 border border-white/5 rounded-xl px-5 py-4 text-white placeholder-white/20 outline-none focus:border-[#FFE500] transition-colors"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2 relative">
                  <label htmlFor="mensaje" className="text-sm font-medium text-white/70 ml-1">Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    placeholder="Cuéntame sobre tu proyecto..."
                    className="bg-neutral-900 border border-white/5 rounded-xl px-5 py-4 text-white placeholder-white/20 outline-none focus:border-[#FFE500] transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-6 w-full bg-[#FFE500] text-neutral-950 font-bold text-lg py-4 rounded-xl hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,229,0,0.15)] hover:shadow-[0_0_25px_rgba(255,229,0,0.35)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Enviando..." : "Enviar Mensaje"}
                </button>
                
                {status === "success" && (
                  <p className="mt-2 text-center text-[#FFE500] font-medium text-sm">
                    ¡Gracias! Te responderé pronto.
                  </p>
                )}

              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}