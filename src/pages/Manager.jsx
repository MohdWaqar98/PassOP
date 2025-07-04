import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchPasswords();
    }
  }, []);

  const fetchPasswords = async () => {
    setLoading(true);
    try {
      const res = await api.get("/passwords");
      setPasswordArray(res.data || []);
    } catch (error) {
      console.error("Failed to fetch passwords:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const showPassword = () => {
    passwordRef.current.type =
      passwordRef.current.type === "password" ? "text" : "password";
    ref.current.src =
      passwordRef.current.type === "password"
        ? "icons/eye.png"
        : "icons/hidden.png";
  };

  const savePassword = async () => {
    if (
      form.site.trim().length < 3 ||
      form.username.trim().length < 3 ||
      form.password.trim().length < 3
    ) {
      toast.error("⚠️ Min 3 characters required!", {
        containerId: "error-toast",
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }

    try {
      if (editMode) {
        await api.put(`/passwords/${editId}`, form);
        toast.success("✏️ Password Updated!", {
          containerId: "save-toast",
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
        setEditMode(false);
        setEditId(null);
      } else {
        const newPass = { ...form, id: uuidv4() };
        await api.post("/passwords", newPass);
        toast.success("✅ Password Saved!", {
          containerId: "save-toast",
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      }
      setForm({ site: "", username: "", password: "" });
      fetchPasswords();
    } catch (error) {
      console.error("Error saving/updating password:", error);
    }
  };

  const deletePassword = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this password?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#016630",
      cancelButtonColor: "#1d293d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/passwords/${id}`);
          Swal.fire({
            title: "Deleted!",
            text: "Your password has been deleted.",
            icon: "success",
            confirmButtonColor: "#016630",
          });
          fetchPasswords();
        } catch (error) {
          console.error("Error deleting password:", error);
        }
      }
    });
  };

  const editPassword = (id) => {
    const toEdit = passwordArray.find((i) => i.id === id);
    setForm({
      site: toEdit.site,
      username: toEdit.username,
      password: toEdit.password,
    });
    setEditMode(true);
    setEditId(id);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("📄 Copied to Clipboard!", {
      containerId: "copy-toast",
      position: "top-right",
      autoClose: 5000,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      savePassword();
    }
  };

  return (
    <>
      <ToastContainer containerId="copy-toast" />
      <ToastContainer containerId="save-toast" />
      <ToastContainer containerId="error-toast" />

      <div className="fixed inset-0 -z-10 bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]" />

      <div className="container px-4 sm:px-8 md:px-20 lg:px-40 py-16 mx-auto">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center mb-6">
          Your own Password Manager
        </p>
        <div
          className="text-black flex flex-col p-4 gap-6 items-center"
          onKeyDown={handleKeyPress}
        >
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full px-4 py-2"
            type="text"
            name="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-6">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full px-4 py-2"
              type="text"
              name="username"
            />
            <div className="relative w-full">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full px-4 py-2 pr-10"
                type="password"
                name="password"
              />
              <span
                className="absolute right-2 top-2 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt="Show"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 border border-green-900 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            />
            {editMode ? "Update" : "Save"}
          </button>
        </div>

        <div className="passwords mt-10">
          <h2 className="font-bold text-xl py-4">Your Passwords</h2>

          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : passwordArray.length === 0 ? (
            <div className="text-center text-gray-600">
              No Passwords to Show
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full rounded-md overflow-hidden mb-8">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          <a href={item.site} target="_blank" rel="noreferrer">
                            {item.site}
                          </a>
                          <div
                            className="cursor-pointer"
                            onClick={() => copyText(item.site)}
                          >
                            <lord-icon
                              style={{ width: "22px", height: "22px" }}
                              src="https://cdn.lordicon.com/jectmwqf.json"
                              trigger="hover"
                              colors="primary:#121331,secondary:#0a5c15"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          <span>{item.username}</span>
                          <div
                            className="cursor-pointer"
                            onClick={() => copyText(item.username)}
                          >
                            <lord-icon
                              style={{ width: "22px", height: "22px" }}
                              src="https://cdn.lordicon.com/jectmwqf.json"
                              trigger="hover"
                              colors="primary:#121331,secondary:#0a5c15"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          <span>{item.password}</span>
                          <div
                            className="cursor-pointer"
                            onClick={() => copyText(item.password)}
                          >
                            <lord-icon
                              style={{ width: "22px", height: "22px" }}
                              src="https://cdn.lordicon.com/jectmwqf.json"
                              trigger="hover"
                              colors="primary:#121331,secondary:#0a5c15"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => editPassword(item.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/qawxkplz.json"
                            trigger="hover"
                            style={{ width: "22px", height: "22px" }}
                          />
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => deletePassword(item.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/xyfswyxf.json"
                            trigger="hover"
                            style={{ width: "22px", height: "22px" }}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
