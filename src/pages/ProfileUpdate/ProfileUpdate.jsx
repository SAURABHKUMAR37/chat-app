import React, { useState } from "react";
import "./ProfileUpdate.css";
import assets from "../../assets/assets";
import { uploadToCloudinary } from "../../config/cloudinary";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileUpdate = () => {
  const { userData, setUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const [image, setImage] = useState(false);
  const [name, setName] = useState(userData?.name || "");
  const [bio, setBio] = useState(userData?.bio || "");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!image) {
        alert("Please select an image");
        return;
      }

      const imageUrl = await uploadToCloudinary(image);

      const userRef = doc(db, "users", userData.id);

      await updateDoc(userRef, {
        avatar: imageUrl,
        name: name,
        bio: bio,
      });

      setUserData({
        ...userData,
        avatar: imageUrl,
        name: name,
        bio: bio,
      });

      navigate("/chat");
    } catch (error) {
      console.log("Upload Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <form onSubmit={handleSubmit}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png,.jpg,.jpeg"
              hidden
            />
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : assets.avatar_icon
              }
              alt=""
            />
            upload profile image
          </label>
          <input
            type="text"
            placeholder="your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="write profile bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />{" "}
          <button type="submit">Save</button>
          <img
            className="profile-pic"
            src={
              image
                ? URL.createObjectURL(image)
                : userData?.avatar || assets.avatar_icon
            }
            alt=""
          />
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
