import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  ${
    "" /* display: flex;
  align-items: center;
  justify-content: center; */
  }
  height: 30px;
  text-align: center;
  font-size: 1.2rem;
  background-color: teal;
  color: white;

  font-weight: 500;
`;
const Announcement = () => {
  return (
    <div>
      <Container>Super deal! Free Shipping on Order Above ₹500</Container>
    </div>
  );
};

export default Announcement;
