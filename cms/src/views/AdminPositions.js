import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardHeader, CardBody, CardTitle,
  Row, Col, Table, Button, Form, FormGroup, Input,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

const API = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api`;
const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });
const EMPTY = { name_en: "", name_ar: "", name_fr: "", order: 0, is_active: true };

function AdminPositions() {
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
      const r = await axios.get(`${API}/admin/positions`, { headers: getHeaders() });
      setItems(r.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API}/admin/positions/${editId}`, form, { headers: getHeaders() });
      } else {
        await axios.post(`${API}/admin/positions`, form, { headers: getHeaders() });
      }
      setModal(false); setForm(EMPTY); setEditId(null); load();
      toast(editId ? "Updated!" : "Added!");
    } catch (err) { toast("Error: " + (err.response?.data?.error || err.message)); }
  };

  const del = async () => {
    try {
      await axios.delete(`${API}/admin/positions/${delId}`, { headers: getHeaders() });
      setDelId(null); load(); toast("Deleted!");
    } catch (e) { toast("Error deleting"); }
  };

  const edit = (item) => { setForm({ ...EMPTY, ...item }); setEditId(item.id); setModal(true); };
  const add  = () => { setForm(EMPTY); setEditId(null); setModal(true); };

  return (
    <div className="content">
      {msg && <div className="alert alert-info">{msg}</div>}
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <div>
                <CardTitle tag="h4">Application Form Positions</CardTitle>
                <p className="text-muted mb-0">These positions appear in the "Position Applied For" dropdown on the job application form.</p>
              </div>
              <Button color="primary" onClick={add}>+ Add Position</Button>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr><th>#</th><th>Position (EN)</th><th>Position (AR)</th><th>Order</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {items.map((p, i) => (
                    <tr key={p.id}>
                      <td>{i + 1}</td>
                      <td><strong>{p.name_en}</strong></td>
                      <td dir="rtl">{p.name_ar || "—"}</td>
                      <td>{p.order}</td>
                      <td><span className={`badge badge-${p.is_active ? "success" : "secondary"}`}>{p.is_active ? "Active" : "Hidden"}</span></td>
                      <td>
                        <Button size="sm" color="warning" className="mr-1" onClick={() => edit(p)}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => setDelId(p.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                  {!items.length && <tr><td colSpan="6" className="text-center">No positions yet. Click "+ Add Position" to start.</td></tr>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Modal */}
      <Modal isOpen={modal} toggle={() => setModal(false)}>
        <ModalHeader toggle={() => setModal(false)}>{editId ? "Edit Position" : "Add Position"}</ModalHeader>
        <Form onSubmit={save}>
          <ModalBody>
            <FormGroup>
              <label>Position Name (EN) *</label>
              <Input required value={form.name_en} onChange={f("name_en")} placeholder="e.g. Senior Engineer" />
            </FormGroup>
            <FormGroup>
              <label>Position Name (AR)</label>
              <Input value={form.name_ar} onChange={f("name_ar")} dir="rtl" placeholder="مثال: مهندس أول" />
            </FormGroup>
            <FormGroup>
              <label>Position Name (FR)</label>
              <Input value={form.name_fr} onChange={f("name_fr")} placeholder="e.g. Ingénieur Senior" />
            </FormGroup>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label>Display Order</label>
                  <Input type="number" value={form.order} onChange={f("order")} />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label>Status</label>
                  <Input type="select" value={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.value === "true" })}>
                    <option value="true">Active (Visible)</option>
                    <option value="false">Hidden</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">{editId ? "Update" : "Add"}</Button>
            <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* Delete Confirm */}
      <Modal isOpen={!!delId} toggle={() => setDelId(null)}>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to remove this position?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={del}>Delete</Button>
          <Button color="secondary" onClick={() => setDelId(null)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AdminPositions;

