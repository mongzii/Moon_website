import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";

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
          <Route path="/movies/:moviesId" element=<Movie /> />
          <Route path="/movies" element=<Movie /> />
          <Route path="/tv/:tvId" element=<Tv /> />
          <Route path="/tv" element=<Tv /> />
          <Route path="/search" element=<Search /> />
          <Route path="/trends/:trendId" element=<Home /> />
          <Route path="/" element=<Home /> />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
