import { useEffect, useState } from "react";
import { Link } from "react-router";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/get-contacts");
      const data = await response.json();
      setContacts(data);
    })();
  }, []);

  const deleteContact = async (id) => {
    const response = await fetch(`http://localhost:3000/delete-contact/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      setContacts(contacts.filter((contact) => contact._id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-center text-5xl font-bold my-8">All Contacts</h1>
      <Link to="/">
        <button className="mx-4 bg-purple-500 text-white w-fit rounded px-6 py-2 cursor-pointer hover:bg-purple-600 transition-colors">
          Add Contact
        </button>
      </Link>
      <div className="relative overflow-x-auto bg-blue-100 shadow-xs rounded border m-4">
        <table className="w-full text-left">
          <thead className="text-lg bg-blue-200 border-b rounded-base">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold">
                Name
              </th>
              <th scope="col" className="px-6 py-3 font-bold">
                Email
              </th>
              <th scope="col" className="px-6 py-3 font-bold">
                Phone
              </th>
              <th scope="col" className="px-6 py-3 font-bold">
                Message
              </th>
              <th scope="col" className="px-6 py-3 font-bold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr className="border-b" key={contact._id}>
                <th scope="row" className="px-6 py-4 font-medium">
                  {contact.name}
                </th>
                <td className="px-6 py-4">{contact.email}</td>
                <td className="px-6 py-4">{contact.phone}</td>
                <td className="px-6 py-4">{contact.message}</td>
                <td>
                  <button
                    onClick={() => deleteContact(contact._id)}
                    className="bg-red-500 text-white w-fit rounded px-6 py-2 cursor-pointer hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contacts;
