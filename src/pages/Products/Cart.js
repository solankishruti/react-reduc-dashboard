import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MUIDataTable from "mui-datatables";
import productlogo from "../../public/dist/img/product.png";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import {
  deleteCartstart,
  IncreaseQuantityStart,
  DecreaseQuantityStart,
  loadProductsStart,
} from "../../redux/actions";
import { toast } from "react-toastify";

const Cart = () => {
  const columns = [
    "id",
    "image",
    "Name",
    "price",
    "size",
    "color",
    "Quantity",
    "Total",
    "Action",
  ];
  // const [TotalProductCart, setTotalProductCart] = useState("");
  const dispatch = useDispatch();
  // let TotalCart = 0;
  useEffect(() => {
    dispatch(loadProductsStart());
    // cart_data.map((item, index) => {
    //   console.log(item.quantity * item.price);
    //   TotalCart += item.quantity * item.price;
    // });
    // setTotalProductCart(TotalCart);
  }, [dispatch]);
  const DeleteCart = (item) => {
    dispatch(deleteCartstart(item));
    toast.success("Item removed successfully");
  };

  const DecreaseQuantity = (item) => {
    dispatch(DecreaseQuantityStart(item));
    toast.success("Quantity increased successfully");
  };

  const IncreaseQuantity = (item) => {
    dispatch(IncreaseQuantityStart(item));
    toast.success("Quantity decreased successfully");
  };

  const cart_data = JSON.parse(localStorage.getItem("Cart"));
  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="container" style={{ marginTop: "50px" }}>
              {/* Total = {TotalProductCart} */}
              <MUIDataTable
                pagination="true"
                style={{ overflowX: "scroll" }}
                title={"User Listing"}
                data={
                  cart_data
                    ? cart_data.map((item, index) => {
                        // TotalCart += item.quantity * item.price;
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
                          <div>
                            <span
                              className="btn btn-primary"
                              style={{ margin: "2px" }}
                              onClick={() => DecreaseQuantity(index)}
                            >
                              -
                            </span>
                            <span className="btn btn-info">
                              {item.quantity}
                            </span>
                            <span
                              className="btn btn-primary"
                              style={{ margin: "2px" }}
                              onClick={() => IncreaseQuantity(index)}
                            >
                              +
                            </span>
                          </div>,
                          item.price * item.quantity,
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
