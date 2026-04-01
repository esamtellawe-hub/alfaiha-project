import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardHeader, CardBody, CardTitle,
  Row, Col, Table, Button, Form, FormGroup, Input, Label,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Nav, NavItem, NavLink, TabContent, TabPane
} from "reactstrap";
import Editor from 'react-simple-wysiwyg';

const API = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api`;
const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

const EMPTY = { 
  section_key: "",
  icon: "Leaf",
  order: 1,
  title_en: "", title_ar: "", title_fr: "",
  subtitle_en: "", subtitle_ar: "", subtitle_fr: "",
  body_en: "", body_ar: "", body_fr: "",
  is_active: true
};

const ICONS = ["Leaf", "Shield", "FlaskConical", "Heart", "Lightbulb", "CheckCircle2", "Award", "Users", "Zap", "Target"];

function AdminSustainabilitySections() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [activeTab, setActiveTab] = useState('EN');

  const toast = (t) => { setMsg(t); setTimeout(() => setMsg(""), 4000); };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const load = async () => {
    try { 
      const r = await axios.get(`${API}/admin/sustainability-sections`, { headers: getHeaders() }); 
      setItems(r.data); 
    } catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      if (editId) await axios.put(`${API}/admin/sustainability-sections/${editId}`, form, { headers: getHeaders() });
      else await axios.post(`${API}/admin/sustainability-sections`, form, { headers: getHeaders() });
      
      setModal(false); setForm(EMPTY); setEditId(null); load(); toast(editId ? "Updated!" : "Added!");
    } catch (e) { toast("Error: " + (e.response?.data?.error || e.message)); }
  };

  const edit = (item) => { 
    setForm({ 
      ...item, 
      title_en: item.title_en || "", title_ar: item.title_ar || "", title_fr: item.title_fr || "",
      subtitle_en: item.subtitle_en || "", subtitle_ar: item.subtitle_ar || "", subtitle_fr: item.subtitle_fr || "",
      body_en: item.body_en || "", body_ar: item.body_ar || "", body_fr: item.body_fr || "",
    }); 
    setEditId(item.id); 
    setActiveTab('EN');
    setModal(true); 
  };
  
  const add = () => { setForm(EMPTY); setEditId(null); setActiveTab('EN'); setModal(true); };
  const remove = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
        await axios.delete(`${API}/admin/sustainability-sections/${id}`, { headers: getHeaders() });
        load();
        toast("Deleted!");
    } catch(e) { toast("Error deleting!"); }
  }

  const renderLangTab = (lang, l) => (
    <TabPane tabId={lang}>
      <Row className="mt-3">
        <Col md="6">
          <FormGroup>
            <label>Title</label>
            <Input name={`title_${l}`} value={form[`title_${l}`]} onChange={handleInputChange} />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label>Subtitle (Red Tag)</label>
            <Input name={`subtitle_${l}`} value={form[`subtitle_${l}`]} onChange={handleInputChange} />
          </FormGroup>
        </Col>
        
        <Col md="12">
            <FormGroup>
                <label>Body Description</label>
                <Editor value={form[`body_${l}`]} onChange={e => setForm({...form, [`body_${l}`]: e.target.value})} />
            </FormGroup>
        </Col>
      </Row>
    </TabPane>
  );

  return (
    <div className="content">
      <Row><Col md="12">
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            <div>
              <CardTitle tag="h4">Sustainability Sections</CardTitle>
              <h6 className="text-muted">Manage the static sections showing on the Sustainability page (Add/Delete disabled to protect layout)</h6>
            </div>
          </CardHeader>
          {msg && <div className="alert alert-success mx-3">{msg}</div>}
          <CardBody>
            <Table responsive>
              <thead className="text-primary"><tr><th>Order</th><th>Key</th><th>Icon</th><th>Title (EN)</th><th>Active</th><th>Actions</th></tr></thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>{item.order}</td>
                    <td><span className="badge badge-info">{item.section_key}</span></td>
                    <td>{item.icon}</td>
                    <td>{item.title_en}</td>
                    <td>{item.is_active ? "Yes" : "No"}</td>
                    <td>
                      <Button color="warning" size="sm" onClick={() => edit(item)}>Edit Content</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col></Row>

      <Modal isOpen={modal} toggle={() => setModal(!modal)} size="lg">
        <ModalHeader toggle={() => setModal(!modal)}>{editId ? `Edit Section: ${form.section_key}` : 'Add New Section'}</ModalHeader>
        <Form onSubmit={save}>
          <ModalBody>
            
            <Row className="mb-4">
               <Col md="4">
                  <FormGroup>
                    <label>Unique Section Key (DO NOT EDIT)</label>
                    <Input name="section_key" value={form.section_key} readOnly disabled />
                  </FormGroup>
               </Col>
               <Col md="4">
                  <FormGroup>
                    <label>Display Icon</label>
                    <Input type="select" name="icon" value={form.icon || ""} onChange={handleInputChange}>
                       <option value="">None</option>
                       {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                    </Input>
                  </FormGroup>
               </Col>
               <Col md="2">
                  <FormGroup>
                    <label>Order</label>
                    <Input type="number" name="order" value={form.order} onChange={handleInputChange} />
                  </FormGroup>
               </Col>
               <Col md="2">
                  <FormGroup check className="mt-4">
                    <Label check>
                      <Input type="checkbox" name="is_active" checked={form.is_active} onChange={handleInputChange} />
                      <span className="form-check-sign"></span>
                      Visible
                    </Label>
                  </FormGroup>
               </Col>
            </Row>

            <Nav tabs>
              {['EN', 'AR', 'FR'].map(lang => (
                <NavItem key={lang}>
                  <NavLink className={activeTab === lang ? "active" : ""} onClick={() => setActiveTab(lang)} style={{ cursor: 'pointer' }}>
                    {lang}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <TabContent activeTab={activeTab}>
              {renderLangTab('EN', 'en')}
              {renderLangTab('AR', 'ar')}
              {renderLangTab('FR', 'fr')}
            </TabContent>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
            <Button color="primary" type="submit">Save Changes</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminSustainabilitySections;

