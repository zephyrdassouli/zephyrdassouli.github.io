'use client';

import RandomTextReveal from '@/components/randomTextReveal';
import AsciiWaveAnimation from '@/components/three/AsciiWaveAnimation';

export default function Infos() {
  return (
    <div className="flex flex-row gap-4 items-center w-full md:pl-20">
      <div className="relative px-8 pt-20 h-full md:top-0 md:w-[42vw] overflow-y-auto thin-scrollbar bg-background overflow-x-hidden flex flex-row gap-4">
        <div className="flex flex-col gap-4 text-right md:w-[10vw]" style={{whiteSpace: 'nowrap'}}>
          <div className=" text-pblue">Name :</div>
          <div className=" text-pblue">Age :</div>
          <div className=" text-pblue">Location :</div>
          <div className=" text-pblue">Detail :</div>
        </div>
        <div className="flex flex-col gap-4 md:max-w-[30vw]">
          <RandomTextReveal className={'text-foreground'} text={'Zéphyr Dassouli'} />
          <RandomTextReveal className={'text-foreground'} text={'20'} />
          <RandomTextReveal className={'text-foreground'} text={'Toulouse, France'} />
          <RandomTextReveal className={'text-foreground'} text={"I am a master's student in CompSci at IMT Atlantique with a strong interest in cybersecurity and software development"} />
        </div>
      </div>
      <div className="hidden md:flex w-[30vw] absolute top-0 md:right-[45vw]">
        <AsciiWaveAnimation cameraPosition={[0, 0, 400]} cameraRotation={[0, 0, -90]} distanceValue={0} blue />
      </div>
    </div>
  );
}
