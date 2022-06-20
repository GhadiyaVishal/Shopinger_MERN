import React from "react";
import { Send } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
const Container = styled.div`
  height: 60vh;
  background: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${"" /* font-weight: 300; */}
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  border: 1px solid grey;
`;
const Input = styled.input`
  border: none;
  flex: 8;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  background: #3e3e7c;
  color: white;
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>NewsLetter</Title>
      <Description>Get Timely Update from your favorite Products.</Description>
      <InputContainer>
        <Input />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
