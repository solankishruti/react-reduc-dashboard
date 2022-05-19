import React from "react";
import { useDispatch } from "react-redux";
import MUIDataTable from "mui-datatables";
import productlogo from "../../public/dist/img/product.png";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { deleteCartstart } from "../../redux/actions";

const Cart = () => {
  const columns = [
    "id",
    "image",
    "Name",
    "price",
    "size",
    "color",
    "Quantity",
    "Action",
  ];
  const dispatch = useDispatch();
  const DeleteCart = (item) => {
    dispatch(deleteCartstart(item));
  };

  const cart_data = JSON.parse(localStorage.getItem("Cart"));
  const data = "";
  if (cart_data) {
    // const data = ;
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
                // data={["no data"]}
                data={
                  cart_data
                    ? cart_data.map((item, index) => {
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
                          item.quantity,
                          <div className="row actionbtns">
                            <MDBBtn
                              className="m-1"
                              tag="a"
                              color="none"
                              onClick={() => DeleteCart(index)}
                            >
                              <MDBIcon
                                fas
                                icon="trash"
                                style={{ color: "#dd4b39" }}
                                size="lg"
                              />
                            </MDBBtn>{" "}
                          </div>,
                        ];
                      })
                    : ["no data found"]
                }
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

export default Cart;
