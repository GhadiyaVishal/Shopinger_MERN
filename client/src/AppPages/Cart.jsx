import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethod";
import { Navigate, useNavigate } from "react-router-dom";
import {
  addToCart,
  decreaseCart,
  totalPrice,
} from "../redux/features/cartSlice";
import toast from "react-hot-toast";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-size: 35px;
  font-weight: 400;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${props => props.type === "filled" && "none"};
  background-color: ${props =>
    props.type === "filled" ? "#3e3e7c" : "transparent"};
  color: ${props => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.type === "total" && "500"};
  font-size: ${props => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #3e3e7c;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const { products, qnt, total } = useSelector(state => ({ ...state.cart }));
  const dispatch = useDispatch();
  // const [qnt, setQnt] = useState(1);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  // console.log(products, qnt, total);
  const onToken = token => {
    setStripeToken(token);
  };

  useEffect(() => {
    dispatch(totalPrice());
    // console.log(products);
  }, [products]);
  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const res = await userRequest.post(
  //         "localhost:5000/api/cart/checkout/payment",
  //         {
  //           tokenId: stripeToken.id,
  //           amount: 500,
  //         }
  //       );
  //       console.log(res);
  //       navigate("/success", {
  //         stripeData: res.data,
  //         products: products,
  //       });
  //     } catch {}
  //   };
  //   stripeToken && makeRequest();
  // }, [stripeToken, total, navigate]);

  // console.log(cart.total);
  // const handleClick = type => {
  //   if (type === "dec") {
  //     qnt > 1 && setQnt(qnt - 1);
  //   } else {
  //     setQnt(qnt + 1);
  //   }
  // };
  // const handleCheck = () => {
  //   toast.success("payment success");
  // };

  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({qnt})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
        </Top>
        <TopButton type="filled">CHECKOUT NOW</TopButton>
        <Bottom>
          <Info>
            {products?.map(product => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Remove
                      className="cursor-pointer"
                      onClick={() => dispatch(decreaseCart(product))}
                    />
                    <ProductAmount>{product.qnt}</ProductAmount>
                    <Add
                      className="cursor-pointer"
                      onClick={() => dispatch(addToCart(product))}
                    />
                    {/* <Add className="cursor-pointer" />
                    <ProductAmount>{product.qnt}</ProductAmount>
                    <Remove className="cursor-pointer" /> */}
                  </ProductAmountContainer>
                  <ProductPrice>₹ {product.price * product.qnt}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₹ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹ {total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Shopiger"
              image="logo.png"
              billingAddress
              shippingAddress
              description={`Your total is ${total}`}
              amount={total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
        {/* } */}
      </Wrapper>
    </Container>
  );
};

export default Cart;
