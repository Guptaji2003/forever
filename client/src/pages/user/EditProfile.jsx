import React, { useState } from 'react'

const EditProfile = () => {
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 890",
        address: "123 Street, City, Country",
      });
    
      const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated User Data:", user);
      };
    
      return (
        <div className="h-screen w-300 flex items-center justify-center bg-gray-100">
          <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-600 block mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={user.name} 
                  onChange={handleChange} 
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={user.email} 
                  onChange={handleChange} 
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Phone</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={user.phone} 
                  onChange={handleChange} 
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={user.address} 
                  onChange={handleChange} 
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      );
}

export default EditProfile
