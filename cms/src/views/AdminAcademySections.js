import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardHeader, CardBody, CardTitle,
  Row, Col, Table, Button, Form, FormGroup, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Nav, NavItem, NavLink, TabContent, TabPane
} from "reactstrap";
import Editor from 'react-simple-wysiwyg';

const API = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api`;
const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

const ICONS = ["Target", "Award", "CheckCircle2", "Clock", "Users", "GraduationCap"];

const parseExtraData = (raw) => {
  let parsed = raw;
  while (typeof parsed === 'string') {
    try { parsed = JSON.parse(parsed); } catch (e) { break; }
  }
  return parsed || {};
};

function AdminAcademySections() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [activeTab, setActiveTab] = useState('EN');

  const toast = (t) => { setMsg(t); setTimeout(() => setMsg(""), 4000); };

  const load = async () => {
    try {
      const r = await axios.get(`${API}/admin/academy-sections`, { headers: getHeaders() });
      setItems(r.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleExtraChange = (field, value) => {
    setForm(prev => ({ ...prev, extra_data: { ...prev.extra_data, [field]: value } }));
  };

  const updateArrayItem = (lang, arrayName, index, field, value) => {
    setForm(prev => {
      const extra = { ...prev.extra_data };
      if (extra[arrayName] && extra[arrayName][index] !== undefined) {
        extra[arrayName][index][`${field}_${lang}`] = value;
      }
      return { ...prev, extra_data: extra };
    });
  };

  const updateSimpleArrayItem = (arrayName, index, lang, value) => {
    setForm(prev => {
      const extra = { ...prev.extra_data };
      if (extra[arrayName]) extra[arrayName][index][lang] = value;
      return { ...prev, extra_data: extra };
    });
  };

  const updateSharedArrayField = (arrayName, index, field, value) => {
    setForm(prev => {
      const extra = { ...prev.extra_data };
      if (extra[arrayName]) extra[arrayName][index][field] = value;
      return { ...prev, extra_data: extra };
    });
  };

  const updateFormLabel = (field, lang, value) => {
    setForm(prev => {
      const extra = { ...prev.extra_data };
      if (!extra.form_labels) extra.form_labels = {};
      extra.form_labels[`${field}_${lang}`] = value;
      return { ...prev, extra_data: extra };
    });
  };

  const addArrayItem = (arrayName, defaultObj) => {
    setForm(prev => {
      const extra = { ...prev.extra_data };
      if (!extra[arrayName]) extra[arrayName] = [];
      extra[arrayName].push({ ...defaultObj });
      return { ...prev, extra_data: extra };
    });
  };

  const removeArrayItem = (arrayName, index) => {
    setForm(prev => {
      const extra = { ...prev.extra_data };
      if (extra[arrayName]) extra[arrayName].splice(index, 1);
      return { ...prev, extra_data: extra };
    });
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, extra_data: JSON.stringify(form.extra_data) };
      await axios.put(`${API}/admin/academy-sections/${editId}`, payload, { headers: getHeaders() });
      setModal(false); setEditId(null); load(); toast("Updated successfully!");
    } catch (e) { toast("Error: " + (e.response?.data?.error || e.message)); }
  };

  const edit = (item) => {
    setForm({
      ...item,
      title_en: item.title_en || "", title_ar: item.title_ar || "", title_fr: item.title_fr || "",
      subtitle_en: item.subtitle_en || "", subtitle_ar: item.subtitle_ar || "", subtitle_fr: item.subtitle_fr || "",
      content_en: item.content_en || "", content_ar: item.content_ar || "", content_fr: item.content_fr || "",
      extra_data: parseExtraData(item.extra_data)
    });
    setEditId(item.id);
    setActiveTab('EN');
    setModal(true);
  };

  const renderLangTab = (lang, l) => {
    if (!form) return null;
    const key = form.section_key;
    const ed = form.extra_data || {};

    return (
      <TabPane tabId={lang}>
        <Row className="mt-3">
          {key !== 'intro' && (
            <>
              <Col md="6">
                <FormGroup><label>Title</label>
                  <Input name={`title_${l}`} value={form[`title_${l}`]} onChange={handleInputChange} />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup><label>Subtitle / Tag</label>
                  <Input name={`subtitle_${l}`} value={form[`subtitle_${l}`]} onChange={handleInputChange} />
                </FormGroup>
              </Col>
            </>
          )}

          <Col md="12">
            <FormGroup><label>{key === 'intro' ? 'Intro Text' : 'Main Description'}</label>
              <Editor value={form[`content_${l}`]} onChange={e => setForm({ ...form, [`content_${l}`]: e.target.value })} />
            </FormGroup>
          </Col>

          {/* TRAINING SESSIONS */}
          {key === 'training_sessions' && (
            <Col md="12" className="mt-2">
              <div className="p-3 bg-light border rounded mb-3">
                <FormGroup>
                  <label>Bottom Note</label>
                  <Input type="textarea" value={ed[`bottom_note_${l}`] || ''} onChange={e => handleExtraChange(`bottom_note_${l}`, e.target.value)} />
                </FormGroup>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="mb-0">Topics Covered</h6>
                  <Button size="sm" color="success" onClick={e => { e.preventDefault(); addArrayItem('topics', { en: '', ar: '', fr: '' }); }}>Add Topic</Button>
                </div>
                {(ed.topics || []).map((t, idx) => (
                  <div key={idx} className="d-flex mb-2">
                    <Input value={t[l] || ''} onChange={e => updateSimpleArrayItem('topics', idx, l, e.target.value)} placeholder="Topic text" />
                    <Button color="danger" size="sm" className="ml-2" onClick={() => removeArrayItem('topics', idx)}>✕</Button>
                  </div>
                ))}
              </div>
            </Col>
          )}

          {/* PRODUCT APPLICATION */}
          {key === 'product_application' && (
            <Col md="12" className="mt-2">
              <div className="p-3 bg-light border rounded mb-3">
                <FormGroup>
                  <label>Bottom Note</label>
                  <Input type="textarea" value={ed[`bottom_note_${l}`] || ''} onChange={e => handleExtraChange(`bottom_note_${l}`, e.target.value)} />
                </FormGroup>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="mb-0">Feature Cards</h6>
                  <Button size="sm" color="success" onClick={e => { e.preventDefault(); addArrayItem('features', { icon: 'Target' }); }}>Add Card</Button>
                </div>
                <Row>
                {(ed.features || []).map((f, idx) => (
                  <Col md="6" key={idx} className="mb-3">
                    <div className="bg-white p-3 border">
                      <button type="button" className="close" onClick={() => removeArrayItem('features', idx)}><span>&times;</span></button>
                      <FormGroup>
                        <label>Icon</label>
                        <Input type="select" value={f.icon || 'Target'} onChange={e => updateSharedArrayField('features', idx, 'icon', e.target.value)}>
                          {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                        </Input>
                      </FormGroup>
                      <FormGroup><label>Title</label><Input value={f[`title_${l}`] || ''} onChange={e => updateArrayItem(l, 'features', idx, 'title', e.target.value)} /></FormGroup>
                      <FormGroup><label>Description</label><Input type="textarea" value={f[`desc_${l}`] || ''} onChange={e => updateArrayItem(l, 'features', idx, 'desc', e.target.value)} /></FormGroup>
                    </div>
                  </Col>
                ))}
                </Row>
              </div>
            </Col>
          )}

          {/* PRODUCT KNOWHOW */}
          {key === 'product_knowhow' && (
            <Col md="12" className="mt-2">
              <div className="p-3 bg-light border rounded mb-3">
                <FormGroup>
                  <label>Bottom Note</label>
                  <Input type="textarea" value={ed[`bottom_note_${l}`] || ''} onChange={e => handleExtraChange(`bottom_note_${l}`, e.target.value)} />
                </FormGroup>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="mb-0">What You'll Learn (Numbered List)</h6>
                  <Button size="sm" color="success" onClick={e => { e.preventDefault(); addArrayItem('learnings', { en: '', ar: '', fr: '' }); }}>Add Item</Button>
                </div>
                {(ed.learnings || []).map((item, idx) => (
                  <div key={idx} className="d-flex mb-2">
                    <Input value={item[l] || ''} onChange={e => updateSimpleArrayItem('learnings', idx, l, e.target.value)} placeholder="Learning point" />
                    <Button color="danger" size="sm" className="ml-2" onClick={() => removeArrayItem('learnings', idx)}>✕</Button>
                  </div>
                ))}
              </div>
            </Col>
          )}

          {/* CO-OP PROGRAMS */}
          {key === 'coop_programs' && (
            <Col md="12" className="mt-2">
              <div className="p-3 bg-light border rounded mb-3">
                <FormGroup>
                  <label>Bottom Note</label>
                  <Input type="textarea" value={ed[`bottom_note_${l}`] || ''} onChange={e => handleExtraChange(`bottom_note_${l}`, e.target.value)} />
                </FormGroup>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="mb-0">Program Cards</h6>
                  <Button size="sm" color="success" onClick={e => { e.preventDefault(); addArrayItem('programs', { icon: 'GraduationCap' }); }}>Add Program</Button>
                </div>
                <Row>
                {(ed.programs || []).map((p, idx) => (
                  <Col md="6" key={idx} className="mb-3">
                    <div className="bg-white p-3 border">
                      <button type="button" className="close" onClick={() => removeArrayItem('programs', idx)}><span>&times;</span></button>
                      <FormGroup>
                        <label>Icon</label>
                        <Input type="select" value={p.icon || 'GraduationCap'} onChange={e => updateSharedArrayField('programs', idx, 'icon', e.target.value)}>
                          {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                        </Input>
                      </FormGroup>
                      <FormGroup><label>Title</label><Input value={p[`title_${l}`] || ''} onChange={e => updateArrayItem(l, 'programs', idx, 'title', e.target.value)} /></FormGroup>
                      <FormGroup><label>Description</label><Input type="textarea" value={p[`desc_${l}`] || ''} onChange={e => updateArrayItem(l, 'programs', idx, 'desc', e.target.value)} /></FormGroup>
                    </div>
                  </Col>
                ))}
                </Row>
              </div>
            </Col>
          )}

          {/* APPLY FORM LABELS */}
          {key === 'apply_form' && (
            <Col md="12" className="mt-2">
              <div className="p-3 bg-light border rounded">
                <h6 className="mb-3">Form Field Labels</h6>
                <Row>
                  {['name', 'phone', 'email', 'company', 'submit', 'success'].map(field => (
                    <Col md="6" key={field}>
                      <FormGroup>
                        <label>{field.charAt(0).toUpperCase() + field.slice(1)} Label</label>
                        <Input value={(ed.form_labels || {})[`${field}_${l}`] || ''} onChange={e => updateFormLabel(field, l, e.target.value)} />
                      </FormGroup>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          )}
        </Row>
      </TabPane>
    );
  };

  return (
    <div className="content">
      <Row><Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">AFG Academy Sections</CardTitle>
            <h6 className="text-muted">Edit text content for all Academy page sections</h6>
          </CardHeader>
          {msg && <div className="alert alert-success mx-3">{msg}</div>}
          <CardBody>
            <Table responsive>
              <thead className="text-primary"><tr><th>Section Key</th><th>Title (EN)</th><th>Actions</th></tr></thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td><span className="badge badge-info">{item.section_key}</span></td>
                    <td>{item.title_en || <em className="text-muted">Intro text only</em>}</td>
                    <td><Button color="warning" size="sm" onClick={() => edit(item)}>Edit Section</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col></Row>

      <Modal isOpen={modal} toggle={() => setModal(!modal)} size="lg">
        <ModalHeader toggle={() => setModal(!modal)}>Edit: {form?.section_key}</ModalHeader>
        <Form onSubmit={save}>
          <ModalBody>
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

export default AdminAcademySections;

