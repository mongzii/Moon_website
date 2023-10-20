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

function TvShow() {
  const data = useQueries([
    {
      queryKey: ["tvpopular"],
      queryFn: () => getTvP(),
    },
    {
      queryKey: ["tvrate"],
      queryFn: () => getTvT(),
    },
  ]);

  const popularData = data[0].data;
  const rateData = data[1].data;
  //console.log(popularData.results);
  //   console.log(rateData);

  const [pindex, setpIndex] = useState(0);
  const [rindex, setrIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(prev => !prev);
  const increasePIndex = () => {
    if (popularData) {
      if (leaving) return;
      toggleLeaving();
      const totaltvs = popularData?.length - 1;
      const maxIndex = Math.ceil(totaltvs / offset) - 1;
      setpIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const increaseRIndex = () => {
    if (rateData) {
      if (leaving) return;
      toggleLeaving();
      const totaltvs = rateData?.length - 1;
      const maxIndex = Math.ceil(totaltvs / offset) - 1;
      setrIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  //모달관련
  const navigate = useNavigate();
  const onBoxClicked = (tvId: number) => {
    navigate(`/tv/${tvId}`);
  };
  const modalMatch = useMatch("/tv/:tvId");
  //console.log(modalMatch);
  const onOverlayClick = () => {
    navigate("/tv");
  };
  const { scrollY } = useViewportScroll();
  //   const clickedPTv =
  //     modalMatch?.params.tvId &&
  //     popularData?.results.find(
  //       (tv: number) => tv.page === modalMatch?.params.tvId
  //     );
  //   const abcabc = () => {
  //     for (let i = 0; i < popularData.length; i++) {
  //       if (popularData.results[i].id === modalMatch?.params.tvId)
  //         return popularData.results[i].id;
  //     }
  //   };
  //   console.log(abcabc);
  const clicked =
    modalMatch?.params.tvId &&
    popularData.results.filter(
      (id: String) => String(id) === modalMatch?.params.tvId
    );
  console.log(clicked);
  return (
    <>
      <Wrapper>
        <Title>{popularData}</Title>
      </Wrapper>
    </>
  );
}
export default TvShow;
//-----------------------------------------------------------------------------------------------------------
// import styled from "styled-components";
// import { useQuery, useQueries } from "react-query";
// import { IGetTvPResult, IGetTvTResult, getTvP, getTvT } from "../api";
// import { makeImagePath } from "../utils";
// import { useState } from "react";
// import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
// import { useMatch, useNavigate, useParams } from "react-router-dom";

// const Wrapper = styled.div`
//   background-color: black;
//   height: 300vh;
// `;
// const Loader = styled.div`
//   height: 20vh;
// `;
// const Main = styled.div<{ bgPhoto: string }>`
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 60px;
//   background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)),
//     url(${props => props.bgPhoto});
//   background-size: cover;
// `;
// const Title = styled.h3`
//   font-size: 60px;
//   margin-bottom: 20px;
//   width: 70%;
// `;
// const Overview = styled.p`
//   font-size: 20px;
//   width: 50%;
// `;
// const Title1 = styled.h3`
//   font-size: 38px;
//   color: white;
//   position: relative;
//   top: -120px;
//   padding-left: 20px;
// `;
// const Slider1 = styled.div`
//   position: relative;
//   top: -100px;
// `;
// const Row = styled(motion.div)`
//   display: grid;
//   gap: 5px;
//   grid-template-columns: repeat(6, 1fr);
//   position: absolute;
//   width: 100%;
// `;

// const Box = styled(motion.div)<{ bgPhoto: string }>`
//   /* background-color: white; */
//   background-image: url(${props => props.bgPhoto});
//   background-size: cover;
//   background-position: center center;
//   cursor: pointer;
//   height: 200px;
//   /* color: red; */
//   font-size: 40px;
//   &:first-child {
//     transform-origin: center left;
//   }
//   &:last-child {
//     transform-origin: center right;
//   }
// `;
// const boxVariants = {
//   normal: {
//     scale: 1,
//   },
//   hover: {
//     scale: 1.3,
//     y: -80,
//     transition: {
//       delay: 0.5,
//       duration: 0.1,
//       type: "tween",
//     },
//   },
// };
// const Info = styled(motion.div)`
//   background-color: ${props => props.theme.black.lighter};
//   width: 100%;
//   padding: 10px;
//   opacity: 0;
//   position: absolute;
//   bottom: 0;
//   h4 {
//     text-align: center;
//     font-size: 18px;
//   }
// `;
// const infoVariants = {
//   hover: {
//     opacity: 1,
//     transition: {
//       delay: 0.5,
//       duration: 0.1,
//       type: "tween",
//     },
//   },
// };

// const Title2 = styled.h3`
//   font-size: 38px;
//   color: white;
//   position: relative;
//   top: 240px;
//   padding-left: 20px;
// `;
// const Slider2 = styled.div`
//   position: relative;
//   top: 260px;
// `;
// const Overlay = styled(motion.div)`
//   position: fixed;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.65);
//   opacity: 0;
// `;
// const BigModal = styled(motion.div)`
//   position: absolute;
//   width: 40vw;
//   height: 80vh;
//   left: 0;
//   right: 0;
//   margin: 0 auto;
//   background-color: ${props => props.theme.black.lighter};
//   /* h2 {
//     color: white;
//     font-weight: 600;
//   } */
// `;
// const BigModal2 = styled(motion.div)`
//   position: absolute;
//   width: 40vw;
//   height: 80vh;
//   left: 0;
//   right: 0;
//   margin: 0 auto;
//   background-color: ${props => props.theme.black.lighter};
//   /* h2 {
//     color: white;
//     font-weight: 600;
//   } */
// `;
// const BigCover = styled.img`
//   width: 100%;
//   background-size: cover;
//   background-position: center center;
//   height: 400px;
// `;
// const BigCover2 = styled.img`
//   width: 100%;
//   background-size: cover;
//   background-position: center center;
//   height: 400px;
// `;

// const BigTitle = styled.h3`
//   color: ${props => props.theme.white.lighter};
//   padding: 20px;
//   font-size: 46px;
//   position: relative;
//   top: -80px;
// `;
// const BigTitle2 = styled.h3`
//   color: ${props => props.theme.white.lighter};
//   padding: 20px;
//   font-size: 46px;
//   position: relative;
//   top: -80px;
// `;

// const rowVariants = {
//   hidden: { x: window.outerWidth + 5 },
//   visible: { x: 0 },
//   exit: { x: -window.outerWidth - 5 },
// };
// const offset = 6;

// function Tv() {
//   // const { tvId } = useParams();
//   // const { data: tvpopular, isLoading } = useQuery<IGetTvPResult>(
//   //   ["tvpopular"],
//   //   getTvP
//   // );
//   // const { data: tvrate } = useQuery<IGetTvTResult>(["tvrate"], getTvT);

//   const results = useQueries([
//     {
//       queryKey: ["tvpopular"],
//       queryFn: () => getTvP(),
//     },
//     {
//       queryKey: ["tvrate"],
//       queryFn: () => getTvT(),
//     },
//   ]);
//   // console.log(results[0].data);
//   const popularData = results[0].data;
//   const rateData = results[1].data;

//   // const ParallelQuery = () => {
//   //   useQuery("tvpopular", getTvP);
//   //   useQuery("tvrate", getTvT);
//   //   return ParallelQuery;
//   // };

//   // const queries = [
//   //   { queryKey: "tvpopular", queryFn: getTvP },
//   //   { queryKey: "tvrate", queryFn: getTvT },
//   // ];
//   // const data = useQueries(queries);
//   // const tvpopularvv = data[0].data;
//   // console.log(tvpopularvv);

//   const [pindex, setpIndex] = useState(0);
//   const [rindex, setrIndex] = useState(0);
//   const [leaving, setLeaving] = useState(false);
//   const toggleLeaving = () => setLeaving(prev => !prev);
//   const increasePIndex = () => {
//     if (tvpopular) {
//       if (leaving) return;
//       toggleLeaving();
//       const totaltvs = tvpopular?.results.length - 1;
//       const maxIndex = Math.ceil(totaltvs / offset) - 1;
//       setpIndex(prev => (prev === maxIndex ? 0 : prev + 1));
//     }
//   };

//   const increaseRIndex = () => {
//     if (tvrate) {
//       if (leaving) return;
//       toggleLeaving();
//       const totaltvs = tvrate?.results.length - 1;
//       const maxIndex = Math.ceil(totaltvs / offset) - 1;
//       setrIndex(prev => (prev === maxIndex ? 0 : prev + 1));
//     }
//   };

//   //console.log(tvpopular);
//   //모달관련
//   const navigate = useNavigate();
//   const onBoxClicked = (tvId: number) => {
//     navigate(`/tv/${tvId}`);
//   };
//   const modalMatch = useMatch("/tv/:tvId");
//   //console.log(modalMatch);
//   const onOverlayClick = () => {
//     navigate("/tv");
//   };
//   const { scrollY } = useViewportScroll();
//   const clickedPTv =
//     modalMatch?.params.tvId &&
//     tvpopular?.results.find(tv => String(tv.id) === modalMatch.params.tvId);

//   const clickedRTv =
//     modalMatch?.params.tvId &&
//     tvrate?.results.find(el => String(el.id) === modalMatch?.params.tvId);

//   // const clicked =
//   // modalMatch?.params.tvId &&
//   // results?.results.find(el => String(el.id) === modalMatch?.params.tvId);

//   // console.log(clickedPTv);
//   // console.log(clickedRTv);

//   // const clicked =
//   //   modalMatch?.params.tvId &&
//   //   (tvpopular || tvrate)?.results.find(
//   //     tv => String(tv.id) === modalMatch.params.tvId
//   //   );

//   // console.log(clicked);

//   return (
//     <>
//       <Wrapper>
//         {isLoading ? (
//           <Loader>Loading....</Loader>
//         ) : (
//           <>
//             <Main
//               bgPhoto={makeImagePath(tvpopular?.results[0].backdrop_path || "")}
//             >
//               <Title>{tvpopular?.results[0].name}</Title>
//               <Overview>{tvpopular?.results[0].overview}</Overview>
//             </Main>
//             {/*-------------------popular부분--------------------------------------------------------- */}
//             <Title1 onClick={increasePIndex}>Popular</Title1>
//             <Slider1>
//               <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
//                 <Row
//                   variants={rowVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   transition={{ type: "tween", duration: 0.4 }}
//                   key={pindex}
//                 >
//                   {tvpopular?.results
//                     .slice(1)
//                     .slice(offset * pindex, offset * pindex + offset)
//                     .map(a => (
//                       <Box
//                         layoutId={a.id + ""}
//                         whileHover="hover"
//                         initial="normal"
//                         variants={boxVariants}
//                         key={a.id}
//                         bgPhoto={makeImagePath(a.backdrop_path)}
//                         onClick={() => onBoxClicked(a.id)}
//                       >
//                         <Info variants={infoVariants}>
//                           <h4>{a.name}</h4>
//                         </Info>
//                       </Box>
//                     ))}
//                 </Row>
//               </AnimatePresence>
//             </Slider1>
//             <AnimatePresence>
//               {modalMatch ? (
//                 <>
//                   <Overlay
//                     onClick={onOverlayClick}
//                     exit={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                   />
//                   <BigModal
//                     layoutId={modalMatch.params.tvId}
//                     style={{ top: scrollY.get() + 100 }}
//                   >
//                     {clickedPTv && (
//                       <>
//                         <BigCover
//                           src={makeImagePath(clickedPTv.backdrop_path, "w500")}
//                         />
//                         <BigTitle>{clickedPTv.name}</BigTitle>
//                       </>
//                     )}
//                   </BigModal>
//                 </>
//               ) : null}
//             </AnimatePresence>
//             {/* -------------top ranked부분--------------------------------------------------------- */}
//             <Title2 onClick={increaseRIndex}>Top rated</Title2>
//             <Slider2>
//               <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
//                 <Row
//                   variants={rowVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   transition={{ type: "tween", duration: 0.4 }}
//                   key={rindex}
//                 >
//                   {tvrate?.results
//                     .slice()
//                     .slice(offset * rindex, offset * rindex + offset)
//                     .map(b => (
//                       <Box
//                         layoutId={b.id + ""}
//                         whileHover="hover"
//                         initial="normal"
//                         variants={boxVariants}
//                         key={b.id}
//                         bgPhoto={makeImagePath(b.backdrop_path)}
//                         onClick={() => onBoxClicked(b.id)}
//                       >
//                         <Info variants={infoVariants}>
//                           <h4>{b.name}</h4>
//                         </Info>
//                       </Box>
//                     ))}
//                 </Row>
//               </AnimatePresence>
//             </Slider2>
//             <AnimatePresence>
//               {modalMatch ? (
//                 <>
//                   <Overlay
//                     onClick={onOverlayClick}
//                     exit={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                   />
//                   <BigModal2
//                     layoutId={modalMatch.params.tvId}
//                     style={{ top: scrollY.get() + 100 }}
//                   >
//                     {clickedRTv && (
//                       <>
//                         <BigCover2
//                           src={makeImagePath(clickedRTv.backdrop_path, "w500")}
//                         />
//                         <BigTitle2>{clickedRTv.name}</BigTitle2>
//                       </>
//                     )}
//                   </BigModal2>
//                 </>
//               ) : null}
//             </AnimatePresence>
//           </>
//         )}
//       </Wrapper>
//     </>
//   );
// }
// export default Tv;import styled from "styled-components";
// import { useQuery, useQueries } from "react-query";
// import { IGetTvPResult, IGetTvTResult, getTvP, getTvT } from "../api";
// import { makeImagePath } from "../utils";
// import { useState } from "react";
// import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
// import { useMatch, useNavigate, useParams } from "react-router-dom";

// const Wrapper = styled.div`
//   background-color: black;
//   height: 300vh;
// `;
// const Loader = styled.div`
//   height: 20vh;
// `;
// const Main = styled.div<{ bgPhoto: string }>`
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 60px;
//   background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)),
//     url(${props => props.bgPhoto});
//   background-size: cover;
// `;
// const Title = styled.h3`
//   font-size: 60px;
//   margin-bottom: 20px;
//   width: 70%;
// `;
// const Overview = styled.p`
//   font-size: 20px;
//   width: 50%;
// `;
// const Title1 = styled.h3`
//   font-size: 38px;
//   color: white;
//   position: relative;
//   top: -120px;
//   padding-left: 20px;
// `;
// const Slider1 = styled.div`
//   position: relative;
//   top: -100px;
// `;
// const Row = styled(motion.div)`
//   display: grid;
//   gap: 5px;
//   grid-template-columns: repeat(6, 1fr);
//   position: absolute;
//   width: 100%;
// `;

// const Box = styled(motion.div)<{ bgPhoto: string }>`
//   /* background-color: white; */
//   background-image: url(${props => props.bgPhoto});
//   background-size: cover;
//   background-position: center center;
//   cursor: pointer;
//   height: 200px;
//   /* color: red; */
//   font-size: 40px;
//   &:first-child {
//     transform-origin: center left;
//   }
//   &:last-child {
//     transform-origin: center right;
//   }
// `;
// const boxVariants = {
//   normal: {
//     scale: 1,
//   },
//   hover: {
//     scale: 1.3,
//     y: -80,
//     transition: {
//       delay: 0.5,
//       duration: 0.1,
//       type: "tween",
//     },
//   },
// };
// const Info = styled(motion.div)`
//   background-color: ${props => props.theme.black.lighter};
//   width: 100%;
//   padding: 10px;
//   opacity: 0;
//   position: absolute;
//   bottom: 0;
//   h4 {
//     text-align: center;
//     font-size: 18px;
//   }
// `;
// const infoVariants = {
//   hover: {
//     opacity: 1,
//     transition: {
//       delay: 0.5,
//       duration: 0.1,
//       type: "tween",
//     },
//   },
// };

// const Title2 = styled.h3`
//   font-size: 38px;
//   color: white;
//   position: relative;
//   top: 240px;
//   padding-left: 20px;
// `;
// const Slider2 = styled.div`
//   position: relative;
//   top: 260px;
// `;
// const Overlay = styled(motion.div)`
//   position: fixed;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.65);
//   opacity: 0;
// `;
// const BigModal = styled(motion.div)`
//   position: absolute;
//   width: 40vw;
//   height: 80vh;
//   left: 0;
//   right: 0;
//   margin: 0 auto;
//   background-color: ${props => props.theme.black.lighter};
//   /* h2 {
//     color: white;
//     font-weight: 600;
//   } */
// `;
// const BigModal2 = styled(motion.div)`
//   position: absolute;
//   width: 40vw;
//   height: 80vh;
//   left: 0;
//   right: 0;
//   margin: 0 auto;
//   background-color: ${props => props.theme.black.lighter};
//   /* h2 {
//     color: white;
//     font-weight: 600;
//   } */
// `;
// const BigCover = styled.img`
//   width: 100%;
//   background-size: cover;
//   background-position: center center;
//   height: 400px;
// `;
// const BigCover2 = styled.img`
//   width: 100%;
//   background-size: cover;
//   background-position: center center;
//   height: 400px;
// `;

// const BigTitle = styled.h3`
//   color: ${props => props.theme.white.lighter};
//   padding: 20px;
//   font-size: 46px;
//   position: relative;
//   top: -80px;
// `;
// const BigTitle2 = styled.h3`
//   color: ${props => props.theme.white.lighter};
//   padding: 20px;
//   font-size: 46px;
//   position: relative;
//   top: -80px;
// `;

// const rowVariants = {
//   hidden: { x: window.outerWidth + 5 },
//   visible: { x: 0 },
//   exit: { x: -window.outerWidth - 5 },
// };
// const offset = 6;

// function Tv() {
//   // const { tvId } = useParams();
//   // const { data: tvpopular, isLoading } = useQuery<IGetTvPResult>(
//   //   ["tvpopular"],
//   //   getTvP
//   // );
//   // const { data: tvrate } = useQuery<IGetTvTResult>(["tvrate"], getTvT);

//   const results = useQueries([
//     {
//       queryKey: ["tvpopular"],
//       queryFn: () => getTvP(),
//     },
//     {
//       queryKey: ["tvrate"],
//       queryFn: () => getTvT(),
//     },
//   ]);
//   // console.log(results[0].data);
//   const popularData = results[0].data;
//   const rateData = results[1].data;

//   // const ParallelQuery = () => {
//   //   useQuery("tvpopular", getTvP);
//   //   useQuery("tvrate", getTvT);
//   //   return ParallelQuery;
//   // };

//   // const queries = [
//   //   { queryKey: "tvpopular", queryFn: getTvP },
//   //   { queryKey: "tvrate", queryFn: getTvT },
//   // ];
//   // const data = useQueries(queries);
//   // const tvpopularvv = data[0].data;
//   // console.log(tvpopularvv);

//   const [pindex, setpIndex] = useState(0);
//   const [rindex, setrIndex] = useState(0);
//   const [leaving, setLeaving] = useState(false);
//   const toggleLeaving = () => setLeaving(prev => !prev);
//   const increasePIndex = () => {
//     if (tvpopular) {
//       if (leaving) return;
//       toggleLeaving();
//       const totaltvs = tvpopular?.results.length - 1;
//       const maxIndex = Math.ceil(totaltvs / offset) - 1;
//       setpIndex(prev => (prev === maxIndex ? 0 : prev + 1));
//     }
//   };

//   const increaseRIndex = () => {
//     if (tvrate) {
//       if (leaving) return;
//       toggleLeaving();
//       const totaltvs = tvrate?.results.length - 1;
//       const maxIndex = Math.ceil(totaltvs / offset) - 1;
//       setrIndex(prev => (prev === maxIndex ? 0 : prev + 1));
//     }
//   };

//   //console.log(tvpopular);
//   //모달관련
//   const navigate = useNavigate();
//   const onBoxClicked = (tvId: number) => {
//     navigate(`/tv/${tvId}`);
//   };
//   const modalMatch = useMatch("/tv/:tvId");
//   //console.log(modalMatch);
//   const onOverlayClick = () => {
//     navigate("/tv");
//   };
//   const { scrollY } = useViewportScroll();
//   const clickedPTv =
//     modalMatch?.params.tvId &&
//     tvpopular?.results.find(tv => String(tv.id) === modalMatch.params.tvId);

//   const clickedRTv =
//     modalMatch?.params.tvId &&
//     tvrate?.results.find(el => String(el.id) === modalMatch?.params.tvId);

//   // const clicked =
//   // modalMatch?.params.tvId &&
//   // results?.results.find(el => String(el.id) === modalMatch?.params.tvId);

//   // console.log(clickedPTv);
//   // console.log(clickedRTv);

//   // const clicked =
//   //   modalMatch?.params.tvId &&
//   //   (tvpopular || tvrate)?.results.find(
//   //     tv => String(tv.id) === modalMatch.params.tvId
//   //   );

//   // console.log(clicked);

//   return (
//     <>
//       <Wrapper>
//         {isLoading ? (
//           <Loader>Loading....</Loader>
//         ) : (
//           <>
//             <Main
//               bgPhoto={makeImagePath(tvpopular?.results[0].backdrop_path || "")}
//             >
//               <Title>{tvpopular?.results[0].name}</Title>
//               <Overview>{tvpopular?.results[0].overview}</Overview>
//             </Main>
//             {/*-------------------popular부분--------------------------------------------------------- */}
//             <Title1 onClick={increasePIndex}>Popular</Title1>
//             <Slider1>
//               <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
//                 <Row
//                   variants={rowVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   transition={{ type: "tween", duration: 0.4 }}
//                   key={pindex}
//                 >
//                   {tvpopular?.results
//                     .slice(1)
//                     .slice(offset * pindex, offset * pindex + offset)
//                     .map(a => (
//                       <Box
//                         layoutId={a.id + ""}
//                         whileHover="hover"
//                         initial="normal"
//                         variants={boxVariants}
//                         key={a.id}
//                         bgPhoto={makeImagePath(a.backdrop_path)}
//                         onClick={() => onBoxClicked(a.id)}
//                       >
//                         <Info variants={infoVariants}>
//                           <h4>{a.name}</h4>
//                         </Info>
//                       </Box>
//                     ))}
//                 </Row>
//               </AnimatePresence>
//             </Slider1>
//             <AnimatePresence>
//               {modalMatch ? (
//                 <>
//                   <Overlay
//                     onClick={onOverlayClick}
//                     exit={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                   />
//                   <BigModal
//                     layoutId={modalMatch.params.tvId}
//                     style={{ top: scrollY.get() + 100 }}
//                   >
//                     {clickedPTv && (
//                       <>
//                         <BigCover
//                           src={makeImagePath(clickedPTv.backdrop_path, "w500")}
//                         />
//                         <BigTitle>{clickedPTv.name}</BigTitle>
//                       </>
//                     )}
//                   </BigModal>
//                 </>
//               ) : null}
//             </AnimatePresence>
//             {/* -------------top ranked부분--------------------------------------------------------- */}
//             <Title2 onClick={increaseRIndex}>Top rated</Title2>
//             <Slider2>
//               <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
//                 <Row
//                   variants={rowVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   transition={{ type: "tween", duration: 0.4 }}
//                   key={rindex}
//                 >
//                   {tvrate?.results
//                     .slice()
//                     .slice(offset * rindex, offset * rindex + offset)
//                     .map(b => (
//                       <Box
//                         layoutId={b.id + ""}
//                         whileHover="hover"
//                         initial="normal"
//                         variants={boxVariants}
//                         key={b.id}
//                         bgPhoto={makeImagePath(b.backdrop_path)}
//                         onClick={() => onBoxClicked(b.id)}
//                       >
//                         <Info variants={infoVariants}>
//                           <h4>{b.name}</h4>
//                         </Info>
//                       </Box>
//                     ))}
//                 </Row>
//               </AnimatePresence>
//             </Slider2>
//             <AnimatePresence>
//               {modalMatch ? (
//                 <>
//                   <Overlay
//                     onClick={onOverlayClick}
//                     exit={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                   />
//                   <BigModal2
//                     layoutId={modalMatch.params.tvId}
//                     style={{ top: scrollY.get() + 100 }}
//                   >
//                     {clickedRTv && (
//                       <>
//                         <BigCover2
//                           src={makeImagePath(clickedRTv.backdrop_path, "w500")}
//                         />
//                         <BigTitle2>{clickedRTv.name}</BigTitle2>
//                       </>
//                     )}
//                   </BigModal2>
//                 </>
//               ) : null}
//             </AnimatePresence>
//           </>
//         )}
//       </Wrapper>
//     </>
//   );
// }
// export default Tv;
