'use client';
import { useState, useEffect } from 'react';
import Window from '@/components/projects/window';

export default function Projects() {
  // Radius for the window positioning
  const radius = 200;
  const [centers, setCenters] = useState(null);

  useEffect(() => {
    const newCenters = [
      [window.innerWidth / 2 + 400, window.innerHeight / 2 - 100],
      [window.innerWidth / 2 - 200, window.innerHeight / 2 - 100],
      [window.innerWidth / 2 + 30, window.innerHeight / 2 - 50],
    ];
    setCenters(newCenters);
  }, []);

  // Ensure centers are initialized before rendering
  if (!centers) return null;

  return (
    <div>
      <div id="modal-root" />

      {/* Error 2 Window */}
      <Window title={'Error 2'} className={'w-60 h-52'} variant="inverted" videoTitle={'Video_player_mp4'} videoLink={'/videos/test.mp4'} radius={radius} center={centers[0]}>
        <div className="clickable flex flex-col gap-4 items-center">ERROR! You can not do that</div>
      </Window>

      {/* Transat Window */}
      <Window title={'Transat'} className={' w-[300px] sm:w-[400px]'} videoLink={'/videos/test.mp4'} videoTitle={'TRANSAT_PREVIEW.MP4'} variant="blue" radius={radius} center={centers[1]}>
        <div className="h-full flex flex-col gap-4">
          <div className=" flex items-center gap-6">
            <img src="/projects/transat.png" alt="Transat" style={{ imageRendering: 'pixelated' }} className="w-14" />
            <div>
              <div className="font-bold text-lg ">Transat / App development</div>
              <div className="text-sm opacity-75 ">2023 - Current</div>
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

      {/* Pétanque Shop */}
      <Window title={'Error'} className={' w-72 h-52'} radius={radius} center={centers[2]}>
        ERROR! You can not do that
      </Window>
    </div>
  );
}
