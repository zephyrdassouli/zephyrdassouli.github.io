'use client';
import { useState, useEffect } from 'react';
import Window from '@/components/projects/window';

export default function Projects() {
  const [def, setDef] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false); // Hidden by default on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDef('Def !');

      // Check if device is mobile
      const checkMobile = () => {
        const mobile = window.innerWidth < 768; // md breakpoint
        setIsMobile(mobile);
        if (!mobile) {
          setSidebarVisible(true); // Show sidebar by default on desktop
        }
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);

      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  if (!def) return null;

  return (
    <div className='flex flex-row h-full overflow-hidden relative'>
      {/* Toggle Button - Top Right */}
      <button
        onClick={() => setSidebarVisible(!sidebarVisible)}
        className={`fixed top-4 right-4 z-50 px-3 py-2 text-xs font-mono border border-pblue bg-background text-pblue hover:bg-pblue hover:text-background transition-colors ${sidebarVisible ? 'text-pblue' : 'text-foreground'
          }`}
        style={{ fontFamily: 'monospace' }}
      >
        {sidebarVisible ? '[HIDE RESEARCH]' : '[SHOW RESEARCH]'}
      </button>

      {/* Security Research Sidebar */}
      <div className={`${isMobile
          ? (sidebarVisible ? 'fixed inset-0 w-full z-40' : 'hidden')
          : (sidebarVisible ? 'w-[350px] flex-shrink-0' : 'w-0 overflow-hidden')
        } h-full bg-background border-r border-pblue transition-all duration-300`}>
        <div className='pixel-border-blue h-full m-2'>
          <div className='p-4 h-full flex flex-col'>
            <div className='text-center border-b border-pblue pb-4 mb-4'>
              <h2 className='text-xl font-bold text-pblue'>SECURITY RESEARCH</h2>
              <div className='text-sm opacity-75 text-foreground mt-1'>Research & Analysis</div>
            </div>

            {/* Placeholder research items */}
            <div className='flex-1 overflow-y-auto space-y-4'>
              <div className='border border-pblue p-3 bg-background'>
                <div className='text-sm font-bold text-pblue mb-2'>Placeholder Research #1</div>
                <div className='text-xs text-foreground opacity-75 mb-1'>2024 - Ongoing</div>
                <div className='text-xs text-foreground'>Description of security research project will go here...</div>
              </div>

              <div className='border border-pblue p-3 bg-background'>
                <div className='text-sm font-bold text-pblue mb-2'>Placeholder Research #2</div>
                <div className='text-xs text-foreground opacity-75 mb-1'>2023 - 2024</div>
                <div className='text-xs text-foreground'>Another security research project description...</div>
              </div>

              <div className='border border-pblue p-3 bg-background'>
                <div className='text-sm font-bold text-pblue mb-2'>Placeholder Research #3</div>
                <div className='text-xs text-foreground opacity-75 mb-1'>2023</div>
                <div className='text-xs text-foreground'>Third research project placeholder content...</div>
              </div>
            </div>

            <div className='text-center text-xs text-foreground opacity-50 pt-4 border-t border-pblue'>
              More research coming soon...
            </div>
          </div>
        </div>
      </div>

      {/* Main content area for windows */}
      <div className='flex-1 overflow-hidden' style={{ marginLeft: '0px' }}>
        <div id="modal-root" />
        {/* Transat Window */}
        <Window
          title={'Transat'}
          className={' w-[300px] sm:w-[400px] grow-fade'}
          videoLink={`${process.env.NEXT_PUBLIC_BASE}/videos/video_transat.mp4`}
          assetTitle={'TRANSAT_PREVIEW.MP4'}
          variant="blue"
          sidebarVisible={sidebarVisible}
          isMobile={isMobile}
        >
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
        <Window
          title={'This portfolio'}
          className={'w-[300px] sm:w-[400px] grow-fade'}
          sidebarVisible={sidebarVisible}
          isMobile={isMobile}
        >
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
        <Window
          title={'PetanqueShop'}
          className={'w-[300px] sm:w-[400px] grow-fade'}
          photoLink={`${process.env.NEXT_PUBLIC_BASE}/photos/petanque.png`}
          assetTitle={'PETANQUESHOP_PREVIEW.PNG'}
          sidebarVisible={sidebarVisible}
          isMobile={isMobile}
        >
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
        <Window
          title={'UvA'}
          className={' w-[300px] sm:w-[400px] grow-fade'}
          variant="inverted"
          sidebarVisible={sidebarVisible}
          isMobile={isMobile}
        >
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
    </div>
  );
}
