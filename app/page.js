'use client';

import Window from '@/components/window';

export default function Home() {
  return (
    <main className=" bg-background w-screen h-screen flex justify-center items-center overflow-hidden">
      <div className=" text-foreground text-2xl">Hello world!</div>
      <Window title={'Error'}>ERROR! You can not do that</Window>
    </main>
  );
}
