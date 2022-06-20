import React, { useState } from "react";
import styled from "styled-components";
import Products from "../component/Products";

import { useLocation } from "react-router-dom";
// import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${
    "" /* ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })} */
  }
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${"" /* ${mobile({ marginRight: "0px" })} */}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${"" /* ${mobile({ margin: "10px 0px" })} */}
`;
const Option = styled.option``;

const ProductList = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("popular");

  const location = useLocation();
  // console.log(location);
  const cat = location.pathname.split("/")[2];

  const handleFilters = e => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={e => setSort(e.target.value)}>
            <Option value="popular">Popularity</Option>
            <Option value="LtH">Price--Low to High</Option>
            <Option value="HtL">Price--High to Low</Option>
            <Option value="newest">Newest First</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
    </Container>
  );
};

export default ProductList;
