import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
const Container = styled.div`
  flex: 1;
  margin: 5px;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "25vh" })}
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 20px;
`;
const Button = styled.button`
  font-size: 1em;
  font-weight: 600;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #3e3e7c;
  opacity: 0.7;
  border-radius: 3px;

  :hover {
    color: white;
    background: #000;
    opacity: 0.4;
  }
`;

const CetegoryItem = ({ item }) => {
  // const navigate = useNavigate();
  // const handleSubmit = () => {
  //   navigate("/productlist");
  // };
  return (
    <Container>
      <Link to={`/productlist/${item.cat}`}>
        <Image src={item.img}></Image>
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CetegoryItem;
