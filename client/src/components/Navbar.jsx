import { Badge } from '@material-ui/core';
import {
  Search,
  ShoppingCartOutlined,
} from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { logout } from "../redux/userRedux";
import { resetCart } from '../redux/cartRedux';


const Container = styled.div`
  height: 80px;
  ${mobile({ height: '50px' })}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '10px 0px' })}
`;

const Left = styled.div`
  margin-left: 30px;
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px;
  position: relative;
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: '50px' })}
`;

const SuggestionBox = styled.div`
  flex: 6;
  display: flex;
  width: 100%;
  gap: 5%;
  position: absolute;
  top: 32px;
  ${mobile({ top: '0' })}
`;

const SearchSuggestion = styled.div`
  cursor: pointer;
  color: white;
  background-color: #f990c7;
  border-radius: 10px;
  padding: 3px;
`;

const Center = styled.div`
  flex: 1;
  ${mobile({ display: 'none' })}
`;

const Logo = styled.div`
  font-weight: bold;
  display: flex;
  align-item: start;
  justify-content: center;
  ${mobile({ fontSize: '24px' })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
  ${mobile({ flex: 2, justifyContent: 'center' })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;

const Image = styled.img`
  height: 50px;
  object-fit: cover;
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const categories = useSelector((state) => state.cat.categories);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch()
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (input) => {
    let matches = [];
    if (input.length > 0) {
      matches = categories.filter((c) => {
        const regex = new RegExp(`${input}`, 'gi');
        return c.cat.match(regex);
      });
    }
    setSuggestions(matches);
    setInput(input);
  };

  const handleLogout = () => {
    dispatch(resetCart())
    dispatch(logout())
    
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input
              placeholder='Chemise, veste, t-shirt...'
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={() => {
                setTimeout(() => {
                  setSuggestions([]);
                }, 200);
              }}
            />
            <SuggestionBox>
              {suggestions &&
                suggestions.map((suggestion, index) => (
                  <SearchSuggestion key={index}>
                    <Link to={`/products/${suggestion.cat}`}>
                      {suggestion.title}
                    </Link>
                  </SearchSuggestion>
                ))}
            </SuggestionBox>
            <Link to={`/products/${input}`}>
              <Search style={{ color: 'gray', fontSize: 16 }} />
            </Link>
          </SearchContainer>
        </Left>
        <Center>
          <Logo>
            <Image
              src={
                'https://firebasestorage.googleapis.com/v0/b/shop-2bc8b.appspot.com/o/logo.png?alt=media&token=331caa94-2c78-4745-9d99-611f1cca2ef8'
              }
            />
          </Logo>
        </Center>
        {user ? (
          <Right>
            <MenuItem>Bienvenue {user.username}</MenuItem>
            <MenuItem onClick={handleLogout}>
              Se déconnecter
            </MenuItem>
            <Link to='/cart'>
              <MenuItem>
                <Badge badgeContent={quantity} color='primary'>
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        ) : (
          <Right>
            <Link to='/register'>
              <MenuItem>S'inscrire</MenuItem>
            </Link>
            <Link to='/login'>
              <MenuItem>Se connecter</MenuItem>
            </Link>
            <Link to='/cart'>
              <MenuItem>
                <Badge badgeContent={quantity} color='primary'>
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
