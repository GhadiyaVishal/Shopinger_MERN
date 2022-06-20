import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/userSlice";
import { update } from "../redux/apiCall";
import UpdateData from "../AppPages/UpdateData";

const Container = styled.div`
  height: 4.3rem;
  width: 100vw;
  background: #3e3e7c;
  height: 65px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
`;
const SearchContainer = styled.div`
  margin-right: 8px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 0.07rem solid lightgrey;
  margin-left: 10px;
  padding: 0.5rem;
`;
const Input = styled.input`
  padding: 0;
  margin-left: 0px;
  height: 40px;
  border: none;
  flex: 2;
  background: #3e3e7c;
  height: 2rem;
  ${mobile({ display: "none" })}
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  text-align: center;
  justify-content: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: end;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const Image = styled.div`
  height: 3rem;
  width: 4rem;
  display: flex;
  margin-right: 1rem;
  ${mobile({ fontSize: "24px" })}
`;
// const Tag = styled.div`
//   color: white;
//   font-size: 30px;
//   font-weight: 600;
// `;
const NavMenu = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: white;
  margin-right: 5px;

  ${
    "" /* @media (max-width: 768px) {
    flex-flow: column nowrap;
    background: #3e3e7c;
    position: fixed;
    padding-top: 4rem;
    right: 0;
    height: 100vh;
    width: 230px;
    margin-left: 100px;
  } */
  }
`;
const MenuItems = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: white;
  margin-right: 5px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  ${"" /* z-index: 1; */}
  ${
    "" /* @media (max-width: 768px) {
    background: #3e3e7c; 
    ${"" /* align-items: start; */
  }
`;
const Name = styled.h1`
  font-size: 2rem;
  color: white;
`;

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);

  const { products, qnt } = useSelector(state => ({ ...state.cart }));
  // console.log(qnt);
  // console.log(products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Image>
            <Link to={"/"}>
              <img src="./logo.png" alt="logo" />
            </Link>
          </Image>
          <SearchContainer>
            <Input placeholder="Search..." />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center show={showMediaIcons}>
          {/* <Tag>SHOPINGER</Tag> */}
          <NavMenu onClick={() => setShowMediaIcons(true)}>
            <Name>S H O P I N G E R</Name>
            {/* <Link className="mr-6" to="/">
              Home
            </Link>
            <Link className="mr-6" to="/productlist">
              ProductList
            </Link>
            <Link className="mr-6" to="/services">
              Services
            </Link>
            <Link className="mr-6" to="/contact">
              Contact
            </Link> */}
          </NavMenu>
        </Center>
        <Right>
          <MenuItems>
            {user ? (
              <p
                className="mr-2 cursor-pointer"
                onClick={() => dispatch(logout())}
              >
                Logout
              </p> /* onClick={()=> dispatch(logout())} */
            ) : (
              <Link className="mr-4" to="/login">
                Login
              </Link>
            )}
            {user ? (
              <p
                className="mr-4 cursor-pointer"
                onClick={() => dispatch(update())}
              >
                Edit
              </p> /* onClick={()=> dispatch(useredit())} */
            ) : (
              <Link className="mr-4" to="/register">
                Register
              </Link>
            )}

            <Badge badgeContent={products.length} color="primary">
              <ShoppingCartOutlinedIcon
                onClick={() => navigate("/cart")}
                className="cursor-pointer"
              />
            </Badge>
          </MenuItems>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
