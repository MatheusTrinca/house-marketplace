import { Link } from 'react-router-dom';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';
import Slider from '../components/Slider';

const Explore = () => {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explorar</p>
      </header>

      <main>
        <Slider />
        <p className="exploreCategoryHeading">Categorias</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img
              src={rentCategoryImage}
              alt="Alugar"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Alugando</p>
          </Link>
          <Link to="/category/sale">
            <img
              src={sellCategoryImage}
              alt="Vender"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">A venda</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Explore;
