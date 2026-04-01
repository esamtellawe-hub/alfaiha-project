import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardHeader, CardBody, CardTitle,
  Row, Col, Table, Button, Form, FormGroup, Label, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Nav, NavItem, NavLink, TabContent, TabPane
} from "reactstrap";

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-');    // Replace multiple - with single -
};

const API = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api`;
const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

const EMPTY_SOLUTION = {
  slug: "", category_id: "", image_url: "", datasheet_url: "", msds_url: "", is_featured: false,
  name_en: "", name_ar: "", name_fr: "",
  description_en: "", description_ar: "", description_fr: "",
  uses_en: [], uses_ar: [], uses_fr: [],
  advantages_en: [], advantages_ar: [], advantages_fr: [],
  mixing_ratio_en: "", mixing_ratio_ar: "", mixing_ratio_fr: "",
  coverage_en: "", coverage_ar: "", coverage_fr: "",
  packaging_en: "", packaging_ar: "", packaging_fr: "",
  storage_en: "", storage_ar: "", storage_fr: "",
  shelf_life_en: "", shelf_life_ar: "", shelf_life_fr: ""
};

function AdminSolutions() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(EMPTY_SOLUTION);
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState(false);
  const [delId, setDelId] = useState(null);
  const [msg, setMsg] = useState("");
  const [activeTab, setActiveTab] = useState("General");
  const [datasheetFile, setDatasheetFile] = useState(null);
  const [msdsFile, setMsdsFile] = useState(null);

  const toast = (t) => { setMsg(t); setTimeout(() => setMsg(""), 4000); };
  
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const load = async () => {
    try {
      const [solRes, catRes] = await Promise.all([
        axios.get(`${API}/admin/solutions`, { headers: getHeaders() }),
        axios.get(`${API}/admin/categories-options`, { headers: getHeaders() })
      ]);
      setItems(solRes.data);
      setCategories(catRes.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      const payload = { ...form };
      if (!payload.category_id) payload.category_id = "";
      
      // Append all text fields
      Object.keys(payload).forEach(key => {
        let val = payload[key];
        if (Array.isArray(val)) val = JSON.stringify(val);
        if (val !== null && val !== undefined) {
          formData.append(key, val);
        }
      });
      
      // Append files
      if (datasheetFile) formData.append("datasheet_file", datasheetFile);
      if (msdsFile) formData.append("msds_file", msdsFile);

      const headers = { ...getHeaders(), "Content-Type": "multipart/form-data" };

      if (editId) await axios.put(`${API}/admin/solutions/${editId}`, formData, { headers });
      else await axios.post(`${API}/admin/solutions`, formData, { headers });
      
      setModal(false); 
      setForm(EMPTY_SOLUTION); 
      setEditId(null);
      setDatasheetFile(null);
      setMsdsFile(null);
      load(); 
      toast(editId ? "Updated!" : "Added!");
    } catch (e) { toast("Error: " + (e.response?.data?.error || e.message)); }
  };

  const del = async () => {
    try { await axios.delete(`${API}/admin/solutions/${delId}`, { headers: getHeaders() }); setDelId(null); load(); toast("Deleted!"); }
    catch (e) { toast("Error deleting"); }
  };

  const edit = (item) => {
    const parse = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      if (typeof val === 'string') {
        if (val.trim().startsWith('[') && val.trim().endsWith(']')) {
          try { return JSON.parse(val); } catch (e) { return []; }
        }
        return val.split(',').map(s => s.trim()).filter(s => s.length > 0);
      }
      return [];
    };
    
    setForm({
      ...item,
      category_id: item.category_id || "",
      uses_en: parse(item.uses_en), uses_ar: parse(item.uses_ar), uses_fr: parse(item.uses_fr),
      advantages_en: parse(item.advantages_en), advantages_ar: parse(item.advantages_ar), advantages_fr: parse(item.advantages_fr)
    });
    setEditId(item.id);
    setActiveTab("General");
    setDatasheetFile(null);
    setMsdsFile(null);
    setModal(true);
  };

  const add = () => { 
    setForm(EMPTY_SOLUTION); 
    setEditId(null); 
    setActiveTab("General"); 
    setDatasheetFile(null);
    setMsdsFile(null);
    setModal(true); 
  };

  // --- Helpers for Dynamic String Lists ---
  const handleListChange = (key, index, value) => {
    const newList = [...form[key]];
    newList[index] = value;
    setForm({ ...form, [key]: newList });
  };

  const addToList = (key) => setForm({ ...form, [key]: [...form[key], ""] });

  const removeFromList = (key, index) => {
    const newList = [...form[key]];
    newList.splice(index, 1);
    setForm({ ...form, [key]: newList });
  };

  // Render Language Tabs (EN, AR, FR)
  const renderLangTab = (lang) => {
    const l = lang.toLowerCase();
    const usesKey = `uses_${l}`;
    const advKey = `advantages_${l}`;

    return (
      <TabPane tabId={lang}>
        <Row className="mt-3">
          <Col md="12">
            <FormGroup>
              <label>Product Name ({lang}) *</label>
              <Input 
                required={lang==='EN'} 
                value={form[`name_${l}`] || ""} 
                onChange={(e) => {
                  const val = e.target.value;
                  const newForm = { ...form, [`name_${l}`]: val };
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
        
        <Row>
          <Col md="4"><FormGroup><label>Mixing / Dosage ({lang})</label><Input value={form[`mixing_ratio_${l}`] || ""} onChange={f(`mixing_ratio_${l}`)} /></FormGroup></Col>
          <Col md="4"><FormGroup><label>Coverage ({lang})</label><Input value={form[`coverage_${l}`] || ""} onChange={f(`coverage_${l}`)} /></FormGroup></Col>
          <Col md="4"><FormGroup><label>Packaging ({lang})</label><Input value={form[`packaging_${l}`] || ""} onChange={f(`packaging_${l}`)} /></FormGroup></Col>
        </Row>
        <Row>
          <Col md="6"><FormGroup><label>Storage Details ({lang})</label><Input value={form[`storage_${l}`] || ""} onChange={f(`storage_${l}`)} /></FormGroup></Col>
          <Col md="6"><FormGroup><label>Shelf Life ({lang})</label><Input value={form[`shelf_life_${l}`] || ""} onChange={f(`shelf_life_${l}`)} /></FormGroup></Col>
        </Row>
        <hr />
        
        {/* Uses (List of Strings) */}
        <Row>
          <Col md="6">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6>Uses ({lang})</h6>
              <Button size="sm" color="info" onClick={() => addToList(usesKey)}>+ Add Use</Button>
            </div>
            {(Array.isArray(form[usesKey]) ? form[usesKey] : []).map((useLine, idx) => (
              <Row key={`use-${idx}`} className="align-items-center mb-2">
                <Col md="10">
                  <Input value={useLine} onChange={(e) => handleListChange(usesKey, idx, e.target.value)} />
                </Col>
                <Col md="2">
                  <Button size="sm" color="danger" onClick={() => removeFromList(usesKey, idx)}>X</Button>
                </Col>
              </Row>
            ))}
          </Col>

          {/* Advantages (List of Strings) */}
          <Col md="6">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6>Advantages ({lang})</h6>
              <Button size="sm" color="info" onClick={() => addToList(advKey)}>+ Add Advantage</Button>
            </div>
            {(Array.isArray(form[advKey]) ? form[advKey] : []).map((advLine, idx) => (
              <Row key={`adv-${idx}`} className="align-items-center mb-2">
                <Col md="10">
                  <Input value={advLine} onChange={(e) => handleListChange(advKey, idx, e.target.value)} />
                </Col>
                <Col md="2">
                  <Button size="sm" color="danger" onClick={() => removeFromList(advKey, idx)}>X</Button>
                </Col>
              </Row>
            ))}
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
              <CardTitle tag="h4">Solutions (Products)</CardTitle>
              <Button color="primary" onClick={add}>+ Add Solution</Button>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Name (EN)</th>
                    <th>Category</th>
                    <th>Slug</th>
                    <th>Featured</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((a) => (
                    <tr key={a.id}>
                      <td>{a.name_en}</td>
                      <td>{a.category?.name_en || <span className="text-muted">None</span>}</td>
                      <td>{a.slug}</td>
                      <td>{a.is_featured ? "✔" : ""}</td>
                      <td>
                        <Button size="sm" color="warning" className="mr-1" onClick={() => edit(a)}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => setDelId(a.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                  {!items.length && <tr><td colSpan="5" className="text-center">No solutions found.</td></tr>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={() => setModal(false)} size="lg">
        <ModalHeader toggle={() => setModal(false)}>{editId ? "Edit Solution" : "Add Solution"}</ModalHeader>
        <Form onSubmit={save}>
          <ModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            
            {/* TABS NAVIGATION */}
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
              {/* GENERAL TAB */}
              <TabPane tabId="General">
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>Slug / URL</label>
                      <div className="p-2 border rounded bg-light text-muted" style={{ minHeight: '38px' }}>
                        {form.slug || <small>Will be generated from title...</small>}
                      </div>
                      <small className="text-muted">Automatically generated for website links.</small>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label>Category</label>
                      <Input type="select" value={form.category_id || ""} onChange={f("category_id")}>
                        <option value="">-- None --</option>
                        {categories.map(c => {
                          if (c.children && c.children.length > 0) {
                            return (
                              <optgroup key={c.id} label={c.name_en}>
                                <option value={c.id}>{c.name_en} (Main Category)</option>
                                {c.children.map(sub => (
                                  <option key={sub.id} value={sub.id}>{sub.name_en}</option>
                                ))}
                              </optgroup>
                            );
                          }
                          return <option key={c.id} value={c.id}>{c.name_en}</option>;
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>Image URL</label>
                      <Input value={form.image_url || ""} onChange={f("image_url")} placeholder="/assets/img/product.jpg" />
                    </FormGroup>
                  </Col>
                </Row>
                
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label>Datasheet (TDS) PDF</label>
                      {form.datasheet_url && (
                        <div className="mb-2 d-flex align-items-center">
                          <a href={`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}${form.datasheet_url}`} target="_blank" rel="noreferrer">View Current TDS</a>
                          <Button size="sm" color="danger" className="ml-3 py-0 px-2" style={{marginLeft: '10px'}} onClick={() => setForm({ ...form, datasheet_url: '' })}>X Remove</Button>
                        </div>
                      )}
                      <Input type="file" accept="application/pdf" onChange={(e) => setDatasheetFile(e.target.files[0])} />
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <label>Safety Data Sheet (MSDS) PDF</label>
                      {form.msds_url && (
                        <div className="mb-2 d-flex align-items-center">
                          <a href={`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}${form.msds_url}`} target="_blank" rel="noreferrer">View Current MSDS</a>
                          <Button size="sm" color="danger" className="ml-3 py-0 px-2" style={{marginLeft: '10px'}} onClick={() => setForm({ ...form, msds_url: '' })}>X Remove</Button>
                        </div>
                      )}
                      <Input type="file" accept="application/pdf" onChange={(e) => setMsdsFile(e.target.files[0])} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12" className="mt-2">
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" checked={!!form.is_featured} onChange={f("is_featured")} />{" "}
                        Is Featured Product
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </TabPane>

              {/* LANGUAGE TABS */}
              {renderLangTab("EN")}
              {renderLangTab("AR")}
              {renderLangTab("FR")}

            </TabContent>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">{editId ? "Update Solution" : "Create Solution"}</Button>
            <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Modal isOpen={!!delId} toggle={() => setDelId(null)}>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this solution?</ModalBody>
        <ModalFooter><Button color="danger" onClick={del}>Delete</Button><Button color="secondary" onClick={() => setDelId(null)}>Cancel</Button></ModalFooter>
      </Modal>

    </div>
  );
}

export default AdminSolutions;

