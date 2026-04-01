import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardHeader, CardBody, CardTitle,
  Row, Col, Table, Button, Form, FormGroup, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Nav, NavItem, NavLink, TabContent, TabPane, Label
} from "reactstrap";
import Editor from 'react-simple-wysiwyg';

const API = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api`;
const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

const EMPTY = { 
  section_key: "",
  title_en: "", title_ar: "", title_fr: "",
  subtitle_en: "", subtitle_ar: "", subtitle_fr: "",
  description_en: "", description_ar: "", description_fr: "",
  btn_text_en: "", btn_text_ar: "", btn_text_fr: "",
  
  highlight_title_en: "", highlight_title_ar: "", highlight_title_fr: "",
  short_desc_en: "", short_desc_ar: "", short_desc_fr: "",
  benefits: [],

  email_btn_en: "", email_btn_ar: "", email_btn_fr: "",
  features: []
};

function AdminPartnerSections() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [activeTab, setActiveTab] = useState('EN');

  const toast = (t) => { setMsg(t); setTimeout(() => setMsg(""), 4000); };
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const load = async () => {
    try { const r = await axios.get(`${API}/admin/partners-sections`, { headers: getHeaders() }); setItems(r.data); }
    catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      
      let extraData = {};
      if (payload.section_key === 'eca_stats') {
          extraData = {
              highlight_title_en: payload.highlight_title_en,
              highlight_title_ar: payload.highlight_title_ar,
              highlight_title_fr: payload.highlight_title_fr,
          };
      } else if (payload.section_key === 'eca_benefits') {
          extraData = { benefits: payload.benefits };
      } else if (payload.section_key === 'partner_features') {
          extraData = { features: payload.features };
      } else if (payload.section_key === 'partner_cta') {
          extraData = {
              email_btn_en: payload.email_btn_en,
              email_btn_ar: payload.email_btn_ar,
              email_btn_fr: payload.email_btn_fr,
          };
      } else if (payload.section_key === 'become_partner_intro') {
          extraData = {
              short_desc_en: payload.short_desc_en,
              short_desc_ar: payload.short_desc_ar,
              short_desc_fr: payload.short_desc_fr,
          };
      }
      payload.extra_data = JSON.stringify(extraData);

      if (editId) await axios.put(`${API}/admin/partners-sections/${editId}`, payload, { headers: getHeaders() });
      else await axios.post(`${API}/admin/partners-sections`, payload, { headers: getHeaders() });
      
      setModal(false); setForm(EMPTY); setEditId(null); load(); toast(editId ? "Updated!" : "Added!");
    } catch (e) { toast("Error: " + (e.response?.data?.error || e.message)); }
  };

  const edit = (item) => { 
    let parsed = {};
    if (item.extra_data) {
      if (typeof item.extra_data === 'string') {
        try { parsed = JSON.parse(item.extra_data); } catch(e){}
      } else { parsed = item.extra_data; }
      if (typeof parsed === 'string') { 
        try { parsed = JSON.parse(parsed); } catch(e){}
      }
    }

    const parseVal = (val) => val ? val : "";

    setForm({ 
      ...item, 
      title_en: parseVal(item.title_en), title_ar: parseVal(item.title_ar), title_fr: parseVal(item.title_fr),
      subtitle_en: parseVal(item.subtitle_en), subtitle_ar: parseVal(item.subtitle_ar), subtitle_fr: parseVal(item.subtitle_fr),
      description_en: parseVal(item.description_en), description_ar: parseVal(item.description_ar), description_fr: parseVal(item.description_fr),
      btn_text_en: parseVal(item.btn_text_en), btn_text_ar: parseVal(item.btn_text_ar), btn_text_fr: parseVal(item.btn_text_fr),
      
      highlight_title_en: parseVal(parsed.highlight_title_en), 
      highlight_title_ar: parseVal(parsed.highlight_title_ar),
      highlight_title_fr: parseVal(parsed.highlight_title_fr),
      
      short_desc_en: parseVal(parsed.short_desc_en),
      short_desc_ar: parseVal(parsed.short_desc_ar),
      short_desc_fr: parseVal(parsed.short_desc_fr),
      
      benefits: Array.isArray(parsed.benefits) ? parsed.benefits : [],
      
      email_btn_en: parseVal(parsed.email_btn_en), 
      email_btn_ar: parseVal(parsed.email_btn_ar),
      email_btn_fr: parseVal(parsed.email_btn_fr),
      
      features: Array.isArray(parsed.features) ? parsed.features : []
    }); 
    setEditId(item.id); 
    setActiveTab('EN');
    setModal(true); 
  };

  const handleBenefitChange = (index, field, value) => {
    const newBenefits = [...form.benefits];
    newBenefits[index] = { ...newBenefits[index], [field]: value };
    setForm({ ...form, benefits: newBenefits });
  };
  const addBenefit = () => setForm({ ...form, benefits: [...form.benefits, { title_en: '', desc_en: '', title_ar: '', desc_ar: '', title_fr: '', desc_fr: '' }] });
  const removeBenefit = (index) => setForm({ ...form, benefits: form.benefits.filter((_, i) => i !== index) });

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...form.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setForm({ ...form, features: newFeatures });
  };
  const addFeature = () => setForm({ ...form, features: [...form.features, { icon: 'Award', title_en: '', desc_en: '', title_ar: '', desc_ar: '', title_fr: '', desc_fr: '' }] });
  const removeFeature = (index) => setForm({ ...form, features: form.features.filter((_, i) => i !== index) });

  const renderLangTab = (lang, l) => (
    <TabPane tabId={lang}>
      <Row className="mt-3">
        <Col md="6"><FormGroup><label>Title</label><Input value={form[`title_${l}`]} onChange={f(`title_${l}`)} /></FormGroup></Col>
        <Col md="6"><FormGroup><label>Subtitle</label><Input value={form[`subtitle_${l}`]} onChange={f(`subtitle_${l}`)} /></FormGroup></Col>
        
        {(form.section_key === 'partner_cta' || form.section_key === 'hero') && (
            <Col md="12"><FormGroup><label>Button Text</label><Input value={form[`btn_text_${l}`]} onChange={f(`btn_text_${l}`)} /></FormGroup></Col>
        )}

        <Col md="12">
            <FormGroup><label>Main Description</label><Editor value={form[`description_${l}`]} onChange={f(`description_${l}`)} /></FormGroup>
        </Col>

        {form.section_key === 'eca_stats' && (
          <Col md="12">
            <FormGroup><label>Highlight Text (e.g. 15+ Years)</label><Input value={form[`highlight_title_${l}`]} onChange={f(`highlight_title_${l}`)} /></FormGroup>
          </Col>
        )}

        {form.section_key === 'become_partner_intro' && (
          <Col md="12">
            <FormGroup><label>Short Description (Under Header)</label><Input type="textarea" rows="3" value={form[`short_desc_${l}`]} onChange={f(`short_desc_${l}`)} /></FormGroup>
          </Col>
        )}

        {form.section_key === 'eca_benefits' && (
          <Col md="12">
              <div className="d-flex justify-content-between align-items-center mt-4 border-bottom pb-2">
                <h5 className="text-info m-0">Benefits / Core Pillars</h5>
                <Button size="sm" color="success" onClick={addBenefit}>+ Add Benefit</Button>
              </div>
              {form.benefits.map((ben, idx) => (
                <Card key={idx} className="mt-2 p-2 bg-light">
                  <Row>
                    <Col md="5"><Input placeholder="Title" value={ben[`title_${l}`] || ''} onChange={e => handleBenefitChange(idx, `title_${l}`, e.target.value)} /></Col>
                    <Col md="6"><Input placeholder="Description" value={ben[`desc_${l}`] || ''} onChange={e => handleBenefitChange(idx, `desc_${l}`, e.target.value)} /></Col>
                    <Col md="1"><Button color="danger" size="sm" onClick={() => removeBenefit(idx)}>X</Button></Col>
                  </Row>
                </Card>
              ))}
          </Col>
        )}

        {form.section_key === 'partner_features' && (
          <Col md="12">
              <div className="d-flex justify-content-between align-items-center mt-4 border-bottom pb-2">
                <h5 className="text-info m-0">Partnership Features</h5>
                <Button size="sm" color="success" onClick={addFeature}>+ Add Feature</Button>
              </div>
              {form.features.map((feat, idx) => (
                <Card key={idx} className="mt-2 p-2 bg-light">
                  <Row>
                    {l === 'en' && (
                        <Col md="2">
                            <Input type="select" value={feat.icon || 'Award'} onChange={e => handleFeatureChange(idx, 'icon', e.target.value)}>
                                <option value="Award">Award Icon</option>
                                <option value="Globe">Globe Icon</option>
                                <option value="TrendingUp">Trending Icon</option>
                            </Input>
                        </Col>
                    )}
                    <Col md={l === 'en' ? 4 : 5}><Input placeholder="Title" value={feat[`title_${l}`] || ''} onChange={e => handleFeatureChange(idx, `title_${l}`, e.target.value)} /></Col>
                    <Col md={l === 'en' ? 5 : 6}><Input placeholder="Description" value={feat[`desc_${l}`] || ''} onChange={e => handleFeatureChange(idx, `desc_${l}`, e.target.value)} /></Col>
                    <Col md="1"><Button color="danger" size="sm" onClick={() => removeFeature(idx)}>X</Button></Col>
                  </Row>
                </Card>
              ))}
          </Col>
        )}

        {form.section_key === 'partner_cta' && (
          <Col md="12">
            <FormGroup><label>Email Button Text</label><Input value={form[`email_btn_${l}`]} onChange={f(`email_btn_${l}`)} /></FormGroup>
          </Col>
        )}

      </Row>
    </TabPane>
  );

  return (
    <div className="content">
      <Row><Col md="12">
        <Card>
          <CardHeader><CardTitle tag="h4">Partners Page Static Text</CardTitle><h6 className="text-muted">Manage translations and core sections of the Partners page.</h6></CardHeader>
          {msg && <div className="alert alert-success mx-3">{msg}</div>}
          <CardBody>
            <Table responsive>
              <thead className="text-primary"><tr><th>Key</th><th>Title (EN)</th><th>Actions</th></tr></thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td><span className="badge badge-info">{item.section_key}</span></td>
                    <td>{item.title_en}</td>
                    <td><Button color="warning" size="sm" onClick={() => edit(item)}>Edit</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col></Row>

      <Modal isOpen={modal} toggle={() => setModal(!modal)} size="lg">
        <ModalHeader toggle={() => setModal(!modal)}>Edit Section: {form.section_key}</ModalHeader>
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

export default AdminPartnerSections;

