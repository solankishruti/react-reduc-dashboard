import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { loadSingleProductStart } from "../../redux/actions";
import productlogo from "../../public/dist/img/product.png";

const ProductInfo = () => {
  const { singleProduct } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();

  if (id) {
    localStorage.setItem("view_product_id", id);
  }
  if (singleProduct) {
    localStorage.setItem("view_product", JSON.stringify(singleProduct));
  }
  const ids = !id ? localStorage.getItem("view_product_id") : id;

  useEffect(() => {
    if (ids) {
      dispatch(loadSingleProductStart(ids));
    }
  }, [dispatch, ids]);

  const product_data = JSON.parse(localStorage.getItem("view_product"));
  // console.log(product_data);
  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div style={{ marginTop: "100px" }}>
              <div
                className="row"
                style={{
                  margin: "auto",
                  padding: "15px",
                  maxWidth: "450px",
                  alignContent: "center",
                }}
              >
                <p className="col-md-12 fs-3">Product Detail</p>
                <hr />
                <p className="col-md-6 fw-bold">Image:</p>
                <p className="col-md-6">
                  <img
                    src={productlogo}
                    className="elevation-2"
                    style={{ height: "30px" }}
                    alt="product"
                  />
                </p>
                <p className="col-md-6 fw-bold">ID:</p>
                <p className="col-md-6">{id}</p>
                <p className="col-md-6 fw-bold">Name:</p>
                <p className="col-md-6">{product_data.name}</p>
                <p className="col-md-6 fw-bold">Email:</p>
                <p className="col-md-6">{product_data.price}</p>
                <p className="col-md-6 fw-bold">Phone:</p>
                <p className="col-md-6">{product_data.size}</p>
                <p className="col-md-6 fw-bold">Address:</p>
                <p className="col-md-6">{product_data.color}</p>
              </div>
              <MDBBtn onClick={() => history("/allProducts")} color="danger">
                Go Back
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
