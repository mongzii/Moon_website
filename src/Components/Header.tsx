import styled from "styled-components";

const Nav = styled.nav`
  background-color: black;
  height: 6vh;
  width: 100%;
`;
const Logo = styled.div``;
const Items = styled.div``;
const Item = styled.div``;
const Search = styled.div``;

function Header() {
  return (
    <>
      <Nav>
        <Logo></Logo>
        <Items>
          <Item>Home</Item>
          <Item>Tv</Item>
        </Items>
        <Search></Search>
      </Nav>
    </>
  );
}
export default Header;
