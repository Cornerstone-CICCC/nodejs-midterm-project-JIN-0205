import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import About from "./components/About";
import SignIn from "./components/SignIn";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signIn/" element={<SignIn />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
