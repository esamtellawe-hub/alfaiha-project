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
  image_url: "",
  title_en: "", title_ar: "", title_fr: "",
  subtitle_en: "", subtitle_ar: "", subtitle_fr: "",
  highlight_text_en: "", highlight_text_ar: "", highlight_text_fr: "",
  description_en: "", description_ar: "", description_fr: "",
  btn_1_text_en: "", btn_1_text_ar: "", btn_1_text_fr: "", btn_1_link: "",
  btn_2_text_en: "", btn_2_text_ar: "", btn_2_text_fr: "", btn_2_link: "",
  order: 0, is_active: true 
};

function AdminHomeHero() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState(false);
  const [delId, setDelId] = useState(null);
  const [msg, setMsg] = useState("");

  const toast = (t) => { setMsg(t); setTimeout(() => setMsg(""), 4000); };
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const load = async () => {
    try { const r = await axios.get(`${API}/admin/home-hero`, { headers: getHeaders() }); setItems(r.data); }
    catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

const save = async (e) => {
    e.preventDefault();
    try {
      // 1. إنشاء FormData عشان نقدر نبعت ملفات
      const formData = new FormData();
      
      // 2. لف على كل الداتا اللي بالـ form وضيفها للـ formData
      Object.keys(form).forEach(key => {
        // إذا الحقل مش فاضي، ضيفه
        if (form[key] !== null && form[key] !== undefined) {
           formData.append(key, form[key]);
        }
      });

      // 3. تحديد الهيدر المناسب للملفات مع التوكن تبعك
      const config = {
        headers: {
          ...getHeaders(),
          "Content-Type": "multipart/form-data" // مهم جداً عشان الباك إند يفهم إنه في ملف
        }
      };

      // 4. الإرسال للباك إند
      if (editId) {
        await axios.put(`${API}/admin/home-hero/${editId}`, formData, config);
      } else {
        await axios.post(`${API}/admin/home-hero`, formData, config);
      }
      
      setModal(false); 
      setForm(EMPTY); 
      setEditId(null); 
      load(); 
      toast(editId ? "Updated!" : "Added!");
    } catch (e) { 
      toast("Error: " + (e.response?.data?.error || e.message)); 
    }
  };

  const del = async () => {
    try { await axios.delete(`${API}/admin/home-hero/${delId}`, { headers: getHeaders() }); setDelId(null); load(); toast("Deleted!"); }
    catch (e) { toast("Error deleting"); }
  };

  const edit = (item) => { setForm(item); setEditId(item.id); setModal(true); };
  const add  = () => { setForm(EMPTY); setEditId(null); setModal(true); };

  return (
    <div className="content">
      {msg && <div className="alert alert-info">{msg}</div>}
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <CardTitle tag="h4">Home Hero Slides</CardTitle>
              <Button color="primary" onClick={add}>+ Add Slide</Button>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr><th>#</th><th>Image</th><th>Title (EN)</th><th>Order</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {items.map((a, i) => (
                    <tr key={a.id}>
                      <td>{i+1}</td>
                      <td>{a.image_url ? <img src={a.image_url.startsWith('http') ? a.image_url : `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}${a.image_url}`} style={{ height: "40px", borderRadius: "4px" }} alt="slide" /> : "—"}</td>
                      <td>{a.title_en}</td>
                      <td>{a.order}</td>
                      <td><span className={`badge badge-${a.is_active ? "success" : "secondary"}`}>{a.is_active ? "Active" : "Inactive"}</span></td>
                      <td>
                        <Button size="sm" color="warning" className="mr-1" onClick={() => edit(a)}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => setDelId(a.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                  {!items.length && <tr><td colSpan="6" className="text-center">No slides yet</td></tr>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={() => setModal(false)} size="lg">
        <ModalHeader toggle={() => setModal(false)}>{editId ? "Edit Slide" : "Add Slide"}</ModalHeader>
        <Form onSubmit={save}>
          <ModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Row>
              <Col md="12">
  <FormGroup>
    <label>Upload Image *</label>
    <Input 
      type="file" 
      accept="image/*" 
      onChange={(e) => setForm({ ...form, image_file: e.target.files[0] })} 
    />
  </FormGroup>
</Col>
              
              <Col md="4"><FormGroup><label>Title (EN) *</label><Input required value={form.title_en || ""} onChange={f("title_en")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Title (AR) *</label><Input required value={form.title_ar || ""} onChange={f("title_ar")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Title (FR)</label><Input value={form.title_fr || ""} onChange={f("title_fr")} /></FormGroup></Col>

              <Col md="4"><FormGroup><label>Subtitle (EN)</label><Input value={form.subtitle_en || ""} onChange={f("subtitle_en")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Subtitle (AR)</label><Input value={form.subtitle_ar || ""} onChange={f("subtitle_ar")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Subtitle (FR)</label><Input value={form.subtitle_fr || ""} onChange={f("subtitle_fr")} /></FormGroup></Col>
              
              <Col md="4"><FormGroup><label>Highlight Text (EN)</label><Input value={form.highlight_text_en || ""} onChange={f("highlight_text_en")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Highlight Text (AR)</label><Input value={form.highlight_text_ar || ""} onChange={f("highlight_text_ar")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Highlight Text (FR)</label><Input value={form.highlight_text_fr || ""} onChange={f("highlight_text_fr")} /></FormGroup></Col>

              <Col md="12"><FormGroup><label>Description (EN)</label><Input type="textarea" rows="2" value={form.description_en || ""} onChange={f("description_en")} /></FormGroup></Col>
              <Col md="12"><FormGroup><label>Description (AR)</label><Input type="textarea" rows="2" value={form.description_ar || ""} onChange={f("description_ar")} /></FormGroup></Col>
              <Col md="12"><FormGroup><label>Description (FR)</label><Input type="textarea" rows="2" value={form.description_fr || ""} onChange={f("description_fr")} /></FormGroup></Col>

              <Col md="4"><FormGroup><label>Btn 1 Text (EN)</label><Input value={form.btn_1_text_en || ""} onChange={f("btn_1_text_en")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Btn 1 Text (AR)</label><Input value={form.btn_1_text_ar || ""} onChange={f("btn_1_text_ar")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Btn 1 Text (FR)</label><Input value={form.btn_1_text_fr || ""} onChange={f("btn_1_text_fr")} /></FormGroup></Col>
              <Col md="12"><FormGroup><label>Btn 1 Link</label><Input value={form.btn_1_link || ""} onChange={f("btn_1_link")} /></FormGroup></Col>

              <Col md="4"><FormGroup><label>Btn 2 Text (EN)</label><Input value={form.btn_2_text_en || ""} onChange={f("btn_2_text_en")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Btn 2 Text (AR)</label><Input value={form.btn_2_text_ar || ""} onChange={f("btn_2_text_ar")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Btn 2 Text (FR)</label><Input value={form.btn_2_text_fr || ""} onChange={f("btn_2_text_fr")} /></FormGroup></Col>
              <Col md="12"><FormGroup><label>Btn 2 Link</label><Input value={form.btn_2_link || ""} onChange={f("btn_2_link")} /></FormGroup></Col>

              <Col md="6"><FormGroup><label>Order</label><Input type="number" value={form.order || 0} onChange={f("order")} /></FormGroup></Col>
              <Col md="6"><FormGroup><label>Status</label>
                <Input type="select" value={form.is_active === null ? "true" : String(form.is_active)} onChange={e => setForm({...form, is_active: e.target.value === "true"})}>
                  <option value="true">Active</option><option value="false">Inactive</option>
                </Input>
              </FormGroup></Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">{editId ? "Update" : "Add"}</Button>
            <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Modal isOpen={!!delId} toggle={() => setDelId(null)}>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this slide?</ModalBody>
        <ModalFooter><Button color="danger" onClick={del}>Delete</Button><Button color="secondary" onClick={() => setDelId(null)}>Cancel</Button></ModalFooter>
      </Modal>
    </div>
  );
}

export default AdminHomeHero;

