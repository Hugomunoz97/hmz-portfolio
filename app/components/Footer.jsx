import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-950 border-t border-white/5 pt-16 pb-8 px-6 md:px-12 mt-auto relative overflow-hidden">
      {/* Subtle Glow Effect */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#FFE500]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 relative z-10">
        <div className="flex flex-col gap-4">
          <Link href="/" className="font-black text-4xl tracking-tighter hover:text-[#FFE500] transition-colors">
            HMZ.
          </Link>
          <p className="text-white/50 max-w-sm text-sm font-light leading-relaxed">
            Diseño integral de producto. Combinando estrategia, funcionalidad y estética para crear experiencias significativas.
          </p>
        </div>

        <nav className="flex flex-col sm:flex-row gap-8 sm:gap-16 text-sm font-medium text-white/70">
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-1">Navegación</h4>
            <Link href="/" className="hover:text-[#FFE500] transition-colors">Inicio</Link>
            <Link href="/trabajo" className="hover:text-[#FFE500] transition-colors">Trabajo</Link>
            <Link href="/about" className="hover:text-[#FFE500] transition-colors">Sobre Mí</Link>
            <Link href="/contact" className="hover:text-[#FFE500] transition-colors">Contacto</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-1">Redes</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <a href="http://www.linkedin.com/in/hugo-munoz-r97" target="_blank" rel="noreferrer" className="hover:text-[#FFE500] transition-colors">LinkedIn</a>
              <a href="https://www.behance.net/hmzdis" target="_blank" rel="noreferrer" className="hover:text-[#FFE500] transition-colors">Behance</a>
              <a href="https://es.fiverr.com/hugomz97" target="_blank" rel="noreferrer" className="hover:text-[#FFE500] transition-colors">Fiverr</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#FFE500] transition-colors">Instagram</a>
              <a href="https://wa.me/543884600932" target="_blank" rel="noreferrer" className="hover:text-[#FFE500] transition-colors">WhatsApp</a>
              <a href="https://dribbble.com/hugomunoz97" target="_blank" rel="noreferrer" className="hover:text-[#FFE500] transition-colors">Dribbble</a>
            </div>
          </div>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto w-full mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs tracking-wider text-white/30 font-light uppercase relative z-10">
        <p>© {new Date().getFullYear()} HMZ. Todos los derechos reservados.</p>
        <p>Diseñado con pasión.</p>
      </div>
    </footer>
  );
}
