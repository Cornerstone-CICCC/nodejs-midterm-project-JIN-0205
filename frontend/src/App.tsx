import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import About from "./components/About";
import SignIn from "./components/SignIn";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Link to="/">Home</Link>
        <br />
        <Link to="/about">About</Link>
        <br />
        <Link to="/signIn">Sign In</Link>
        <br />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signIn/" element={<SignIn />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
