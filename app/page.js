import AsciiWaveAnimation from '@/components/three/AsciiWaveAnimation';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative flex w-full justify-center">
      <div className="sm:absolute relative top-6 sm:left-10 flex flex-col ">
        <div className="h-full text-4xl sm:text-5xl">ZEPHYR DASSOULI</div>
        <div className='sm:text-[19.20px] text-[14.20px]'>Compsi Master Student @IMT Atlantique</div>
        <div className="text-pblue relative bottom-2 sm:text-[19.20px] sm:mt-0 mt-2 text-[14.20px]">-------------------------------------</div>
      </div>
      <AsciiWaveAnimation key={'ascii_animation'} cameraPosition={[150, 50, 400]} cameraRotation={[0, 0, 0]} />
    </div>
  );
}
