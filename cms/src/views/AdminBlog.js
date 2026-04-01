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
  title_en: "", title_ar: "", title_fr: "", 
  content_en: "", content_ar: "", content_fr: "", 
  excerpt_en: "", excerpt_ar: "", excerpt_fr: "", 
  author: "", 
  category_en: "", category_ar: "", category_fr: "", 
  read_time: "", is_published: true, slug: "",
  image_url: "", imageFile: null 
};

function AdminBlog() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState(false);
  const [delId, setDelId] = useState(null);
  const [msg, setMsg] = useState("");

  const toast = (t) => { setMsg(t); setTimeout(() => setMsg(""), 4000); };
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const load = async () => {
    try { const r = await axios.get(`${API}/admin/blog`, { headers: getHeaders() }); setItems(r.data); }
    catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      const slug = form.slug || form.title_en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

      const formData = new FormData();
      formData.append("title_en", form.title_en || "");
      formData.append("title_ar", form.title_ar || "");
      formData.append("title_fr", form.title_fr || "");
      formData.append("category_en", form.category_en || "");
      formData.append("category_ar", form.category_ar || "");
      formData.append("category_fr", form.category_fr || "");
      formData.append("content_en", form.content_en || "");
      formData.append("content_ar", form.content_ar || "");
      formData.append("content_fr", form.content_fr || "");
      formData.append("excerpt_en", form.excerpt_en || "");
      formData.append("excerpt_ar", form.excerpt_ar || "");
      formData.append("excerpt_fr", form.excerpt_fr || "");
      formData.append("author", form.author || "");
      formData.append("read_time", form.read_time || "");
      formData.append("is_published", form.is_published);
      formData.append("slug", slug);
      formData.append("publish_date", form.publish_date || new Date().toISOString().split("T")[0]);
      
      if (form.imageFile) {
        formData.append("image", form.imageFile);
      } else if (form.image_url) {
        formData.append("image_url", form.image_url);
      }

      const config = { headers: { ...getHeaders(), 'Content-Type': 'multipart/form-data' } };

      if (editId) await axios.put(`${API}/admin/blog/${editId}`, formData, config);
      else await axios.post(`${API}/admin/blog`, formData, config);
      
      setModal(false); setForm(EMPTY); setEditId(null); load(); toast(editId ? "Updated!" : "Added!");
    } catch (e) { toast("Error: " + (e.response?.data?.error || e.message)); }
  };

  const del = async () => {
    try { await axios.delete(`${API}/admin/blog/${delId}`, { headers: getHeaders() }); setDelId(null); load(); toast("Deleted!"); }
    catch (e) { toast("Error deleting"); }
  };

  const edit = (item) => { setForm({...item, imageFile: null}); setEditId(item.id); setModal(true); };
  const add  = () => { setForm(EMPTY); setEditId(null); setModal(true); };

  return (
    <div className="content">
      {msg && <div className="alert alert-info">{msg}</div>}
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <CardTitle tag="h4">Blog Posts</CardTitle>
              <Button color="primary" onClick={add}>+ Add Post</Button>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr><th>#</th><th>Title (EN)</th><th>Category</th><th>Author</th><th>Read Time</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {items.map((a, i) => (
                    <tr key={a.id}>
                      <td>{i+1}</td>
                      <td>{a.title_en}</td>
                      <td>{a.category_en || "—"}</td>
                      <td>{a.author || "—"}</td>
                      <td>{a.read_time || "—"}</td>
                      <td><span className={`badge badge-${a.is_published ? "success" : "secondary"}`}>{a.is_published ? "Published" : "Draft"}</span></td>
                      <td>
                        <Button size="sm" color="warning" className="mr-1" onClick={() => edit(a)}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => setDelId(a.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                  {!items.length && <tr><td colSpan="7" className="text-center">No blog posts yet</td></tr>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={() => setModal(false)} size="lg">
        <ModalHeader toggle={() => setModal(false)}>{editId ? "Edit Post" : "Add Post"}</ModalHeader>
        <Form onSubmit={save}>
          <ModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Row>
              <Col md="4"><FormGroup><label>Title (EN) *</label><Input required value={form.title_en || ""} onChange={f("title_en")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Title (AR)</label><Input value={form.title_ar || ""} onChange={f("title_ar")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Title (FR)</label><Input value={form.title_fr || ""} onChange={f("title_fr")} /></FormGroup></Col>

              <Col md="4"><FormGroup><label>Category (EN)</label><Input value={form.category_en || ""} onChange={f("category_en")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Category (AR)</label><Input value={form.category_ar || ""} onChange={f("category_ar")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Category (FR)</label><Input value={form.category_fr || ""} onChange={f("category_fr")} /></FormGroup></Col>

              <Col md="4"><FormGroup><label>Author</label><Input value={form.author || ""} onChange={f("author")} /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Read Time</label><Input value={form.read_time || ""} onChange={f("read_time")} placeholder="5 min read" /></FormGroup></Col>
              <Col md="4"><FormGroup><label>Status</label>
                <Input type="select" value={form.is_published} onChange={e => setForm({...form, is_published: e.target.value === "true"})}>
                  <option value="true">Published</option><option value="false">Draft</option>
                </Input>
              </FormGroup></Col>
              
              <Col md="12"><FormGroup><label>Excerpt (EN)</label><Input type="textarea" rows="2" value={form.excerpt_en || ""} onChange={f("excerpt_en")} /></FormGroup></Col>
              <Col md="12"><FormGroup><label>Excerpt (AR)</label><Input type="textarea" rows="2" value={form.excerpt_ar || ""} onChange={f("excerpt_ar")} /></FormGroup></Col>
              <Col md="12"><FormGroup><label>Excerpt (FR)</label><Input type="textarea" rows="2" value={form.excerpt_fr || ""} onChange={f("excerpt_fr")} /></FormGroup></Col>

              <Col md="12"><FormGroup><label>Content (EN)</label><Input type="textarea" rows="4" value={form.content_en || ""} onChange={f("content_en")} /></FormGroup></Col>
              <Col md="12"><FormGroup><label>Content (AR)</label><Input type="textarea" rows="4" value={form.content_ar || ""} onChange={f("content_ar")} /></FormGroup></Col>
              <Col md="12"><FormGroup><label>Content (FR)</label><Input type="textarea" rows="4" value={form.content_fr || ""} onChange={f("content_fr")} /></FormGroup></Col>

              <Col md="6">
                <FormGroup>
                  <label>Post Image</label>
                  <Input type="file" accept="image/*" onChange={e => setForm({...form, imageFile: e.target.files[0]})} />
                  {form.image_url && !form.imageFile && <small className="text-muted d-block mt-1">Current: <a href={`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}${form.image_url}`} target="_blank" rel="noreferrer">View Image</a></small>}
                </FormGroup>
              </Col>
              <Col md="6"><FormGroup><label>Publish Date</label><Input type="date" value={form.publish_date || (new Date().toISOString().split("T")[0])} onChange={f("publish_date")} /></FormGroup></Col>
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
        <ModalBody>Are you sure you want to delete this post?</ModalBody>
        <ModalFooter><Button color="danger" onClick={del}>Delete</Button><Button color="secondary" onClick={() => setDelId(null)}>Cancel</Button></ModalFooter>
      </Modal>
    </div>
  );
}

export default AdminBlog;

