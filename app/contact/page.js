export default function Contact() {
  return (
    <div className="p-16">
      <div className="flex flex-col items-center justify-center h-[60vh] w-full">
        <div className="flex flex-col gap-3 text-center">
          <div className=" text-5xl text-foreground">Contact me !</div>
          <a href="mailto:mail@mail.com" className=" text-pblue text-4xl">
            mail@mail.com
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-3xl justify-end text-foreground h-[20vh]">
        <a href="https://www.linkedin.com/in/z%C3%A9phyr-dassouli-1788b42a7/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-150 w-fit">
          LinkedIn
          <img src={'/assets/link_arrow.png'} width={12} height={12} className=" clickable" style={{ imageRendering: 'pixelated' }} />
        </a>
        <a href="https://github.com/zephyr-dassouli" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-150 w-fit">
          Github
          <img src={'/assets/link_arrow.png'} width={12} height={12} className=" clickable" style={{ imageRendering: 'pixelated' }} />
        </a>
      </div>
    </div>
  );
}
