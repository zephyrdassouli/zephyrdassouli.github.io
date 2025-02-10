import AsciiWaveAnimation from '@/components/three/AsciiWaveAnimation';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative">
      <Image alt="Zephyr Dassouli" src={'/assets/zephyr_logo.png'} width={400} height={0} className="fixed left-40 top-5" />
      <AsciiWaveAnimation key={'ascii_animation'} cameraPosition={[150, -100, 300]} />
    </div>
  );
}
