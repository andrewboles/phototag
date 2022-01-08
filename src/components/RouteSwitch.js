import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {App} from "./App";
import PhotoGame from "./PhotoGame";
import Prompt from './Prompt';
import Leaderboard from './Leaderboard'

function RouteSwitch() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Prompt />} />
        <Route path="main" element={<PhotoGame />} />
        <Route path="start" element={<Prompt />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}


export default RouteSwitch;