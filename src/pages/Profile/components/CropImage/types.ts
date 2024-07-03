import { Crop, PercentCrop, PixelCrop } from "react-image-crop";

export interface IProps {
	imageRef: React.RefObject<HTMLImageElement>;
	avatar: string;
	crop: Crop;
	onCropChange: (crop: PixelCrop, percentageCrop: PercentCrop) => unknown;
}
