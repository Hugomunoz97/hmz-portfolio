"use client";

import { useState, useEffect } from "react";
import { PortableText } from '@portabletext/react';

// Componentes serializadores para el Rich Text de Sanity
const components = {
  block: {
    h2: ({ children }) => <h2 className="text-3xl font-black mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4">{children}</h3>,
    normal: ({ children }) => <p className="text-lg font-light leading-relaxed mb-6 text-white/80">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-square pl-6 mb-8 text-lg font-light text-white/80 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-8 text-lg font-light text-white/80 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
  types: {
    'cloudinary.asset': ({ value }) => (
      <div className="w-full my-12 rounded-3xl overflow-hidden bg-neutral-900 border border-white/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={value.secure_url} alt="" className="w-full h-auto object-cover" />
      </div>
    ),
  }
};

function AreaRow({ area, openModal }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const servicios = area.servicios && area.servicios.length > 0 ? area.servicios.filter(Boolean) : [];

  useEffect(() => {
    if (servicios.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % servicios.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [servicios.length]);

  const nextSlide = (e) => {
    e.stopPropagation();
    if (servicios.length) setCurrentSlide((prev) => (prev + 1) % servicios.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    if (servicios.length) setCurrentSlide((prev) => (prev === 0 ? servicios.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[50vh] min-h-[450px] border-y border-white/5 overflow-hidden flex items-center group bg-neutral-950">

      {/* Carrusel del Servicio Acual */}
      {servicios?.length > 0 && (
        <div
          className="absolute inset-0 w-full h-full overflow-hidden flex z-0 cursor-pointer"
          onClick={() => openModal(area, servicios[currentSlide])}
        >
          {/* Imagen de Fondo (Fade effect) */}
          {servicios?.map((srv, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-50 group-hover:opacity-100' : 'opacity-0'}`}
            >
              {srv.imagenMediaUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={srv.imagenMediaUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-900/50">
                  <div className="w-16 h-16 rounded-2xl border border-white/5" />
                </div>
              )}

              {/* Etiqueta Flotante con el Nombre del Servicio en el centro-abajo */}
              <div className="absolute bottom-10 left-0 w-full flex justify-center z-20">
                <div className="relative group/tag overflow-hidden px-10 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#FFE500]/50 transition-all duration-300 shadow-lg shadow-black/50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFE500]/10 to-transparent opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="relative text-white font-semibold text-lg group-hover/tag:text-[#FFE500] transition-colors tracking-wide">
                    {srv.titulo || "Servicio"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Flechas del Carrusel (Solo visibles en hover o mobile si hay +1) */}
      {servicios.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 md:left-12 z-20 w-16 h-16 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white text-2xl transition-all opacity-0 group-hover:opacity-100 shadow-xl"
          >
            &larr;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 md:right-12 z-20 w-16 h-16 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white text-2xl transition-all opacity-0 group-hover:opacity-100 shadow-xl"
          >
            &rarr;
          </button>
        </>
      )}

      {/* Título Estático Flotante Arriba a la Derecha (Nombre del Área) */}
      <div className="absolute inset-0 z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pointer-events-none flex justify-end items-start pt-8 md:pt-12">
        <div className="bg-neutral-950/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] w-max pointer-events-auto border border-yellow-400/20 shadow-[0_0_20px_rgba(250,204,21,0.1)]">
          <h3 className="text-3xl md:text-4xl font-black leading-tight tracking-tight flex items-center flex-wrap gap-x-3 gap-y-2">
            <span className="text-white">{area.titulo.split(' ')[0]}</span>
            {area.titulo.split(' ').length > 1 && (
              <span className="bg-[#FFE500] text-neutral-950 px-4 py-1 -my-1 rounded-2xl uppercase tracking-tighter">
                {area.titulo.split(' ').slice(1).join(' ')}
              </span>
            )}
          </h3>
        </div>
      </div>
    </div>
  );
}


export default function AreasSection({ areasServicio }) {
  const [activeModal, setActiveModal] = useState(null); // { area, servicio }

  const openModal = (area, servicio) => {
    setActiveModal({ area, servicio });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <section className="w-full relative mb-32 flex flex-col mt-10">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          {/* Título unificado métricamente */}
          <div className="bg-neutral-950/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] w-max border border-white/10 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Áreas de Diseño</h2>
            <p className="text-white/50 text-sm md:text-base">Especialidades en las que desarrollo soluciones creativas.</p>
          </div>
        </div>

        {/* Contenedor Full Bleed, se sale de los bordes del max-w */}
        <div className="flex flex-col w-screen relative -ml-[50vw] left-1/2 mt-4">
          {areasServicio?.map((area, idx) => (
            <AreaRow key={area._id || idx} area={area} openModal={openModal} />
          ))}
        </div>
      </section>

      {/* MODAL LIGHTBOX ENFOCADA EN EL SERVICIO */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex justify-center bg-neutral-950/95 backdrop-blur-3xl overflow-y-auto w-full">

          {/* Detector de clic fuera (ahora absoluto pero scrolleable) */}
          <div className="fixed inset-0 min-h-screen" onClick={closeModal} />

          <button
            onClick={closeModal}
            className="fixed top-6 right-6 md:top-10 md:right-10 z-50 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white transition-colors border border-white/20 shadow-2xl"
          >
            ✕
          </button>

          <div className="z-10 w-full max-w-4xl px-4 py-20 flex flex-col items-center">

            <div className="text-center mb-12">
              <span className="text-[#FFE500] font-bold tracking-widest uppercase text-sm mb-4 block">
                {activeModal.area.titulo}
              </span>
              <h3 className="text-4xl md:text-6xl md:leading-[1.1] font-black text-white tracking-tighter drop-shadow-2xl">
                {activeModal.servicio.titulo}
              </h3>
              {activeModal.servicio.subtitulo && (
                <p className="text-xl md:text-2xl text-white/50 font-light mt-6 max-w-2xl mx-auto">
                  {activeModal.servicio.subtitulo}
                </p>
              )}
            </div>

            {/* Renderizado de la Imagen Principal si existe */}
            {activeModal.servicio.imagenMediaUrl && (
              <div className="w-full aspect-video rounded-[2rem] overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl mb-16 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeModal.servicio.imagenMediaUrl}
                  alt={activeModal.servicio.titulo}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Renderizado del Body de PortableText (Construcción del Caso / Descripción Enriquecida) */}
            <div className="w-full max-w-3xl prose-invert flex flex-col items-start pb-20">
              {activeModal.servicio.contenidoBody ? (
                <PortableText
                  value={activeModal.servicio.contenidoBody}
                  components={components}
                />
              ) : (
                <div className="w-full p-12 rounded-3xl border border-white/10 bg-white/5 flex flex-col items-center justify-center text-white/50">
                  <span className="text-3xl mb-4">✍️</span>
                  <p>Aún no has agregado una descripción ampliada (Construcción del Estudio) para este servicio desde Sanity.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
