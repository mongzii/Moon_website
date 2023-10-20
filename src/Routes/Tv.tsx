import styled from "styled-components";
import { useQuery, useQueries } from "react-query";
import { IGetTvPResult, IGetTvTResult, getTvP, getTvT } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useMatch, useNavigate, useParams } from "react-router-dom";

const Wrapper = styled.div`
  background-color: black;
  height: 300vh;
`;
const Loader = styled.div`
  height: 20vh;
`;
const Main = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)),
    url(${props => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h3`
  font-size: 60px;
  margin-bottom: 20px;
  width: 70%;
`;
const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`;
const Title1 = styled.h3`
  font-size: 38px;
  color: white;
  position: relative;
  top: -120px;
  padding-left: 20px;
`;
const Slider1 = styled.div`
  position: relative;
  top: -100px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  /* background-color: white; */
  background-image: url(${props => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  height: 200px;
  /* color: red; */
  font-size: 40px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};
const Info = styled(motion.div)`
  background-color: ${props => props.theme.black.lighter};
  width: 100%;
  padding: 10px;
  opacity: 0;
  position: absolute;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

const Title2 = styled.h3`
  font-size: 38px;
  color: white;
  position: relative;
  top: 240px;
  padding-left: 20px;
`;
const Slider2 = styled.div`
  position: relative;
  top: 260px;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  opacity: 0;
`;
const BigModal = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${props => props.theme.black.lighter};
  /* h2 {
    color: white;
    font-weight: 600;
  } */
`;
const BigModal2 = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${props => props.theme.black.lighter};
  /* h2 {
    color: white;
    font-weight: 600;
  } */
`;
const BigCover = styled.img`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;
const BigCover2 = styled.img`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${props => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;
const BigTitle2 = styled.h3`
  color: ${props => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const rowVariants = {
  hidden: { x: window.outerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth - 5 },
};
const offset = 6;

function Tv() {
  const queries = [
    { queryKey: "tvpopular", queryFn: getTvP },
    { queryKey: "tvrate", queryFn: getTvT },
  ];

  const results = useQueries(queries);
  const tvpopular = results[0].data;
  const tvrate = results[1].data;

  return (
    <>
      {console.log(tvpopular.results[0])}
      {/* {console.log(tvrate)} */}
      <Wrapper>
        <Main bgPhoto={makeImagePath(tvpopular.results[0].backdrop_path)}>
          <Title>{tvpopular.results[0].name}</Title>
          <Overview>{tvpopular.results[0].overview}</Overview>
        </Main>
        {/*-------------------popular부분--------------------------------------------------------- */}

        {/* -------------top ranked부분--------------------------------------------------------- */}
      </Wrapper>
    </>
  );
}
export default Tv;
