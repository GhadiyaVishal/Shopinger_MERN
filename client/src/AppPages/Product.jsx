import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Newsletter from "../component/Newsletter";
import { Remove, Add } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { addToCart, totalPrice } from "../redux/features/cartSlice";
import { publicRequest } from "../requestMethod";

import toast from "react-hot-toast";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 70%;
  width: 70%;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin: 0px 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  ${"" /* transform: translateX($ */}
  ${"" /* transition: all 0.3s ease; */}
  :hover {
    width: 24px;
    height: 24px;
    ${"" /* transform: scaleX(2);/ */}
  }
  ${({ active }) =>
    active &&
    `
    border: 18px double white;
  `}
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #3e3e7c;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid #3e3e7c;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #3e3e7c;
    color: white;
  }
`;

// const Product = item => {
//   const dispatch = useDispatch();
//   // const [isActive, setIsActive] = useState(true);
//   const { state } = useLocation();
//   console.log(item);
//   // const handleAdd = item => {
//   //   dispatch(addToCart(item));
//   // };

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [qnt, setQnt] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const { products: productForCart } = useSelector(state => ({
    ...state.cart,
  }));

  const handleClick = type => {
    if (type === "dec") {
      qnt > 1 && setQnt(qnt - 1);
    } else {
      setQnt(qnt + 1);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(
          `http://localhost:5000/api/products/find/${id}`
        );
        setProduct(res.data);
      } catch (error) {}
    };
    getProduct();
  }, [id]);
  // console.log(product, "apppages from");

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qnt, color, size }));
    // console.log("add to cart");
  };

  useEffect(() => {
    dispatch(totalPrice());
    // console.log(productForCart);
  }, [productForCart]);

  return (
    <Container>
      <Wrapper>
        <ImgContainer>{product.img}</ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>₹{product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map(c => (
                <FilterColor
                  color={c}
                  key={c}
                  onClick={() => setColor(c)}
                  // onClick={this.handleButton}
                  // color="black"
                  // active={isActive}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize
                className="cursor-pointer"
                onChange={e => {
                  setSize(e.target.value);
                }}
              >
                {product.size?.map(s => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove
                className="cursor-pointer"
                onClick={() => handleClick("dec")}
              />
              <Amount>{qnt}</Amount>
              <Add
                className="cursor-pointer"
                onClick={() => handleClick("inc")}
              />
            </AmountContainer>
            <Button onClick={handleAddToCart}>ADD TO CART</Button>
            {/* onClick={() => dispatch(addToCart())} */}
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default Product;
