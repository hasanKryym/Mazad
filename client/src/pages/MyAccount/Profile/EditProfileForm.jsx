// EditProfileForm.jsx
import React, { useState } from "react";
import "./EditProfile.css";

const EditProfileForm = ({ user, setUser, setShowEditProfileForm }) => {
  const [formData, setFormData] = useState({
    username: user.userData.username,
    email: user.userData.email,
    address: user.userData.address,
    phoneNumber: user.userData.phoneNumber,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form className="edit_profile-form" onSubmit={handleSubmit}>
      <label className="edit_profile-label">
        Username:
        <input
          className="edit_profile-input"
          autoComplete="off"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <label className="edit_profile-label">
        Email:
        <input
          className="edit_profile-input"
          readOnly
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label className="edit_profile-label">
        Address:
        <input
          className="edit_profile-input"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </label>
      <label className="edit_profile-label">
        Phone Number:
        <input
          className="edit_profile-input"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </label>
      <button className="classic-button" type="submit">
        Update Profile
      </button>
      <button
        onClick={() => setShowEditProfileForm(false)}
        className="secondary-button"
        type="submit"
      >
        cancel
      </button>
    </form>
  );
};

export default EditProfileForm;
