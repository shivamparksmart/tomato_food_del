import { useState } from "react";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import Header from "../../components/Header/Header";
import "./Home.css";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import { Helmet } from "react-helmet";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Helmet>
        <title>Tomato. - Order your favourite food now !</title>
        <meta
          name="description"
          content="Select from best food options available"
        />
        <meta
          name="keywords"
          content="restaurants, food, cuisines, dining, best restaurants near me, affordable food places, famous street foods, pizza, sandwiches"
        />
      </Helmet>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
