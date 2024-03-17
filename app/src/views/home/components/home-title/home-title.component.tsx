import { Space, Typography } from "antd";
import "./home-title.style.css";

export const HomeTitle = () => {
	return (
		<Space direction="vertical" className="home-title__container">
			<Typography.Title level={2}>
				Shorten your looooong links :)
			</Typography.Title>
			<Typography.Paragraph type="secondary">
				Input the URL you'd like to shorten. We'll generate a shortened
				version for you.
			</Typography.Paragraph>
		</Space>
	);
};
