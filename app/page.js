import AsciiHomeAnimation from '@/components/three/asciiHomeAnimation';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative">
      <Image alt="Zephyr Dassouli" src={'/assets/zephyr_logo.png'} width={400} height={0} className="fixed left-40" />
      <AsciiHomeAnimation key={'ascii_animation'} />
    </div>
  );
}
