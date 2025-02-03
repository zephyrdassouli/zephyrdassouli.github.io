'use client';

import { useDraggableWindow } from '@/utils/useDraggableWindow';
import './windowStyle.css';

export default function Window({ children, title, width = 300, height = 300, initialTop = 50, initialLeft = 50 }) {
  const { position, dragListeners } = useDraggableWindow(width, height, initialTop, initialLeft);

  return (
    <div
      className="bg-background flex flex-col justify-center items-center p-[8px] pt-1 pixel-border"
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div className="bg-background text-foreground w-full pt-2 pb-2 pr-1 flex justify-between cursor-move" {...dragListeners}>
        <div>{title}</div>
        <button className="text-xl relative bottom-1">x</button>
      </div>
      <div className="text-background bg-foreground w-full h-full flex items-center justify-center p-4">{children}</div>
    </div>
  );
}
