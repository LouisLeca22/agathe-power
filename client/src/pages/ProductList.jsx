import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation()
  const cat = location.pathname.split("/")[2]
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState("")

  const handleFilters = (e) => {
    setFilters({...filters, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filtrer les produits :</FilterText>
          <Select name="color" onChange={handleFilters} defaultValue={"color"}>
            <Option disabled value="color">
              Couleur
            </Option>
            <Option value="white">blanc</Option>
            <Option value="beige">beige</Option>
            <Option value="red">rouge</Option>
            <Option value="teal">bleu</Option>
            <Option value="yellow">jaune</Option>
            <Option value="green">vert</Option>
            <Option value="pink">rose</Option>
          </Select>
          <Select name="size" onChange={handleFilters} defaultValue={"size"}>
            <Option disabled value='size'>
              Taille
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Trier les produits :</FilterText>
          <Select onChange={(e) => setSort(e.target.value)} defaultValue={"sort"}>
            <Option value="sort" disabled>Trier par</Option>
            <Option value="newest">Récents</Option>
            <Option value="asc">Prix (asc)</Option>
            <Option value="desc">Prix (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;