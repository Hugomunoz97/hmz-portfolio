import Link from "next/link";
import { client } from "../../../sanityClient";
import Navbar from "../../components/Navbar";

export async function generateStaticParams() {
  const areas = await client.fetch(`*[_type == "areaServicio" && defined(slug.current)] { "slug": slug.current }`);
  
  if (!areas || areas.length === 0) return [];
  
  return areas.map((area) => ({
    slug: area.slug,
  }));
}

export default async function AreaPage({ params }) {
  const { slug } = await params;

  // Realizamos 2 consultas a Sanity: los detalles del Área y los proyectos relacionados a ella.
  const areaInfo = await client.fetch(`
    *[_type == "areaServicio" && slug.current == $slug][0] {
      _id,
      titulo,
      servicios
    }
  `, { slug });

  const proyectos = await client.fetch(`
    *[_type == "proyecto" && $areaTitulo in areas] | order(_createdAt desc) {
      _id,
      titulo,
      categoria,
      "slug": slug.current,
      "imagenUrl": imagen.secure_url
    }
  `, { areaTitulo: areaInfo?.titulo || "" });

  if (!areaInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <h1 className="text-3xl font-bold mb-4">Área no encontrada</h1>
        <Link href="/" className="text-[#FFE500] hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen selection:bg-[#FFE500] selection:text-neutral-950 w-full mb-16">

      <Navbar />

      <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center w-full">

        {/* Header de Área */}
        <section className="w-full flex flex-col items-start text-left mb-16 relative">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FFE500]/5 rounded-full blur-[100px] -z-10" />
          
          <Link href="/#areas" className="text-white/50 hover:text-white transition-colors mb-6 text-sm flex items-center font-medium">
            <span className="mr-2">&larr;</span> Volver a Áreas
          </Link>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6">
            {areaInfo.titulo}.
          </h1>
          
          {/* Etiquetas decorativas de los servicios del Área */}
          {areaInfo.servicios && areaInfo.servicios.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {areaInfo.servicios.map((srv, idx) => (
                <span key={idx} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium">
                  {srv}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Grilla de Proyectos de esta área */}
        <section className="w-full relative">
          <div className="flex justify-between items-end mb-8 md:mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Proyectos Relacionados</h2>
            </div>
          </div>

          {proyectos && proyectos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proyectos.map((proyecto) => (
                <Link
                  key={proyecto._id}
                  href={`/proyectos/${proyecto.slug}`}
                  className="group relative flex flex-col rounded-[2rem] bg-neutral-900/50 border border-white/5 backdrop-blur-sm overflow-hidden hover:border-white/20 transition-all duration-500 will-change-transform"
                >
                  {/* Imagen del proyecto */}
                  <div className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] overflow-hidden bg-neutral-950 rounded-t-[2rem]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={proyecto.imagenUrl}
                      alt={proyecto.titulo}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-80" />
                  </div>

                  {/* Contenidos y Textos */}
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex items-end justify-between">
                    <div className="flex flex-col">
                      <span className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-1">
                        {proyecto.categoria}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                        {proyecto.titulo}
                      </h3>
                    </div>

                    {/* Botón Flecha */}
                    <div className="w-16 h-16 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:shadow-lg flex-shrink-0 origin-center text-white/50 relative overflow-hidden group/btn">
                      <span className="group-hover:translate-x-1 transition-transform duration-300 ease-out font-medium">
                        &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center text-white/50 border border-white/5 rounded-3xl bg-white/5">
              <p className="text-lg font-light mb-4">Aún no hay proyectos cargados en esta área.</p>
              <Link href="/trabajo" className="px-6 py-2 rounded-full border border-white/10 hover:border-[#FFE500] hover:text-[#FFE500] transition-colors text-sm">
                Explorar todos los proyectos
              </Link>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
