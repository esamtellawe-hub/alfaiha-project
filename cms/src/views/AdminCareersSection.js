import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardHeader, CardBody, CardTitle,
  Row, Col, Button, Form, FormGroup, Input,
  Nav, NavItem, NavLink, TabContent, TabPane
} from "reactstrap";

const API = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api`;
const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

const LANGS = ["EN", "AR", "FR"];
const FIELDS = [
  { key: "hero_title",    label: "Hero Title",    type: "text" },
  { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea" },
  { key: "badge1",        label: "Badge 1",        type: "text" },
  { key: "badge2",        label: "Badge 2",        type: "text" },
  { key: "badge3",        label: "Badge 3",        type: "text" },
  { key: "cta_title",    label: "CTA Title",     type: "text" },
  { key: "cta_subtitle", label: "CTA Subtitle",  type: "textarea" },
  { key: "apply_btn",    label: "Apply Button Text", type: "text" },
];

function AdminCareersSection() {
  const [form, setForm] = useState({});
  const [activeTab, setActiveTab] = useState("EN");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const toast = (t, isErr = false) => {
    setMsg({ text: t, err: isErr });
    setTimeout(() => setMsg(""), 4000);
  };

  useEffect(() => {
    axios.get(`${API}/admin/careers-section`, { headers: getHeaders() })
      .then(r => { setForm(r.data); setLoading(false); })
      .catch(() => { toast("Failed to load", true); setLoading(false); });
  }, []);

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/admin/careers-section`, form, { headers: getHeaders() });
      toast("✓ Saved successfully!");
    } catch (err) {
      toast("Error: " + (err.response?.data?.error || err.message), true);
    }
  };

  if (loading) return <div className="content"><p>Loading...</p></div>;

  return (
    <div className="content">
      {msg && (
        <div className={`alert alert-${msg.err ? "danger" : "success"}`}>{msg.text}</div>
      )}
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Careers Page Content</CardTitle>
              <p className="text-muted mb-0">Edit all text on the Careers page in all 3 languages</p>
            </CardHeader>
            <CardBody>
              <Form onSubmit={save}>
                {/* Language Tabs */}
                <Nav tabs className="mb-4">
                  {LANGS.map(lang => (
                    <NavItem key={lang}>
                      <NavLink
                        className={activeTab === lang ? "active" : ""}
                        onClick={() => setActiveTab(lang)}
                        style={{ cursor: "pointer" }}
                      >
                        {lang === "EN" ? "🇬🇧 English" : lang === "AR" ? "🇸🇦 Arabic" : "🇫🇷 French"}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>

                <TabContent activeTab={activeTab}>
                  {LANGS.map(lang => {
                    const l = lang.toLowerCase();
                    const isRtl = lang === "AR";
                    return (
                      <TabPane key={lang} tabId={lang}>
                        <Row>
                          {FIELDS.map(field => (
                            <Col md={field.type === "textarea" ? "12" : "6"} key={field.key}>
                              <FormGroup>
                                <label>{field.label}</label>
                                {field.type === "textarea" ? (
                                  <Input
                                    type="textarea"
                                    rows={3}
                                    dir={isRtl ? "rtl" : "ltr"}
                                    value={form[`${field.key}_${l}`] || ""}
                                    onChange={f(`${field.key}_${l}`)}
                                  />
                                ) : (
                                  <Input
                                    type="text"
                                    dir={isRtl ? "rtl" : "ltr"}
                                    value={form[`${field.key}_${l}`] || ""}
                                    onChange={f(`${field.key}_${l}`)}
                                  />
                                )}
                              </FormGroup>
                            </Col>
                          ))}
                        </Row>
                      </TabPane>
                    );
                  })}
                </TabContent>

                <div className="mt-3">
                  <Button color="primary" type="submit" size="lg">Save All Changes</Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AdminCareersSection;

