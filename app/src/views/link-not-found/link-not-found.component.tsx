import { Button, Card, Layout, Typography } from "antd";
import "./link-not-found.style.css";

export const LinkNotFound = () => {
	return (
		<Layout className="link-not-found__container">
			<div className="link-not-found__content">
				<Card className="link-not-found__card">
					<Typography.Title level={4} style={{ marginTop: 0 }}>
						Oops
					</Typography.Title>
					<Typography.Paragraph type="secondary">
						It's seems that the link you're trying to reach is
						expired or doesn't exist.
					</Typography.Paragraph>
					<a href="/home">
						<Button className="primary-btn" type="primary">
							Go back to home page
						</Button>
					</a>
				</Card>
			</div>
		</Layout>
	);
};
