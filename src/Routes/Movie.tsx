import { useQueries } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { moviesPopular, moviesRated, moviesUpcomed, ITv } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";

const BREAK_POINT_PHONE = 378;
const BREAK_POINT_TABLET = 768;

const Wrapper = styled.div`
  background-color: black;
  height: 250vh;
`;

const Main = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)),
    //gradient는 이미지가 글자가려서 넣은거다
    url(${props => props.bgPhoto});
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    background-size: cover;
  }
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
  }
`;
const Title = styled.h3`
  font-weight: 500;
  margin-bottom: 20px;
  width: 70%;
  color: ${props => props.theme.white.darker};

  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    font-size: 60px;
  }
  @media only screen and (min-width: ${BREAK_POINT_PHONE}px) and (max-width: ${BREAK_POINT_TABLET}px) {
    font-size: 50px;
  }
  @media only screen and (max-width: ${BREAK_POINT_PHONE}px) {
    font-size: 40px;
  }
`;
const Overview = styled.p`
  width: 50%;
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    font-size: 25px;
  }
  @media only screen and (min-width: ${BREAK_POINT_PHONE}px) and (max-width: ${BREAK_POINT_TABLET}px) {
    font-size: 20px;
  }
  @media only screen and (max-width: ${BREAK_POINT_PHONE}px) {
    font-size: 10px;
  }
`;
const Title1 = styled.h3`
  color: ${props => props.theme.white.darker};
  position: relative;
  top: -120px;
  padding-left: 20px;
  cursor: pointer;
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    font-size: 38px;
    font-weight: 500;
  }
  @media only screen and (min-width: ${BREAK_POINT_PHONE}px) and (max-width: ${BREAK_POINT_TABLET}px) {
    font-size: 34px;
    font-weight: 400;
  }
  @media only screen and (max-width: ${BREAK_POINT_PHONE}px) {
    font-size: 20px;
    font-weight: 400;
  }
`;
const Slider1 = styled.div`
  position: relative;
  top: -100px;
`;

const Title2 = styled.h3`
  color: ${props => props.theme.white.darker};
  position: relative;
  top: 240px;
  padding-left: 20px;
  cursor: pointer;
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    font-size: 38px;
    font-weight: 500;
  }
  @media only screen and (min-width: ${BREAK_POINT_PHONE}px) and (max-width: ${BREAK_POINT_TABLET}px) {
    font-size: 34px;
    font-weight: 400;
  }
  @media only screen and (max-width: ${BREAK_POINT_PHONE}px) {
    font-size: 20px;
    font-weight: 400;
  }
`;

const Slider2 = styled.div`
  position: relative;
  top: 260px;
`;
const Box2 = styled(motion.div)<{ bgPhoto: string }>`
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
  color: ${props => props.theme.white.darker};
  position: relative;
  top: 600px;
  padding-left: 20px;
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    font-size: 38px;
    font-weight: 500;
  }
  @media only screen and (min-width: ${BREAK_POINT_PHONE}px) and (max-width: ${BREAK_POINT_TABLET}px) {
    font-size: 34px;
    font-weight: 400;
  }
  @media only screen and (max-width: ${BREAK_POINT_PHONE}px) {
    font-size: 20px;
    font-weight: 400;
  }
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

const Row2 = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
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
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 5px;
  // overflow: hidden;
  z-index: 7;
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    width: 40vw;
    height: 80vh;
  }
  @media only screen and (min-width: ${BREAK_POINT_PHONE}px) and (max-width: ${BREAK_POINT_TABLET}px) {
    width: 40%;
    height: 50vh;
  }
  @media only screen and (max-width: ${BREAK_POINT_PHONE}px) {
    width: 60%;
    height: 40vh;
  }
`;
//overlay의 사진부분
const BigCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h3`
  color: ${props => props.theme.white.lighter};
  padding-bottom: 10px;
  padding-left: 10px;
  position: relative;
  top: -60px;
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    font-size: 38px;
    font-weight: 550;
  }
  @media only screen and (min-width: ${BREAK_POINT_PHONE}px) and (max-width: ${BREAK_POINT_TABLET}px) {
    font-size: 30px;
    font-weight: 550;
  }
  @media only screen and (max-width: ${BREAK_POINT_PHONE}px) {
    font-size: 28px;
    font-weight: 540;
  }
`;
const BigOverview = styled.p`
  color: ${props => props.theme.white.lighter};
  top: -60px;
  position: relative;
  padding: 25px;
  background-color: ${props => props.theme.black.lighter};
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    font-size: 24px;
  }
  @media only screen and (min-width: ${BREAK_POINT_PHONE}px) and (max-width: ${BREAK_POINT_TABLET}px) {
    font-size: 22px;
  }
  @media only screen and (max-width: ${BREAK_POINT_PHONE}px) {
    font-size: 22px;
  }
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
  const queries = [
    { queryKey: "moviepopular", queryFn: moviesPopular },
    { queryKey: "movierate", queryFn: moviesRated },
    { queryKey: "movieupcome", queryFn: moviesUpcomed },
  ];
  const results = useQueries(queries);

  //새로 데이터 가공했다.
  let newArr: ITv[] = [];
  for (let i = 0; i < results.length; i++) {
    for (let j = 0; j < results[i]?.data?.results.length; j++) {
      const singleData = results[i]?.data?.results[j];
      newArr.push(singleData);
    }
  }
  //console.log(newArr);

  const [pindex, setpIndex] = useState(0);
  const [tindex, settIndex] = useState(0);
  const [uindex, setuIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(prev => !prev);
  const increasePIndex = () => {
    if (leaving) return;
    toggleLeaving();
    const totalMovies = newArr.length / 3 - 1;
    const maxIndex = Math.ceil(totalMovies / offset) - 1;
    setpIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };
  const increaseRIndex = () => {
    if (leaving) return;
    toggleLeaving();
    const totalMovies = newArr.length / 3 - 1;
    const maxIndex = Math.ceil(totalMovies / offset) - 1;
    settIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };
  const increaseUIndex = () => {
    if (leaving) return;
    toggleLeaving();
    const totalMovies = newArr.length / 3 - 1;
    const maxIndex = Math.ceil(totalMovies / offset) - 1;
    setuIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };

  //모달관련
  const navigate = useNavigate();
  const onBoxclicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const bigMovieMatch = useMatch("/movies/:movieId");
  const onOverlayClick = () => navigate("/movies");
  const { scrollY } = useViewportScroll();
  const clicked =
    bigMovieMatch?.params.movieId &&
    newArr.find(el => String(el.id) === bigMovieMatch.params.movieId);

  return (
    <>
      <Wrapper>
        <Main bgPhoto={makeImagePath(newArr[0]?.backdrop_path || "")}>
          <Title>{newArr[0]?.title}</Title>
          <Overview>
            {newArr[0]?.overview.length > 100
              ? `${newArr[0]?.overview.slice(0, 100)}....`
              : newArr[0]?.overview}{" "}
          </Overview>
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
              {newArr
                .slice(0, 20)
                .slice(offset * pindex, offset * pindex + offset)
                .map((el: ITv) => (
                  <Box2
                    layoutId={el.id + ""}
                    key={el.id}
                    variants={boxVariants}
                    initial="normal"
                    whileHover="hover"
                    transition={{ type: "tween" }}
                    onClick={() => onBoxclicked(el.id)}
                    bgPhoto={makeImagePath(el.backdrop_path, "w500")}
                  >
                    <Info variants={infoVariants}>
                      <h4>{el.title}</h4>
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
                layoutId={bigMovieMatch.params.movieId}
                style={{ top: scrollY.get() + 100 }}
              >
                {clicked && (
                  <>
                    <BigCover
                      style={{
                        backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                          clicked.backdrop_path,
                          "w500"
                        )})`,
                      }}
                    />
                    <BigTitle>{clicked.title}</BigTitle>
                    <BigOverview>{clicked.overview}</BigOverview>
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
              {newArr
                .slice(20, 40)
                .slice(offset * tindex, offset * tindex + offset)
                .map((b: ITv) => (
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
                layoutId={bigMovieMatch.params.movieId}
                style={{ top: scrollY.get() + 100 }}
              >
                {clicked && (
                  <>
                    <BigCover
                      style={{
                        backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                          clicked.backdrop_path,
                          "w500"
                        )})`,
                      }}
                    />
                    <BigTitle>{clicked.title}</BigTitle>
                    <BigOverview>{clicked.overview}</BigOverview>
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
              {newArr
                .slice(40, 60)
                .slice(offset * uindex, offset * uindex + offset)
                .map((c: ITv) => (
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
        <AnimatePresence>
          {bigMovieMatch ? (
            <>
              <Overlay
                onClick={onOverlayClick}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <BigMovie
                layoutId={bigMovieMatch.params.movieId}
                style={{ top: scrollY.get() + 100 }}
              >
                {clicked && (
                  <>
                    <BigCover
                      style={{
                        backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                          clicked.backdrop_path,
                          "w500"
                        )})`,
                      }}
                    />
                    <BigTitle>{clicked.title}</BigTitle>
                    <BigOverview>{clicked.overview}</BigOverview>
                  </>
                )}
              </BigMovie>
            </>
          ) : null}
        </AnimatePresence>
      </Wrapper>
    </>
  );
}
export default Movie;
