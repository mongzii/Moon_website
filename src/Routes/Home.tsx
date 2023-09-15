import { useQuery } from "react-query";
import styled from "styled-components";
import { getHomeTv, IGetHOMETVResult } from "../api";
import { makeImagePath } from "../utils";

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
// const Title = styled.h3`
//   font-size: 40px;
//   margin-bottom: 20px;
// `;
// const Overview = styled.p`
//   font-size: 25px;
//   width: 50%;
// `;
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
const Row1 = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
  position: absolute;
`;
const Box1 = styled.div`
  background-color: white;
  height: 200px;
  cursor: pointer;
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

function Home() {
  const { data, isLoading } = useQuery<IGetHOMETVResult>(
    ["hometv", "trending"],
    getHomeTv
  );
  console.log(data);
  return (
    <>
      <Wrapper>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Main bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
              <Greeting>Welcome to the MoonFlix</Greeting>
              {/* <Title>{data?.results[1].title || data?.results[1].name}</Title>
              <Overview>{data?.results[1].overview}</Overview> */}
            </Main>

            <Title1>Tv</Title1>
            <Slider1>
              <Row1>
                <Box1 />
                <Box1 />
                <Box1 />
                <Box1 />
                <Box1 />
                <Box1 />
              </Row1>
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
