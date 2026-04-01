import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardHeader, CardBody, CardTitle,
  Row, Col, Table, Button, Form, FormGroup, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Nav, NavItem, NavLink, TabContent, TabPane
} from "reactstrap";

const API = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api`;
const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

function AdminBlogSections() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [activeTab, setActiveTab] = useState('EN');

  const toast = (t) => { setMsg(t); setTimeout(() => setMsg(""), 4000); };

  const load = async () => {
    try {
      const r = await axios.get(`${API}/admin/blog-sections`, { headers: getHeaders() });
      setItems(r.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/admin/blog-sections/${editId}`, form, { headers: getHeaders() });
      setModal(false); setEditId(null); load(); toast("Updated successfully!");
    } catch (e) { toast("Error: " + (e.response?.data?.error || e.message)); }
  };

  const edit = (item) => {
    setForm({
      ...item,
      title_en: item.title_en || "", title_ar: item.title_ar || "", title_fr: item.title_fr || "",
      subtitle_en: item.subtitle_en || "", subtitle_ar: item.subtitle_ar || "", subtitle_fr: item.subtitle_fr || "",
      description_en: item.description_en || "", description_ar: item.description_ar || "", description_fr: item.description_fr || "",
    });
    setEditId(item.id);
    setActiveTab('EN');
    setModal(true);
  };

  const renderTab = (lang, l) => {
    if (!form) return null;
    return (
      <TabPane tabId={lang}>
        <Row className="mt-3">
          <Col md="6">
            <FormGroup><label>Section Title</label>
              <Input name={`title_${l}`} value={form[`title_${l}`]} onChange={handleInputChange} />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup><label>Tag or Label</label>
              <Input name={`subtitle_${l}`} value={form[`subtitle_${l}`]} onChange={handleInputChange} />
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup><label>Description Content</label>
              <Input type="textarea" rows="3" name={`description_${l}`} value={form[`description_${l}`]} onChange={handleInputChange} />
            </FormGroup>
          </Col>
        </Row>
      </TabPane>
    );
  };

  return (
    <div className="content">
      <Row><Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Our Blogs — Page Settings</CardTitle>
            <h6 className="text-muted">Manage the Hero and Newsletter content for the Blog listing page</h6>
          </CardHeader>
          {msg && <div className="alert alert-success mx-3">{msg}</div>}
          <CardBody>
            <Table responsive>
              <thead className="text-primary"><tr><th>Section Key</th><th>Title (EN)</th><th>Description Preview</th><th>Actions</th></tr></thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td><span className="badge badge-info">{item.section_key}</span></td>
                    <td>{item.title_en}</td>
                    <td className="text-truncate" style={{maxWidth: '200px'}}>{item.description_en}</td>
                    <td><Button color="warning" size="sm" onClick={() => edit(item)}>Edit Section</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col></Row>

      <Modal isOpen={modal} toggle={() => setModal(!modal)} size="lg">
        <ModalHeader toggle={() => setModal(!modal)}>Edit Section: {form?.section_key}</ModalHeader>
        <Form onSubmit={save}>
          <ModalBody>
            <Nav tabs>
              {['EN', 'AR', 'FR'].map(lang => (
                <NavItem key={lang}>
                  <NavLink className={activeTab === lang ? "active" : ""} onClick={() => setActiveTab(lang)} style={{ cursor: 'pointer' }}>{lang}</NavLink>
                </NavItem>
              ))}
            </Nav>
            <TabContent activeTab={activeTab}>
              {renderTab('EN', 'en')}
              {renderTab('AR', 'ar')}
              {renderTab('FR', 'fr')}
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

export default AdminBlogSections;

