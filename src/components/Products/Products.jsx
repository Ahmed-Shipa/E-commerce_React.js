import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";

export default function Products() {

  let { data, isError, error, isLoading } = useProducts();

  if (isError) {
    return <h3>{error.message}</h3>;
  }
  if (isLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <>
      <div className="row">
        {data?.data?.data?.map((product) => {
          return (
            <div key={product.id} className="w-1/6">
              <div className="product p-2 my-2">
                <Link
                  to={`productdetails/${product.id}/${product.category.name}`}
                >
                  <img src={product.imageCover} className="w-full" alt="" />
                  <h3 className="text-emerald-600">{product.category.name}</h3>
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
        })}
      </div>
    </>
  );
}
