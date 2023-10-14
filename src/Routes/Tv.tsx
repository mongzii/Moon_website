import styled from "styled-components";
import { useQuery } from "react-query";
import {
  IGetTvPResult,
  IGetTvTResult,
  IGetTvSResult,
  getTvP,
  getTvT,
  getTvS,
} from "../api";
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
// const Box = styled(motion.div)<{ bgPhoto: string }>`
//   background-color: white;
//   background-image: url(${props => props.bgPhoto});
//   height: 200px;
// `;
const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 66px;
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
  const { data: tvsimilar } = useQuery<IGetTvSResult>(
    ["tvsimilar", "similared"],
    getTvS
  );
  const [pindex, setpIndex] = useState(0);
  const [rindex, setrIndex] = useState(0);
  const [sindex, setsIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(prev => !prev);
  const increaseIndex = () => {
    // if (tvpopular) {
    //   if (leaving) return;
    //   toggleLeaving();
    //   const totaltvs = tvpopular?.results.length - 1;
    //   const maxIndex = Math.ceil(totaltvs / offset) - 1;
    //   setpIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    // }
    setpIndex(prev => prev + 1);
  };

  console.log(tvpopular);
  return (
    <>
      <Wrapper>
        {isLoading ? (
          <Loader>Loading....</Loader>
        ) : (
          <>
            <Main
              onClick={increaseIndex}
              bgPhoto={makeImagePath(tvpopular?.results[0].backdrop_path || "")}
            >
              <Title>{tvpopular?.results[0].name}</Title>
              <Overview>{tvpopular?.results[0].overview}</Overview>
            </Main>
            <Title1>Popular</Title1>
            <Slider1>
              <AnimatePresence>
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.4 }}
                  key={pindex}
                >
                  {/* {tvpopular?.results
                    .slice(1)
                    .slice(offset * pindex, offset * pindex + offset)
                    .map(a => (
                      <Box key={a.id} />
                    ))} */}
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <Box key={i}>{i}</Box>
                  ))}
                </Row>
              </AnimatePresence>
            </Slider1>
          </>
        )}
      </Wrapper>
    </>
  );
}
export default Tv;
