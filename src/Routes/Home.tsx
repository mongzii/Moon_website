import { useQuery, useQueries } from "react-query";
import styled from "styled-components";
import {
  getHomeTv,
  IGetHOMETVResult,
  getHomeMovies,
  IGETHOMEMOVIEResult,
  ITv,
} from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useNavigate, useMatch } from "react-router-dom";

const Wrapper = styled.div`
  background-color: black;
  height: 300vh;
`;
// const Loader = styled.div`
//   height: 20vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
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
  font-size: 38px;
  font-weight: 450;
  color: white;
  position: relative;
  top: 120px;
  padding-left: 20px;
  cursor: pointer;
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
  font-size: 38px;
  font-weight: 450;
  color: white;
  position: relative;
  top: 480px;
  padding-left: 20px;
  cursor: pointer;
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
  z-index: 7;
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
  font-size: 36px;
  font-weight: 600;
  position: relative;
  top: -80px;
`;
const BigOverview = styled.p`
  color: ${props => props.theme.white.lighter};
  top: -80px;
  position: relative;
  padding: 20px;
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
  console.log(newArr);

  // //console.log(homemovie);
  const [tvindex, settvIndex] = useState(0);
  const [movieindex, setmovieIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(prev => !prev);
  // const [leaving1, setLeaving1] = useState(false);
  // const [leaving2, setLeaving2] = useState(false);
  // const toggleLeaving1 = () => setLeaving1(prev => !prev);
  // const toggleLeaving2 = () => setLeaving2(prev => !prev);

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

  // const Overlay = styled(motion.div)`
  //   position: absolute;
  //   top: 0;
  //   width: 100%;
  //   height: 100%;
  //   /* background-color: rgba(0, 0, 0, 0.5); */
  //   background-color: black;
  //   opacity: 0;
  // `;

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
              transition={{ type: "tween", duration: 0.4 }}
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

        {/* <Wrapper>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            

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
      </Wrapper> */}
      </Wrapper>
    </>
  );
}
export default Home;
