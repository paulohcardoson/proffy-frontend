const generateAuthorizationHeader = (token: string) => {
	return `Bearer ${token}`;
};

export default generateAuthorizationHeader;
