import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h2 className="my-3 capitalize font-semibold text-gray-600">
        Shop popular Categories
      </h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={categories.id}>
            <img
              src={category.image}
              className="w-full h-[200px] object-cover"
              alt=""
            />
            <h4>{category.name}</h4>
          </div>
        ))}
      </Slider>
    </>
  );
}
