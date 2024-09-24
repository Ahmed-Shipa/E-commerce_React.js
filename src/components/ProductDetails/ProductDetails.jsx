import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  let { id, category } = useParams();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  function getProducts(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function getAllProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => {
      let related = res.data.data.filter(
        (product) => product.category.name == category
      );
      setRelatedProducts(related);
    });
  }

  useEffect(() => {
    getProducts(id);
    getAllProducts();
  }, [id, category]);

  return (
    <>
      <div className="row items-center">
        <div className="w-1/4">
          <Slider {...settings}>
            {product?.images.map((src) => (
              <img src={src} className="w-full" />
            ))}
          </Slider>
        </div>
        <div className="w-3/4 p-4">
          <h3 className="font-semibold capitalize text-2xl">
            {product?.title}
          </h3>
          <h4 className="text-gray-700 my-4">{product?.description}</h4>
          <h4>{product?.category.name}</h4>
          <div className="flex justify-between p-3 my-5">
            <span>{product?.price} EGP</span>
            <span>
              <i className="fas fa-star text-yellow-400"></i>
              {product?.ratingsAverage}
            </span>
          </div>
          <button className="btn">Add to Cart</button>
        </div>
      </div>
      <div className="row">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => {
            return (
              <div key={product.id} className="w-1/6">
                <div className="product p-2 my-2">
                  <Link
                    to={`/productdetails/${product.id}/${product.category.name}`}
                  >
                    <img src={product.imageCover} className="w-full" alt="" />
                    <h3 className="text-emerald-600">
                      {product.category.name}
                    </h3>
                    <h3 className="mb-1 font-semibold">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex justify-between p-3">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star text-yellow-400"></i>{" "}
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>

                  <button className="btn">Add to Cart</button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="spinner"></div>
        )}
      </div>
    </>
  );
}
