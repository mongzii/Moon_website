import { useQueries } from "react-query";
import styled from "styled-components";
import { getHomeTv, getHomeMovies, ITv } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useNavigate, useMatch } from "react-router-dom";

const BREAK_POINT_PHONE = 378;
const BREAK_POINT_TABLET = 768;
//const BREAK_POINT_PC = 1025;

const Wrapper = styled.div`
  background-color: black;
  height: 250vh;
`;

const Main = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)),
    url(${props => props.bgPhoto});

  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    background-size: cover;
  }
  @media only screen and (min-width: ${BREAK_POINT_PHONE}px) and (max-width: ${BREAK_POINT_TABLET}px) {
    background-position: center;
    background-size: cover;
  }
  @media only screen and (max-width: ${BREAK_POINT_PHONE}px) {
    background-position: center;
    background-size: cover;
  }
`;
const Greeting = styled.h2`
  color: gray;
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    font-size: 70px;
    font-weight: 450;
  }
  @media only screen and (min-width: ${BREAK_POINT_PHONE}px) and (max-width: ${BREAK_POINT_TABLET}px) {
    font-size: 50px;
    font-weight: 500;
  }
  @media only screen and (max-width: ${BREAK_POINT_PHONE}px) {
    font-size: 40px;
    font-weight: 600;
  }
`;

const Title1 = styled.h3`
  font-weight: 450;
  color: white;
  position: relative;
  top: 120px;
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
    font-size: 34px;
    font-weight: 400;
  }
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
  /* background-color: white; */
  height: 200px;
  cursor: pointer;
  //font-size: 40px;
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
  font-weight: 450;
  color: white;
  position: relative;
  top: 480px;
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
    font-size: 34px;
    font-weight: 400;
  }
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
  //width: 40vw;
  //height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  //background-color: ${props => props.theme.black.lighter};
  z-index: 7;
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    width: 40vw;
    height: 80vh;
  }
  @media only screen and (min-width: ${BREAK_POINT_PHONE}px) and (max-width: ${BREAK_POINT_TABLET}px) {
    width: 30vw;
    height: 50vh;
  }
  @media only screen and (max-width: ${BREAK_POINT_PHONE}px) {
    width: 20vw;
    height: 40vh;
  }
`;
const BigCover = styled.img`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${props => props.theme.white.lighter};
  padding: 20px;
  /* font-size: 36px; */
  font-weight: 600;
  position: relative;
  top: -80px;
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    /* background-color: white; */
    color: blue;
    font-size: 38px;
  }
  @media only screen and (min-width: ${BREAK_POINT_PHONE}px) and (max-width: ${BREAK_POINT_TABLET}px) {
    font-size: 30px;
    color: red;
  }
  /* @media only screen and (max-width: ${BREAK_POINT_PHONE}px) {
    font-size: 27px;
    color: red;
  } */
`;
const BigOverview = styled.p`
  color: ${props => props.theme.white.lighter};
  top: -80px;
  position: relative;
  padding: 20px;
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    height: 50vh;
    font-size: 24px;
  }
  @media only screen and (min-width: ${BREAK_POINT_PHONE}px) and (max-width: ${BREAK_POINT_TABLET}px) {
    height: 60vh;
    font-size: 22px;
  }
  @media only screen and (max-width: ${BREAK_POINT_PHONE}px) {
    height: 80vh;
    font-size: 22px;
  }
`;
const offset = 6;

function Home() {
  const queries = [
    { queryKey: "hometv", queryFn: getHomeTv },
    { queryKey: "homemovie", queryFn: getHomeMovies },
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

  const [tvindex, settvIndex] = useState(0);
  const [movieindex, setmovieIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(prev => !prev);

  const increasetvIndex = () => {
    if (leaving) return;
    toggleLeaving();
    const totaltvs = newArr.length / 2 - 1;
    const maxIndex = Math.ceil(totaltvs / offset) - 1;
    settvIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };

  const increasemoviIndex = () => {
    if (leaving) return;
    toggleLeaving();
    const totaltvs = newArr.length / 2 - 1;
    const maxIndex = Math.ceil(totaltvs / offset) - 1;
    setmovieIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };
  //model관련
  const navigate = useNavigate();
  const onBoxclicked = (trendId: number) => {
    navigate(`/trends/${trendId}`);
  };
  const bigHomeTvMatch = useMatch("/trends/:trendId");

  const onOverlayClick = () => navigate("/");
  const { scrollY } = useViewportScroll();

  const clicked =
    bigHomeTvMatch?.params.trendId &&
    newArr.find(el => String(el.id) === bigHomeTvMatch?.params.trendId);

  return (
    <>
      <Wrapper>
        <Main bgPhoto={makeImagePath(newArr[0]?.backdrop_path)}>
          <Greeting>Welcome to the MoonFlix</Greeting>
        </Main>

        <Title1 onClick={increasetvIndex}>Tv</Title1>
        <Slider1>
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Row1
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              key={tvindex}
              transition={{ type: "tween", duration: 1 }}
            >
              {newArr
                .slice(0, 20)
                .slice(offset * tvindex, offset * tvindex + offset)
                .map((el: ITv) => (
                  <Box1
                    layoutId={el.id + ""}
                    whileHover="hover"
                    initial="normal"
                    variants={boxVariants}
                    key={el.id}
                    bgPhoto={makeImagePath(el.backdrop_path)}
                    onClick={() => onBoxclicked(el.id)}
                  >
                    <Info variants={infoVariants}>
                      <h4>{el.name || el.title}</h4>
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
              <BigModal
                layoutId={bigHomeTvMatch.params.trendId}
                style={{ top: scrollY.get() + 100 }}
              >
                {clicked && (
                  <>
                    <BigCover
                      src={makeImagePath(clicked.backdrop_path, "w500")}
                    />
                    <BigTitle>{clicked.name || clicked.title}</BigTitle>
                    <BigOverview>{clicked.overview}</BigOverview>
                  </>
                )}
              </BigModal>
            </>
          ) : null}
        </AnimatePresence>

        <Title2 onClick={increasemoviIndex}>Movies</Title2>
        <Slider2>
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Row2
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 1 }}
              key={movieindex}
            >
              {newArr
                .slice(20, 40)
                .slice(offset * movieindex, offset * movieindex + offset)
                .map((el: ITv) => (
                  <Box1
                    layoutId={el.id + ""}
                    whileHover="hover"
                    initial="normal"
                    variants={boxVariants}
                    key={el.id}
                    bgPhoto={makeImagePath(el.backdrop_path)}
                    onClick={() => onBoxclicked(el.id)}
                  >
                    <Info variants={infoVariants}>
                      <h4>{el.name || el.title}</h4>
                    </Info>
                  </Box1>
                ))}
            </Row2>
          </AnimatePresence>
        </Slider2>
        <AnimatePresence>
          {bigHomeTvMatch ? (
            <>
              <Overlay
                onClick={onOverlayClick}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <BigModal
                layoutId={bigHomeTvMatch.params.trendId}
                style={{ top: scrollY.get() + 100 }}
              >
                {clicked && (
                  <>
                    <BigCover
                      src={makeImagePath(clicked.backdrop_path, "w500")}
                    />
                    <BigTitle>{clicked.name || clicked.title}</BigTitle>
                    <BigOverview>{clicked.overview}</BigOverview>
                  </>
                )}
              </BigModal>
            </>
          ) : null}
        </AnimatePresence>
      </Wrapper>
    </>
  );
}
export default Home;
