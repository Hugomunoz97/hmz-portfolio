import Link from "next/link";
import { client } from "../../../sanityClient";

export default async function ProyectoInterna({ params }) {
  const { slug } = await params;

  // Consulta ampliada para extraer todos los bloques del Array "contenidoBody"
  // Expandimos las referencias internas como el archivo para obtener su URL real
  const proyecto = await client.fetch(`
    *[_type == "proyecto" && slug.current == $slug][0] {
      titulo,
      categoria,
      "imagenUrl": imagen.secure_url,
      contenidoBody[]{
        ...,
        _type == "cloudinary.asset" => { "url": secure_url },
        _type == "gridImagenes" => { "imagenesUrls": imagenes[].secure_url },
        _type == "bloqueArchivo" => {
           "archivoUrl": archivo.asset->url,
           textoBoton
        }
      }
    }
  `, { slug }, { next: { revalidate: 10 } });

  if (!proyecto) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-neutral-950">
        <h1 className="text-2xl font-bold mb-4">Proyecto no encontrado.</h1>
        <Link href="/" className="text-[#FFE500] hover:underline">← Volver al inicio</Link>
      </div>
    );
  }

  // ==== CONSTRUCTOR DE LAYOUTS (PAGE BUILDER MAPPING) ====
  const renderBloque = (bloque) => {
    switch (bloque._type) {
      
      // 1. BLOQUES DE TEXTO (PORTABLE TEXT NATIVO)
      case 'block':
        // Extraemos todo el texto puro uniendo los children
        const texto = bloque.children?.map(child => child.text).join('') || '';
        if (!texto.trim()) return <br key={bloque._key} />;

        if (bloque.style === 'h2') {
            return <h2 key={bloque._key} className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-white">{texto}</h2>;
        }
        if (bloque.style === 'h3') {
            return <h3 key={bloque._key} className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[#FFE500]">{texto}</h3>;
        }
        // Párrafo por defecto
        return <p key={bloque._key} className="text-lg text-white/80 leading-relaxed font-light mb-6 whitespace-pre-wrap">{texto}</p>;

      // 2. IMAGEN SIMPLE ANCHO COMPLETO
      case 'cloudinary.asset':
        if (!bloque.url) return null;
        return (
          <div key={bloque._key} className="w-full my-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={bloque.url} alt="Render Completo" className="w-full h-auto rounded-xl shadow-lg border border-white/5" />
          </div>
        );

      // 3. GALERÍA EN CUADRÍCULA
      case 'gridImagenes':
        if (!bloque.imagenesUrls || bloque.imagenesUrls.length === 0) return null;
        return (
          <div key={bloque._key} className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            {bloque.imagenesUrls?.map((imgUrl, i) => (
              <div key={i} className="w-full aspect-square overflow-hidden rounded-xl border border-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgUrl} alt={`Grid imagen ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
            ))}
          </div>
        );

      // 4. BLOQUE DE VIDEO (EMBEBIDO BÁSICO)
      case 'bloqueVideo':
        return (
          <div key={bloque._key} className="w-full my-8">
            {bloque.titulo && <span className="text-sm font-medium text-white/50 mb-3 block">{bloque.titulo}</span>}
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
              <iframe 
                src={bloque.url} 
                className="w-full h-full" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen />
            </div>
          </div>
        );

      // 5. BLOQUE DE ARCHIVO DESCARGABLE
      case 'bloqueArchivo':
        if (!bloque.archivoUrl) return null;
        return (
          <div key={bloque._key} className="my-10 flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FFE500]/10 flex items-center justify-center">
                <span className="text-[#FFE500] text-xl">📄</span>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium text-lg">{bloque.textoBoton || 'Descargar Archivo'}</h4>
                <p className="text-white/50 text-sm">Archivo disponible para previsualizar o guardar.</p>
              </div>
              <a 
                href={bloque.archivoUrl} 
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-3 bg-[#FFE500] text-neutral-950 font-bold rounded-full hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,229,0,0.15)]"
              >
                Descargar
              </a>
            </div>
          </div>
        );

      // 6. BLOQUE DE LINKS EXTERNOS
      case 'bloqueLinks':
        if (!bloque.links || bloque.links.length === 0) return null;
        return (
          <div key={bloque._key} className="flex flex-wrap gap-4 my-8">
            {bloque.links?.map((link, i) => (
              <a 
                key={i} 
                href={link.url} 
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-3 rounded-full border border-white/20 text-white hover:text-[#FFE500] hover:border-[#FFE500] transition-colors font-medium bg-black/20"
              >
                {link.texto} ↗
              </a>
            ))}
          </div>
        );

      default:
        // Si hay un bloque desconocido, lo ignoramos sin romper el layout
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-8 px-6 md:px-12 max-w-4xl mx-auto w-full pb-32 selection:bg-[#FFE500] selection:text-neutral-950">
      
      {/* Nav Bar Simple para volver atrás */}
      <nav className="w-full py-6 mb-8 border-b border-white/10">
        <Link href="/trabajo" className="text-sm font-medium hover:text-[#FFE500] transition-colors">
          ← Volver a trabajos
        </Link>
      </nav>

      {/* Cabecera del Proyecto: Título y Categoría */}
      <header className="mb-10">
        <span className="text-[#FFE500] text-sm uppercase tracking-wider font-semibold mb-3 block">
          {proyecto.categoria}
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
          {proyecto.titulo}
        </h1>
      </header>

      {/* Imagen Principal (Portada Inicial) */}
      {proyecto.imagenUrl && (
        <div className="w-full mb-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={proyecto.imagenUrl} 
            alt={proyecto.titulo}
            className="w-full h-auto rounded-2xl shadow-2xl shadow-black/50 border border-white/5"
          />
        </div>
      )}

      {/* =========================================
          CONTENIDO DINÁMICO (PAGE BUILDER) 
      ========================================= */}
      <article className="w-full flex flex-col">
        {proyecto.contenidoBody?.map((bloque) => renderBloque(bloque))}
      </article>

    </div>
  );
}
