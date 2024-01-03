import { useContext, useEffect, useState } from "react";
import "./Products.css";
import Navbar from "../../../components/Navbar/Navbar";
import AccountNavbar from "../AccountNavbar/AccountNavbar";
import { UserContext } from "../../../context/User/UserContext";
import { fetchUserProducts } from "../../../data/api/fetchingData";
import Notification from "../../../components/Notification/Notification";
import { NOTIFICATION_STATES } from "../../../components/Notification/notificationStates";
import UserProduct from "../../../components/UserProduct/UserProduct";
import AddProductForm from "../../../components/Product/AddProductForm/AddProductForm";
import { useLocation } from "react-router-dom";

const Products = ({
  setFormData,
  setShowProductsPage,
  bidPageNotification,
}) => {
  const [products, setProducts] = useState([]);
  const addNewProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const { userData } = useContext(UserContext);
  const [user] = userData;

  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const location = useLocation();

  const fetchProducts = async () => {
    updateNotification("Loading products...", NOTIFICATION_STATES.LOAD);
    // setShowNotification(true);
    const response = await fetchUserProducts();
    if (response.success) {
      setProducts(...products, response.products);
      handleDismiss();
    } else {
      updateNotification(response.message, NOTIFICATION_STATES.INFO);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    state: "",
    message: "",
  });

  const handleDismiss = () => {
    setShowNotification(false);
    setNotificationData({
      state: "",
      message: "",
    });
  };

  const updateNotification = (message, state) => {
    setNotificationData({
      ...notificationData,
      message: message,
      state: state,
    });
    setShowNotification(true);
  };
  return (
    <>
      {location.pathname === "/myAccount/bids" && (
        <button
          onClick={() => setShowProductsPage(false)}
          className="close-button"
        >
          close
        </button>
      )}
      {location.pathname !== "/myAccount/bids" && (
        <>
          <Navbar />
          <AccountNavbar />
          <div className="add_product">
            <button
              onClick={() => setShowAddProductForm(true)}
              className="classic-button"
            >
              Add new Product
            </button>
          </div>
        </>
      )}

      {showAddProductForm && (
        <AddProductForm
          addNewProduct={addNewProduct}
          updateNotification={updateNotification}
          handleDismiss={handleDismiss}
          setShowAddProductForm={setShowAddProductForm}
        />
      )}

      {showNotification && (
        <Notification
          message={notificationData.message}
          state={notificationData.state}
          onDismiss={handleDismiss}
        />
      )}

      <section className="user-product-section">
        {products.length !== 0 ? (
          products.map((product) => {
            return (
              <UserProduct
                key={product.id}
                product={product}
                setFormData={setFormData}
                setShowProductsPage={setShowProductsPage}
                bidPageNotification={bidPageNotification}
              />
            );
          })
        ) : (
          <p>no products</p>
        )}
      </section>
    </>
  );
};

export default Products;
