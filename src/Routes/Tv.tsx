import styled from "styled-components";
import { useQuery, useQueries } from "react-query";
import { IGetTvPResult, IGetTvTResult, getTvP, getTvT, ITv } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useMatch, useNavigate, useParams } from "react-router-dom";

// interface InewArr {
//   data: Array<ITv>;
// }

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
  color: white;
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
const BoxTest = styled.div`
  background-color: red;
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
  // console.log(results);
  //console.log("tvpopular", results[0].data.results);
  //const tvpopular = results[0]?.data.results;
  //console.log(tvpopular.results);
  // const tvrate = results[1]?.data;

  //새로 데이터 가공했다. 자꾸 오류 일으켜서 일단 any로 타입했다.
  let newArr: any[] = [];
  for (let i = 0; i < results.length; i++) {
    if (results[i]?.data?.results) {
      newArr.push(results[i].data.results);
    }
  }
  console.log(newArr);

  const [pindex, setpIndex] = useState(0);
  const [rindex, setrIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(prev => !prev);
  // const increasePIndex = () => {
  //   if (tvpopular) {
  //     if (leaving) return;
  //     toggleLeaving();
  //     const totaltvs = tvpopular.results.length - 1;
  //     const maxIndex = Math.ceil(totaltvs / offset) - 1;
  //     setpIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  //   }
  // };
  // if (!tvpopular || !tvpopular.results[0]) {
  //   return null;
  // }
  const increIndex = () => {
    if (leaving) return;
    toggleLeaving();
    const totaltvs = newArr[0]?.length - 1;
    const maxIndex = Math.ceil(totaltvs / offset) - 1;
    setpIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <>
      {/* {console.log(tvpopular)} */}
      {/* {console.log(tvrate)} */}
      <Wrapper>
        <Main bgPhoto={makeImagePath(newArr[0]?.[0].backdrop_path)}>
          <Title>{newArr[0]?.[0].name}</Title>
          <Overview>{newArr[0]?.[0].overview}</Overview>
        </Main>
        {/* -------------------popular부분--------------------------------------------------------- */}
        {/* <Title1>Popular</Title1>
        <Slider1>
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Row> */}
        {/* {tvpopular.results[0]
                .slice(1)
                .slice(offset * pindex, offset * pindex + offset)
                .map((a: any) => (
                  <Box>bgPhoto={makeImagePath(a.backdrop_path) || ""}</Box>
                ))} */}
        {/* </Row>
          </AnimatePresence>
        </Slider1> */}
        <Title1 onClick={increIndex}>Popular</Title1>
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
              {newArr[0]
                ?.slice(0)
                .slice(offset * pindex, offset * pindex + offset)
                .map((el: ITv) => (
                  <BoxTest>{el.name}</BoxTest>
                ))}
            </Row>
          </AnimatePresence>
        </Slider1>
        {/* -------------top ranked부분--------------------------------------------------------- */}
        {/* // <Title2>Top rated</Title2>
        // <Slider2>
        //   <Row></Row>
        // </Slider2> */}
      </Wrapper>
    </>
  );
}
export default Tv;
