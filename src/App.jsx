import { useState } from "react";
import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const App = ({ backendLink }) => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(`${backendLink}/add-contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      if (response.status === 200) toast.success("Contact added successfully");
      else toast.error("Something went wrong");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setContact({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <ToastContainer position="bottom-left" />
      <div className="shadow-blue-950 shadow-2xl w-fit p-8 rounded-xl">
        <h1 className="text-center text-5xl font-bold mb-8">Contact Form</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-xs">
          <div className="flex justify-between items-center">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              value={contact.name}
              placeholder="Enter your name"
              required
              className="border p-2"
            />
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              value={contact.email}
              placeholder="example@email.com"
              className="border p-2"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              pattern="\+[0-9]{2}-[0-9]{10}"
              name="phone"
              onChange={handleInputChange}
              value={contact.phone}
              placeholder="+XX-XXXXXXXXXX"
              className="border p-2"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              onChange={handleInputChange}
              value={contact.message}
              placeholder="Enter your message"
              cols="23"
              rows="2"
              className="border p-2"
            ></textarea>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`${
                isLoading ? "bg-gray-500" : "bg-blue-500"
              } text-white w-fit rounded px-6 py-2 cursor-pointer ${
                !isLoading && "hover:bg-blue-600"
              } transition-colors`}
            >
              Submit
            </button>
            <Link to="contacts">
              <button className="bg-purple-500 text-white w-fit rounded px-6 py-2 cursor-pointer hover:bg-purple-600 transition-colors">
                Show All Contacts
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
