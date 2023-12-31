import styled from "styled-components";
import { useEffect, useState } from "react";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { Link, useMatch } from "react-router-dom";

const BREAK_POINT_PHONE = 378;
const BREAK_POINT_TABLET = 768;

const Nav = styled(motion.nav)`
  //color: white;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  top: 0;
  padding: 20px 60px;
  font-size: 16px;
`;
const Col1 = styled.div`
  flex-basis: 16%;
`;
const Col2 = styled.div`
  flex-basis: 74%;
  padding-left: 20px;
`;
const Col3 = styled.div`
  flex-basis: 10%;
  padding-left: 20px;
`;

const Logo = styled(motion.svg)`
  width: 100px;
  height: 38px;
  margin-right: 50px;
  fill: ${props => props.theme.red};
  path {
    stroke-width: 10px;
    stroke: #e15d5d;
  }
`;

const Items = styled.ul`
  //display: flex;
  // align-items: center;

  /* margin-right: 20px;

  transition: color 0.3s ease-in-out;
  position: relative; */

  //작은화면일때
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    margin-right: 20px;

    .dropdown-content {
      display: none;
    }

    //hover하면 메뉴보인다
    .dropdown:hover .dropdown-content {
      display: flex;
      flex-direction: column;
      gap: 15px;
      cursor: pointer;
    }
  }
  //큰화면일때
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    .dropdown-btn {
      display: none;
    }
    .dropdown-content {
      display: flex;
      flex-direction: row;
    }
  }
`;
// const Menu = styled.ul`
//   @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
//     flex-direction: row;
//     .dropdown-content {
//       display: none;
//     }
//     .dropdown-content * {
//       display: block;
//       flex-direction: column;
//     }
//     .dropdown:hover .dropdown-content {
//       display: block;
//     }
//   }
// `;

const Item = styled.li`
  margin-right: 20px;
  color: ${props => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  flex-direction: row;
  &:hover {
    color: green;
  }
  /* color: red; */
  //flex-direction: column;
  //justify-content: center;
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: flex-end;

  position: relative;

  svg {
    height: 25px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  //bottom: -5px;
  //left: 50%;
  //right: 50%;
  //margin: 0 auto;
  background-color: ${props => props.theme.red};
`;
const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  /* right: 0px; */
  left: -190px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  background-color: transparent;
  border: 1px solid ${props => props.theme.white.lighter};
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};
const navVariants = {
  top: { backgroundColor: "rgba(0,0,0,0)" },
  scroll: { backgroundColor: "rgba(0,0,0,1)" },
};

function Header() {
  //searchopen관련
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = () => setSearchOpen(true);
  const inputAnimation = useAnimation();
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0, //닫힌상태
      });
    } else {
      inputAnimation.start({ scaleX: 1 }); //열린상태
    }
    setSearchOpen(prev => !prev);
  };
  //메뉴의 빨간점관련
  const homeMatch = useMatch("/");
  const movieMatch = useMatch("/movies");
  const tvMatch = useMatch("/tv");
  //스크롤관련
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  return (
    <>
      <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
        <Col1>
          <Logo
            variants={logoVariants}
            whileHover="active"
            initial="normal"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 576 512"
          >
            <motion.path d="M561.7 199.6c-1.3.3.3 0 0 0zm-6.2-77.4c-7.7-22.3-5.1-7.2-13.4-36.9-1.6-6.5-3.6-14.5-6.2-20-4.4-8.7-4.6-7.5-4.6-9.5 0-5.3 30.7-45.3 19-46.9-5.7-.6-12.2 11.6-20.6 17-8.6 4.2-8 5-10.3 5-2.6 0-5.7-3-6.2-5-2-5.7 1.9-25.9-3.6-25.9-3.6 0-12.3 24.8-17 25.8-5.2 1.3-27.9-11.4-75.1 18-25.3 13.2-86.9 65.2-87 65.3-6.7 4.7-20 4.7-35.5 16-44.4 30.1-109.6 9.4-110.7 9-110.6-26.8-128-15.2-159 11.5-20.8 17.9-23.7 36.5-24.2 38.9-4.2 20.4 5.2 48.3 6.7 64.3 1.8 19.3-2.7 17.7 7.7 98.3.5 1 4.1 0 5.1 1.5 0 8.4-3.8 12.1-4.1 13-1.5 4.5-1.5 10.5 0 16 2.3 8.2 8.2 37.2 8.2 46.9 0 41.8.4 44 2.6 49.4 3.9 10 12.5 9.1 17 12 3.1 3.5-.5 8.5 1 12.5.5 2 3.6 4 6.2 5 9.2 3.6 27 .3 29.9-2.5 1.6-1.5.5-4.5 3.1-5 5.1 0 10.8-.5 14.4-2.5 5.1-2.5 4.1-6 1.5-10.5-.4-.8-7-13.3-9.8-16-2.1-2-5.1-3-7.2-4.5-5.8-4.9-10.3-19.4-10.3-19.5-4.6-19.4-10.3-46.3-4.1-66.8 4.6-17.2 39.5-87.7 39.6-87.8 4.1-6.5 17-11.5 27.3-7 6 1.9 19.3 22 65.4 30.9 47.9 8.7 97.4-2 112.2-2 2.8 2-1.9 13-.5 38.9 0 26.4-.4 13.7-4.1 29.9-2.2 9.7 3.4 23.2-1.5 46.9-1.4 9.8-9.9 32.7-8.2 43.4.5 1 1 2 1.5 3.5.5 4.5 1.5 8.5 4.6 10 7.3 3.6 12-3.5 9.8 11.5-.7 3.1-2.6 12 1.5 15 4.4 3.7 30.6 3.4 36.5.5 2.6-1.5 1.6-4.5 6.4-7.4 1.9-.9 11.3-.4 11.3-6.5.3-1.8-9.2-19.9-9.3-20-2.6-3.5-9.2-4.5-11.3-8-6.9-10.1-1.7-52.6.5-59.4 3-11 5.6-22.4 8.7-32.4 11-42.5 10.3-50.6 16.5-68.3.8-1.8 6.4-23.1 10.3-29.9 9.3-17 21.7-32.4 33.5-47.4 18-22.9 34-46.9 52-69.8 6.1-7 8.2-13.7 18-8 10.8 5.7 21.6 7 31.9 17 14.6 12.8 10.2 18.2 11.8 22.9 1.5 5 7.7 10.5 14.9 9.5 10.4-2 13-2.5 13.4-2.5 2.6-.5 5.7-5 7.2-8 3.1-5.5 7.2-9 7.2-16.5 0-7.7-.4-2.8-20.6-52.9z" />
          </Logo>
        </Col1>
        <Col2>
          <Items>
            <div className="dropdown">
              <div className="dropdown-btn">Menu</div>
              <div className="dropdown-content">
                <Item>
                  <Link to="/">Home</Link>
                </Item>
                <Item>
                  <Link to="/movies">Movies</Link>
                </Item>
                <Item>
                  <Link to="/tv">Tv-show</Link>
                </Item>
              </div>
            </div>
            {/* <Item>
              <Link to="/">
                Home{homeMatch && <Circle layoutId="circle" />}
              </Link>
            </Item>
            <Item>
              <Link to="/movies">
                Movies{movieMatch && <Circle layoutId="circle" />}
              </Link>
            </Item>
            <Item>
              <Link to="/tv">
                Tv-show{tvMatch && <Circle layoutId="circle" />}
              </Link>
            </Item> */}
          </Items>
        </Col2>
        <Col3>
          <Search>
            <motion.svg
              onClick={toggleSearch}
              animate={{ x: searchOpen ? -185 : 0 }}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </motion.svg>
            <Input
              animate={inputAnimation}
              initial={{ scaleX: 0 }}
              transition={{ type: "linear" }}
              placeholder="Enter after typing..."
            ></Input>
          </Search>
        </Col3>
      </Nav>
    </>
  );
}
export default Header;
