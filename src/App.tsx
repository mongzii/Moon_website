import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";

import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Home from "./Routes/Home";
import Movie from "./Routes/Movie";
import styled from "styled-components";

// const Layout = styled.div`
//   box-sizing: border-box;
//   width: 100%;
//   border: 10px solid blue;
//   /* max-width: 100vw; */
// `;
function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Layout> */}
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
        {/* </Layout> */}
      </BrowserRouter>
    </>
  );
}

export default App;
