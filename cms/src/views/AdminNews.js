import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardHeader, CardBody, CardTitle,
  Row, Col, Table, Button, Form, FormGroup, Input,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

const API = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api`;
const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });
const EMPTY = { title_en: "", title_ar: "", title_fr: "", content_en: "", content_ar: "", content_fr: "", author: "", type: "Company News", is_published: true, slug: "", publish_date: "", image_url: "", linkedin_url: "", facebook_url: "", instagram_url: "" };

function AdminNews() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState(false);
  const [delId, setDelId] = useState(null);
  const [msg, setMsg] = useState("");

  const toast = (t) => { setMsg(t); setTimeout(() => setMsg(""), 4000); };
  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const load = async () => {
    try { const r = await axios.get(`${API}/admin/news`, { headers: getHeaders() }); setItems(r.data); }
    catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      const slug = form.slug || form.title_en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const payload = { ...form, slug, publish_date: form.publish_date || new Date().toISOString().split("T")[0] };
      if (editId) await axios.put(`${API}/admin/news/${editId}`, payload, { headers: getHeaders() });
      else await axios.post(`${API}/admin/news`, payload, { headers: getHeaders() });
      setModal(false); setForm(EMPTY); setEditId(null); load(); toast(editId ? "Updated!" : "Added!");
    } catch (e) { toast("Error: " + (e.response?.data?.error || e.message)); }
  };

  const del = async () => {
    try { await axios.delete(`${API}/admin/news/${delId}`, { headers: getHeaders() }); setDelId(null); load(); toast("Deleted!"); }
    catch (e) { toast("Error deleting"); }
  };

  const edit = (item) => { 
    setForm({
      ...item,
      title_en: item.title_en || "", title_ar: item.title_ar || "", title_fr: item.title_fr || "",
      content_en: item.content_en || "", content_ar: item.content_ar || "", content_fr: item.content_fr || "",
      author: item.author || "", slug: item.slug || "",
      type: item.type || "Company News",
      image_url: item.image_url || "",
      publish_date: item.publish_date ? item.publish_date.split("T")[0] : "",
      linkedin_url: item.linkedin_url || "", facebook_url: item.facebook_url || "", instagram_url: item.instagram_url || "",
    }); 
    setEditId(item.id); setModal(true); 
  };
  const add  = () => { setForm(EMPTY); setEditId(null); setModal(true); };

  return (
    <div className="content">
      {msg && <div className="alert alert-info">{msg}</div>}
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <CardTitle tag="h4">News Articles</CardTitle>
              <Button color="primary" onClick={add}>+ Add Article</Button>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr><th>#</th><th>Title (EN)</th><th>Type</th><th>Author</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {items.map((a, i) => (
                    <tr key={a.id}>
                      <td>{i+1}</td>
                      <td>{a.title_en}</td>
                      <td>{a.type}</td>
                      <td>{a.author || "—"}</td>
                      <td><span className={`badge badge-${a.is_published ? "success" : "secondary"}`}>{a.is_published ? "Published" : "Draft"}</span></td>
                      <td>
                        <Button size="sm" color="warning" className="mr-1" onClick={() => edit(a)}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => setDelId(a.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                  {!items.length && <tr><td colSpan="6" className="text-center">No articles yet</td></tr>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={() => setModal(false)} size="lg">
        <ModalHeader toggle={() => setModal(false)}>{editId ? "Edit Article" : "Add Article"}</ModalHeader>
        <Form onSubmit={save}>
          <ModalBody>
            <Row>
              <Col md="6"><FormGroup><label>Title (EN) *</label><Input required value={form.title_en} onChange={f("title_en")} /></FormGroup></Col>
              <Col md="6"><FormGroup><label>Title (AR)</label><Input value={form.title_ar} onChange={f("title_ar")} /></FormGroup></Col>
              <Col md="6"><FormGroup><label>Title (FR)</label><Input value={form.title_fr} onChange={f("title_fr")} /></FormGroup></Col>
              <Col md="6"><FormGroup><label>Author</label><Input value={form.author} onChange={f("author")} /></FormGroup></Col>
              <Col md="6"><FormGroup><label>Type</label>
                <Input type="select" value={form.type} onChange={f("type")}>
                  <option>Press Release</option><option>Company News</option><option>Events</option><option>Awards</option>
                </Input>
              </FormGroup></Col>
              <Col md="6"><FormGroup><label>Published</label>
                <Input type="select" value={form.is_published} onChange={e => setForm({...form, is_published: e.target.value === "true"})}>
                  <option value="true">Published</option><option value="false">Draft</option>
                </Input>
              </FormGroup></Col>
              <Col md="12"><FormGroup><label>Content (EN)</label><Input type="textarea" rows="5" value={form.content_en || ""} onChange={f("content_en")} /></FormGroup></Col>
              <Col md="12"><FormGroup><label>Content (AR)</label><Input type="textarea" rows="3" value={form.content_ar || ""} onChange={f("content_ar")} /></FormGroup></Col>
              <Col md="12"><FormGroup><label>Content (FR)</label><Input type="textarea" rows="3" value={form.content_fr || ""} onChange={f("content_fr")} /></FormGroup></Col>
              <Col md="6"><FormGroup><label>Publish Date</label><Input type="date" value={form.publish_date} onChange={f("publish_date")} /></FormGroup></Col>
            </Row>
            <hr />
            <p className="text-muted small mb-2" style={{fontWeight:600}}>🔗 Social Media Post Links (Optional — icons appear on the article card when filled)</p>
            <Row>
              <Col md="4"><FormGroup>
                <label><span style={{color:'#0A66C2'}}>●</span> LinkedIn Post URL</label>
                <Input value={form.linkedin_url} onChange={f("linkedin_url")} placeholder="https://linkedin.com/posts/..." />
              </FormGroup></Col>
              <Col md="4"><FormGroup>
                <label><span style={{color:'#1877F2'}}>●</span> Facebook Post URL</label>
                <Input value={form.facebook_url} onChange={f("facebook_url")} placeholder="https://facebook.com/..." />
              </FormGroup></Col>
              <Col md="4"><FormGroup>
                <label><span style={{color:'#E4405F'}}>●</span> Instagram Post URL</label>
                <Input value={form.instagram_url} onChange={f("instagram_url")} placeholder="https://instagram.com/p/..." />
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
        <ModalBody>Are you sure you want to delete this article?</ModalBody>
        <ModalFooter><Button color="danger" onClick={del}>Delete</Button><Button color="secondary" onClick={() => setDelId(null)}>Cancel</Button></ModalFooter>
      </Modal>
    </div>
  );
}

export default AdminNews;

