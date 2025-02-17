"use client";

import { useState } from "react";
import api from "../../utils/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Password matching validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("/api/accounts/register/company/", {
        "username": username,
        "password": password,
        "first_name": firstName,
        "last_name": lastName
      });

      setSuccessMessage("Registration successful! You can now log in.");
      setUsername("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="container align-items-center text-secondary">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="w-50">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="text-black"
            value={firstName}
            onChange={(e) => {setFirstName(e.target.value); e.preventDefault();}}
          />
          </div>
          <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="text-black"
            value={lastName}
            onChange={(e) => {setLastName(e.target.value); e.preventDefault();}}
          />
          </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="text-black"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}
        <a href="/login" className="text-secondary"><u>Login</u></a>
        <button type="submit" className="btn btn-primary w-100 mt-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
