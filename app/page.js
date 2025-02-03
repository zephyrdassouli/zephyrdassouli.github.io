'use client';

import SideBar from '@/components/sideBar';
import Window from '@/components/window';

export default function Home() {
  return (
    <main className=" bg-background w-screen h-screen overflow-hidden">
      <SideBar />
      <div className=" text-foreground text-2xl">Hello world!</div>
      <Window title={'Error'}>ERROR! You can not do that</Window>
      <Window width={400} height={500} title={'Ok!'}>
        Yes, there is no issue
      </Window>
    </main>
  );
}
