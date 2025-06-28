import React, { useState } from 'react';

const roles = [
  "doctor",
  "patient",
  "hospitalAdmin",
  "labAdmin",
  "assistant"
];

const SelectRole = () => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedRole) {
      alert("Please select a role");
      return;
    }

    console.log("Selected role:", selectedRole);

    // Call API to submit role here, for example:
    // await axios.patch('/api/auth/select-role', { role: selectedRole }, { withCredentials: true });

    // Redirect or show success message after success
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Select Your Role
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {roles.map((role) => (
            <label key={role} className="flex items-center space-x-3">
              <input
                type="radio"
                name="role"
                value={role}
                checked={selectedRole === role}
                onChange={() => setSelectedRole(role)}
                className="form-radio text-blue-600"
              />
              <span className="text-gray-700 capitalize">{role}</span>
            </label>
          ))}

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Confirm Role
          </button>
        </form>
      </div>
    </div>
  );
};

export default SelectRole;
