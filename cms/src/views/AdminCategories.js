import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardHeader, CardBody, CardTitle,
  Row, Col, Table, Button, Form, FormGroup, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Nav, NavItem, NavLink, TabContent, TabPane
} from "reactstrap";

// Reusing Icon Selector if we have it, or just text input for now.
// I'll make it a text input for icon_name from Lucide.

const API = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api`;
const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

const EMPTY_CATEGORY = {
  slug: "", icon_name: "", parent_id: "",
  name_en: "", name_ar: "", name_fr: "",
  description_en: "", description_ar: "", description_fr: ""
};

function AdminCategories() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY_CATEGORY);
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState(false);
  const [delId, setDelId] = useState(null);
  const [msg, setMsg] = useState("");
  const [activeTab, setActiveTab] = useState("General");

  const toast = (t) => { setMsg(t); setTimeout(() => setMsg(""), 4000); };
  
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const load = async () => {
    try {
      const res = await axios.get(`${API}/admin/categories`, { headers: getHeaders() });
      setItems(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      if (!payload.parent_id) payload.parent_id = null;

      if (editId) await axios.put(`${API}/admin/categories/${editId}`, payload, { headers: getHeaders() });
      else await axios.post(`${API}/admin/categories`, payload, { headers: getHeaders() });
      setModal(false); setForm(EMPTY_CATEGORY); setEditId(null); load(); toast(editId ? "Updated!" : "Added!");
    } catch (e) { toast("Error: " + (e.response?.data?.error || e.message)); }
  };

  const del = async () => {
    try { await axios.delete(`${API}/admin/categories/${delId}`, { headers: getHeaders() }); setDelId(null); load(); toast("Deleted!"); }
    catch (e) { toast("Error deleting"); }
  };

  const edit = (item) => {
    setForm({
      ...item,
      parent_id: item.parent_id || ""
    });
    setEditId(item.id);
    setActiveTab("General");
    setModal(true);
  };

  const add = () => { setForm(EMPTY_CATEGORY); setEditId(null); setActiveTab("General"); setModal(true); };

  const renderLangTab = (lang) => {
    const l = lang.toLowerCase();
    return (
      <TabPane tabId={lang}>
        <Row className="mt-3">
          <Col md="12">
            <FormGroup>
              <label>Category Name ({lang}) *</label>
              <Input required={lang==='EN'} value={form[`name_${l}`] || ""} onChange={f(`name_${l}`)} />
            </FormGroup>
            <FormGroup>
              <label>Description ({lang})</label>
              <Input type="textarea" rows="4" value={form[`description_${l}`] || ""} onChange={f(`description_${l}`)} />
            </FormGroup>
          </Col>
        </Row>
      </TabPane>
    );
  };

  return (
    <div className="content">
      {msg && <div className="alert alert-info">{msg}</div>}
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <CardTitle tag="h4">Product Categories</CardTitle>
              <Button color="primary" onClick={add}>+ Add Category</Button>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Icon</th>
                    <th>Name (EN)</th>
                    <th>Slug</th>
                    <th>Parent Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((a) => (
                    <tr key={a.id}>
                      <td>{a.icon_name || "-"}</td>
                      <td>{a.name_en}</td>
                      <td>{a.slug}</td>
                      <td>{a.parent?.name_en || <span className="text-muted">None (Main)</span>}</td>
                      <td>
                        <Button size="sm" color="warning" className="mr-1" onClick={() => edit(a)}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => setDelId(a.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                  {!items.length && <tr><td colSpan="5" className="text-center">No categories found.</td></tr>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={() => setModal(false)} size="lg">
        <ModalHeader toggle={() => setModal(false)}>{editId ? "Edit Category" : "Add Category"}</ModalHeader>
        <Form onSubmit={save}>
          <ModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            
            <Nav tabs>
              {["General", "EN", "AR", "FR"].map(tabName => (
                <NavItem key={tabName}>
                  <NavLink
                    className={activeTab === tabName ? "active" : ""}
                    onClick={() => setActiveTab(tabName)}
                    style={{ cursor: 'pointer' }}
                  >
                    {tabName}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>

            <TabContent activeTab={activeTab} className="pt-3">
              <TabPane tabId="General">
                <Row>
                  <Col md="12">
                     {/* Parent selection must exclude self to prevent cyclic dependency */}
                    <FormGroup>
                      <label>Parent Category (Sub-category of)</label>
                      <Input type="select" value={form.parent_id} onChange={f("parent_id")}>
                        <option value="">-- Make this a Main Category --</option>
                        {items.filter(c => c.id !== editId).map(c => <option key={c.id} value={c.id}>{c.name_en}</option>)}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>Slug (URL friendly, unique) *</label>
                      <Input required value={form.slug} onChange={f("slug")} placeholder="e.g. concrete-admixtures" />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Icon Name (e.g. Beaker, Grid, Layers)</label>
                      <Input value={form.icon_name || ""} onChange={f("icon_name")} placeholder="Beaker" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <small className="text-muted">Common icons: Beaker, Grid, Layers, Hammer, PaintBucket, Droplets, FileText, Box</small>
                    </Col>
                </Row>
              </TabPane>

              {renderLangTab("EN")}
              {renderLangTab("AR")}
              {renderLangTab("FR")}
            </TabContent>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">{editId ? "Update Category" : "Create Category"}</Button>
            <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Modal isOpen={!!delId} toggle={() => setDelId(null)}>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this category? Make sure it has no sub-categories or products assigned to it.</ModalBody>
        <ModalFooter><Button color="danger" onClick={del}>Delete</Button><Button color="secondary" onClick={() => setDelId(null)}>Cancel</Button></ModalFooter>
      </Modal>
    </div>
  );
}

export default AdminCategories;

