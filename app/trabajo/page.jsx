"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { client } from "../../sanityClient";
import Navbar from "../components/Navbar";

export default function Trabajo() {
    // Al manejar useState, necesitamos que esto sea un Client Component
    const [proyectos, setProyectos] = useState([]);
    const [filtroActivo, setFiltroActivo] = useState("Todos");
    const [todasLasEtiquetas, setTodasLasEtiquetas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch de Sanity en el cliente
        const fetchProyectos = async () => {
            const data = await client.fetch(`
                *[_type == "proyecto"] | order(_createdAt desc) {
                    _id,
                    titulo,
                    categoria,
                    etiquetas,
                    "slug": slug.current,
                    "imagenUrl": imagen.secure_url
                }
            `);
            setProyectos(data);

            // Extraer todas las etiquetas únicas para la barra de filtros
            const recolectadas = new Set();
            data.forEach((proj) => {
                if (proj.etiquetas) {
                    proj.etiquetas.forEach(et => recolectadas.add(et));
                }
            });
            setTodasLasEtiquetas(Array.from(recolectadas));
            setIsLoading(false);
        };

        fetchProyectos();
    }, []);

    // Lógica de filtrado
    const proyectosFiltrados = proyectos.filter((proyecto) => {
        if (filtroActivo === "Todos") return true;
        // Revisamos si el proyecto tiene un array de etiquetas que incluya la seleccionada
        return proyecto.etiquetas?.includes(filtroActivo);
    });

    return (
        <div className="flex flex-col min-h-screen selection:bg-[#FFE500] selection:text-neutral-950 w-full mb-16">

            <Navbar />

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center w-full">

                {/* Header Section */}
                <section className="w-full flex flex-col items-center text-center mb-12 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#FFE500]/5 rounded-full blur-[80px] md:blur-[120px] -z-10" />
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-4">
                        Trabajo.
                    </h1>
                    <p className="text-lg md:text-xl text-white/50 max-w-2xl font-light">
                        Explora la galería completa de mis proyectos filtrada por categorías.
                    </p>
                </section>

                {/* Barra de Filtros interactiva */}
                <section className="w-full flex flex-wrap justify-center gap-3 mb-12 md:mb-16">
                    {/* Botón base de "Todos" */}
                    <button
                        onClick={() => setFiltroActivo("Todos")}
                        className={`px-5 py-2 rounded-full border border-white/10 text-sm font-medium transition-all duration-300 ${filtroActivo === "Todos"
                            ? "bg-[#FFE500] text-neutral-950 border-[#FFE500] shadow-[0_0_15px_rgba(255,229,0,0.3)]"
                            : "bg-transparent text-white/70 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        Todos
                    </button>
                    {/* Botones dinámicos según las etiquetas presentes en Sanity */}
                    {todasLasEtiquetas.map((etiqueta, index) => {
                        const isActive = filtroActivo === etiqueta;
                        return (
                            <button
                                key={index}
                                onClick={() => setFiltroActivo(etiqueta)}
                                className={`px-5 py-2 rounded-full border border-white/10 text-sm font-medium transition-all duration-300 ${isActive
                                    ? "bg-[#FFE500] text-neutral-950 border-[#FFE500] shadow-[0_0_15px_rgba(255,229,0,0.3)]"
                                    : "bg-transparent text-white/70 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                {etiqueta}
                            </button>
                        );
                    })}
                </section>

                {/* Spinner de Carga */}
                {isLoading && (
                    <div className="w-full py-20 flex justify-center">
                        <div className="w-8 h-8 border-2 border-white/20 border-t-[#FFE500] rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Grilla de Proyectos filtrados */}
                {!isLoading && (
                    <section className="w-full relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {proyectosFiltrados?.map((proyecto) => (
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
                                        {/* Overlay gradiente inferior para lectura de texto */}
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

                                        {/* Botón Flecha Esquina Inferior Derecha */}
                                        <div className="w-16 h-16 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:shadow-lg flex-shrink-0 origin-center text-white/50 relative overflow-hidden group/btn">
                                            <span className="group-hover:translate-x-1 transition-transform duration-300 ease-out font-medium">
                                                &rarr;
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Estado: Vacío (ninguno coincide con la etiqueta y es raro pero posible) */}
                        {proyectosFiltrados.length === 0 && (
                            <div className="w-full py-20 flex flex-col items-center justify-center text-white/50">
                                <p className="text-lg font-light">No tienes proyectos compatibles con el filtro deseado.</p>
                            </div>
                        )}
                    </section>
                )}

            </main>
        </div>
    );
}