import Announcement from '../components/Announcement';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import Slider from '../components/Slider';

const Home = ({categories}) => {
  const sort = ""
  const filters= {}

  return (
    <div>
      <Announcement />
      <Navbar/>
      <Slider />
      <Categories/>
      <Products filters={filters} sort={sort}/>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
