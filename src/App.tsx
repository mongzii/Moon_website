import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Home from "./Routes/Home";
import Movie from "./Routes/Movie";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/movies" element=<Movie /> />
          <Route path="/tv" element=<Tv /> />
          <Route path="/search" element=<Search /> />
          <Route path="/" element=<Home /> />
          <Route path="/movies/:movieId" element=<Home /> />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
