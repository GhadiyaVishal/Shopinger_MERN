import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 12%;

  margin-bottom: 25%;
`;
const Image = styled.div`
height: "60vh"
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Text = styled.div`
   font-size="12px";
   font-weight:400;
   :span{
    font-size:60px;
   }
`;
const Button = styled.button`
  height: "20px";
  width: -webkit-fill-available;
  background-color: #3e3e7c;
  color: #ffffff;
`;

const CartEmpty = () => {
  return (
    <Container>
      <Image>
        <img src="not-found.png" alt="Not Found" />
      </Image>
      <Text>
        <span>Cart is empty!</span>
        <Link to={"/"}>
          <Button>Continue Shopping!</Button>
        </Link>
      </Text>
    </Container>
  );
};

export default CartEmpty;
