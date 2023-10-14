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

const Wrapper = styled.div`
  background-color: black;
  height: 300vh;
`;
const Loader = styled.div`
  height: 20vh;
`;
const Main = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  /* background-color: red; */
`;
const Title = styled.h3`
  font-size: 60px;
  margin-bottom: 20px;
`;
const Title1 = styled.h3`
  font-size: 48px;
  color: white;
  position: relative;
  top: -120px;
`;
const Slider1 = styled.div`
  position: relative;
  top: -100px;
`;
const Row = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;
const Box = styled.div`
  background-color: white;
  height: 200px;
`;

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

  console.log(tvpopular);
  return (
    <>
      <Wrapper>
        {isLoading ? (
          <Loader>Loading....</Loader>
        ) : (
          <>
            <Main>
              <Title>{tvpopular?.results[0].name}</Title>
            </Main>
            <Title1>Popular</Title1>
            <Slider1>
              <Row>
                <Box />
                <Box />
                <Box />
                <Box />
                <Box />
                <Box />
              </Row>
            </Slider1>
          </>
        )}
      </Wrapper>
    </>
  );
}
export default Tv;
