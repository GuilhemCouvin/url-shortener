import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { Home } from "./views/home/home.component";
import { LinkNotFound } from "./views/link-not-found/link-not-found.component";
import { AppLayout } from "./views/app-layout/app-layout.component";
import { theme, ConfigProvider } from "antd";
import { useState } from "react";

const App = () => {
	const { defaultAlgorithm, darkAlgorithm } = theme;
	const [isDarkMode, setIsDarkMode] = useState(false);

	const onClick = () => {
		setIsDarkMode((previousValue) => !previousValue);
	};

	return (
		<ConfigProvider
			theme={{
				algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
			}}
		>
			<Router>
				<Routes>
					<Route element={<AppLayout onClick={onClick} />}>
						<Route path="/home" element={<Home />} />
						<Route
							path="/link-not-found"
							element={<LinkNotFound />}
						/>
						<Route
							path="*"
							element={<Navigate replace to="/home" />}
						/>
					</Route>
				</Routes>
			</Router>
		</ConfigProvider>
	);
};

export default App;
