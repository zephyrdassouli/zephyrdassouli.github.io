'use client';
import { useState, useEffect } from 'react';
import Window from '@/components/projects/window';

export default function Projects() {
  // Radius for the window positioning
  const radius = 200;
  const [centers, setCenters] = useState(null);

  useEffect(() => {
    const newCenters = [
      [window.innerWidth / 2 + window.innerWidth/4, window.innerHeight / 2 - window.innerHeight / 4],
      [window.innerWidth / 2 - window.innerWidth/4, window.innerHeight / 2 - window.innerHeight / 4],
      [window.innerWidth / 2 - window.innerWidth/10, window.innerHeight / 2 - window.innerHeight / 10],
    ];
    setCenters(newCenters);
  }, []);

  // Ensure centers are initialized before rendering
  if (!centers) return null;

  return (
    <div>
      <div id="modal-root" />

      {/* Transat Window */}
      <Window title={'Transat'} className={' w-[300px] sm:w-[400px]'} videoLink={'/videos/video_transat.mp4'} assetTitle={'TRANSAT_PREVIEW.MP4'} variant="blue" radius={radius} center={centers[1]}>
        <div className="h-full flex flex-col gap-4">
          <div className=" flex items-center gap-6">
            <img src="/projects/transat.png" alt="Transat" style={{ imageRendering: 'pixelated' }} className="w-14" />
            <div>
              <div className="font-bold text-lg ">Transat / App development</div>
              <div className="text-sm opacity-75 ">2023 - 2025</div>
            </div>
          </div>
          <div className="text-base">
            Needs analysis, design, and development in React Native of an application integrating all services and important information on IMT Atlantique campus
            <br />
            <br />
            Compliance work included analyzing, designing, and updating the app to meet all legal standards and regulations
            <br />
            <br />
            <span className="opacity-80">Tools used : React Native, Expo, Supabase, Adobe Illustrator</span>
          </div>
        </div>
      </Window>

            {/* Portfolio Window */}
            <Window title={'This portfolio'} className={'w-[300px] sm:w-[400px]'} radius={radius} center={centers[2]}>
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
      <Window title={'PetanqueShop'} className={'w-[300px] sm:w-[400px]'} photoLink={'/photos/petanque.png'} assetTitle={'PETANQUESHOP_PREVIEW.PNG'} radius={radius} center={centers[2]}>
        <div className="h-full flex flex-col gap-4">
          <div className=" flex items-center gap-6">
            <img src="/projects/petanque.png" alt="PetanqueShop" style={{ imageRendering: 'pixelated' }} className="w-14" />
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
      <Window title={'UvA'} className={' w-[300px] sm:w-[400px]'} variant="inverted" radius={radius} center={centers[0]}>
        <div className="h-full flex flex-col gap-4">
          <div className=" flex items-center gap-6">
            <img src="/projects/uva.png" alt="uvA" style={{ imageRendering: 'pixelated' }} className="w-14" />
            <div>
              <div className="font-bold text-lg ">
                University of Amsterdam <br /> Research
              </div>
              <div className="text-sm opacity-75 ">2025 - Current</div>
            </div>
          </div>
          <div className="text-base">
            Research and optimization of blockchain protocols to secure IoT and Cloud/Edge infrastructures. Design, implementation, and performance evaluation
            <br />
            <br />
            <span className="opacity-80">Tools used : Hyperledger Fabric</span>
          </div>
        </div>
      </Window>
    </div>
  );
}
