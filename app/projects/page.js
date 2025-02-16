'use client';
import Window from '@/components/projects/window';
import { useState, useEffect } from 'react';
import { getRandomPosition } from '@/utils/windowPositioning';
import WindowVideo from '@/components/projects/windowVideo';

export default function Projects() {
  // Initial positions for the windows
  const [pos1, setPos1] = useState(null);
  const [pos2, setPos2] = useState(null);
  const [pos3, setPos3] = useState(null);

  // Set the initial positions for the windows with a random value
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const width1 = 300,
      height1 = 300;
    const width2 = 400,
      height2 = 500;
    const width3 = 300,
      height3 = 300;

    const radius = 200; // Radius for scattering

    const centers = [
      [window.innerWidth / 2 + 400, window.innerHeight / 2 - 100],
      [window.innerWidth / 2 - 200, window.innerHeight / 2 + 100],
      [window.innerWidth / 2 + 30, window.innerHeight / 2 - 50],
    ];

    setPos1(() => getRandomPosition(radius, width1, height1, centers[0]));
    setPos2(() => getRandomPosition(radius, width2, height2, centers[1]));
    setPos3(() => getRandomPosition(radius, width3, height3, centers[2]));
  }, []);

  if (!pos1 || !pos2) return null; // Prevent rendering until positions are set

  return (
    <div>
      <div id="modal-root" />
      {/* Error 2 Window */}
      <Window width={300} height={300} title={'Error 2'} variant="inverted" videoTitle={'Video_player_mp4'} videoLink={'/videos/test.mp4'} initialTop={pos1.initialTop} initialLeft={pos1.initialLeft}>
        <div className="clickable flex flex-col gap-4 items-center">ERROR! You can not do that</div>
      </Window>

      {/* Transat Window */}
      <Window width={400} height={460} title={'Transat'} videoLink={'/videos/test.mp4'} videoTitle={'TRANSAT_PREVIEW.MP4'} variant="blue" initialTop={pos2.initialTop} initialLeft={pos2.initialLeft}>
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
      <Window width={300} height={300} title={'Error'} initialTop={pos3.initialTop} initialLeft={pos3.initialLeft}>
        ERROR! You can not do that
      </Window>
    </div>
  );
}
