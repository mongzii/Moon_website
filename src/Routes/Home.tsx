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
import { motion, AnimatePresence } from "framer-motion";

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
  color: red;
  font-size: 40px;
  background-image: url(${props => props.bgPhoto});
  background-size: cover;
  background-position: center center;
`;
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
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(prev => !prev);

  const increasetvIndex = () => {
    if (hometv) {
      if (leaving) return;
      toggleLeaving();
      const totalTVs = hometv?.results.length - 1;
      const maxIndex = Math.ceil(totalTVs / offset) - 1;
      settvIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const increasemoviIndex = () => {
    if (homemovie) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = homemovie?.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setmovieIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    }
  };
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
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
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
                        bgPhoto={makeImagePath(tv.backdrop_path, "w400")}
                        key={tv.id}
                      />
                    ))}
                </Row1>
              </AnimatePresence>
            </Slider1>

            <Title2 onClick={increasemoviIndex}>Movies</Title2>
            <Slider2>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
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
                        bgPhoto={makeImagePath(movie.backdrop_path, "w400")}
                        key={movie.id}
                      />
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
