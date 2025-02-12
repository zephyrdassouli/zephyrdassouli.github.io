'use client';

import RandomTextReveal from '@/components/randomTextReveal';
import AsciiWaveAnimation from '@/components/three/AsciiWaveAnimation';

export default function Infos() {
  return (
    <div className="flex flex-row gap-4 items-center w-full pl-20">
      <div className="px-4 pt-20 h-full overflow-y-auto thin-scrollbar w-[42vw] overflow-x-hidden flex flex-row gap-4">
        <div className="flex flex-col gap-4 text-right w-[10vw]">
          <div className=" text-pblue">Name :</div>
          <div className=" text-pblue">Age :</div>
          <div className=" text-pblue">Occupation :</div>
          <div className=" text-pblue">Location :</div>
          <div className=" text-pblue">Detail :</div>
        </div>
        <div className="flex flex-col gap-4 max-w-[30vw]">
          <RandomTextReveal className={'text-foreground'} text={'Zéphyr Dassouli'} />
          <RandomTextReveal className={'text-foreground'} text={'20'} />
          <RandomTextReveal className={'text-foreground'} text={'Student in Computer Science'} />
          <RandomTextReveal className={'text-foreground'} text={'Toulouse, France'} />
          <RandomTextReveal className={'text-foreground'} text={'I am a compsci master student at IMT Atlantique. My subject of intrest are cybersecurity and developpment.'} />
        </div>
      </div>
      <div className="w-[30vw] absolute top-0 right-[700px]">
        <AsciiWaveAnimation cameraPosition={[0, 0, 400]} cameraRotation={[0, 0, -90]} distanceValue={0} blue />
      </div>
    </div>
  );
}
