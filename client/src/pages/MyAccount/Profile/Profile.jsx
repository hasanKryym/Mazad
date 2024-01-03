// Profile.jsx
import { useContext, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import AccountNavbar from "../AccountNavbar/AccountNavbar";
import "./Profile.css";
import { UserContext } from "../../../context/User/UserContext";
import EditProfileForm from "./EditProfileForm"; // Import the EditProfileForm component
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userData } = useContext(UserContext);
  const [user, setUser] = userData;
  const { id, username, email, address, phoneNumber } = user.userData;
  const [showEditProfileForm, setShowEditProfileForm] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    setUser({
      status: { isLoggedIn: false },
      userData: {
        id: "",
        username: "",
        email: "",
        address: "",
        phoneNumber: "",
      },
    });
    localStorage.clear();

    navigate("/");
  };

  return (
    <>
      <Navbar />
      <AccountNavbar />

      {showEditProfileForm ? (
        <section className="edit-profile-section">
          <h2>Edit Profile</h2>
          <EditProfileForm
            user={user}
            setUser={setUser}
            setShowEditProfileForm={setShowEditProfileForm}
          />
        </section>
      ) : (
        <section className="profile-section">
          <h2>My Profile</h2>
          <div className="profile-info">
            <div>
              <label>ID:</label>
              <p>{id}</p>
            </div>
            <div>
              <label>Username:</label>
              <p>{username}</p>
            </div>
            <div>
              <label>Email:</label>
              <p>{email}</p>
            </div>
            <div>
              <label>Address:</label>
              <p>{address}</p>
            </div>
            <div>
              <label>Phone Number:</label>
              <p>{phoneNumber}</p>
            </div>
          </div>

          <div className="profile_btns-container">
            <button
              onClick={() => setShowEditProfileForm(true)}
              className="classic-button"
            >
              Edit Profile
            </button>

            <button
              onClick={() => {
                logout();
              }}
              className="logout-button"
            >
              Logout
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
