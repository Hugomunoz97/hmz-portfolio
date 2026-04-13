'use client';

import dynamic from 'next/dynamic';
import config from '../../../sanity.config';

const NextStudio = dynamic(
    () => import('next-sanity/studio').then((mod) => mod.NextStudio),
    { ssr: false }
);

export default function StudioPage() {
    // En versiones nuevas, envolverlo en un div con altura definida es vital
    return (
        <div style={{ height: '100vh', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 9999 }}>
            <NextStudio config={config} />
        </div>
    );
}
