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
  title_en: "", title_ar: "", title_fr: "",
  description_en: "", description_ar: "", description_fr: "",
  
  extra_data: "",
  stats_projects_en: "", stats_projects_ar: "", stats_projects_fr: "",
  stats_countries_en: "", stats_countries_ar: "", stats_countries_fr: "",
  stats_sectors_en: "", stats_sectors_ar: "", stats_sectors_fr: ""
};

function AdminProjectSections() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState("");

  const toast = (t) => { setMsg(t); setTimeout(() => setMsg(""), 4000); };
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const load = async () => {
    try { const r = await axios.get(`${API}/admin/projects-sections`, { headers: getHeaders() }); setItems(r.data); }
    catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      if (payload.section_key === 'hero') {
        payload.extra_data = JSON.stringify({
          stats_projects_en: payload.stats_projects_en, stats_projects_ar: payload.stats_projects_ar, stats_projects_fr: payload.stats_projects_fr,
          stats_countries_en: payload.stats_countries_en, stats_countries_ar: payload.stats_countries_ar, stats_countries_fr: payload.stats_countries_fr,
          stats_sectors_en: payload.stats_sectors_en, stats_sectors_ar: payload.stats_sectors_ar, stats_sectors_fr: payload.stats_sectors_fr
        });
      } else {
        payload.extra_data = "{}";
      }
      if (editId) await axios.put(`${API}/admin/projects-sections/${editId}`, payload, { headers: getHeaders() });
      else await axios.post(`${API}/admin/projects-sections`, payload, { headers: getHeaders() });
      setModal(false); setForm(EMPTY); setEditId(null); load(); toast(editId ? "Updated!" : "Added!");
    } catch (e) { toast("Error: " + (e.response?.data?.error || e.message)); }
  };

  const edit = (item) => { 
    let parsed = {};
    if (item.extra_data) {
      if (typeof item.extra_data === 'string') {
        try { parsed = JSON.parse(item.extra_data); } catch(e){}
      } else {
        parsed = item.extra_data;
      }
      if (typeof parsed === 'string') { // double encoded sometimes
        try { parsed = JSON.parse(parsed); } catch(e){}
      }
    }

    const parse = (val) => val ? val : "";

    setForm({ 
      ...item, 
      title_en: parse(item.title_en),
      title_ar: parse(item.title_ar),
      title_fr: parse(item.title_fr),
      description_en: parse(item.description_en),
      description_ar: parse(item.description_ar),
      description_fr: parse(item.description_fr),
  
      stats_projects_en: parse(parsed.stats_projects_en),
      stats_projects_ar: parse(parsed.stats_projects_ar),
      stats_projects_fr: parse(parsed.stats_projects_fr),
      stats_countries_en: parse(parsed.stats_countries_en),
      stats_countries_ar: parse(parsed.stats_countries_ar),
      stats_countries_fr: parse(parsed.stats_countries_fr),
      stats_sectors_en: parse(parsed.stats_sectors_en),
      stats_sectors_ar: parse(parsed.stats_sectors_ar),
      stats_sectors_fr: parse(parsed.stats_sectors_fr),
    }); 
    setEditId(item.id); 
    setModal(true); 
  };
  
  const add = () => { setForm(EMPTY); setEditId(null); setModal(true); };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <CardTitle tag="h4">Projects Page Static Content</CardTitle>
              
            </CardHeader>
            <CardBody>
              {msg && <div className="alert alert-info">{msg}</div>}
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Section Key</th>
                    <th>Title (EN)</th>
                    <th>Description (EN)</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((i) => (
                    <tr key={i.id}>
                      <td><code className="text-primary">{i.section_key}</code></td>
                      <td>{i.title_en || '-'}</td>
                      <td>{i.description_en ? i.description_en.substring(0, 50) + '...' : '-'}</td>
                      <td className="text-right">
                        <Button size="sm" color="warning" className="mr-2" onClick={() => edit(i)}>Edit</Button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && <tr><td colSpan="4" className="text-center">No sections found.</td></tr>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={() => setModal(!modal)} size="lg">
        <Form onSubmit={save}>
          <ModalHeader toggle={() => setModal(!modal)}>{editId ? "Edit Section" : "Add Section"}</ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <FormGroup>
                  <label>Section Key (Must Match Frontend exactly) *</label>
                  <Input value={form.section_key} onChange={f("section_key")} required placeholder="e.g. hero" disabled={!!editId} />
                </FormGroup>
              </Col>
            </Row>
            
            <Row>
              <Col md="4"><FormGroup><label>Title (EN)</label><Input value={form.title_en} onChange={f("title_en")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Title (AR)</label><Input value={form.title_ar} onChange={f("title_ar")} dir="rtl" /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Title (FR)</label><Input value={form.title_fr} onChange={f("title_fr")} /></FormGroup></Col>
            </Row>

            <Row>
              <Col md="4"><FormGroup><label>Description (EN)</label><Input type="textarea" value={form.description_en} onChange={f("description_en")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Description (AR)</label><Input type="textarea" value={form.description_ar} onChange={f("description_ar")} dir="rtl" /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Description (FR)</label><Input type="textarea" value={form.description_fr} onChange={f("description_fr")} /></FormGroup></Col>
            </Row>

            

            {form.section_key === 'hero' && (
              <>
                <hr />
                <h6 className="mt-3 mb-3">Hero Statistics Labels</h6>
                <Row>
                  <Col md="4"><FormGroup><label>Projects Stat Label (EN)</label><Input value={form.stats_projects_en} onChange={f("stats_projects_en")} placeholder="e.g. Projects" /></FormGroup></Col>
                  <Col md="4"><FormGroup><label>Projects Stat Label (AR)</label><Input value={form.stats_projects_ar} onChange={f("stats_projects_ar")} dir="rtl" placeholder="مشاريع" /></FormGroup></Col>
                  <Col md="4"><FormGroup><label>Projects Stat Label (FR)</label><Input value={form.stats_projects_fr} onChange={f("stats_projects_fr")} placeholder="Projets" /></FormGroup></Col>
                </Row>
                <Row>
                  <Col md="4"><FormGroup><label>Countries Stat Label (EN)</label><Input value={form.stats_countries_en} onChange={f("stats_countries_en")} placeholder="e.g. Countries" /></FormGroup></Col>
                  <Col md="4"><FormGroup><label>Countries Stat Label (AR)</label><Input value={form.stats_countries_ar} onChange={f("stats_countries_ar")} dir="rtl" placeholder="دول" /></FormGroup></Col>
                  <Col md="4"><FormGroup><label>Countries Stat Label (FR)</label><Input value={form.stats_countries_fr} onChange={f("stats_countries_fr")} placeholder="Pays" /></FormGroup></Col>
                </Row>
                <Row>
                  <Col md="4"><FormGroup><label>Sectors Stat Label (EN)</label><Input value={form.stats_sectors_en} onChange={f("stats_sectors_en")} placeholder="e.g. Sectors" /></FormGroup></Col>
                  <Col md="4"><FormGroup><label>Sectors Stat Label (AR)</label><Input value={form.stats_sectors_ar} onChange={f("stats_sectors_ar")} dir="rtl" placeholder="قطاعات" /></FormGroup></Col>
                  <Col md="4"><FormGroup><label>Sectors Stat Label (FR)</label><Input value={form.stats_sectors_fr} onChange={f("stats_sectors_fr")} placeholder="Secteurs" /></FormGroup></Col>
                </Row>
              </>
            )}

          </ModalBody>
          <ModalFooter>
            <Button color="secondary" type="button" onClick={() => setModal(false)}>Cancel</Button>
            <Button color="primary" type="submit">Save</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminProjectSections;

