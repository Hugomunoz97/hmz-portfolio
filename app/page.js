import Link from "next/link";
import { client } from "../sanityClient";
import Navbar from "./components/Navbar";
import AreasSection from "./components/AreasSection";

export default async function Home() {
  const proyectosDestacados = await client.fetch(`
    *[_type == "proyecto" && destacado == true] | order(_createdAt desc)[0...6] {
      _id,
      titulo,
      categoria,
      descripcion,
      "slug": slug.current,
      "imagenUrl": imagen.secure_url
    }
  `, {}, { next: { revalidate: 10 } });

  const areasServicio = await client.fetch(`
    *[_type == "areaDeDiseno"] | order(orden asc) {
      _id,
      titulo,
      "slug": slug.current,
      "servicios": listaServicios[]-> {
        "titulo": coalesce(titulo, null),
        "subtitulo": coalesce(subtitulo, null),
        "imagenMediaUrl": coalesce(imagenMedia.secure_url, null),
        "contenidoBody": coalesce(contenidoBody, null)
      },
      "proyectosRelacionados": *[_type == "proyecto" && ^.titulo in areas] | order(_createdAt desc) {
        _id,
        titulo,
        categoria,
        "slug": slug.current,
        "imagenUrl": imagen.secure_url
      }
    }
  `, {}, { next: { revalidate: 10 } });

  return (
    <div className="flex flex-col min-h-screen selection:bg-[#FFE500] selection:text-neutral-950">

      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center w-full">

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mt-6 md:mt-16 mb-32 max-w-4xl relative">
          {/* Resplandor decorativo de fondo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#FFE500]/5 rounded-full blur-[80px] md:blur-[120px] -z-10" />

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#15FA1D] animate-[pulse_2s_ease-in-out_infinite]" />
            Disponible para nuevos retos
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            <span className="text-white">Diseño</span> <span className="text-yellow-400">INTEGRAL</span> <br />
            <span className="text-white">de Producto</span><span className="text-yellow-400">.</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mb-10 font-light animate-shimmer-text">
            Creamos experiencias digitales y físicas que conectan con las personas. Combinamos estética, funcionalidad e innovación para dar vida a tus ideas.
          </p>

          <Link href="/contact" className="relative group overflow-hidden px-10 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#FFE500]/50 transition-all duration-300 shadow-lg shadow-black/50">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFE500]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative font-semibold text-white group-hover:text-[#FFE500] transition-colors">
              Hablemos
            </span>
          </Link>
        </section>

        {/* Áreas de Diseño Modal e Interactivas */}
        <AreasSection areasServicio={areasServicio} />

        {/* Bento Box: Proyectos Destacados */}
        <section className="w-full relative mb-20">
          <div className="flex justify-between items-end mb-8 md:mb-12">
            <div className="bg-neutral-950/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] w-max border border-white/10 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Proyectos Destacados</h2>
              <p className="text-white/50 text-sm md:text-base">Una selección de mis trabajos más recientes.</p>
            </div>
            <Link href="/trabajo" className="hidden md:flex text-sm text-[#FFE500] hover:text-[#E3E3E3]/80 transition-colors items-center gap-1 font-medium pb-3 bg-neutral-950/50 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/5">
              Ver todos <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-8 hide-scrollbar w-full px-4 -mx-4 md:px-0 md:mx-0">
            {proyectosDestacados?.map((proyecto) => (
              <div key={proyecto._id} className="w-[85vw] sm:w-[350px] md:w-[450px] lg:w-[500px] snap-center shrink-0">
                <Link
                  href={`/proyectos/${proyecto.slug}`}
                  className="group relative flex flex-col rounded-[2rem] bg-neutral-900/50 border border-white/5 backdrop-blur-sm overflow-hidden hover:border-white/20 transition-all duration-500 will-change-transform h-full block"
                >
                  {/* Imagen del proyecto (Altura ajustada) */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-950 rounded-t-[2rem]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={proyecto.imagenUrl}
                      alt={proyecto.titulo}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Overlay gradiente inferior para lectura de texto */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-80" />
                  </div>

                  {/* Contenidos y Textos */}
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex items-end justify-between">
                    <div className="flex flex-col z-10">
                      <span className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-1">
                        {proyecto.categoria}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                        {proyecto.titulo}
                      </h3>
                    </div>

                    {/* Botón Flecha Esquina Inferior Derecha */}
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:shadow-lg flex-shrink-0 origin-center text-white/50 relative overflow-hidden group/btn z-10">
                      <span className="group-hover:translate-x-1 transition-transform duration-300 ease-out font-medium">
                        &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center md:hidden">
            <Link href="/trabajo" className="px-8 py-3 rounded-[2rem] border border-white/10 bg-white/5 text-sm font-medium hover:border-[#FFE500] hover:text-[#FFE500] transition-colors relative overflow-hidden group">
              Explorar todos
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
