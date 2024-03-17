import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { Home } from "./views/home/home.component";
import { LinkNotFound } from "./views/link-not-found/link-not-found.component";
import { AppLayout } from "./views/app-layout/app-layout.component";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route element={<AppLayout />}>
					<Route path="/home" element={<Home />} />
					<Route path="/link-not-found" element={<LinkNotFound />} />
					<Route path="*" element={<Navigate replace to="/home" />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
