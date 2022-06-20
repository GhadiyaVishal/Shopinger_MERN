import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
`;
const Products = ({ cat, filters, sort }) => {
  // const { items } = useSelector(state => state.item);
  // console.log(cat, filters, sort);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          // "http://127.0.0.1:5000/api/products"
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : " http://localhost:5000/api/products"
        );
        // console.log(res);
        setProducts(res.data);
        // console.log(res);
      } catch (error) {}
    };
    getProduct();
    // return () => {
    //   second
    // }
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter(item =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "popular") {
      setFilteredProducts(prev =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "LtH") {
      setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price));
    } else if (sort === "HtL") {
      setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price));
    } else {
      setFilteredProducts(prev =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map(item => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map(item => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
