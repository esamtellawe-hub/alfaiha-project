import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardHeader, CardBody, CardTitle,
  Row, Col, Table, Button, Form, FormGroup, Input, Label,
  Modal, ModalHeader, ModalBody, ModalFooter, Badge
} from "reactstrap";

const API = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api`;
const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });
const EMPTY = {
  title_en: "", title_ar: "", title_fr: "",
  description_en: "", description_ar: "", description_fr: "",
  location_en: "", location_ar: "",
  type: "Full Time", is_active: true, deadline: ""
};

function AdminJobs() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState(false);
  const [delId, setDelId] = useState(null);
  const [msg, setMsg] = useState("");

  const toast = (t) => { setMsg(t); setTimeout(() => setMsg(""), 4000); };
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const load = async () => {
    try { const r = await axios.get(`${API}/admin/jobs`, { headers: getHeaders() }); setItems(r.data); }
    catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      if (editId) await axios.put(`${API}/admin/jobs/${editId}`, form, { headers: getHeaders() });
      else await axios.post(`${API}/admin/jobs`, form, { headers: getHeaders() });
      setModal(false); setForm(EMPTY); setEditId(null); load(); toast(editId ? "Updated!" : "Added!");
    } catch (e) { toast("Error: " + (e.response?.data?.error || e.message)); }
  };

  const del = async () => {
    try { await axios.delete(`${API}/admin/jobs/${delId}`, { headers: getHeaders() }); setDelId(null); load(); toast("Deleted!"); }
    catch (e) { toast("Error deleting"); }
  };

  const edit = (item) => {
    setForm({
      ...EMPTY,
      title_en: item.title_en || "",
      title_ar: item.title_ar || "",
      title_fr: item.title_fr || "",
      description_en: item.description_en || "",
      description_ar: item.description_ar || "",
      description_fr: item.description_fr || "",
      location_en: item.location_en || "",
      location_ar: item.location_ar || "",
      type: item.type || "Full Time",
      is_active: item.is_active ?? true,
      deadline: item.deadline || "",
    });
    setEditId(item.id);
    setModal(true);
  };
  const add  = () => { setForm(EMPTY); setEditId(null); setModal(true); };

  const expired = (d) => d && new Date(d) < new Date();

  return (
    <div className="content">
      {msg && <div className="alert alert-info">{msg}</div>}
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <CardTitle tag="h4">Job Postings (Careers)</CardTitle>
              <Button color="primary" onClick={add}>+ Add Job</Button>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr><th>#</th><th>Title (EN)</th><th>Type</th><th>Location</th><th>Deadline</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {items.map((a, i) => (
                    <tr key={a.id}>
                      <td>{i+1}</td>
                      <td>{a.title_en}</td>
                      <td><Badge color="primary">{a.type}</Badge></td>
                      <td>{a.location_en || "—"}</td>
                      <td style={{ color: expired(a.deadline) ? "red" : "inherit" }}>{a.deadline || "—"}</td>
                      <td><Badge color={a.is_active ? "success" : "secondary"}>{a.is_active ? "Active" : "Inactive"}</Badge></td>
                      <td>
                        <Button size="sm" color="warning" className="mr-1" onClick={() => edit(a)}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => setDelId(a.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                  {!items.length && <tr><td colSpan="7" className="text-center">No job postings yet</td></tr>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Modal */}
      <Modal isOpen={modal} toggle={() => setModal(false)} size="xl">
        <ModalHeader toggle={() => setModal(false)}>{editId ? "Edit Job" : "Add New Job"}</ModalHeader>
        <Form onSubmit={save}>
          <ModalBody>
            {/* Title Row */}
            <h6 className="text-muted mb-2 border-bottom pb-1">Job Title</h6>
            <Row>
              <Col md="4"><FormGroup><Label>Title (EN) *</Label><Input required value={form.title_en} onChange={f("title_en")} placeholder="Senior Engineer" /></FormGroup></Col>
              <Col md="4"><FormGroup><Label>Title (AR)</Label><Input value={form.title_ar} onChange={f("title_ar")} dir="rtl" placeholder="مهندس أول" /></FormGroup></Col>
              <Col md="4"><FormGroup><Label>Title (FR)</Label><Input value={form.title_fr} onChange={f("title_fr")} placeholder="Ingénieur Senior" /></FormGroup></Col>
            </Row>

            {/* Meta Row */}
            <h6 className="text-muted mb-2 border-bottom pb-1 mt-2">Details</h6>
            <Row>
              <Col md="4"><FormGroup><Label>Location (EN)</Label><Input value={form.location_en} onChange={f("location_en")} placeholder="Amman, Jordan" /></FormGroup></Col>
              <Col md="4"><FormGroup><Label>Location (AR)</Label><Input value={form.location_ar} onChange={f("location_ar")} dir="rtl" placeholder="عمّان، الأردن" /></FormGroup></Col>
              <Col md="2"><FormGroup><Label>Type</Label>
                <Input type="select" value={form.type} onChange={f("type")}>
                  <option>Full Time</option><option>Part Time</option><option>Contract</option><option>Internship</option>
                </Input>
              </FormGroup></Col>
              <Col md="2"><FormGroup><Label>Deadline</Label><Input type="date" value={form.deadline} onChange={f("deadline")} /></FormGroup></Col>
            </Row>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Status</Label>
                  <Input type="select" value={form.is_active} onChange={e => setForm({...form, is_active: e.target.value === "true"})}>
                    <option value="true">Active (Visible)</option>
                    <option value="false">Inactive (Hidden)</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            {/* Description Row */}
            <h6 className="text-muted mb-2 border-bottom pb-1 mt-2">Job Description</h6>
            <Row>
              <Col md="4"><FormGroup><Label>Description (EN)</Label><Input type="textarea" rows="7" value={form.description_en} onChange={f("description_en")} /></FormGroup></Col>
              <Col md="4"><FormGroup><Label>Description (AR)</Label><Input type="textarea" rows="7" value={form.description_ar} onChange={f("description_ar")} dir="rtl" /></FormGroup></Col>
              <Col md="4"><FormGroup><Label>Description (FR)</Label><Input type="textarea" rows="7" value={form.description_fr} onChange={f("description_fr")} /></FormGroup></Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">{editId ? "Update Job" : "Add Job"}</Button>
            <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!delId} toggle={() => setDelId(null)}>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this job posting? This cannot be undone.</ModalBody>
        <ModalFooter><Button color="danger" onClick={del}>Delete</Button><Button color="secondary" onClick={() => setDelId(null)}>Cancel</Button></ModalFooter>
      </Modal>
    </div>
  );
}

export default AdminJobs;


