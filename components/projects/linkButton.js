export default function LinkButton({ link }) {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="absolute top-2 right-2 flex items-center gap-2 hover:opacity-80 transition-opacity duration-150 w-fit">
            <img src={`${process.env.NEXT_PUBLIC_BASE}/assets/link_arrow.png`} width={10} height={10} className="clickable" style={{ imageRendering: 'pixelated' }} />
        </a>
    );
}