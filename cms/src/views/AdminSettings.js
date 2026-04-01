import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardHeader, CardBody, CardTitle,
  Row, Col, Table, Button, Form, FormGroup, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  TabContent, TabPane, Nav, NavItem, NavLink
} from "reactstrap";

const API = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api`;
const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

const SETTING_KEYS = [
  { key: "site_logo", label: "Site Logo URL", type: "text", desc: "e.g. /images/logo.png" },
  { key: "site_favicon", label: "Favicon URL", type: "text", desc: "e.g. /favicon.ico" },
  { key: "contact_email", label: "Contact Email", type: "text", desc: "e.g. info@alfaiha.com" },
  { key: "contact_phone", label: "Contact Phone", type: "text", desc: "e.g. +962 6 123 4567" },
  { key: "linkedin_url", label: "LinkedIn URL", type: "text", desc: "https://linkedin.com/..." },
  { key: "facebook_url", label: "Facebook URL", type: "text", desc: "https://facebook.com/..." },
  { key: "instagram_url", label: "Instagram URL", type: "text", desc: "https://instagram.com/..." },
  { key: "twitter_url", label: "Twitter URL", type: "text", desc: "https://twitter.com/..." },
];

function AdminSettings() {
  const [settings, setSettings] = useState({});
  const [msg, setMsg] = useState("");
  const [activeTab, setActiveTab] = useState("general");

  // Footer Sections State
  const [footerSections, setFooterSections] = useState([]);
  const [footerSectionForm, setFooterSectionForm] = useState({ id: null, section_key: "", content_en: "", content_ar: "", content_fr: "" });
  const [fsModal, setFsModal] = useState(false);

  // Footer Links State
  const [footerLinks, setFooterLinks] = useState([]);
  const [footerLinkForm, setFooterLinkForm] = useState({ id: null, group_key: "media", label_en: "", label_ar: "", label_fr: "", url: "", order: 0 });
  const [flModal, setFlModal] = useState(false);

  const toast = (t) => { setMsg(t); setTimeout(() => setMsg(""), 4000); };

  const loadData = async () => {
    try {
      const [setRes, fsRes, flRes] = await Promise.all([
        axios.get(`${API}/admin/settings`, { headers: getHeaders() }),
        axios.get(`${API}/admin/footer-sections`, { headers: getHeaders() }),
        axios.get(`${API}/admin/footer-links`, { headers: getHeaders() })
      ]);
      
      const sObj = {};
      setRes.data.forEach(s => sObj[s.key] = s.value);
      setSettings(sObj);
      
      setFooterSections(fsRes.data);
      setFooterLinks(flRes.data);
    } catch (e) {
      console.error(e);
      toast("Failed to load settings.");
    }
  };

  useEffect(() => { loadData(); }, []);

  // --- General Settings Handlers ---
  const handleSettingChange = (key, value) => setSettings({ ...settings, [key]: value });

  const saveSettings = async (e) => {
    e.preventDefault();
    try {
      for (const item of SETTING_KEYS) {
        if (settings[item.key] !== undefined) {
          await axios.post(`${API}/admin/settings`, {
            key: item.key,
            value: settings[item.key],
            type: item.type,
            description: item.desc
          }, { headers: getHeaders() });
        }
      }
      toast("Settings saved successfully!");
    } catch (e) { toast("Error saving settings"); }
  };

  // --- Footer Sections Handlers ---
  const saveFooterSection = async (e) => {
    e.preventDefault();
    try {
      if (footerSectionForm.id) {
        await axios.put(`${API}/admin/footer-sections/${footerSectionForm.id}`, footerSectionForm, { headers: getHeaders() });
      } else {
        await axios.post(`${API}/admin/footer-sections`, footerSectionForm, { headers: getHeaders() });
      }
      setFsModal(false);
      loadData();
      toast("Footer text saved!");
    } catch (e) { toast("Error saving footer section"); }
  };

  const editFooterSection = (s) => {
    setFooterSectionForm(s);
    setFsModal(true);
  };

  // --- Footer Links Handlers ---
  const saveFooterLink = async (e) => {
    e.preventDefault();
    try {
      if (footerLinkForm.id) {
        await axios.put(`${API}/admin/footer-links/${footerLinkForm.id}`, footerLinkForm, { headers: getHeaders() });
      } else {
        await axios.post(`${API}/admin/footer-links`, footerLinkForm, { headers: getHeaders() });
      }
      setFlModal(false);
      loadData();
      toast("Footer link saved!");
    } catch (e) { toast("Error saving footer link"); }
  };

  const editFooterLink = (l) => {
    setFooterLinkForm(l);
    setFlModal(true);
  };

  const deleteFooterLink = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API}/admin/footer-links/${id}`, { headers: getHeaders() });
      loadData();
      toast("Link deleted!");
    } catch (e) { toast("Error deleting link"); }
  };

  return (
    <div className="content">
      {msg && <div className="alert alert-info">{msg}</div>}
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Site Settings & Footer</CardTitle>
              <Nav tabs>
                <NavItem><NavLink className={activeTab === "general" ? "active" : ""} onClick={() => setActiveTab("general")} style={{cursor:'pointer'}}>General Info</NavLink></NavItem>
                <NavItem><NavLink className={activeTab === "footer_texts" ? "active" : ""} onClick={() => setActiveTab("footer_texts")} style={{cursor:'pointer'}}>Footer Texts</NavLink></NavItem>
                <NavItem><NavLink className={activeTab === "footer_links" ? "active" : ""} onClick={() => setActiveTab("footer_links")} style={{cursor:'pointer'}}>Footer Links</NavLink></NavItem>
              </Nav>
            </CardHeader>
            <CardBody>
              <TabContent activeTab={activeTab}>
                
                {/* GENERAL SETTINGS */}
                <TabPane tabId="general" className="pt-3">
                  <Form onSubmit={saveSettings}>
                    <Row>
                      {SETTING_KEYS.map((item) => (
                        <Col md="6" key={item.key}>
                          <FormGroup>
                            <label>{item.label} <small className="text-muted">({item.key})</small></label>
                            <Input 
                              type={item.type} 
                              value={settings[item.key] || ""} 
                              onChange={(e) => handleSettingChange(item.key, e.target.value)}
                              placeholder={item.desc}
                            />
                          </FormGroup>
                        </Col>
                      ))}
                    </Row>
                    <Button color="success" type="submit">Save General Settings</Button>
                  </Form>
                </TabPane>

                {/* FOOTER TEXTS */}
                <TabPane tabId="footer_texts" className="pt-3">
                  <Button color="primary" className="mb-3" onClick={() => {
                    setFooterSectionForm({ id: null, section_key: "", content_en: "", content_ar: "", content_fr: "" });
                    setFsModal(true);
                  }}>+ Add Footer Text Block</Button>
                  <Table responsive bordered>
                    <thead><tr><th>Key</th><th>Content (EN)</th><th>Actions</th></tr></thead>
                    <tbody>
                      {footerSections.map(fs => (
                        <tr key={fs.id || fs.section_key}>
                          <td><strong>{fs.section_key}</strong></td>
                          <td>{fs.content_en}</td>
                          <td><Button size="sm" color="warning" onClick={() => editFooterSection(fs)}>Edit</Button></td>
                        </tr>
                      ))}
                      {!footerSections.length && <tr key="no-sections"><td colSpan="3" className="text-center">No texts found.</td></tr>}
                    </tbody>
                  </Table>
                </TabPane>

                {/* FOOTER LINKS */}
                <TabPane tabId="footer_links" className="pt-3">
                  <Button color="primary" className="mb-3" onClick={() => {
                    setFooterLinkForm({ id: null, group_key: "media", label_en: "", label_ar: "", label_fr: "", url: "", order: 0 });
                    setFlModal(true);
                  }}>+ Add Footer Link</Button>
                  <Table responsive bordered>
                    <thead><tr><th>Group</th><th>Label (EN)</th><th>URL</th><th>Order</th><th>Actions</th></tr></thead>
                    <tbody>
                      {footerLinks.map(fl => (
                        <tr key={fl.id || fl.label_en}>
                          <td><span className="badge badge-info">{fl.group_key}</span></td>
                          <td>{fl.label_en}</td>
                          <td>{fl.url}</td>
                          <td>{fl.order}</td>
                          <td>
                            <Button size="sm" color="warning" className="mr-2" onClick={() => editFooterLink(fl)}>Edit</Button>
                            <Button size="sm" color="danger" onClick={() => deleteFooterLink(fl.id)}>Del</Button>
                          </td>
                        </tr>
                      ))}
                      {!footerLinks.length && <tr key="no-links"><td colSpan="5" className="text-center">No links found.</td></tr>}
                    </tbody>
                  </Table>
                </TabPane>

              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* FOOTER SECTION MODAL */}
      <Modal isOpen={fsModal} toggle={() => setFsModal(false)}>
        <ModalHeader>{footerSectionForm.id ? "Edit Text" : "Add Text"}</ModalHeader>
        <Form onSubmit={saveFooterSection}>
          <ModalBody>
            <FormGroup>
              <label>Section Key (e.g. footer_desc, footer_copyright, footer_inquiry_title)</label>
              <Input required value={footerSectionForm.section_key} onChange={e => setFooterSectionForm({...footerSectionForm, section_key: e.target.value})} disabled={!!footerSectionForm.id} />
              <small className="text-muted">Must exactly match the key used in Footer.jsx</small>
            </FormGroup>
            <FormGroup><label>Content (EN)</label><Input type="textarea" value={footerSectionForm.content_en} onChange={e => setFooterSectionForm({...footerSectionForm, content_en: e.target.value})} /></FormGroup>
            <FormGroup><label>Content (AR)</label><Input type="textarea" value={footerSectionForm.content_ar} onChange={e => setFooterSectionForm({...footerSectionForm, content_ar: e.target.value})} /></FormGroup>
            <FormGroup><label>Content (FR)</label><Input type="textarea" value={footerSectionForm.content_fr} onChange={e => setFooterSectionForm({...footerSectionForm, content_fr: e.target.value})} /></FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">Save</Button>
            <Button color="secondary" onClick={() => setFsModal(false)}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* FOOTER LINK MODAL */}
      <Modal isOpen={flModal} toggle={() => setFlModal(false)}>
        <ModalHeader>{footerLinkForm.id ? "Edit Link" : "Add Link"}</ModalHeader>
        <Form onSubmit={saveFooterLink}>
          <ModalBody>
            <FormGroup>
              <label>Group Key</label>
              <Input type="select" value={footerLinkForm.group_key} onChange={e => setFooterLinkForm({...footerLinkForm, group_key: e.target.value})}>
                <option value="media">Media & Careers (media)</option>
              </Input>
            </FormGroup>
            <FormGroup><label>Label (EN)</label><Input required value={footerLinkForm.label_en} onChange={e => setFooterLinkForm({...footerLinkForm, label_en: e.target.value})} /></FormGroup>
            <FormGroup><label>Label (AR)</label><Input value={footerLinkForm.label_ar} onChange={e => setFooterLinkForm({...footerLinkForm, label_ar: e.target.value})} /></FormGroup>
            <FormGroup><label>Label (FR)</label><Input value={footerLinkForm.label_fr} onChange={e => setFooterLinkForm({...footerLinkForm, label_fr: e.target.value})} /></FormGroup>
            <FormGroup><label>URL (e.g. /news, /about)</label><Input required value={footerLinkForm.url} onChange={e => setFooterLinkForm({...footerLinkForm, url: e.target.value})} /></FormGroup>
            <FormGroup><label>Order Number</label><Input type="number" required value={footerLinkForm.order} onChange={e => setFooterLinkForm({...footerLinkForm, order: parseInt(e.target.value)})} /></FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">Save</Button>
            <Button color="secondary" onClick={() => setFlModal(false)}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>

    </div>
  );
}

export default AdminSettings;

