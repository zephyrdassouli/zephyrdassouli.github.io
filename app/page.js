import AsciiWaveAnimation from '@/components/three/AsciiWaveAnimation';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute top-10 left-10 flex flex-col ">
        <div className="h-full text-5xl">ZEPHYR DASSOULI</div>
        <div>Compsi Master Student @IMT Atlantique</div>
        <div className="text-pblue relative bottom-2">-------------------------------------</div>
      </div>

      <AsciiWaveAnimation key={'ascii_animation'} cameraPosition={[150, 50, 400]} cameraRotation={[0, 0, 0]} />
    </div>
  );
}
