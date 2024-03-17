type DefaultMongoType = {
	_id: string;

	createdAt: string;
	updatedAt: string;

	expireAt: string;

	__v: number;
};

export type UrlObject = DefaultMongoType & {
	url: string;

	source: string;

	scheme: string;
	host: string;

	shortUrl: string;
	domain: string;
	alias: string;
	custom?: boolean;

	clicks: number;
};
