import styled from "styled-components";
import { useQueries } from "react-query";
import { getTvP, getTvT, ITv } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";

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
const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-image: url(${props => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  height: 200px;

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
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 5px;
  //background-color: ${props => props.theme.black.lighter};
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

const BigCover = styled.img`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${props => props.theme.white.lighter};
  padding-bottom: 10px;
  padding-left: 10px;
  position: relative;
  top: -80px;
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
  top: -80px;
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
const offset = 6;

function Tv() {
  const queries = [
    { queryKey: "tvpopular", queryFn: getTvP },
    { queryKey: "tvrate", queryFn: getTvT },
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

  const [pIndex, setPIndex] = useState(0);
  const [rIndex, setRIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(prev => !prev);

  const incPIndex = () => {
    if (leaving) return;
    toggleLeaving();
    const totaltvs = newArr.length / 2 - 1;
    const maxIndex = Math.ceil(totaltvs / offset) - 1;
    setPIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };
  const incRIndex = () => {
    //setIndex(prev => prev + 1);
    if (leaving) return;
    toggleLeaving();
    const totaltvs = newArr.length / 2 - 1;
    const maxIndex = Math.ceil(totaltvs / offset) - 1;
    setRIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };

  //모달관련
  const navigate = useNavigate();
  const onClicked = (tvId: number) => {
    navigate(`/tv/${tvId}`);
  };

  const modalMatch = useMatch("/tv/:tvId");

  const onOverlayClick = () => {
    navigate("/tv");
  };
  const { scrollY } = useViewportScroll();

  const clicked =
    modalMatch?.params.tvId &&
    newArr.find(el => String(el.id) === modalMatch?.params.tvId);

  return (
    <>
      <Wrapper>
        <Main bgPhoto={makeImagePath(newArr[0]?.backdrop_path)}>
          <Title>{newArr[0]?.name}</Title>
          <Overview>
            {newArr[0]?.overview.length > 100
              ? `${newArr[0]?.overview.slice(0, 100)}....`
              : newArr[0]?.overview}
          </Overview>
        </Main>
        {/* -------------------popular부분--------------------------------------------------------- */}
        <Title1 onClick={incPIndex}>Popular</Title1>
        <Slider1>
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Row
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 1 }}
              key={pIndex}
            >
              {newArr
                .slice(0, 20)
                .slice(offset * pIndex, offset * pIndex + offset)
                .map((el: ITv) => (
                  <Box
                    layoutId={el.id + ""}
                    whileHover="hover"
                    initial="normal"
                    variants={boxVariants}
                    key={el.id}
                    bgPhoto={makeImagePath(el.backdrop_path)}
                    onClick={() => onClicked(el.id)}
                  >
                    <Info variants={infoVariants}>
                      <h4>{el.name}</h4>
                    </Info>
                  </Box>
                ))}
            </Row>
          </AnimatePresence>
        </Slider1>
        <AnimatePresence>
          {modalMatch ? (
            <>
              <Overlay
                onClick={onOverlayClick}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <BigModal
                layoutId={modalMatch.params.tvId}
                style={{ top: scrollY.get() + 100 }}
              >
                {clicked && (
                  <>
                    <BigCover
                      src={makeImagePath(clicked.backdrop_path, "w300")}
                    />
                    <BigTitle>{clicked.name}</BigTitle>
                    <BigOverview>{clicked.overview}</BigOverview>
                  </>
                )}
              </BigModal>
            </>
          ) : null}
        </AnimatePresence>
        {/* -------------top ranked부분--------------------------------------------------------- */}
        <Title2 onClick={incRIndex}>Top rated</Title2>
        <Slider2>
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Row
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 1 }}
              key={rIndex}
            >
              {newArr
                .slice(20, 40)
                .slice(offset * rIndex, offset * rIndex + offset)
                .map((el: ITv) => (
                  <Box
                    layoutId={el.id + ""}
                    whileHover="hover"
                    initial="normal"
                    variants={boxVariants}
                    key={el.id}
                    bgPhoto={makeImagePath(el.backdrop_path)}
                    onClick={() => onClicked(el.id)}
                  >
                    <Info variants={infoVariants}>
                      <h4>{el.name}</h4>
                    </Info>
                  </Box>
                ))}
            </Row>
          </AnimatePresence>
        </Slider2>
        <AnimatePresence>
          {modalMatch ? (
            <>
              <Overlay
                onClick={onOverlayClick}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <BigModal
                layoutId={modalMatch.params.tvId}
                style={{ top: scrollY.get() + 100 }}
              >
                {clicked && (
                  <>
                    <BigCover
                      src={makeImagePath(clicked.backdrop_path, "w500")}
                    />
                    <BigTitle>{clicked.name}</BigTitle>
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
export default Tv;
