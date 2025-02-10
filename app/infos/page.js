'use client';

import RandomTextReveal from '@/components/randomTextReveal';
import AsciiWaveAnimation from '@/components/three/AsciiWaveAnimation';

export default function Infos() {
  return (
    <div className="p-4 flex flex-row gap-4 items-center w-full">
      <div className="p-2 h-full overflow-y-auto thin-scrollbar w-[42vw] overflow-x-hidden">
        <RandomTextReveal text={"\n Marque: HP \nNom de modèle: 750G6EA\nTaille de l'écran: 16,1 Pouces\nCouleur: Argent\nTaille du disque dur: 512 Go\nModèle du CPU: Core i5\nTaille de la mémoire RAM installée: 16 Go \n \n Système d'exploitation: Windows 11 Home\nCaractéristique spéciale: Anti Glare Screen"} />
      </div>
      <div className="flex flex-col gap-4 h-full w-[42vw] absolute right-[500px]">
        <AsciiWaveAnimation cameraPosition={[0, 0, 400]} cameraRotation={[0, 0, -90]} distanceValue={0} />
      </div>
    </div>
  );
}
