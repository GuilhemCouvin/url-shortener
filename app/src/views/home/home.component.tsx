import { Layout, Space } from "antd";
import { HomeTitle } from "./components/home-title/home-title.component";
import { UrlInput } from "./components/url-input/url-input.component";
import { UrlSummary } from "./components/url-summary/url-summary.component";
import { UrlObject } from "../../types/url";
import { useState } from "react";
import "./home.style.css";

export const Home = () => {
	const [urlObjects, setUrlObjects] = useState<UrlObject[]>([]);
	return (
		<Layout className="home__container">
			<Space direction="vertical" size="large">
				<HomeTitle />

				<UrlInput setUrlObjects={setUrlObjects} />

				{urlObjects.length ? (
					<UrlSummary urlObjects={urlObjects} />
				) : null}
			</Space>
		</Layout>
	);
};
