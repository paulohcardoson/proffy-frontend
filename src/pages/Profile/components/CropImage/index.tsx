import React from "react";
import ReactCrop from "react-image-crop";
import { IProps } from "./types";

const CropImage: React.FC<IProps> = ({
	imageRef,
	avatar,
	crop,
	onCropChange,
}) => {
	return (
		<ReactCrop
			className="w-full"
			crop={crop}
			onChange={onCropChange}
			aspect={1}
			keepSelection
			circularCrop
		>
			<img className="w-full" ref={imageRef} src={avatar} />
		</ReactCrop>
	);
};

export default CropImage;
