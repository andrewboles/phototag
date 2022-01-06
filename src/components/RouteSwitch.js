import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {App} from "./App";
import PhotoGame from "./PhotoGame";

function RouteSwitch() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<PhotoGame />} />
        <Route path="main" element={<PhotoGame />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}


export default RouteSwitch;