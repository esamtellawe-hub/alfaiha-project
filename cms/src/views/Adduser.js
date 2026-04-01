import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

function AddUpdateUser() {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [updateUser, setUpdateUser] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [users, setUsers] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [roleError, setRoleError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [addUserSuccessMessage, setAddUserSuccessMessage] = useState("");
  const [updateUserSuccessMessage, setUpdateUserSuccessMessage] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);



  // Function to check if an email exists in the database
  // const checkEmailExists = async (email) => {
  //   try {
  //     const response = await axios.get(`https://digitalback.we-demo.xyz/admin/check-email/${email}`);
  //     if (response.data.exists) {
  //       setEmailExists(true);
  //       setEmailErrorMessage("Email already exists in the database");
  //     } else {
  //       setEmailExists(false);
  //       setEmailErrorMessage("");
  //     }
  //   } catch (error) {
  //     console.error("Error checking email existence:", error);
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (showUpdateForm) {
      setUpdateUser({ ...updateUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
    // if (name === "email") {
    //   if (value && validateEmail(value)) {
    //     // Check if the email exists in the database
    //     checkEmailExists(value);
    //   } else {
    //     // Clear the email existence state and error message
    //     setEmailExists(false);
    //     setEmailErrorMessage("");
    //   }
    // }
    if (name === "role") {
      if (value === "standard" || value === "admin ") {
        // Clear the role error if the role is either standard or admin 
        setRoleError("");
        setEmailError("");
        setPasswordError("");
      } else {
        setRoleError("Role must be either standard or admin ");
        setEmailError("");
        setPasswordError("");
        return;
      }
    }
  };

  const validateEmail = (email) => {
    // Basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    // Password pattern: At least 8 characters, starting with a capital letter, and containing at least one number
    const passwordPattern = /^(?=[A-Z])(?=.*\d).{8,}$/;
    return passwordPattern.test(password);
  };

  const fetchDataForAddUser = async () => {
    try {
      // Fetch data for the Add User table
      const response = await axios.get("https://back.zubilaw.com/admin/signup");
      setUsers(response.data);
    } catch (error) {
      console.error(`Error getting user data for Add User: ${error}`);
    }
  };

  const fetchDataForUsers = async () => {
    try {
      const response = await axios.get("https://back.zubilaw.com/admin/list");
      console.log("API Response:", response.data); // Log the response data
  
      // Since the response itself is the array of users
      if (Array.isArray(response.data)) {
        const filteredUsers = response.data.map(({ id, email, role }) => ({ id, email, role }));
        setUsers(filteredUsers);
      } else {
        console.error("Unexpected response format:", response.data);
        setUsers([]); // Set to empty array or handle appropriately
      }
    } catch (error) {
      console.error("Error getting user data:", error);
      setUsers([]); // Set to empty array in case of an error
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password, role } = showUpdateForm ? updateUser : newUser;
    if (emailExists) {
      // Display the email error message if the email exists
      return;
    }
  
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }
  
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long, start with a capital letter, and contain at least one number");
      return;
    }
  
    if (role !== "admin" && role !== "standard") {
      setRoleError("Role must be either 'admin' or 'standard'");
      return;
    }
  
    // Clear the email and password errors if they are valid
    setEmailError("");
    setPasswordError("");
    setRoleError("");
  
    try {
      let response;
      if (showUpdateForm) {
        // Update user
        response = await axios.put(
          `https://back.zubilaw.com/admin/update/${selectedUserId}`,
          updateUser
        );
        if (response.status === 200) {
          console.log("User updated successfully:", response.data);
          setUpdateUserSuccessMessage("User updated successfully");
        } else {
          console.error("Update request failed with status:", response.status);
        }
      } else {
        // Add user
        response = await axios.post("https://back.zubilaw.com/admin/signup", newUser);
        if (response.status === 200) {
          console.log("User added successfully:", response.data);
          setAddUserSuccessMessage("User added successfully");
          setNewUser({
            email: "",
            password: "",
            role: "",
          });
        } else {
          console.error("Add request failed with status:", response.status);
        }
      }
  
      setTimeout(() => {
        setAddUserSuccessMessage("");
        setUpdateUserSuccessMessage("");
      }, 5000);
  
      fetchDataForUsers(); // Refresh the user list
    } catch (error) {
      console.error(showUpdateForm ? "Error updating user:" : "Error adding user:", error);
      // Display a specific error message based on the context
      if (error.response && error.response.data) {
        const errorMsg = error.response.data.message || "An error occurred.";
        setEmailError(showUpdateForm ? "" : errorMsg);
        setRoleError(errorMsg);
      }
    }
  }

  const handleUpdate = (user) => {
    setSelectedUserId(user.id);
    setUpdateUser({
      email: user.email,
      password: user.password,
      role: user.role,
    });
    setShowUpdateForm(true);

  };

  const handleDelete = (userId) => {
    setDeleteUserId(userId);
    setShowDeletePopup(true);
  };
  
  const performDelete = async () => {
    try {
      const response = await axios.delete(`https://back.zubilaw.com/admin/delete/${deleteUserId}`);
      if (response.status === 200) {
        console.log("User deleted successfully");
        fetchDataForUsers();
      } else {
        console.error("Delete request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    setShowDeletePopup(false);
  };
  

  useEffect(() => {
    // Initial fetch for the Update User table
    fetchDataForUsers();
  }, []);

  useEffect(() => {
    if (showUpdateForm) {
      // Focus on the email input field when the update form is visible
      const emailInputField = document.getElementById('updateUserEmail');
      if (emailInputField) {
        emailInputField.focus();
      }
    }
  }, [showUpdateForm]);

  return (
<div className="content">
          <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            type="text"
            name="email"
            id="email"
            value={ newUser.email}
            onChange={handleInputChange}
            required
          />
      {emailError && <span className="error">{emailError}</span>}
      {emailExists && <span className="error">{emailErrorMessage}</span>}
      {emailExists && (
    <span className="error">
      Email already exists in the database
    </span>
  )}
        </FormGroup>
        <FormGroup>
          <Label for="password">Password:</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={ newUser.password}
            onChange={handleInputChange}
            required
          />
                      {passwordError && <span className="error">{passwordError}</span>}

        </FormGroup>
        <FormGroup>
          <Label for="role">Role:</Label>
          <Input
            type="text"
            name="role"
            id="role"
            value={ newUser.role}
            onChange={handleInputChange}
            required
          />
         {roleError && <span className="error">{roleError}</span>}

        </FormGroup>
        <Button color="primary" type="submit">
  {showUpdateForm ? "Update User" : "Add User"}
</Button>

{addUserSuccessMessage && (
    <div className="alert alert-success" role="alert" style={{ width: '50%', margin: '10px auto', textAlign: 'center'  }}>
      {addUserSuccessMessage}
    </div>
  )}
      </Form>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">User List</CardTitle>
        </CardHeader>
        <CardBody>
        <Table responsive>
  <thead className="text-primary">
    <tr>
      <th>Email</th>
      <th>Role</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map(user => (
      <tr key={user.id}>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
          <Button color="success" onClick={() => handleUpdate(user)}>Update</Button>{" "}
          <Button color="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>

        </CardBody>
      </Card>

      {showUpdateForm && (
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Update User</CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email">Email:</Label>
                <Input
                  type="text"
                  name="email"
                  id="updateUserEmail"
                  value={updateUser.email}
                  onChange={handleInputChange}
                  required
                />
         {emailError && <span className="error">{emailError}</span>}
      {emailExists && <span className="error">{emailErrorMessage}</span>}
      {emailExists && (
    <span className="error">
      Email already exists in the database
    </span>
  )}
              </FormGroup>
              <FormGroup>
                <Label for="password">Password:</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                 
                  onChange={handleInputChange}
                  required
                />
                                      {passwordError && <span className="error">{passwordError}</span>}

              </FormGroup>
              <FormGroup>
                <Label for="role">Role:</Label>
                <Input
                  type="text"
                  name="role"
                  id="role"
                  value={updateUser.role}
                  onChange={handleInputChange}
                  required
                />
                         {roleError && <span className="error">{roleError}</span>}

              </FormGroup>
              
              <Button color="primary" type="submit">
                Update User
              </Button>{" "}
              <Button 
              color="secondary" 
              type="button" 
              onClick={() => {
                setShowUpdateForm(false);
                setSelectedUserId(null);
                setUpdateUser({
                  email: "",
                  password: "",
                  role: "",
                });
                setEmailError("");
                setPasswordError("");
                setRoleError("");
              }}
            >
            Cancel
          </Button>
          {updateUserSuccessMessage && (
        <div className="alert alert-success" role="alert" style={{ width: '50%', margin: '10px auto', textAlign: 'center'  }}>
          {updateUserSuccessMessage}
        </div>
      )}
            </Form>
          </CardBody>
        </Card>
      )}
      <Modal isOpen={showDeletePopup} toggle={() => setShowDeletePopup(false)}>
  <ModalHeader toggle={() => setShowDeletePopup(false)}>Confirm Delete</ModalHeader>
  <ModalBody>
    Are you sure you want to delete this user?
  </ModalBody>
  <ModalFooter>
    <Button color="danger" onClick={() => performDelete()}>Delete</Button>{' '}
    <Button color="secondary" onClick={() => setShowDeletePopup(false)}>Cancel</Button>
  </ModalFooter>
</Modal>
    </div>
  );
}

export default AddUpdateUser;

