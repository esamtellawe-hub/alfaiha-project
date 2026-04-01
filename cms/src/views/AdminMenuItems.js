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
  key: "", label_en: "", label_ar: "", label_fr: "",
  path: "", type: "link", order: 0, parent_id: "", 
  columns: 1, description_en: "", description_ar: "", description_fr: "", is_active: true 
};

function AdminMenuItems() {
  const [hierarchical, setHierarchical] = useState([]);
  const [flat, setFlat] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState(false);
  const [delId, setDelId] = useState(null);
  const [msg, setMsg] = useState("");

  const toast = (t) => { setMsg(t); setTimeout(() => setMsg(""), 4000); };
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const load = async () => {
    try { 
      const r = await axios.get(`${API}/admin/menu-items`, { headers: getHeaders() }); 
      setHierarchical(r.data.hierarchical); 
      setFlat(r.data.flat);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      if (!payload.parent_id) payload.parent_id = null;
      if (editId) await axios.put(`${API}/admin/menu-items/${editId}`, payload, { headers: getHeaders() });
      else await axios.post(`${API}/admin/menu-items`, payload, { headers: getHeaders() });
      setModal(false); setForm(EMPTY); setEditId(null); load(); toast(editId ? "Updated!" : "Added!");
    } catch (e) { toast("Error: " + (e.response?.data?.error || e.message)); }
  };

  const del = async () => {
    try { await axios.delete(`${API}/admin/menu-items/${delId}`, { headers: getHeaders() }); setDelId(null); load(); toast("Deleted!"); }
    catch (e) { toast("Error deleting"); }
  };

  const edit = (item) => { setForm({ ...item, parent_id: item.parent_id || "" }); setEditId(item.id); setModal(true); };
  const add = (parentId = "") => { setForm({...EMPTY, parent_id: parentId}); setEditId(null); setModal(true); };

  const renderRows = (items, depth = 0) => {
    return items.map((a) => (
      <React.Fragment key={a.id}>
        <tr style={{ backgroundColor: depth === 0 ? '#fcfcfc' : '#fff' }}>
          <td style={{ paddingLeft: `${(depth * 30) + 15}px`, fontWeight: depth === 0 ? 'bold' : 'normal' }}>
            {depth > 0 && "↳ "}{a.label_en} {a.label_ar && `| ${a.label_ar}`}
          </td>
          <td><span className="badge badge-info">{a.type}</span></td>
          <td>{a.path || "—"}</td>
          <td>{a.order}</td>
          <td><span className={`badge badge-${a.is_active ? "success" : "secondary"}`}>{a.is_active ? "Active" : "Inactive"}</span></td>
          <td>
            {depth === 0 && <Button size="sm" color="info" className="mr-1" onClick={() => add(a.id)}>+ Child</Button>}
            <Button size="sm" color="warning" className="mr-1" onClick={() => edit(a)}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => setDelId(a.id)}>Delete</Button>
          </td>
        </tr>
        {a.children && a.children.length > 0 && renderRows(a.children, depth + 1)}
      </React.Fragment>
    ));
  };

  return (
    <div className="content">
      {msg && <div className="alert alert-info">{msg}</div>}
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <CardTitle tag="h4">Header / Navigation Menu</CardTitle>
              <Button color="primary" onClick={() => add("")}>+ Add Main Link</Button>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr><th>Label (EN | AR)</th><th>Type</th><th>Route Path</th><th>Order</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {renderRows(hierarchical)}
                  {!hierarchical.length && <tr><td colSpan="6" className="text-center">No menu items yet</td></tr>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={() => setModal(false)} size="lg">
        <ModalHeader toggle={() => setModal(false)}>{editId ? "Edit Link" : "Add Link"}</ModalHeader>
        <Form onSubmit={save}>
          <ModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Row>
              <Col md="4"><FormGroup><label>Label (EN) *</label><Input required value={form.label_en} onChange={f("label_en")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Label (AR) *</label><Input required value={form.label_ar} onChange={f("label_ar")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Label (FR)</label><Input value={form.label_fr} onChange={f("label_fr")} /></FormGroup></Col>

              <Col md="4"><FormGroup><label>Menu Type</label>
                <Input type="select" value={form.type} onChange={f("type")}>
                  <option value="link">Standard Link</option>
                  <option value="dropdown">Dropdown Folder</option>
                  <option value="mega">Mega Menu</option>
                </Input>
              </FormGroup></Col>

              <Col md="4"><FormGroup><label>Route Path</label><Input value={form.path} onChange={f("path")} placeholder="/about" /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Unique Key</label><Input value={form.key} onChange={f("key")} placeholder="e.g. sectors" /></FormGroup></Col>

              <Col md="6"><FormGroup><label>Parent Item (For child links)</label>
                <Input type="select" value={form.parent_id} onChange={f("parent_id")}>
                  <option value="">-- None (Top Level) --</option>
                  {flat.filter(item => item.id !== editId && !item.parent_id).map(item => (
                    <option key={item.id} value={item.id}>{item.label_en} ({item.type})</option>
                  ))}
                </Input>
              </FormGroup></Col>
              
              <Col md="3"><FormGroup><label>Order/Position</label><Input type="number" value={form.order} onChange={f("order")} /></FormGroup></Col>
              <Col md="3"><FormGroup><label>Status</label>
                <Input type="select" value={form.is_active} onChange={e => setForm({...form, is_active: e.target.value === "true"})}>
                  <option value="true">Active</option><option value="false">Inactive</option>
                </Input>
              </FormGroup></Col>

              {form.type === 'mega' && (
                <>
                  <Col md="12"><h6 className="mt-3">Mega Menu Options</h6></Col>
                  <Col md="4"><FormGroup><label>Number of Columns</label><Input type="number" value={form.columns} onChange={f("columns")} /></FormGroup></Col>
                </>
              )}

              <Col md="12"><h6 className="mt-3">Optional Description (For Dropdowns/Mega links)</h6></Col>
              <Col md="4"><FormGroup><label>Description (EN)</label><Input type="textarea" rows="2" value={form.description_en} onChange={f("description_en")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Description (AR)</label><Input type="textarea" rows="2" value={form.description_ar} onChange={f("description_ar")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Description (FR)</label><Input type="textarea" rows="2" value={form.description_fr} onChange={f("description_fr")} /></FormGroup></Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">{editId ? "Update" : "Add"}</Button>
            <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Modal isOpen={!!delId} toggle={() => setDelId(null)}>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this menu item and all its children?</ModalBody>
        <ModalFooter><Button color="danger" onClick={del}>Delete</Button><Button color="secondary" onClick={() => setDelId(null)}>Cancel</Button></ModalFooter>
      </Modal>
    </div>
  );
}

export default AdminMenuItems;

