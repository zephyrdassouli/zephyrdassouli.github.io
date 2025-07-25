'use client';
import { useState, useEffect } from 'react';
import Window from '@/components/projects/window';

export default function Projects() {
  const [def, setDef] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDef('Def !');
    }
  }, []);

  if (!def) return null;

  return (
    <div>
      <div id="modal-root" />

      {/* Transat Window */}
      <Window title={'Transat'} className={' w-[300px] sm:w-[400px] grow-fade'} videoLink={`${process.env.NEXT_PUBLIC_BASE}/videos/video_transat.mp4`} assetTitle={'TRANSAT_PREVIEW.MP4'} variant="blue">
        <div className="h-full flex flex-col gap-4">
          <div className=" flex items-center gap-6">
            <img src={`${process.env.NEXT_PUBLIC_BASE}/projects/transat.png`} alt="Transat" style={{ imageRendering: 'pixelated' }} className="w-14" />
            <div>
              <div className="font-bold text-lg ">Transat / App development</div>
              <div className="text-sm opacity-75 ">2023 - 2025</div>
            </div>
          </div>
          <div className="text-base">
            Needs analysis, design, and development in React Native of an application integrating all services and important information on IMT Atlantique campus
            <br />
            <br />
            <span className="opacity-80">Tools used : React Native, Expo, Supabase, Adobe Illustrator</span>
          </div>
        </div>
      </Window>

      {/* Portfolio Window */}
      <Window title={'This portfolio'} className={'w-[300px] sm:w-[400px] grow-fade'}>
        <div className="h-full flex flex-col gap-4">
          <div>
            <div className="font-bold text-lg ">Portfolio / Web development</div>
            <div className="text-sm opacity-75 ">2025</div>
          </div>
          <div className="text-base">
            This portfolio is a showcase of my work and skills. All the code is open source and available on my GitHub
            <br />
            <br />
            <span className="opacity-80">Tools used : Next.js, Tailwind, Three.js</span>
          </div>
        </div>
      </Window>

      {/* Pétanque Shop */}
      <Window title={'PetanqueShop'} className={'w-[300px] sm:w-[400px] grow-fade'} photoLink={`${process.env.NEXT_PUBLIC_BASE}/photos/petanque.png`} assetTitle={'PETANQUESHOP_PREVIEW.PNG'}>
        <div className="h-full flex flex-col gap-4">
          <div className=" flex items-center gap-6">
            <img src={`${process.env.NEXT_PUBLIC_BASE}/projects/petanque.png`} alt="PetanqueShop" style={{ imageRendering: 'pixelated' }} className="w-14" />
            <div>
              <div className="font-bold text-lg ">PetanqueShop / AI</div>
              <div className="text-sm opacity-75 ">2024</div>
            </div>
          </div>
          <div className="text-base">
            Developed and deployed a web application for a petanque ball shop
            <br />
            <br />
            It uses AI to analyze a hand image and recommend the ideal petanque ball size
            <br />
            <br />
            <span className="opacity-80">Tools used : MediaPipe, YOLO, Next.js, Django</span>
          </div>
        </div>
      </Window>

      {/* Research project at UvA */}
      <Window title={'UvA'} className={' w-[300px] sm:w-[400px] grow-fade'} variant="inverted">
        <div className="h-full flex flex-col gap-4">
          <div className=" flex items-center gap-6">
            <img src={`${process.env.NEXT_PUBLIC_BASE}/projects/uva.png`} alt="uvA" style={{ imageRendering: 'pixelated' }} className="w-14" />
            <div>
              <div className="font-bold text-lg ">
                University of Amsterdam <br /> Research
              </div>
              <div className="text-sm opacity-75 ">2025 - Current</div>
            </div>
          </div>
          <div className="text-base">
            Real-time reputation-driven malicious node detection in federated learning within an operational decentralized research environment
            <br />
            <br />
            <span className="opacity-80">Tools used : Hyperledger Besu</span>
          </div>
        </div>
      </Window>
    </div>
  );
}
