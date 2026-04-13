import Link from "next/link";
import Navbar from "../components/Navbar";

export default function About() {
    const tecnologias = [
        "SolidWorks", "KeyShot", "CNC Programming",
        "Figma", "Wordpress", "Adobe Creative Suite",
        "Antigravity", "Blender", "SketchUp",
        "Fusion360", "HTML/CSS", "V-Ray"
    ];

    return (
        <div className="flex flex-col selection:bg-[#FFE500] selection:text-neutral-950 w-full mb-16">

            <Navbar />

            <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center w-full">

                {/* Header Section */}
                <section className="w-full mb-12 md:mb-20 relative">
                    <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-[#FFE500]/5 rounded-full blur-[80px] -z-10" />
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05]">
                        Detrás de <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">HMZ.</span>
                    </h1>
                </section>

                {/* Dos columnas: Foto e Introducción */}
                <section className="w-full flex flex-col md:flex-row gap-10 lg:gap-16 mb-24 lg:mb-32">

                    {/* Columna Izquierda (2/5) */}
                    <div className="w-full md:w-2/5 flex-shrink-0">
                        <div className="relative w-full aspect-square bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-md group shadow-xl shadow-black/20 flex flex-col justify-center items-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/FotoPerfil.jpg"
                                alt="Hugo Muñoz"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] opacity-20 group-hover:opacity-40"
                            />
                        </div>
                    </div>

                    {/* Columna Derecha (3/5) */}
                    <div className="w-full md:w-3/5 flex flex-col justify-center py-4">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white tracking-tight">
                            Un enfoque multidisciplinario
                        </h2>
                        <div className="space-y-6 text-white/60 text-lg font-light leading-relaxed">
                            <p>
                                ¡Hola! Soy Hugo Muñoz, un apasionado del diseño y la tecnología. Mi camino profesional se ha centrado en la creación de soluciones innovadoras que conectan con las personas y resuelven problemas reales.
                            </p>
                            <p>
                                Mi experiencia abarca desde el <strong className="text-white font-medium">Diseño Industrial</strong> puro, donde conceptualizo y desarrollo piezas físicas tangibles, hasta el <strong className="text-white font-medium">Diseño UX/UI</strong> y el <strong className="text-white font-medium">Desarrollo Web</strong>, creando interfaces digitales intuitivas y sostenibles en el tiempo.
                            </p>
                            <p>
                                Creo firmemente en el poder del diseño para mejorar la calidad de vida de las personas, por lo que cada proyecto que emprendo busca generar un impacto positivo y duradero.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Tecnologías */}
                <section className="w-full relative">
                    <div className="flex flex-col mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Tecnologías</h2>
                        <p className="text-white/50 text-base md:text-lg max-w-2xl font-light">
                            El stack de herramientas con las que transformo conceptos en realidades, abarcando desde la manufactura hasta el código.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {tecnologias.map((tech, i) => (
                            <div
                                key={i}
                                className="group flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#FFE500]/50 hover:bg-neutral-900 transition-all duration-300 transform will-change-transform shadow-xl shadow-black/10"
                            >
                                <span className="text-white/80 group-hover:text-[#FFE500] group-hover:scale-105 font-medium transition-all text-center">
                                    {tech}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}