import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardHeader, CardBody, CardTitle,
  Row, Col, Table, Button, Form, FormGroup, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Nav, NavItem, NavLink, TabContent, TabPane
} from "reactstrap";
import * as LucideIcons from "lucide-react";

const API = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api`;
const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

const EMPTY_SERVICE = {
  slug: "", icon_name: "", image_url: "",
  title_en: "", title_ar: "", title_fr: "",
  description_en: "", description_ar: "", description_fr: "",
  sub_services_en: [], sub_services_ar: [], sub_services_fr: [],
  related_products_en: [], related_sectors_en: [], case_studies_en: []
};

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-');    // Replace multiple - with single -
};

function AdminServices() {
  const [items, setItems] = useState([]);
  const [options, setOptions] = useState({ sectors: [], solutions: [], projects: [] });
  const [form, setForm] = useState(EMPTY_SERVICE);
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState(false);
  const [delId, setDelId] = useState(null);
  const [msg, setMsg] = useState("");
  const [activeTab, setActiveTab] = useState("EN");

  // Icon selector state
  const [iconModal, setIconModal] = useState(false);
  const [iconSearch, setIconSearch] = useState("");

  const toast = (t) => { setMsg(t); setTimeout(() => setMsg(""), 4000); };
  
  // Basic input change handler
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const load = async () => {
    try {
      const [r, optsR] = await Promise.all([
        axios.get(`${API}/admin/services`, { headers: getHeaders() }),
        axios.get(`${API}/admin/services-options`, { headers: getHeaders() })
      ]);
      setItems(r.data);
      setOptions(optsR.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      if (editId) await axios.put(`${API}/admin/services/${editId}`, payload, { headers: getHeaders() });
      else await axios.post(`${API}/admin/services`, payload, { headers: getHeaders() });
      setModal(false); setForm(EMPTY_SERVICE); setEditId(null); load(); toast(editId ? "Updated!" : "Added!");
    } catch (e) { toast("Error: " + (e.response?.data?.error || e.message)); }
  };

  const del = async () => {
    try { await axios.delete(`${API}/admin/services/${delId}`, { headers: getHeaders() }); setDelId(null); load(); toast("Deleted!"); }
    catch (e) { toast("Error deleting"); }
  };

  const edit = (item) => {
    // Ensure JSON arrays are actually arrays for the form state
    const parse = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      try { return JSON.parse(val); } catch (e) { return []; }
    };
    
    setForm({
      ...item,
      sub_services_en: parse(item.sub_services_en),
      sub_services_ar: parse(item.sub_services_ar),
      sub_services_fr: parse(item.sub_services_fr),
      related_products_en: parse(item.related_products_en),
      related_sectors_en: parse(item.related_sectors_en),
      case_studies_en: parse(item.case_studies_en),
    });
    setEditId(item.id);
    setActiveTab("EN");
    setModal(true);
  };

  const add = () => { setForm(EMPTY_SERVICE); setEditId(null); setActiveTab("EN"); setModal(true); };

  // --- Helpers for Dynamic Lists (Sub Services) ---
  const handleSubChange = (lang, index, field, value) => {
    const key = `sub_services_${lang.toLowerCase()}`;
    const newList = [...form[key]];
    newList[index][field] = value;
    setForm({ ...form, [key]: newList });
  };

  const addSub = (lang) => {
    const key = `sub_services_${lang.toLowerCase()}`;
    setForm({ ...form, [key]: [...form[key], { name: "", desc: "" }] });
  };

  const removeSub = (lang, index) => {
    const key = `sub_services_${lang.toLowerCase()}`;
    const newList = [...form[key]];
    newList.splice(index, 1);
    setForm({ ...form, [key]: newList });
  };

  // Render a specific language tab
  const renderLangTab = (lang) => {
    const l = lang.toLowerCase();
    return (
      <TabPane tabId={lang}>
        <Row className="mt-3">
          <Col md="12">
            <FormGroup>
              <label>Service Title ({lang}) *</label>
              <Input 
                required={lang==='EN'} 
                value={form[`title_${l}`] || ""} 
                onChange={(e) => {
                  const val = e.target.value;
                  const newForm = { ...form, [`title_${l}`]: val };
                  // Fully automatic slug generation during creation
                  if (lang === 'EN' && !editId) {
                    newForm.slug = slugify(val);
                  }
                  setForm(newForm);
                }} 
              />
            </FormGroup>
            <FormGroup>
              <label>Description ({lang})</label>
              <Input type="textarea" rows="4" value={form[`description_${l}`] || ""} onChange={f(`description_${l}`)} />
            </FormGroup>
          </Col>
        </Row>

        <hr />
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6>Sub-Services ({lang})</h6>
          <Button size="sm" color="info" onClick={() => addSub(lang)}>+ Add Sub-Service</Button>
        </div>
        
        {(form[`sub_services_${l}`] || []).map((sub, idx) => (
          <Row key={idx} className="align-items-center mb-2 p-2 border rounded bg-light">
            <Col md="4">
              <Input placeholder="Sub-service Name" value={sub.name} onChange={(e) => handleSubChange(lang, idx, "name", e.target.value)} />
            </Col>
            <Col md="7">
              <Input placeholder="Short Description" value={sub.desc} onChange={(e) => handleSubChange(lang, idx, "desc", e.target.value)} />
            </Col>
            <Col md="1">
              <Button size="sm" color="danger" onClick={() => removeSub(lang, idx)}>X</Button>
            </Col>
          </Row>
        ))}
      </TabPane>
    );
  };

  // Safe icon render
  const renderIcon = (name) => {
    const Icon = LucideIcons[name];
    return Icon ? <Icon size={20} /> : null;
  };

  // Filter available icons (we'll just pick a subset or all exported components)
  const availableIcons = Object.keys(LucideIcons).filter(key => 
    typeof LucideIcons[key] === 'object' || typeof LucideIcons[key] === 'function'
  ).filter(key => key !== 'createLucideIcon' && key !== 'default');
  
  const filteredIcons = availableIcons.filter(i => i.toLowerCase().includes(iconSearch.toLowerCase())).slice(0, 100);

  return (
    <div className="content">
      {msg && <div className="alert alert-info">{msg}</div>}
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <CardTitle tag="h4">Engineering Services</CardTitle>
              <Button color="primary" onClick={add}>+ Add Service</Button>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Title (EN)</th>
                    <th>Icon Class</th>
                    <th>Slug / URL</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((a) => (
                    <tr key={a.id}>
                      <td>{a.title_en}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {renderIcon(a.icon_name)} <code>{a.icon_name}</code>
                        </div>
                      </td>
                      <td>{a.slug}</td>
                      <td>
                        <Button size="sm" color="warning" className="mr-1" onClick={() => edit(a)}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => setDelId(a.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                  {!items.length && <tr><td colSpan="4" className="text-center">No services found.</td></tr>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={() => setModal(false)} size="lg">
        <ModalHeader toggle={() => setModal(false)}>{editId ? "Edit Service" : "Add Service"}</ModalHeader>
        <Form onSubmit={save}>
          <ModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label>Slug / URL</label>
                  <div className="p-2 border rounded bg-light text-muted" style={{ minHeight: '38px' }}>
                    {form.slug || <small>Will be generated from title...</small>}
                  </div>
                  <small className="text-muted">This is automatically generated for the website links.</small>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label>Icon Name (Lucide React) *</label>
                  <div className="d-flex align-items-center gap-2">
                    <Button 
                      color="info" 
                      outline 
                      onClick={() => setIconModal(true)}
                      style={{ padding: '0 15px', height: '40px', margin: 0 }}
                      type="button"
                    >
                      {form.icon_name ? (
                        <>
                          <span className="mr-2">{renderIcon(form.icon_name)}</span> 
                          Change Icon
                        </>
                      ) : "Select Icon"}
                    </Button>
                    {form.icon_name && <code className="ml-2">{form.icon_name}</code>}
                  </div>
                </FormGroup>
              </Col>
            </Row>

            <Nav tabs className="mt-4">
              {["EN", "AR", "FR", "Related"].map(lang => (
                <NavItem key={lang}>
                  <NavLink
                    className={activeTab === lang ? "active" : ""}
                    onClick={() => setActiveTab(lang)}
                    style={{ cursor: 'pointer' }}
                  >
                    {lang === "EN" ? "English" : lang === "AR" ? "عربي" : lang === "FR" ? "Français" : "Related Content"}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>

            <TabContent activeTab={activeTab}>
              {renderLangTab("EN")}
              {renderLangTab("AR")}
              {renderLangTab("FR")}
              
              {/* Related Content Tab */}
              <TabPane tabId="Related">
                <Row className="mt-4">
                  <Col md="12">
                    <p className="text-muted text-sm mb-4">Select related items to display at the bottom of the Service card.</p>
                    
                    {/* Related Solutions/Products */}
                    <div className="mb-4 p-3 bg-light border rounded">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="m-0">Related Solutions (Products)</h6>
                        <Button size="sm" color="info" onClick={() => setForm({...form, related_products_en: [...form.related_products_en, {id:'', label:''}]})}>+ Add Solution</Button>
                      </div>
                      {(form.related_products_en || []).map((item, idx) => (
                        <Row key={`prod-${idx}`} className="mb-2">
                          <Col md="11">
                            <Input type="select" value={item.id} onChange={(e) => {
                              const n = [...form.related_products_en];
                              const selectedOpt = options.solutions.find(o => o.id === e.target.value);
                              n[idx].id = selectedOpt?.id || e.target.value;
                              n[idx].label = selectedOpt?.label || e.target.value;
                              setForm({...form, related_products_en: n});
                            }}>
                              <option value="">-- Select a Solution --</option>
                              {options.solutions.map(o => <option key={o.id} value={o.id}>{o.label} (ID: {o.id})</option>)}
                            </Input>
                          </Col>
                          <Col md="1"><Button size="sm" color="danger" onClick={() => { const n=[...form.related_products_en]; n.splice(idx,1); setForm({...form, related_products_en: n}); }}>X</Button></Col>
                        </Row>
                      ))}
                    </div>

                    {/* Related Sectors */}
                    <div className="mb-4 p-3 bg-light border rounded">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="m-0">Related Sectors</h6>
                        <Button size="sm" color="info" onClick={() => setForm({...form, related_sectors_en: [...form.related_sectors_en, {id:'', label:''}]})}>+ Add Sector</Button>
                      </div>
                      {(form.related_sectors_en || []).map((item, idx) => (
                        <Row key={`sec-${idx}`} className="mb-2">
                          <Col md="11">
                            <Input type="select" value={item.id} onChange={(e) => {
                              const n = [...form.related_sectors_en];
                              const selectedOpt = options.sectors.find(o => o.id === e.target.value);
                              n[idx].id = selectedOpt?.id || e.target.value;
                              n[idx].label = selectedOpt?.label || e.target.value;
                              setForm({...form, related_sectors_en: n});
                            }}>
                              <option value="">-- Select a Sector --</option>
                              {options.sectors.map(o => <option key={o.id} value={o.id}>{o.label} (ID: {o.id})</option>)}
                            </Input>
                          </Col>
                          <Col md="1"><Button size="sm" color="danger" onClick={() => { const n=[...form.related_sectors_en]; n.splice(idx,1); setForm({...form, related_sectors_en: n}); }}>X</Button></Col>
                        </Row>
                      ))}
                    </div>

                    {/* Case Studies / Projects */}
                    <div className="mb-2 p-3 bg-light border rounded">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="m-0">Related Projects (Case Studies)</h6>
                        <Button size="sm" color="info" onClick={() => setForm({...form, case_studies_en: [...form.case_studies_en, {id:'', label:''}]})}>+ Add Project</Button>
                      </div>
                      {(form.case_studies_en || []).map((item, idx) => (
                        <Row key={`proj-${idx}`} className="mb-2">
                          <Col md="11">
                            <Input type="select" value={item.id} onChange={(e) => {
                              const n = [...form.case_studies_en];
                              const selectedOpt = options.projects.find(o => o.id === e.target.value);
                              n[idx].id = selectedOpt?.id || e.target.value;
                              n[idx].label = selectedOpt?.label || e.target.value;
                              setForm({...form, case_studies_en: n});
                            }}>
                              <option value="">-- Select a Project --</option>
                              {options.projects.map(o => <option key={o.id} value={o.id}>{o.label} (ID: {o.id})</option>)}
                            </Input>
                          </Col>
                          <Col md="1"><Button size="sm" color="danger" onClick={() => { const n=[...form.case_studies_en]; n.splice(idx,1); setForm({...form, case_studies_en: n}); }}>X</Button></Col>
                        </Row>
                      ))}
                    </div>

                  </Col>
                </Row>
              </TabPane>
            </TabContent>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">{editId ? "Update Service" : "Create Service"}</Button>
            <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Modal isOpen={!!delId} toggle={() => setDelId(null)}>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this service?</ModalBody>
        <ModalFooter><Button color="danger" onClick={del}>Delete</Button><Button color="secondary" onClick={() => setDelId(null)}>Cancel</Button></ModalFooter>
      </Modal>

      {/* Icon Selector Modal */}
      <Modal isOpen={iconModal} toggle={() => setIconModal(false)} size="lg">
        <ModalHeader toggle={() => setIconModal(false)}>Select an Icon</ModalHeader>
        <ModalBody style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <Input 
            placeholder="Search icons... (e.g. HardHat, Zap, Settings)" 
            value={iconSearch} 
            onChange={(e) => setIconSearch(e.target.value)}
            className="mb-4"
          />
          <div className="d-flex flex-wrap gap-2">
            {filteredIcons.map(iconName => (
              <Button
                key={iconName}
                color={form.icon_name === iconName ? "primary" : "secondary"}
                outline={form.icon_name !== iconName}
                className="m-1 p-2 d-flex flex-column align-items-center"
                style={{ width: '100px', height: '80px' }}
                onClick={() => {
                  setForm({ ...form, icon_name: iconName });
                  setIconModal(false);
                }}
              >
                {renderIcon(iconName)}
                <span style={{ fontSize: '10px', marginTop: '5px', wordBreak: 'break-all' }}>{iconName}</span>
              </Button>
            ))}
            {filteredIcons.length === 0 && <p>No icons found</p>}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default AdminServices;

