import React, { useState } from "react";
import styled from "styled-components";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import {
  addToCart,
  addToWishList,
  totalPrice,
} from "../redux/features/cartSlice";
import toast from "react-hot-toast";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1s ease;
  cursor: pointer;
  z-index: 3;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfb;
  position: relative;
  :hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  background: white;
  position: absolute;
`;
const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  transition: all 0.7s ease;

  :hover {
    background: #3e3e7c;
    transform: scale(1.2);
  }
`;

const Product = ({ item }) => {
  // const [wish, setWish] = useState(0);/
  // const { products: productForCart } = useSelector(state => ({
  //   ...state.cart,
  // }));
  // const navigate = useNavigate();
  // const handlesubmit = () => {
  //   // <Navigate to={"/product"} state={{ item }} />;
  //   navigate("/product", { item });
  //   // console.log("triggered");
  // };
  // console.log(item);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart({ item: item }));
  };

  // const handleAddToCart = () => {
  //   dispatch(addToCart({ products, qnt, price, total }));
  //   // console.log("add to cart");
  // };

  // useEffect(() => {
  //   dispatch(totalPrice());
  //   // console.log(productForCart);
  // }, [productForCart]);
  const handelWishList = () => {
    // console.log("wishlist");
    // dispatch(addToWishList(wishList));
  };

  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <ShoppingBagOutlinedIcon onClick={handleAddToCart} />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlinedIcon />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlinedIcon onClick={handelWishList} />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
