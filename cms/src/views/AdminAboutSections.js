import React, { useEffect, useState, useRef } from "react";
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

const ICONS = ["Award", "Target", "HandshakeIcon", "ShieldCheck", "Building", "Users", "Zap", "Heart"];

function AdminAboutSections() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [activeTab, setActiveTab] = useState('EN');
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const toast = (t) => { setMsg(t); setTimeout(() => setMsg(""), 4000); };
  
  const load = async () => {
    try { 
      const r = await axios.get(`${API}/admin/about-sections`, { headers: getHeaders() }); 
      setItems(r.data); 
    } catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleExtraDataChange = (lang, field, value) => {
    setForm(prev => {
        const extra = { ...prev.extra_data };
        extra[`${field}_${lang}`] = value;
        return { ...prev, extra_data: extra };
    });
  };

  // For Arrays inside extra_data
  const updateArrayItem = (lang, arrayName, index, field, value) => {
      setForm(prev => {
          const extra = { ...prev.extra_data };
          if(extra[arrayName] && extra[arrayName][index]) {
             extra[arrayName][index][`${field}_${lang}`] = value;
          }
          return { ...prev, extra_data: extra };
      });
  };
  
  const updateSharedArrayItem = (arrayName, index, field, value) => {
      setForm(prev => {
          const extra = { ...prev.extra_data };
          if(extra[arrayName] && extra[arrayName][index]) {
             extra[arrayName][index][field] = value;
          }
          return { ...prev, extra_data: extra };
      });
  };

  const addArrayItem = (arrayName, defaultObj) => {
      setForm(prev => {
          const extra = { ...prev.extra_data };
          if(!extra[arrayName]) extra[arrayName] = [];
          extra[arrayName].push(defaultObj);
          return { ...prev, extra_data: extra };
      });
  };

  const removeArrayItem = (arrayName, index) => {
      setForm(prev => {
          const extra = { ...prev.extra_data };
          if(extra[arrayName]) extra[arrayName].splice(index, 1);
          return { ...prev, extra_data: extra };
      });
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(form).forEach(k => {
          if(k === 'extra_data') {
              formData.append('extra_data', JSON.stringify(form.extra_data));
          } else if(form[k] !== null && form[k] !== undefined) {
              formData.append(k, form[k]);
          }
      });
      if (selectedFile) formData.append('image', selectedFile);

      await axios.put(`${API}/admin/about-sections/${editId}`, formData, { 
          headers: { ...getHeaders(), 'Content-Type': 'multipart/form-data' } 
      });
      
      setModal(false); setEditId(null); setSelectedFile(null); load(); toast("Updated successfully!");
    } catch (e) { toast("Error: " + (e.response?.data?.error || e.message)); }
  };

  const parseExtraData = (raw) => {
    let parsed = raw;
    while (typeof parsed === 'string') {
      try { parsed = JSON.parse(parsed); } catch (e) { break; }
    }
    return parsed || {};
  };

  const edit = (item) => { 
    setForm({ 
      ...item, 
      title_en: item.title_en || "", title_ar: item.title_ar || "", title_fr: item.title_fr || "",
      subtitle_en: item.subtitle_en || "", subtitle_ar: item.subtitle_ar || "", subtitle_fr: item.subtitle_fr || "",
      description_en: item.description_en || "", description_ar: item.description_ar || "", description_fr: item.description_fr || "",
      extra_data: parseExtraData(item.extra_data)
    }); 
    setEditId(item.id); 
    setSelectedFile(null);
    setActiveTab('EN');
    setModal(true); 
  };
  
  const renderLangTab = (lang, l) => {
      if(!form) return null;
      const key = form.section_key;

      return (
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
                <label>Subtitle / Tag</label>
                <Input name={`subtitle_${l}`} value={form[`subtitle_${l}`]} onChange={handleInputChange} />
              </FormGroup>
            </Col>
            
            {key !== 'our_footprint' && (
                <Col md="12">
                    <FormGroup>
                        <label>Main Body / Description</label>
                        <Editor value={form[`description_${l}`]} onChange={e => setForm({...form, [`description_${l}`]: e.target.value})} />
                    </FormGroup>
                </Col>
            )}

            {/* Founder Specifics */}
            {key === 'founder_message' && (
                <Col md="12" className="mt-3">
                   <div className="p-3 bg-light border border-secondary rounded">
                       <h5 className="mb-3">Founder Details</h5>
                       <Row>
                           <Col md="6">
                               <FormGroup>
                                   <label>Founder Name</label>
                                   <Input value={form.extra_data[`founder_name_${l}`] || ''} onChange={(e) => handleExtraDataChange(l, 'founder_name', e.target.value)} />
                               </FormGroup>
                           </Col>
                           <Col md="6">
                               <FormGroup>
                                   <label>Founder Title</label>
                                   <Input value={form.extra_data[`founder_title_${l}`] || ''} onChange={(e) => handleExtraDataChange(l, 'founder_title', e.target.value)} />
                               </FormGroup>
                           </Col>
                       </Row>
                   </div>
                </Col>
            )}

            {/* Vision Values Specifics */}
            {key === 'vision_values' && (
                <Col md="12" className="mt-3">
                   <div className="p-3 bg-light border border-secondary rounded mb-3">
                       <h5 className="mb-3">Values Acronym</h5>
                       <Row>
                           <Col md="6">
                               <FormGroup>
                                   <label>Acronym Term (e.g. A.L.F.A.I.H.A. Values)</label>
                                   <Input value={form.extra_data[`alfaiha_label_${l}`] || ''} onChange={(e) => handleExtraDataChange(l, 'alfaiha_label', e.target.value)} />
                               </FormGroup>
                           </Col>
                           <Col md="12">
                               <FormGroup>
                                   <label>Acronym Description</label>
                                   <Input type="textarea" value={form.extra_data[`alfaiha_desc_${l}`] || ''} onChange={(e) => handleExtraDataChange(l, 'alfaiha_desc', e.target.value)} />
                               </FormGroup>
                           </Col>
                       </Row>
                       <h6>A.L.F.A.I.H.A Breakdown</h6>
                       {(form.extra_data.values || []).map((val, idx) => (
                           <Row key={idx} className="align-items-center mb-2">
                               <Col md="2">
                                   <Input placeholder="Letter" value={val[`l_${l}`] || ''} onChange={(e) => updateArrayItem(l, 'values', idx, 'l', e.target.value)} />
                               </Col>
                               <Col md="10">
                                   <Input placeholder="Meaning" value={val[`t_${l}`] || ''} onChange={(e) => updateArrayItem(l, 'values', idx, 't', e.target.value)} />
                               </Col>
                           </Row>
                       ))}
                   </div>
                   
                   <div className="p-3 bg-light border border-secondary rounded mb-3">
                       <h5 className="mb-3">Purpose Block</h5>
                       <FormGroup>
                           <label>Purpose Title</label>
                           <Input value={form.extra_data[`purpose_title_${l}`] || ''} onChange={(e) => handleExtraDataChange(l, 'purpose_title', e.target.value)} />
                       </FormGroup>
                       <FormGroup>
                           <label>Purpose Description</label>
                           <Input type="textarea" value={form.extra_data[`purpose_desc_${l}`] || ''} onChange={(e) => handleExtraDataChange(l, 'purpose_desc', e.target.value)} />
                       </FormGroup>
                   </div>

                   <div className="p-3 bg-light border border-secondary rounded mb-3">
                       <h5 className="mb-3">Commitment Block</h5>
                       <FormGroup>
                           <label>Commitment Title</label>
                           <Input value={form.extra_data[`commitment_title_${l}`] || ''} onChange={(e) => handleExtraDataChange(l, 'commitment_title', e.target.value)} />
                       </FormGroup>
                       <FormGroup>
                           <label>Commitment Description</label>
                           <Input type="textarea" value={form.extra_data[`commitment_desc_${l}`] || ''} onChange={(e) => handleExtraDataChange(l, 'commitment_desc', e.target.value)} />
                       </FormGroup>
                   </div>
                </Col>
            )}

            {/* Timeline Specifics */}
            {key === 'our_story' && (
                <Col md="12" className="mt-3">
                   <div className="p-3 bg-light border border-secondary rounded mb-3">
                       <div className="d-flex justify-content-between align-items-center mb-3">
                           <h5 className="mb-0">Timeline Nodes</h5>
                           <Button size="sm" color="success" onClick={(e) => { e.preventDefault(); addArrayItem('timeline', {}) }}>Add Node</Button>
                       </div>
                       {(form.extra_data.timeline || []).map((t, idx) => (
                           <div key={idx} className="bg-white p-3 border mb-3 relative">
                               <button type="button" className="close" onClick={() => removeArrayItem('timeline', idx)}><span>&times;</span></button>
                               <Row>
                                   <Col md="3">
                                       <FormGroup><label>Year/Label</label><Input value={t[`year_${l}`] || ''} onChange={(e) => updateArrayItem(l, 'timeline', idx, 'year', e.target.value)} /></FormGroup>
                                   </Col>
                                   <Col md="4">
                                       <FormGroup><label>Badge</label><Input value={t[`badge_${l}`] || ''} onChange={(e) => updateArrayItem(l, 'timeline', idx, 'badge', e.target.value)} /></FormGroup>
                                   </Col>
                                   <Col md="5">
                                       <FormGroup><label>Event Title</label><Input value={t[`title_${l}`] || ''} onChange={(e) => updateArrayItem(l, 'timeline', idx, 'title', e.target.value)} /></FormGroup>
                                   </Col>
                                   <Col md="12">
                                       <FormGroup><label>Description</label><Input type="textarea" value={t[`desc_${l}`] || ''} onChange={(e) => updateArrayItem(l, 'timeline', idx, 'desc', e.target.value)} /></FormGroup>
                                   </Col>
                               </Row>
                           </div>
                       ))}
                   </div>
                </Col>
            )}

            {/* Footprint Specifics */}
            {key === 'our_footprint' && (
                <Col md="12" className="mt-3">
                   <div className="p-3 bg-light border border-secondary rounded mb-3">
                       <div className="d-flex justify-content-between align-items-center mb-3">
                           <h5 className="mb-0">Countries List</h5>
                           <Button size="sm" color="success" onClick={(e) => { e.preventDefault(); addArrayItem('countries', {}) }}>Add Country</Button>
                       </div>
                       <Row>
                       {(form.extra_data.countries || []).map((c, idx) => (
                           <Col md="4" key={idx} className="mb-2">
                               <div className="d-flex">
                                   <Input placeholder="Country Name" value={c[`name_${l}`] || ''} onChange={(e) => updateArrayItem(l, 'countries', idx, 'name', e.target.value)} />
                                   <Button color="danger" className="ml-2 btn-icon" onClick={() => removeArrayItem('countries', idx)}><i className="nc-icon nc-simple-remove"/></Button>
                               </div>
                           </Col>
                       ))}
                       </Row>
                   </div>
                </Col>
            )}

            {/* Why Us Features Specifics */}
            {key === 'why_choose_us' && (
                <Col md="12" className="mt-3">
                   <div className="p-3 bg-light border border-secondary rounded mb-3">
                       <div className="d-flex justify-content-between align-items-center mb-3">
                           <h5 className="mb-0">Cards</h5>
                           <Button size="sm" color="success" onClick={(e) => { e.preventDefault(); addArrayItem('features', { icon: 'CheckCircle2' }) }}>Add Card</Button>
                       </div>
                       <Row>
                       {(form.extra_data.features || []).map((f, idx) => (
                           <Col md="6" key={idx} className="mb-3">
                               <div className="bg-white p-3 border relative">
                                   <button type="button" className="close" onClick={() => removeArrayItem('features', idx)}><span>&times;</span></button>
                                   <FormGroup>
                                       <label>Icon Identifier</label>
                                       <Input type="select" value={f.icon || 'CheckCircle2'} onChange={(e) => updateSharedArrayItem('features', idx, 'icon', e.target.value)}>
                                          {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                                       </Input>
                                   </FormGroup>
                                   <FormGroup>
                                       <label>Title</label>
                                       <Input value={f[`title_${l}`] || ''} onChange={(e) => updateArrayItem(l, 'features', idx, 'title', e.target.value)} />
                                   </FormGroup>
                                   <FormGroup>
                                       <label>Description</label>
                                       <Input type="textarea" value={f[`desc_${l}`] || ''} onChange={(e) => updateArrayItem(l, 'features', idx, 'desc', e.target.value)} />
                                   </FormGroup>
                               </div>
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
          <CardHeader className="d-flex justify-content-between align-items-center">
            <div>
              <CardTitle tag="h4">About Us Sections</CardTitle>
              <h6 className="text-muted">Manage the content blocks on the About Us page</h6>
            </div>
          </CardHeader>
          {msg && <div className="alert alert-success mx-3">{msg}</div>}
          <CardBody>
            <Table responsive>
              <thead className="text-primary"><tr><th>Key</th><th>Title (EN)</th><th>Actions</th></tr></thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td><span className="badge badge-info">{item.section_key}</span></td>
                    <td>{item.title_en}</td>
                    <td>
                      <Button color="warning" size="sm" onClick={() => edit(item)}>Edit Section</Button>
                    </td>
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
            {form?.section_key === 'founder_message' && (
                <Row className="mb-4">
                    <Col md="12">
                        <FormGroup>
                            <label className="d-block font-weight-bold text-danger">Upload Founder Image (Replaces current)</label>
                            <input type="file" ref={fileInputRef} onChange={e => setSelectedFile(e.target.files[0])} accept="image/*" className="form-control" />
                            {form.image && !selectedFile && <div className="mt-2"><img src={form.image} alt="current" style={{height:'60px'}}/></div>}
                        </FormGroup>
                    </Col>
                </Row>
            )}

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

export default AdminAboutSections;

