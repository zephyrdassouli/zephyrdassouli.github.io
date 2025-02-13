'use client';
import Window from '@/components/window';
import { useState, useEffect } from 'react';
import { getRandomPosition } from '@/utils/windowPositioning';
import WindowVideo from '@/components/windowVideo';

export default function Projects() {
  const [pos1, setPos1] = useState(null);
  const [pos2, setPos2] = useState(null);
  const [pos3, setPos3] = useState(null);

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
      <Window width={300} height={300} title={'Error 2'} initialTop={pos1.initialTop} initialLeft={pos1.initialLeft}>
        <div className="flex flex-col gap-4 items-center">
          ERROR! You can not do that
          <WindowVideo button={'Video'} title={'Video_player_mp4'} videoLink={'/videos/test.mp4'} />
        </div>
      </Window>
      <Window width={400} height={500} title={'Transat!'} variant="blue" initialTop={pos2.initialTop} initialLeft={pos2.initialLeft}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-6">
            <div className="font-bold text-lg">App development</div>
          </div>
          <div className=" text-base">
            Needs analysis, design, and development in React Native of an application integrating all services and important information on IMT Atlantique campus <br />
            <br />
            Compliance work included analyzing, designing, and updating the app to meet all legal standards and regulations
          </div>
        </div>
      </Window>
      <Window width={300} height={300} title={'Error'} initialTop={pos3.initialTop} initialLeft={pos3.initialLeft}>
        ERROR! You can not do that
      </Window>
    </div>
  );
}
