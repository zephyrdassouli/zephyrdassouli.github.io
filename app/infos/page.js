'use client';

import RandomTextReveal from '@/components/randomTextReveal';
import AsciiWaveAnimation from '@/components/three/AsciiWaveAnimation';

export default function Infos() {
  return (
    <div className="flex flex-row gap-4 items-center w-full md:pl-20">
      <div className="text-sm md:text-lg flex flex-col gap-8 md:gap-16 md:top-0 md:w-[42vw] px-5 pt-6 pb-6 bg-background md:px-8 md:pt-20  md:pb-20  overflow-y-auto thin-scrollbar overflow-x-hidden">
        <div className="relative h-full flex flex-row gap-4">
          <div className="flex flex-col gap-4 text-right md:w-[10vw]" style={{ whiteSpace: 'nowrap' }}>
            <div className=" text-pblue">[NAME]</div>
            <div className=" text-pblue">[AGE]</div>
            <div className=" text-pblue">[LOCATION]</div>
          </div>
          <div className="flex flex-col gap-4 md:max-w-[30vw]">
            <RandomTextReveal className={'text-foreground'} text={'Zéphyr Dassouli'} />
            <RandomTextReveal className={'text-foreground'} text={'21'} />
            <RandomTextReveal className={'text-foreground'} text={'Toulouse, France'} />
          </div>
        </div>
        <div>
          <div className="text-center text-background bg-pblue">[DETAILS]</div>
          <div className="border md:text-base flex flex-col gap-4 p-3 md:p-6 border-pblue overflow-hidden">
            <RandomTextReveal className={'text-foreground'} text={"I am a master's student in CompSci at IMT Atlantique with a strong interest in cybersecurity"} />
            <RandomTextReveal className={'text-foreground '} text={'Currently, I am doing research at the University of Amsterdam in the Multiscale Networked Systems group. My research focuses on blockchain integration to secure AI training workflows'} />
          </div>
        </div>
      </div>
      <div className=" opacity-25 md:opacity-100 w-[30vw] absolute top-0 md:right-[45vw]">
        <AsciiWaveAnimation cameraPosition={[0, 0, 400]} cameraRotation={[0, 0, -90]} distanceValue={0} blue />
      </div>
    </div>
  );
}
