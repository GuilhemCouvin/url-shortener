import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import "./app-layout.style.css";

type AppLayoutProps = {
	onClick: () => void;
};
export const AppLayout = (props: AppLayoutProps) => {
	return (
		<Layout className="full-screen app-layout__container">
			<Outlet />
		</Layout>
	);
};
