import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProductsStart, addCardStart } from "../../redux/actions";
import { MDBBtn, MDBIcon, MDBSpinner, MDBTooltip } from "mdb-react-ui-kit";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import productlogo from "../../public/dist/img/product.png";
import { toast } from "react-toastify";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector((state) => state.data);
  const columns = ["id", "image", "Name", "price", "size", "color", "Action"];

  useEffect(() => {
    dispatch(loadProductsStart());
  }, [dispatch]);

  const AddCart = (item) => {
    dispatch(addCardStart(item));
    toast.success("Added to cart ");
  };

  if (loading) {
    return (
      <MDBSpinner style={{ marginTop: "150px" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }

  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="container" style={{ marginTop: "50px" }}>
              <MUIDataTable
                pagination="true"
                style={{ overflowX: "scroll" }}
                title={"User Listing"}
                data={allProducts.map((item, index) => {
                  return [
                    index + 1,
                    <img
                      src={productlogo}
                      className="elevation-2"
                      style={{ height: "30px" }}
                      alt="product"
                    />,
                    item.name,
                    item.price,
                    item.size,
                    item.color,
                    <div className="row actionbtns">
                      <Link to={`/productInfo/${item.id}`}>
                        <MDBTooltip title="View" tag="p">
                          <MDBIcon
                            fas
                            icon="eye"
                            style={{ color: "#3b5998", marginBottom: "10px" }}
                            size="lg"
                          />
                        </MDBTooltip>
                      </Link>{" "}
                      <MDBBtn
                        tag="a"
                        color="none"
                        onClick={() => AddCart(item)}
                      >
                        <MDBTooltip title="Add to cart" tag="p">
                          <MDBIcon
                            fas
                            icon="plus-circle"
                            style={{ color: "#dd4b39" }}
                            size="lg"
                          />
                        </MDBTooltip>
                      </MDBBtn>
                    </div>,
                  ];
                })}
                columns={columns}
                options={{
                  rowsPerPage: 5,
                  rowsPerPageOptions: [5, 10, 15, 20],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
