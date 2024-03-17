import { UrlObject } from "../../../../types/url";

export const shortenUrlApi = async (
	url: string,
	expireAt?: Date,
	alias?: string
): Promise<UrlObject | false> => {
	const response = await fetch("http://localhost:4000/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			url,
			...(expireAt ? { expireAt } : null),
			...(alias ? { alias } : null),
		}),
	});
	if (response.url) return await response.json();
	return false;
};
