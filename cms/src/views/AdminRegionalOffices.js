import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardHeader, CardBody, CardTitle,
  Row, Col, Table, Button, Form, FormGroup, Input,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

const API = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api`;
const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });
const EMPTY = { 
  country_name_en: "", country_name_ar: "", country_name_fr: "", 
  country_code: "", phone: "", email: "", location_url: "", is_active: true 
};

function AdminRegionalOffices() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState(false);
  const [delId, setDelId] = useState(null);
  const [msg, setMsg] = useState("");

  const toast = (t) => { setMsg(t); setTimeout(() => setMsg(""), 4000); };
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const load = async () => {
    try { 
      const r = await axios.get(`${API}/admin/regional-offices`, { headers: getHeaders() }); 
      setItems(r.data); 
    } catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      if (editId) await axios.put(`${API}/admin/regional-offices/${editId}`, form, { headers: getHeaders() });
      else await axios.post(`${API}/admin/regional-offices`, form, { headers: getHeaders() });
      setModal(false); setForm(EMPTY); setEditId(null); load(); toast(editId ? "Updated!" : "Added!");
    } catch (e) { toast("Error: " + (e.response?.data?.error || e.message)); }
  };

  const del = async () => {
    try { await axios.delete(`${API}/admin/regional-offices/${delId}`, { headers: getHeaders() }); setDelId(null); load(); toast("Deleted!"); }
    catch (e) { toast("Error deleting"); }
  };

  const edit = (item) => { setForm(item); setEditId(item.id); setModal(true); };
  const add  = () => { setForm(EMPTY); setEditId(null); setModal(true); };

  return (
    <div className="content">
      {msg && <div className="alert alert-info">{msg}</div>}
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <CardTitle tag="h4">Regional Offices (Navbar Flags)</CardTitle>
              <Button color="primary" onClick={add}>+ Add Office</Button>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Flag</th>
                    <th>Country (EN | AR)</th>
                    <th>Code</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((a) => (
                    <tr key={a.id}>
                      <td>
                        <img 
                          src={`https://flagcdn.com/w40/${a.country_code}.png`} 
                          alt={a.country_code} 
                          title={a.country_code} 
                          style={{ width: '30px', borderRadius: '2px', border: '1px solid #ccc' }}
                        />
                      </td>
                      <td>{a.country_name_en} | {a.country_name_ar}</td>
                      <td>{a.country_code}</td>
                      <td>{a.phone || "—"}</td>
                      <td><span className={`badge badge-${a.is_active ? "success" : "secondary"}`}>{a.is_active ? "Active" : "Inactive"}</span></td>
                      <td>
                        <Button size="sm" color="warning" className="mr-1" onClick={() => edit(a)}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => setDelId(a.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                  {!items.length && <tr><td colSpan="6" className="text-center">No regional offices yet</td></tr>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={() => setModal(false)} size="lg">
        <ModalHeader toggle={() => setModal(false)}>{editId ? "Edit Office" : "Add Office"}</ModalHeader>
        <Form onSubmit={save}>
          <ModalBody>
            <Row>
              <Col md="4"><FormGroup><label>Country Name (EN) *</label><Input required value={form.country_name_en} onChange={f("country_name_en")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Country Name (AR) *</label><Input required value={form.country_name_ar} onChange={f("country_name_ar")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Country Name (FR) *</label><Input required value={form.country_name_fr} onChange={f("country_name_fr")} /></FormGroup></Col>
              
              <Col md="4"><FormGroup><label>ISO Code (e.g. jo, sa, ae) *</label><Input required value={form.country_code} onChange={f("country_code")} placeholder="jo" /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Phone Number</label><Input value={form.phone} onChange={f("phone")} placeholder="+962 6 ..." /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Email Template/Link</label><Input value={form.email} onChange={f("email")} placeholder="info@... | mailto:..." /></FormGroup></Col>
              
              <Col md="8"><FormGroup><label>Google Maps Link / Address URL</label><Input value={form.location_url} onChange={f("location_url")} placeholder="https://maps.google.com/..." /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Status</label>
                <Input type="select" value={form.is_active} onChange={e => setForm({...form, is_active: e.target.value === "true"})}>
                  <option value="true">Active (Shows in Navbar)</option>
                  <option value="false">Inactive (Hidden)</option>
                </Input>
              </FormGroup></Col>
            </Row>
            <p className="text-muted text-sm mt-3">
              Note: The ISO Code determines which flag is loaded from flagcdn.com. For example: 'jo' = Jordan, 'sa' = Saudi Arabia, 'iq' = Iraq.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">{editId ? "Update" : "Add"}</Button>
            <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Modal isOpen={!!delId} toggle={() => setDelId(null)}>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this regional office?</ModalBody>
        <ModalFooter><Button color="danger" onClick={del}>Delete</Button><Button color="secondary" onClick={() => setDelId(null)}>Cancel</Button></ModalFooter>
      </Modal>
    </div>
  );
}

export default AdminRegionalOffices;

