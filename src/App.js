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
  const [isLoading, setIsLoading] = useState(false);
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

  //Add Contuct Function
  const addContact = async (e) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      const data = { name: name, email: email, phone: mobile };

      //get response
      const res = await axios.post(URL, data);

      // insert data into user list
      setUsers((prev) => [res.data, ...prev]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error in Creati users: ", error);
      setIsLoading(false);
    }
  };

  //get Api data
  const fetchUsers = async () => {
    try {
      const res = await axios.get(URL);
      await setUsers(res.data);
      console.log(res);
      // showToastMessage("Users get Successfully !!", "success");
    } catch (error) {
      showToastMessage("Error in fetching users !!", "error");
      console.error("Error in fetching users: ", error);
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
          <form onSubmit={addContact}>
            <div className="modal-body">
              <label for="name" className="form-label">
                Enter Contact Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Contact Name"
                name="contact-name"
                onChange={(e) => setName(e.target.value)}
              />
              <label for="email" className="form-label">
                Enter Contact Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Contact Email"
                name="contact-email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="mobile" className="form-label">
                Enter Contact Mobile
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Contact Mobile"
                name="contact-mobile"
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {isLoading ? (
                <button class="btn btn-pri" type="button">
                  <span
                    class="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Adding...
                </button>
              ) : (
                <button type="submit" className="btn btn-pri">
                  Add
                </button>
              )}
            </div>
          </form>
        </div>
        <hr />
        <div className="user-list">
          {users.map((user) => (
            <UserCard user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
