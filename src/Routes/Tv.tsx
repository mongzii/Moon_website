import styled from "styled-components";
import { useQuery } from "react-query";
import { IGetTvPResult, IGetTvTResult, getTvP, getTvT } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const rowVariants = {
  hidden: { x: window.outerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth - 5 },
};
const offset = 6;

function Tv() {
  const { data: tvpopular, isLoading } = useQuery<IGetTvPResult>(
    ["tvpopular", "popular"],
    getTvP
  );
  const { data: tvrate } = useQuery<IGetTvTResult>(["tvrate", "rated"], getTvT);

  const [pindex, setpIndex] = useState(0);
  const [rindex, setrIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(prev => !prev);
  const increasePIndex = () => {
    if (tvpopular) {
      if (leaving) return;
      toggleLeaving();
      const totaltvs = tvpopular?.results.length - 1;
      const maxIndex = Math.ceil(totaltvs / offset) - 1;
      setpIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const increaseRIndex = () => {
    if (tvrate) {
      if (leaving) return;
      toggleLeaving();
      const totaltvs = tvrate?.results.length - 1;
      const maxIndex = Math.ceil(totaltvs / offset) - 1;
      setrIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  //console.log(tvpopular);
  return (
    <>
      <Wrapper>
        {isLoading ? (
          <Loader>Loading....</Loader>
        ) : (
          <>
            <Main
              bgPhoto={makeImagePath(tvpopular?.results[0].backdrop_path || "")}
            >
              <Title>{tvpopular?.results[0].name}</Title>
              <Overview>{tvpopular?.results[0].overview}</Overview>
            </Main>
            {/*-------------------popular부분--------------------------------------------------------- */}
            <Title1 onClick={increasePIndex}>Popular</Title1>
            <Slider1>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.4 }}
                  key={pindex}
                >
                  {tvpopular?.results
                    .slice(1)
                    .slice(offset * pindex, offset * pindex + offset)
                    .map(a => (
                      <Box
                        whileHover="hover"
                        initial="normal"
                        variants={boxVariants}
                        key={a.id}
                        bgPhoto={makeImagePath(a.backdrop_path)}
                      >
                        <Info variants={infoVariants}>
                          <h4>{a.name}</h4>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider1>
            {/* -------------top ranked부분--------------------------------------------------------- */}
            <Title2 onClick={increaseRIndex}>Top rated</Title2>
            <Slider2>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.4 }}
                  key={rindex}
                >
                  {tvrate?.results
                    .slice()
                    .slice(offset * rindex, offset * rindex + offset)
                    .map(b => (
                      <Box
                        whileHover="hover"
                        initial="normal"
                        variants={boxVariants}
                        key={b.id}
                        bgPhoto={makeImagePath(b.backdrop_path)}
                      >
                        <Info variants={infoVariants}>
                          <h4>{b.name}</h4>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider2>
          </>
        )}
      </Wrapper>
    </>
  );
}
export default Tv;
