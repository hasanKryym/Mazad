import { useState } from "react";
import "./AddProductForm.css";
import UploadCare from "../../UploadCare/UploadCare";
import { NOTIFICATION_STATES } from "../../Notification/notificationStates";
import { addProduct } from "../../../data/api/postingData";

const AddProductForm = ({
  addNewProduct,
  updateNotification,
  handleDismiss,
  setShowAddProductForm,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      updateNotification(
        "please insert an image for the product",
        NOTIFICATION_STATES.INFO
      );
      return;
    }

    updateNotification(
      "Inserting product, please wait...",
      NOTIFICATION_STATES.LOAD
    );

    const response = await addProduct(
      formData.name,
      formData.description,
      formData.image
    );

    if (response.success) {
      addNewProduct(response.product);
      updateNotification(response.message, NOTIFICATION_STATES.SUCCESS);
      setShowAddProductForm(false);
    } else {
      updateNotification(response.message, NOTIFICATION_STATES.ERROR);
    }
  };

  return (
    <div className="add-product-form-container">
      <button
        className="close-button"
        onClick={() => setShowAddProductForm(false)}
      >
        Close
      </button>
      <h2 className="add-product-form-heading">Add Product</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <label className="add-product-form-label" htmlFor="name">
          Product Name:
        </label>
        <input
          className="add-product-form-input"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="add-product-form-label" htmlFor="description">
          Product Description:
        </label>
        <textarea
          className="add-product-form-textarea"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label className="add-product-form-label" htmlFor="image">
          Product Image:
        </label>
        <UploadCare setFormData={setFormData} />
        <br />
        <br />

        <button className="classic-button" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
