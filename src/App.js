import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserCard from "./components/AddModel/UserCard";

const App = () => {
  const URL = "https://jsonplaceholder.typicode.com/users";
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDLoading, setIsDLoading] = useState(false);
  const [submitType, setSubmitType] = useState("add");

  // Message Toster
  const showToastMessage = (text, type) => {
    type === "success"
      ? toast.success(text, {
          position: toast.POSITION.TOP_RIGHT,
        })
      : toast.error(text, {
          position: toast.POSITION.TOP_RIGHT,
        });
  };

  //Add Contact Function
  const addContact = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const data = { name: name, email: email, phone: mobile };

      //get response
      const res = await axios.post(URL, data);

      // insert data into user list
      setUsers((prev) => [res.data, ...prev]);
      setIsLoading(false);
      clearinputs();
      showToastMessage("Contact added Successfully!!", "success");
    } catch (error) {
      console.error("Error in Create contact: ", error);
      setIsLoading(false);
      showToastMessage("Error in Create contact!!", "error");
    }
  };

  //Edit Contact Function
  const updateContact = async (e) => {
    console.log(userId);
    setIsLoading(true);
    e.preventDefault();
    try {
      const data = { name: name, email: email, phone: mobile };
      await axios.put(`${URL}/${userId}`, data);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, ...data } : user
        )
      );
      setIsLoading(false);
      clearinputs();
      showToastMessage("Contact updated Successfully!!", "success");
    } catch (error) {
      console.error("Error updating contact:", error);
      setIsLoading(false);
      showToastMessage("Error updating contact !!", "error");
    }
  };

  //Delete Contact Function 
  const deleteContact = async (id) => {
     if (window.confirm("are you sure you want to delete?")) {
       try {
         await axios.delete(`${URL}/${id}`);
         setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
         showToastMessage("Contact deleted Successfully !!", "success");
       } catch (error) {
         showToastMessage("Error deleting contact !!", "error");
         console.error("Error deleting contact:", error);
       }
     }
  };

  //Clear All Inputs
  const clearinputs = () => {
    setName("");
    setEmail("");
    setMobile("");
    setSubmitType("add");
  };

  //get Api data
  const fetchUsers = async () => {
    setIsDLoading(true);
    try {
      const res = await axios.get(URL);
      await setUsers(res.data);
      showToastMessage("Users get Successfully !!", "success");
      setIsDLoading(false);
    } catch (error) {
      showToastMessage("Error in fetching users !!", "error");
      console.error("Error in fetching users: ", error);
      setIsDLoading(false);
    }
  };

  useEffect(() => {
    //get user list on page load
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <div className="main-div">
        <div className="add-form">
          <h3>{submitType === "add" ?"Add Contact" : "Update Contact"}</h3>
          <form onSubmit={submitType === "add" ? addContact : updateContact}>
            <div className="modal-body">
              <label htmlFor="name" className="form-label">
                Enter Contact Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Contact Name"
                name="contact-name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
              <label htmlFor="email" className="form-label">
                Enter Contact Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Contact Email"
                name="contact-email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <label htmlFor="mobile" className="form-label">
                Enter Contact Mobile
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Contact Mobile"
                name="contact-mobile"
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                required
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={clearinputs}
              >
                Clear
              </button>
              {isLoading ? (
                <button className="btn btn-pri" type="button">
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {submitType === "add" ? "Adding..." : "Updating..."}
                </button>
              ) : (
                <button type="submit" className="btn btn-pri">
                  {submitType === "add" ? "Add" : "Update"}
                </button>
              )}
            </div>
          </form>
        </div>
        <hr />
        <div className="user-list">
          {users.map((user) => (
            <UserCard
              user={user}
              setUserId={setUserId}
              setSubmitType={setSubmitType}
              formData={{ setName, setEmail, setMobile }}
              deleteContact={deleteContact}
              key={user.id}
            />
          ))}
          {isDLoading && (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
