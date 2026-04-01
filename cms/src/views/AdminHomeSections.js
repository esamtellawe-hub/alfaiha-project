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
  section_key: "",
  image_url: "", image_file: null, icon_name: "", link_url: "",
  title_en: "", title_ar: "", title_fr: "",
  description_en: "", description_ar: "", description_fr: "",
  btn_text_en: "", btn_text_ar: "", btn_text_fr: "",
  extra_data: "",
  stat_value: "", stat_suffix: "",
  core_en: [""], core_ar: [""], core_fr: [""],
  products_en: [], products_ar: [], products_fr: [] // will store: [{ solution_id: 1 }, { solution_id: 2 }]
};

function AdminHomeSections() {
  const [items, setItems] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState("");

  const toast = (t) => { setMsg(t); setTimeout(() => setMsg(""), 4000); };
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const load = async () => {
    try { 
      const [secRes, solRes] = await Promise.all([
        axios.get(`${API}/admin/home-sections`, { headers: getHeaders() }),
        axios.get(`${API}/admin/solutions`, { headers: getHeaders() })
      ]);
      setItems(secRes.data); 
      setSolutions(solRes.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      const payload = { ...form };
      const isStat = payload.section_key?.startsWith('stat_');
      const isCore = payload.section_key === 'engineering_confidence';
      const isFeatured = payload.section_key === 'featured_products';

      if (isStat) {
        payload.extra_data = { value: payload.stat_value, suffix: payload.stat_suffix };
      } else if (isCore) {
        payload.extra_data = {
          core_values_en: payload.core_en.filter(x => x.trim() !== ""),
          core_values_ar: payload.core_ar.filter(x => x.trim() !== ""),
          core_values_fr: payload.core_fr.filter(x => x.trim() !== "")
        };
      } else if (isFeatured) {
        payload.extra_data = {
          products_en: payload.products_en.filter(p => !!p.solution_id),
          products_ar: payload.products_ar.filter(p => !!p.solution_id),
          products_fr: payload.products_fr.filter(p => !!p.solution_id)
        };
      } else if (typeof payload.extra_data === 'string' && payload.extra_data) {
        try { payload.extra_data = JSON.parse(payload.extra_data); } catch (e) {} 
      }
      
      // Cleanup extra fields before adding to FormData
      const cleanPayload = { ...payload };
      delete cleanPayload.stat_value;
      delete cleanPayload.stat_suffix;
      delete cleanPayload.core_en;
      delete cleanPayload.core_ar;
      delete cleanPayload.core_fr;
      delete cleanPayload.products_en;
      delete cleanPayload.products_ar;
      delete cleanPayload.products_fr;
      delete cleanPayload.image_file; // Handled separately

      // Add all fields to FormData
      Object.keys(cleanPayload).forEach(key => {
        if (cleanPayload[key] !== null && cleanPayload[key] !== undefined) {
          const val = typeof cleanPayload[key] === 'object' ? JSON.stringify(cleanPayload[key]) : cleanPayload[key];
          formData.append(key, val);
        }
      });

      if (form.image_file) {
        formData.append('image_file', form.image_file);
      }

      const config = {
        headers: { ...getHeaders(), "Content-Type": "multipart/form-data" }
      };

      if (editId) await axios.put(`${API}/admin/home-sections/${editId}`, formData, config);
      else await axios.post(`${API}/admin/home-sections`, formData, config);
      
      setModal(false); setForm(EMPTY); setEditId(null); load(); toast(editId ? "Updated!" : "Added!");
    } catch (e) { toast("Error: " + (e.response?.data?.error || e.message)); }
  };

  const edit = (item) => { 
    let extra_str = "";
    let statVal = "", statSuf = "";
    let cen = [""], car = [""], cfr = [""];
    let pen = [], par = [], pfr = [];
    
    if (item.extra_data) {
      let parsed = item.extra_data;
      if (typeof parsed === 'string') {
        try { parsed = JSON.parse(parsed); } catch(e){}
      }
      if (typeof parsed === 'string') {
        try { parsed = JSON.parse(parsed); } catch(e){}
      }
      
      if (item.section_key?.startsWith('stat_')) {
        statVal = parsed?.value || "";
        statSuf = parsed?.suffix || "";
      } else if (item.section_key === 'engineering_confidence') {
        cen = parsed?.core_values_en?.length ? parsed.core_values_en : [""];
        car = parsed?.core_values_ar?.length ? parsed.core_values_ar : [""];
        cfr = parsed?.core_values_fr?.length ? parsed.core_values_fr : [""];
      } else if (item.section_key === 'featured_products') {
        pen = parsed?.products_en || [];
        par = parsed?.products_ar || [];
        pfr = parsed?.products_fr || [];
      } else {
        extra_str = JSON.stringify(parsed, null, 2);
      }
    }

    setForm({ 
      ...item, 
      extra_data: extra_str,
      stat_value: statVal,
      stat_suffix: statSuf,
      core_en: cen, core_ar: car, core_fr: cfr,
      products_en: pen, products_ar: par, products_fr: pfr
    }); 
    setEditId(item.id); 
    setModal(true); 
  };
  
  const add = () => { setForm(EMPTY); setEditId(null); setModal(true); };

  const isStat = form.section_key?.startsWith('stat_');
  const isCore = form.section_key === 'engineering_confidence';
  const isFeatured = form.section_key === 'featured_products';

  const updateArray = (lang, index, val) => {
    const arr = [...form[`core_${lang}`]];
    arr[index] = val;
    setForm({...form, [`core_${lang}`]: arr});
  };
  const addArrayItem = (lang) => setForm({...form, [`core_${lang}`]: [...form[`core_${lang}`], ""]});
  const removeArrayItem = (lang, index) => {
    const arr = [...form[`core_${lang}`]];
    arr.splice(index, 1);
    setForm({...form, [`core_${lang}`]: arr});
  };

  const updateProduct = (lang, index, field, val) => {
    const arr = [...form[`products_${lang}`]];
    arr[index][field] = val;
    setForm({...form, [`products_${lang}`]: arr});
  };
  const addProduct = (lang) => setForm({...form, [`products_${lang}`]: [...form[`products_${lang}`], { solution_id: "" }]});
  const removeProduct = (lang, index) => {
    const arr = [...form[`products_${lang}`]];
    arr.splice(index, 1);
    setForm({...form, [`products_${lang}`]: arr});
  };

  return (
    <div className="content">
      {msg && <div className="alert alert-info">{msg}</div>}
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <CardTitle tag="h4">Home Page Sections</CardTitle>
              <Button color="primary" onClick={add}>+ Add Section</Button>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr><th>Key</th><th>Title (EN)</th><th>Icon / Image</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {items.map((a) => (
                    <tr key={a.id}>
                      <td><span className="badge badge-primary">{a.section_key}</span></td>
                      <td>{a.title_en || "—"}</td>
                      <td>{a.icon_name || a.image_url || "—"}</td>
                      <td>
                        <Button size="sm" color="warning" onClick={() => edit(a)}>Edit</Button>
                      </td>
                    </tr>
                  ))}
                  {!items.length && <tr><td colSpan="4" className="text-center">No sections yet. Add sections like 'about_us' or 'stats'.</td></tr>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={() => setModal(false)} size="lg">
        <ModalHeader toggle={() => setModal(false)}>{editId ? "Edit Section" : "Add Section"}</ModalHeader>
        <Form onSubmit={save}>
          <ModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Row>
              <Col md="12"><FormGroup><label>Section Key * (e.g., about_us, stats, partners)</label><Input required value={form.section_key || ""} onChange={f("section_key")} disabled={!!editId} /></FormGroup></Col>
              
              <Col md="4"><FormGroup><label>Title (EN)</label><Input value={form.title_en || ""} onChange={f("title_en")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Title (AR)</label><Input value={form.title_ar || ""} onChange={f("title_ar")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Title (FR)</label><Input value={form.title_fr || ""} onChange={f("title_fr")} /></FormGroup></Col>

              <Col md="12"><FormGroup><label>Description (EN)</label><Input type="textarea" rows="2" value={form.description_en || ""} onChange={f("description_en")} /></FormGroup></Col>
              <Col md="12"><FormGroup><label>Description (AR)</label><Input type="textarea" rows="2" value={form.description_ar || ""} onChange={f("description_ar")} /></FormGroup></Col>
              <Col md="12"><FormGroup><label>Description (FR)</label><Input type="textarea" rows="2" value={form.description_fr || ""} onChange={f("description_fr")} /></FormGroup></Col>

              {isStat ? (
                <>
                  <Col md="6"><FormGroup><label>Stat Value (Number)</label><Input type="number" value={form.stat_value || 0} onChange={f("stat_value")} /></FormGroup></Col>
                  <Col md="6"><FormGroup><label>Stat Suffix (e.g. +, M+)</label><Input value={form.stat_suffix || ""} onChange={f("stat_suffix")} /></FormGroup></Col>
                </>
              ) : isCore ? (
                <Col md="12">
                  <h6 className="mt-3">Core Values (Engineering Confidence)</h6>
                  {['en', 'ar', 'fr'].map(lang => (
                    <div key={lang} className="mb-3 p-3 border rounded">
                      <label className="text-uppercase font-weight-bold">Values ({lang})</label>
                      {form[`core_${lang}`].map((val, i) => (
                        <div key={i} className="d-flex mb-2">
                          <Input value={val} onChange={e => updateArray(lang, i, e.target.value)} />
                          <Button color="danger" size="sm" className="ml-2" onClick={() => removeArrayItem(lang, i)}>X</Button>
                        </div>
                      ))}
                      <Button size="sm" color="info" onClick={() => addArrayItem(lang)}>+ Add Value</Button>
                    </div>
                  ))}
                </Col>
              ) : isFeatured ? (
                <Col md="12">
                  <h6 className="mt-3 text-primary font-weight-bold">Featured Products List</h6>
                  {['en', 'ar', 'fr'].map(lang => (
                    <div key={lang} className="mb-4 p-3 border rounded bg-light">
                      <label className="text-uppercase font-weight-bold text-info">Language: {lang}</label>
                      {(form[`products_${lang}`] || []).map((prod, i) => (
                        <div key={i} className="mb-3 p-3 bg-white border rounded position-relative">
                          <Button color="danger" size="sm" onClick={() => removeProduct(lang, i)} style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>X Remove</Button>
                          <Row>
                            <Col md="10">
                              <FormGroup>
                                <label>Select Product (Solution) from Database</label>
                                <Input type="select" value={prod.solution_id || ""} onChange={e => updateProduct(lang, i, 'solution_id', e.target.value)}>
                                  <option value="">-- Choose a Product --</option>
                                  {solutions.map(s => (
                                    <option key={s.id} value={s.id}>
                                      {s.name_en} {s.category ? `(${s.category.name_en})` : ""}
                                    </option>
                                  ))}
                                </Input>
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                      ))}
                      <Button size="sm" color="info" onClick={() => addProduct(lang)}>+ Add Product ({lang.toUpperCase()})</Button>
                    </div>
                  ))}
                </Col>
              ) : (
                <Col md="12"><FormGroup><label>Extra Data (Advanced JSON)</label><Input type="textarea" rows="4" value={form.extra_data || ""} onChange={f("extra_data")} placeholder='{"key": "value"}' /></FormGroup></Col>
              )}
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">{editId ? "Update" : "Add"}</Button>
            <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminHomeSections;


