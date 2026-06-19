import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import { useSelector } from 'react-redux';


const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
`;


const Categories = () => {
  const categories = useSelector((state) => state.cat.categories)

  console.log(categories)
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Categories;