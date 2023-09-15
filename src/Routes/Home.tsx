import { useQuery } from "react-query";
import styled from "styled-components";
import { getHomeTv, IGetHOMETVResult } from "../api";
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
const Row2 = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
  position: absolute;
`;
const Box2 = styled.div`
  background-color: white;
  height: 200px;
  cursor: pointer;
`;
const offset = 6;

function Home() {
  const { data, isLoading } = useQuery<IGetHOMETVResult>(
    ["hometv", "trending"],
    getHomeTv
  );
  console.log(data);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(prev => !prev);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex(prev => (prev === maxIndex ? 0 : prev + 1));
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
              onClick={increaseIndex}
              bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
            >
              <Greeting>Welcome to the MoonFlix</Greeting>
            </Main>

            <Title1 onClick={increaseIndex}>Tv</Title1>
            <Slider1>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row1
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={index}
                  transition={{ type: "tween", duration: 1 }}
                >
                  {data?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map(tv => (
                      <Box1
                        bgPhoto={makeImagePath(tv.backdrop_path, "w400")}
                        key={tv.id}
                      />
                    ))}
                </Row1>
              </AnimatePresence>
            </Slider1>

            <Title2>Movies</Title2>
            <Slider2>
              <Row2>
                <Box2 />
                <Box2 />
                <Box2 />
                <Box2 />
                <Box2 />
                <Box2 />
              </Row2>
            </Slider2>
          </>
        )}
      </Wrapper>
    </>
  );
}
export default Home;
