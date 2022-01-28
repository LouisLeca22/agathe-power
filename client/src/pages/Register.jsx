import styled from "styled-components";
import { mobile } from "../responsive";
import {useState} from "react"
import { publicRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Error = styled.div`
    color: tomato;
    margin: 10px;
    text-align: center;
    width: 100%;
`

const Register = () => {

  const [error, setError] = useState("")
  const [form, setForm] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleClick = async (e) => {
    e.preventDefault()
    console.log(Object.keys(form).length)
    if((Object.keys(form).length) < 4 ){
      setError("Remplissez tous les champs")
    }  else {
      try {
        await publicRequest.post("/auth/register", form)
        navigate("/login")
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>CRÉER UN COMPTE</Title>
        <Form>
          <Input placeholder="username" name="username" onChange={handleChange}/>
          <Input placeholder="email" name="email" onChange={handleChange}/>
          <Input placeholder="password" type="password" name="password" onChange={handleChange} />
          <Input placeholder="confirm password" type="password" name="confirmPassword" onChange={handleChange} />
          <Agreement>
            En créant un compte, vous consentez au traitement de vos données personnelles conformément au <b>RGPD</b>
          </Agreement>
          <Button onClick={handleClick}>S'INSCRIE</Button>
        </Form>
        <Error>{error}</Error>
      </Wrapper>
    </Container>
  );
};

export default Register;