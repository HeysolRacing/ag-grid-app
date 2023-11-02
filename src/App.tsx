import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import MyState from "./context/data/MyContextState";
import Master from "./pages/master/MasterDetail";
import NoPage from "./pages/nopage/Nopage";
import Filtering from "./pages/filtering/Filtering";
import Selection from "./pages/selecting/Selecting";

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/master" element={<Master />} />
          <Route path="/filtering" element={<Filtering />} />
          <Route path="/selection" element={<Selection />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </Router>
    </MyState>
  );
}

export default App;
