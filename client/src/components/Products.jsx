import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../requestMethods';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilterProducts] = useState([]);
  const location = useLocation()


  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest(
          cat
            ? `/products?category=${cat}`
            : '/products'
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [cat]);

  useEffect(() => {
    if(Object.keys(filters).length > 0) {
      setFilterProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      )
    } else  {
    setFilterProducts(products)
    }
   
  }, [cat, filters, products]);


  useEffect(() => {
      if(sort==="newest"){
        setFilterProducts(prev => [...prev].sort((a,b) => new Date(b.createdAt)- new Date(a.createdAt)))
      } else if (sort==="asc"){
        setFilterProducts(prev => [...prev].sort((a,b) => a.price -b.price))
      } else {
        setFilterProducts(prev => [...prev].sort((a,b) => b.price - a.price))
      }
  }, [sort])



  return (
    <Container>
      {location.pathname.split("/")[1] === "products"
 ? filteredProducts.map((item) => (
        <Product item={item} key={item._id} />
      )) : filteredProducts.slice(0,8).map((item) => (
        <Product item={item} key={item._id} />
      )) }
    </Container>
  );
};

export default Products;
