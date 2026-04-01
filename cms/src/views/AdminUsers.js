import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardHeader, CardBody, CardTitle,
  Row, Col, Table, Button, Form, FormGroup, Input,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

const API = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api`;
const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

const EMPTY_USER = {
  username: "", email: "", password: "", role: "admin", is_active: true
};

function AdminUsers() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY_USER);
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState(false);
  const [delId, setDelId] = useState(null);
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const toast = (t, isError = false) => { 
    if (isError) {
      setErrorMsg(t);
      setTimeout(() => setErrorMsg(""), 5000);
    } else {
      setMsg(t); 
      setTimeout(() => setMsg(""), 4000); 
    }
  };
  
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const load = async () => {
    try {
      const res = await axios.get(`${API}/admin/users`, { headers: getHeaders() });
      setItems(res.data);
    } catch (e) {
      console.error(e);
      if (e.response?.status === 403) {
        toast("Access Denied: Only Super Admins can manage users.", true);
      }
    }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      if (editId) {
        if (!payload.password) delete payload.password; // Don't send empty password on update
        await axios.put(`${API}/admin/users/${editId}`, payload, { headers: getHeaders() });
      } else {
        await axios.post(`${API}/admin/users`, payload, { headers: getHeaders() });
      }
      setModal(false); 
      setForm(EMPTY_USER); 
      setEditId(null); 
      load(); 
      toast(editId ? "User Updated!" : "User Added!");
    } catch (e) { toast("Error: " + (e.response?.data?.error || e.message), true); }
  };

  const del = async () => {
    try { 
      await axios.delete(`${API}/admin/users/${delId}`, { headers: getHeaders() }); 
      setDelId(null); 
      load(); 
      toast("User Deleted!"); 
    } catch (e) { toast("Error: " + (e.response?.data?.error || e.message), true); setDelId(null); }
  };

  const edit = (item) => { 
    setForm({ ...item, password: "" }); 
    setEditId(item.id); 
    setModal(true); 
  };
  
  const add = () => { setForm(EMPTY_USER); setEditId(null); setModal(true); };

  // Check if current user is super admin based on local storage (or token). 
  // The API already enforces it, but we can hide the UI if we know it.
  const userStr = localStorage.getItem("user");
  const currentUser = userStr ? JSON.parse(userStr) : null;
  const isSuperAdmin = currentUser?.role === 'super_admin';

  if (!isSuperAdmin) {
    return (
      <div className="content">
        <Row><Col md="12">
          <Card>
            <CardBody className="text-center py-5">
              <h3 className="text-danger">Access Denied</h3>
              <p>Only Super Admins can access the User Management dashboard.</p>
            </CardBody>
          </Card>
        </Col></Row>
      </div>
    );
  }

  return (
    <div className="content">
      {msg && <div className="alert alert-success">{msg}</div>}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <CardTitle tag="h4">System Users Management</CardTitle>
              <Button color="primary" onClick={add}>+ Add New User</Button>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((a) => (
                    <tr key={a.id}>
                      <td>{a.username}</td>
                      <td>{a.email}</td>
                      <td>
                        <span className={`badge ${a.role === 'super_admin' ? 'badge-danger' : 'badge-info'}`}>
                          {a.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                        </span>
                      </td>
                      <td>
                        {a.is_active ? 
                          <span className="text-success font-weight-bold">● Active</span> : 
                          <span className="text-danger">Inactive</span>
                        }
                      </td>
                      <td>
                        <Button size="sm" color="warning" className="mr-2" onClick={() => edit(a)}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => setDelId(a.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                  {!items.length && <tr><td colSpan="5" className="text-center">No users found.</td></tr>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={() => setModal(false)}>
        <ModalHeader toggle={() => setModal(false)}>{editId ? "Edit User" : "Add New User"}</ModalHeader>
        <Form onSubmit={save}>
          <ModalBody>
            <FormGroup>
              <label>Username *</label>
              <Input required value={form.username} onChange={f("username")} />
            </FormGroup>
            <FormGroup>
              <label>Email Address *</label>
              <Input type="email" required value={form.email} onChange={f("email")} />
            </FormGroup>
            <FormGroup>
              <label>{editId ? "Password (leave blank to keep current)" : "Password *"}</label>
              <Input 
                type="password" 
                required={!editId} 
                value={form.password} 
                onChange={f("password")} 
                placeholder="Enter password"
              />
            </FormGroup>
            <FormGroup>
              <label>Role</label>
              <Input type="select" value={form.role} onChange={f("role")}>
                <option value="admin">Admin (Manage Content)</option>
                <option value="super_admin">Super Admin (Manage Content + Users)</option>
              </Input>
            </FormGroup>
            
            {editId && (
              <FormGroup check className="mt-3">
                <label check>
                  <Input type="checkbox" checked={form.is_active} onChange={f("is_active")} />{" "}
                  Account is Active
                </label>
              </FormGroup>
            )}

          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">{editId ? "Update" : "Create"}</Button>
            <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Modal isOpen={!!delId} toggle={() => setDelId(null)}>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this user? This action cannot be undone.</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={del}>Yes, Delete</Button>
          <Button color="secondary" onClick={() => setDelId(null)}>Cancel</Button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default AdminUsers;

