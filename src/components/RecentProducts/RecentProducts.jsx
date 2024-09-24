import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function RecentProducts() {
  const [products, setproducts] = useState([]);
  const [loading, setisloading] = useState(false);
  const [currentId, setcurrentId] = useState(0);
  let { addProductToCart } = useContext(CartContext);

  async function addTocart(id) {
    setcurrentId(id);
    setisloading(true);
    let response = await addProductToCart(id);
    if (response.data.status == "success") {
      toast.success(response.data.message, { duration: 3000 });
      setisloading(false);
    } else {
      toast.error(response.data.message, { duration: 3000 });
      setisloading(false);
    }
  }

  function getProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        setproducts(res.data.data);
      })
      .catch((res) => {});
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => {
            return (
              <div key={product.id} className="w-1/6">
                <div className="product p-2 my-2">
                  <Link
                    to={`productdetails/${product.id}/${product.category.name}`}
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

                  <button
                    onClick={() => {
                      addTocart(product.id);
                    }}
                    className="btn"
                  >
                    {loading && currentId == product.id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
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
