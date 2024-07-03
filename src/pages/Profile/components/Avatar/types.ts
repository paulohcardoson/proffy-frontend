export interface IAvatarProps {
	source: string | null;
	onClick: () => unknown;
	canvasRef: React.RefObject<HTMLCanvasElement>;
}
