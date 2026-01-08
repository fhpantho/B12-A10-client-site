import React, { useContext, useState } from "react";
import { Authcontext } from "../context/Authcontext";
import { updateProfile } from "firebase/auth";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { user } = useContext(Authcontext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.displayName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });

      await user.reload();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-base-200">
      <div className="max-w-4xl mx-auto">
        <div className="bg-base-100 rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-primary">
              My Profile
            </h1>

            {!isEditing && (
              <button
                onClick={handleEdit}
                className="btn btn-primary"
              >
                Edit Profile
              </button>
            )}
          </div>

          {user && (
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-3">
                <img
                  src={isEditing ? formData.photoURL : user.photoURL}
                  alt={user.displayName}
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-md"
                  onError={(e) => {
                    e.target.src = user.photoURL;
                  }}
                />
                {isEditing && (
                  <p className="text-xs text-base-content/60 text-center">
                    Enter a valid image URL
                  </p>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 space-y-5 text-center md:text-left">
                {/* Name */}
                <div>
                  <h2 className="text-sm font-semibold text-base-content/60 uppercase mb-1">
                    Name
                  </h2>
                  {isEditing ? (
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    <p className="text-2xl font-bold text-base-content">
                      {user.displayName}
                    </p>
                  )}
                </div>

                {/* Photo URL */}
                {isEditing && (
                  <div>
                    <h2 className="text-sm font-semibold text-base-content/60 uppercase mb-1">
                      Photo URL
                    </h2>
                    <input
                      type="url"
                      name="photoURL"
                      value={formData.photoURL}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                )}

                {/* Email */}
                <div>
                  <h2 className="text-sm font-semibold text-base-content/60 uppercase mb-1">
                    Email
                  </h2>
                  <p className="text-xl text-base-content flex items-center gap-2">
                    {user.email}
                    <span className="badge badge-ghost badge-sm">
                      Non-editable
                    </span>
                  </p>
                </div>

                {/* Last Login */}
                {!isEditing && (
                  <div className="pt-2">
                    <span className="badge badge-primary badge-outline">
                      Last Login: {user.metadata?.lastSignInTime}
                    </span>
                  </div>
                )}

                {/* Actions */}
                {isEditing && (
                  <div className="flex gap-3 pt-4 justify-center md:justify-start">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="btn btn-success"
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="btn btn-neutral"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
