import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import {
  getMovies,
  moviesPopular,
  moviesRated,
  moviesUpcomed,
  IGetMoviesResult,
  IMoviesPopularResult,
  IMoviesRatedResult,
  IMoviesUpcomeResult,
} from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import { resourceLimits } from "worker_threads";

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
  justify-content: center;
  padding: 60px;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)),
    //gradient는 이미지가 글자가려서 넣은거다
    url(${props => props.bgPhoto});
`;
const Title = styled.h3`
  font-size: 60px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;
const Title1 = styled.h3`
  color: white;
  font-size: 24px;
  position: relative;
  top: -120px;
  padding-left: 20px;
`;
const Slider1 = styled.div`
  position: relative;
  top: -100px;
`;

const Title2 = styled.h3`
  color: white;
  font-size: 24px;
  position: relative;
  top: 240px;
  padding-left: 20px;
`;

const Slider2 = styled.div`
  position: relative;
  /* margin-top: 200px; */
  top: 260px;
`;
const Box2 = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${props => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Title3 = styled.h3`
  color: white;
  font-size: 24px;
  position: relative;
  top: 600px;
  padding-left: 20px;
`;
const Slider3 = styled.div`
  position: relative;
  top: 620px;
`;
const Box3 = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${props => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Title4 = styled.h3`
  color: white;
  font-size: 24px;
  position: relative;
  top: 940px;
  padding-left: 20px;
`;
const Slider4 = styled.div`
  position: relative;
  top: 960px;
`;
const Box4 = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${props => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;
const Row2 = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${props => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
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
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const BigMovie = styled(motion.div)`
  width: 40vw;
  height: 80vh;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 5px;
  overflow: hidden;
  background-color: ${props => props.theme.black.lighter};
  z-index: 7;
`;
//overlay의 사진부분
const BigCover = styled.div`
  width: 100%;
  height: 350px;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h3`
  color: ${props => props.theme.white.lighter};
  padding: 10px;
  font-size: 30px;
  position: relative;
  top: -60px;
`;
const BigOverview = styled.p`
  color: ${props => props.theme.white.lighter};
  top: -60px;
  position: relative;
  padding: 20px;
`;

const rowVariants = {
  hidden: { x: window.outerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth - 5 },
};
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
const offset = 6;

function Movie() {
  const { data: movienow, isLoading } = useQuery<IGetMoviesResult>(
    ["movienow", "nowPlaying"],
    getMovies
  );
  const { data: moviepopular } = useQuery<IMoviesPopularResult>(
    ["moviepopular", "popular"],
    moviesPopular
  );
  const { data: movierate } = useQuery<IMoviesRatedResult>(
    ["movierate", "rated"],
    moviesRated
  );
  const { data: movieupcome } = useQuery<IMoviesUpcomeResult>(
    ["movieupcome", "coming"],
    moviesUpcomed
  );
  // console.log(movienow);
  // console.log(moviepopular);
  // console.log(movierate);
  // console.log(movieupcome);
  const [pindex, setpIndex] = useState(0);
  const [tindex, settIndex] = useState(0);
  const [uindex, setuIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(prev => !prev);
  const increasePIndex = () => {
    if (moviepopular) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = moviepopular?.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setpIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const increaseRIndex = () => {
    if (movierate) {
      if (leaving) return;
      toggleLeaving();
      const totalRate = movierate?.results.length - 1;
      const maxIndex = Math.ceil(totalRate / offset) - 1;
      settIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const increaseUIndex = () => {
    if (movieupcome) {
      if (leaving) return;
      toggleLeaving();
      const totalUp = movieupcome?.results.length - 1;
      const maxIndex = Math.ceil(totalUp / offset) - 1;
      setuIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  //모달관련
  const navigate = useNavigate();
  const onBoxclicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const bigMovieMatch = useMatch("/movies/:movieId");
  const onOverlayClick = () => navigate("/movies");
  const { scrollY } = useViewportScroll();
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    (moviepopular || movierate || movieupcome)?.results.find(
      movie => String(movie.id) === bigMovieMatch.params.movieId
    );
  // const clickedMovie2 =
  //   bigMovieMatch?.params.movieId &&
  //   movierate?.results.find(
  //     movie => String(movie.id) === bigMovieMatch.params.movieId
  //   );
  // console.log(clickedMovie2);

  return (
    <>
      <Wrapper>
        {isLoading ? (
          <Loader>Loading.....</Loader>
        ) : (
          <>
            <Main
              bgPhoto={makeImagePath(movienow?.results[0].backdrop_path || "")}
            >
              <Title>{movienow?.results[0].title}</Title>
              <Overview>{movienow?.results[0].overview}</Overview>
            </Main>
            {/* -------------popular부분--------------------------------------------------------- */}
            <Title1 onClick={increasePIndex}>Popular</Title1>
            <Slider1>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row2
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={pindex}
                >
                  {moviepopular?.results
                    .slice()
                    .slice(offset * pindex, offset * pindex + offset)
                    .map(a => (
                      <Box2
                        layoutId={a.id + ""}
                        key={a.id}
                        variants={boxVariants}
                        initial="normal"
                        whileHover="hover"
                        transition={{ type: "tween" }}
                        onClick={() => onBoxclicked(a.id)}
                        bgPhoto={makeImagePath(a.backdrop_path, "w500")}
                      >
                        <Info variants={infoVariants}>
                          <h4>{a.title}</h4>
                        </Info>
                      </Box2>
                    ))}
                </Row2>
              </AnimatePresence>
            </Slider1>
            <AnimatePresence>
              {bigMovieMatch ? (
                <>
                  <Overlay
                    onClick={onOverlayClick}
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <BigMovie
                    style={{ top: scrollY.get() + 100 }}
                    layoutId={bigMovieMatch.params.movieId}
                  >
                    {clickedMovie && (
                      <>
                        <BigCover
                          style={{
                            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                              clickedMovie.backdrop_path,
                              "w500"
                            )})`,
                          }}
                        />
                        <BigTitle>{clickedMovie.title}</BigTitle>
                        <BigOverview>{clickedMovie.overview}</BigOverview>
                      </>
                    )}
                  </BigMovie>
                </>
              ) : null}
            </AnimatePresence>
            {/* -------------Top Rated부분--------------------------------------------------------- */}
            <Title2 onClick={increaseRIndex}>Top Rated</Title2>
            <Slider2>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row2
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={tindex}
                >
                  {movierate?.results
                    .slice()
                    .slice(offset * tindex, offset * tindex + offset)
                    .map(b => (
                      <Box3
                        layoutId={b.id + ""}
                        key={b.id}
                        variants={boxVariants}
                        initial="normal"
                        whileHover="hover"
                        transition={{ type: "tween" }}
                        onClick={() => onBoxclicked(b.id)}
                        bgPhoto={makeImagePath(b.backdrop_path, "w500")}
                      >
                        <Info variants={infoVariants}>
                          <h4>{b.title}</h4>
                        </Info>
                      </Box3>
                    ))}
                </Row2>
              </AnimatePresence>
            </Slider2>
            <AnimatePresence>
              {bigMovieMatch ? (
                <>
                  <Overlay
                    onClick={onOverlayClick}
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <BigMovie
                    style={{ top: scrollY.get() + 100 }}
                    layoutId={bigMovieMatch.params.movieId}
                  >
                    {clickedMovie && (
                      <>
                        <BigCover
                          style={{
                            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                              clickedMovie.backdrop_path,
                              "w500"
                            )})`,
                          }}
                        />
                        <BigTitle>{clickedMovie.title}</BigTitle>
                        <BigOverview>{clickedMovie.overview}</BigOverview>
                      </>
                    )}
                  </BigMovie>
                </>
              ) : null}
            </AnimatePresence>
            {/* -------------Upcoming부분--------------------------------------------------------- */}
            <Title3 onClick={increaseUIndex}>Upcoming</Title3>
            <Slider3>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row2
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={uindex}
                >
                  {movieupcome?.results
                    .slice()
                    .slice(offset * uindex, offset * uindex + offset)
                    .map(c => (
                      <Box4
                        layoutId={c.id + ""}
                        key={c.id}
                        variants={boxVariants}
                        initial="normal"
                        whileHover="hover"
                        transition={{ type: "tween" }}
                        onClick={() => onBoxclicked(c.id)}
                        bgPhoto={makeImagePath(c.backdrop_path, "w500")}
                      >
                        <Info variants={infoVariants}>
                          <h4>{c.title}</h4>
                        </Info>
                      </Box4>
                    ))}
                </Row2>
              </AnimatePresence>
            </Slider3>
          </>
        )}
      </Wrapper>
    </>
  );
}
export default Movie;
