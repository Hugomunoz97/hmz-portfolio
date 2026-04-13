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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { 
                    name: "LinkedIn", href: "http://www.linkedin.com/in/hugo-munoz-r97",
                    icon: <svg className="w-6 h-6 mb-3 text-current transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  },
                  { 
                    name: "Behance", href: "https://www.behance.net/hmzdis",
                    icon: <svg className="w-6 h-6 mb-3 text-current transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.908 5.143 4.97h-7.391c.062 1.944 1.394 3.731 3.513 3.731 1.745 0 2.508-.601 2.894-1.127h1.04zm-5.466-6.195c-1.39 0-2.262 1.29-2.483 3.013h4.636c-.198-1.758-1.1-3.013-2.153-3.013zm-11.26 4.195h-2.179v-2.3h2.18c1.339 0 2.115-.436 2.115-1.564 0-2.093-2.91-1.638-3.987-1.638h-3.129v10h3.585c2.317 0 4.544-.616 4.544-2.83 0-1.727-1.171-2.404-3.129-2.433zm-2.179-6.326h1.884c.801 0 1.258.286 1.258.91 0 .611-.476 1.057-1.55 1.057h-1.592v-1.967zm2.4 6.837c0 .878-.711 1.157-1.701 1.157h-1.614v-2.193h1.365c1.177 0 1.95.19 1.95 1.036z"/></svg>
                  },
                  { 
                    name: "Fiverr", href: "https://es.fiverr.com/hugomz97",
                    icon: <svg className="w-6 h-6 mb-3 text-current transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M22.012 17.533V8.8h-3.2v-1.6a2.403 2.403 0 0 0 -2.4-2.4h-5.6v3.2h5.6a.8.8 0 0 1 .8.8v6.4h-.012v2.333H22.012zM12.8 17.533V8.8H9.6v-1.6a2.403 2.403 0 0 0 -2.4-2.4H1.6v3.2h5.6a.8.8 0 0 1 .8.8v6.4H7.988v2.333H12.8z"/></svg>
                  },
                  { 
                    name: "Instagram", href: "https://instagram.com",
                    icon: <svg className="w-6 h-6 mb-3 text-current transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.203 4.358 2.618 6.78 6.98 6.98 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0-2.881 0 1.44 1.44 0 0 0 2.881 0z"/></svg>
                  },
                  { 
                    name: "WhatsApp", href: "https://wa.me/543884600932",
                    icon: <svg className="w-6 h-6 mb-3 text-current transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0C5.356 0 0 5.355 0 11.944A11.91 11.91 0 0 0 1.634 18l-1.573 5.753 5.867-1.543A11.875 11.875 0 0 0 11.944 24v-.001c6.586 0 11.945-5.358 11.945-11.946S18.53.001 11.944.001zm6.059 17.135c-.244.685-1.42 1.258-1.956 1.332-.505.07-1.157.17-3.275-.705-2.557-1.056-4.184-3.66-4.316-3.837-.132-.177-1.026-1.378-1.026-2.63s.662-1.854.89-2.102c.228-.248.497-.31.662-.31s.332-.004.482-.012c.164-.009.383-.062.599.46.228.552.748 1.831.815 1.963s.116.284.05.47c-.066.186-.098.303-.198.423-.099.12-.206.26-.297.352-.102.094-.211.196-.091.402.12.206.536.884 1.144 1.427.785.702 1.45 1.1 1.631 1.218.181.118.288.098.396-.025.107-.123.468-.544.594-.73.125-.187.25-.156.442-.084.191.072 1.206.568 1.411.671.206.103.342.152.392.236.05.084.05.485-.194 1.17z"/></svg>
                  },
                  { 
                    name: "Dribbble", href: "https://dribbble.com/hugomunoz97",
                    icon: <svg className="w-6 h-6 mb-3 text-current transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm8.599-7.29c-.742-1.288-2.62-2.193-4.11-2.686 1.096-3.197 1.574-6.491 1.656-7.112-1.637-1.93-4.081-3.14-6.786-3.14-1.272 0-2.484.264-3.589.736.883 2.11 2.25 4.974 4.095 7.078-3.056.882-6.529 1.119-7.79 1.157v.081c0 2.221.727 4.27 1.956 5.922 1.267-.2 3.99-1.026 6.845-3.08-1.573 4.292-2.735 7.399-2.83 7.643C10.59 23.639 11.281 23.77 12 23.77c4.685 0 8.575-3.328 9.542-7.81-1.034.42-2.316.892-3.715 1.229.07-.34.192-.93.372-1.554zM9.475 22.06c.35-1.035 1.488-3.992 2.92-7.85-2.71 1.83-5.337 2.502-6.505 2.65-1.127-1.144-1.89-2.665-2.096-4.36 1.42-.036 5.178-.328 8.441-1.393L12.016 10.7C10.224 8.653 8.8 5.753 7.848 3.52c-2.433 1.34-4.07 3.844-4.07 6.78v.85c.983-.03 4.695-.145 7.91-1.145zm11.382-12.18c-.1-.7-.665-4.103-1.848-7.39-1.597.585-2.99 1.575-4.053 2.87 1.573 2.073 2.89 4.793 3.65 6.945 1.517.514 3.498 1.458 4.28 2.842A10.375 10.375 0 0 0 20.857 9.88z"/></svg>
                  }
                ].map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col justify-center items-center py-6 px-4 bg-white/5 border border-white/10 rounded-2xl transition-all duration-300 hover:border-[#FFE500] hover:text-[#FFE500] hover:bg-[#FFE500]/5 hover:-translate-y-1 text-sm font-medium text-white/70 shadow-sm shadow-black/20 group"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <span className="text-sm text-neutral-400 leading-relaxed font-light mb-2">
                ¿Prefieres el método tradicional? Envíame un mensaje directamente desde el formulario a mi correo.
              </span>
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
                    ¡Gracias, pronto te contactaré mediante tu correo!
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