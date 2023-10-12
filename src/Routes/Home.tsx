import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getHomeTv,
  IGetHOMETVResult,
  getHomeMovies,
  IGETHOMEMOVIEResult,
} from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useNavigate, useMatch } from "react-router-dom";

const Wrapper = styled.div`
  background-color: black;
  height: 300vh;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Main = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 60px;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)),
    url(${props => props.bgPhoto});
`;
const Greeting = styled.h2`
  font-size: 70px;
  color: gray;
`;

const Title1 = styled.h3`
  color: white;
  font-size: 25px;
  font-weight: 500;
  position: relative;
  top: 130px;
  padding-left: 30px;
`;
const Slider1 = styled.div`
  position: relative;
  top: 150px;
`;
const Row1 = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
  position: absolute;
`;
const rowVariants = {
  hidden: { x: window.outerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth - 5 },
};
const Box1 = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  cursor: pointer;
  font-size: 40px;
  background-image: url(${props => props.bgPhoto});
  background-size: cover;
  background-position: center center;
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
  padding: 10px;
  background-color: ${props => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
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
  color: white;
  font-size: 25px;
  font-weight: 500;
  position: relative;
  top: 480px;
  padding-left: 20px;
`;
const Slider2 = styled.div`
  position: relative;
  top: 500px;
`;
const Row2 = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
  position: absolute;
`;
const Box2 = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  cursor: pointer;
  background-image: url(${props => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const offset = 6;

function Home() {
  const { data: hometv, isLoading } = useQuery<IGetHOMETVResult>(
    ["hometv", "trending"],
    getHomeTv
  );
  const { data: homemovie } = useQuery<IGETHOMEMOVIEResult>(
    ["homemovie", "trending"],
    getHomeMovies
  );
  //console.log(homemovie);
  const [tvindex, settvIndex] = useState(0);
  const [movieindex, setmovieIndex] = useState(0);
  const [leaving1, setLeaving1] = useState(false);
  const [leaving2, setLeaving2] = useState(false);
  const toggleLeaving1 = () => setLeaving1(prev => !prev);
  const toggleLeaving2 = () => setLeaving2(prev => !prev);

  const increasetvIndex = () => {
    if (hometv) {
      if (leaving1) return;
      toggleLeaving1();
      const totalTVs = hometv?.results.length - 1;
      const maxIndex = Math.ceil(totalTVs / offset) - 1;
      settvIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const increasemoviIndex = () => {
    if (homemovie) {
      if (leaving2) return;
      toggleLeaving2();
      const totalMovies = homemovie?.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setmovieIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  //model관련
  const navigate = useNavigate();
  const bigHomeTvMatch = useMatch("/trends/:trendTvId");
  // {
  //   console.log(bigHomeTvMatch);
  // }
  const ontvBoxclicked = (trendTvId: number) => {
    navigate(`/trends/${trendTvId}`);
  };
  const onmovieBoxclicked = (trendMovieId: number) => {
    navigate(`/trends/${trendMovieId}`);
  };
  const clickedTv =
    bigHomeTvMatch?.params.trendTvId &&
    hometv?.results.find(
      tv => String(tv.id) === bigHomeTvMatch.params.trendTvId
    );
  const Overlay = styled(motion.div)`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 0.5); */
    background-color: black;
    opacity: 0;
  `;
  const onOverlayClick = () => navigate("/");

  const { scrollY } = useViewportScroll();

  return (
    <>
      <Wrapper>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Main
              onClick={increasetvIndex}
              bgPhoto={makeImagePath(hometv?.results[0].backdrop_path || "")}
            >
              <Greeting>Welcome to the MoonFlix</Greeting>
            </Main>

            <Title1 onClick={increasetvIndex}>Tv</Title1>
            <Slider1>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving1}>
                <Row1
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={tvindex}
                  transition={{ type: "tween", duration: 1 }}
                >
                  {hometv?.results
                    .slice(1)
                    .slice(offset * tvindex, offset * tvindex + offset)
                    .map(tv => (
                      <Box1
                        layoutId={tv.id + ""}
                        whileHover="hover"
                        initial="normal"
                        variants={boxVariants}
                        bgPhoto={makeImagePath(tv.backdrop_path, "w400")}
                        key={tv.id}
                        onClick={() => ontvBoxclicked(tv.id)}
                      >
                        <Info variants={infoVariants}>
                          <h4>{tv.title || tv.name}</h4>
                        </Info>
                      </Box1>
                    ))}
                </Row1>
              </AnimatePresence>
            </Slider1>
            <AnimatePresence>
              {bigHomeTvMatch ? (
                <>
                  <Overlay
                    onClick={onOverlayClick}
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <motion.div
                    layoutId={bigHomeTvMatch.params.trendTvId}
                    style={{
                      position: "absolute",
                      width: "40vw",
                      height: "80vh",
                      backgroundColor: "red",
                      top: scrollY.get() + 100,
                      left: 0,
                      right: 0,
                      margin: "0 auto",
                    }}
                  />
                </>
              ) : null}
            </AnimatePresence>

            <Title2 onClick={increasemoviIndex}>Movies</Title2>
            <Slider2>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving2}>
                <Row2
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={movieindex}
                  transition={{ type: "tween", duration: 1 }}
                >
                  {homemovie?.results
                    .slice(1)
                    .slice(offset * movieindex, offset * movieindex + offset)
                    .map(movie => (
                      <Box2
                        whileHover="hover"
                        initial="normal"
                        variants={boxVariants}
                        bgPhoto={makeImagePath(movie.backdrop_path, "w400")}
                        key={movie.id}
                        onClick={() => onmovieBoxclicked(movie.id)}
                      >
                        <Info variants={infoVariants}>
                          <h4>{movie.title}</h4>
                        </Info>
                      </Box2>
                    ))}
                </Row2>
              </AnimatePresence>
            </Slider2>
          </>
        )}
      </Wrapper>
    </>
  );
}
export default Home;
