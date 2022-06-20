import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../../redux/apiCall";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  border: 1px solid #3e3e7c;
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #3e3e7c;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  :disabled {
    color: #3e3e7c;
    cursor: pointer;
  }
`;
const Error = styled.span`
  color: red;
`;
// const Link = styled.a`
//   margin: 5px 0px;
//   font-size: 12px;
//   text-decoration: underline;
//   cursor: pointer;
// `;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, error } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handlelogin = e => {
    e.preventDefault();
    login(dispatch, { username, password });
    // toast.success("login success");
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button onClick={handlelogin} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Oops! Something went wrong</Error>}
          {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link> */}
          {/* <Link>CREATE A NEW ACCOUNT</Link> */}
          <span>
            Not have an account?
            <Link to={"/register"} className="ml-3">
              <b>Register</b>
            </Link>
          </span>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "./login.css";
// // import axios from "axios";

// const Login = () => {
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async e => {
//     e.preventDefault();

//     // try {
//     //   const { data } = await axios.post("http://localhost:3000/register", {
//     //     ...values,
//     //   });
//     // } catch (error) {
//     //   console.log(error);
//     // }
//   };

//   return (
//     <div className="container">
//       <h2>Login Account</h2>
//       <form onSubmit={e => handleSubmit(e)}>
//         <div>
//           <label htmlFor="email">Email Id</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email id"
//             onChange={e =>
//               setValues({ ...values, [e.target.name]: e.target.value })
//             }
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={e =>
//               setValues({ ...values, [e.target.name]: e.target.value })
//             }
//           />
//         </div>
//         <button type="submit">Submit</button>
//         <span>
//           Not have an account? <Link to={"/register"}>Register</Link>
//         </span>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;
