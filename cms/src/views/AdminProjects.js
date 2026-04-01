import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Input,
  FormGroup,
  Form,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Alert
} from "reactstrap";
import Editor from 'react-simple-wysiwyg';

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-');    // Replace multiple - with single -
};

const formatDate = (val) => {
  if (!val) return "";
  const d = new Date(val);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split('T')[0]; // yyyy-MM-dd
};

const EMPTY_PROJECT = {
  id: null,
  slug: "",
  image_url: "",
  completion_date: "",
  country: "",
  countryCode: "",
  subtitle: "",
  sector: "",
  title_en: "", title_ar: "", title_fr: "",
  description_en: "", description_ar: "", description_fr: "",
  client_en: "", client_ar: "",
  location_en: "", location_ar: "",
  products: []
};

// --- Country Codes for Flag Images ---
const COUNTRY_OPTIONS = [
  { name: "Afghanistan", code: "af" }, { name: "Albania", code: "al" }, { name: "Algeria", code: "dz" }, { name: "Andorra", code: "ad" }, { name: "Angola", code: "ao" }, { name: "Antigua and Barbuda", code: "ag" }, { name: "Argentina", code: "ar" }, { name: "Armenia", code: "am" }, { name: "Australia", code: "au" }, { name: "Austria", code: "at" }, { name: "Azerbaijan", code: "az" }, { name: "Bahamas", code: "bs" }, { name: "Bahrain", code: "bh" }, { name: "Bangladesh", code: "bd" }, { name: "Barbados", code: "bb" }, { name: "Belarus", code: "by" }, { name: "Belgium", code: "be" }, { name: "Belize", code: "bz" }, { name: "Benin", code: "bj" }, { name: "Bhutan", code: "bt" }, { name: "Bolivia", code: "bo" }, { name: "Bosnia and Herzegovina", code: "ba" }, { name: "Botswana", code: "bw" }, { name: "Brazil", code: "br" }, { name: "Brunei", code: "bn" }, { name: "Bulgaria", code: "bg" }, { name: "Burkina Faso", code: "bf" }, { name: "Burundi", code: "bi" }, { name: "Côte d'Ivoire", code: "ci" }, { name: "Cabo Verde", code: "cv" }, { name: "Cambodia", code: "kh" }, { name: "Cameroon", code: "cm" }, { name: "Canada", code: "ca" }, { name: "Central African Republic", code: "cf" }, { name: "Chad", code: "td" }, { name: "Chile", code: "cl" }, { name: "China", code: "cn" }, { name: "Colombia", code: "co" }, { name: "Comoros", code: "km" }, { name: "Congo (Congo-Brazzaville)", code: "cg" }, { name: "Costa Rica", code: "cr" }, { name: "Croatia", code: "hr" }, { name: "Cuba", code: "cu" }, { name: "Cyprus", code: "cy" }, { name: "Czechia (Czech Republic)", code: "cz" }, { name: "Democratic Republic of the Congo", code: "cd" }, { name: "Denmark", code: "dk" }, { name: "Djibouti", code: "dj" }, { name: "Dominica", code: "dm" }, { name: "Dominican Republic", code: "do" }, { name: "Ecuador", code: "ec" }, { name: "Egypt", code: "eg" }, { name: "El Salvador", code: "sv" }, { name: "Equatorial Guinea", code: "gq" }, { name: "Eritrea", code: "er" }, { name: "Estonia", code: "ee" }, { name: "Eswatini (fmr. 'Swaziland')", code: "sz" }, { name: "Ethiopia", code: "et" }, { name: "Fiji", code: "fj" }, { name: "Finland", code: "fi" }, { name: "France", code: "fr" }, { name: "Gabon", code: "ga" }, { name: "Gambia", code: "gm" }, { name: "Georgia", code: "ge" }, { name: "Germany", code: "de" }, { name: "Ghana", code: "gh" }, { name: "Greece", code: "gr" }, { name: "Grenada", code: "gd" }, { name: "Guatemala", code: "gt" }, { name: "Guinea", code: "gn" }, { name: "Guinea-Bissau", code: "gw" }, { name: "Guyana", code: "gy" }, { name: "Haiti", code: "ht" }, { name: "Holy See", code: "va" }, { name: "Honduras", code: "hn" }, { name: "Hungary", code: "hu" }, { name: "Iceland", code: "is" }, { name: "India", code: "in" }, { name: "Indonesia", code: "id" }, { name: "Iran", code: "ir" }, { name: "Iraq", code: "iq" }, { name: "Ireland", code: "ie" }, { name: "Israel", code: "il" }, { name: "Italy", code: "it" }, { name: "Jamaica", code: "jm" }, { name: "Japan", code: "jp" }, { name: "Jordan", code: "jo" }, { name: "Kazakhstan", code: "kz" }, { name: "Kenya", code: "ke" }, { name: "Kiribati", code: "ki" }, { name: "Kuwait", code: "kw" }, { name: "Kyrgyzstan", code: "kg" }, { name: "Laos", code: "la" }, { name: "Latvia", code: "lv" }, { name: "Lebanon", code: "lb" }, { name: "Lesotho", code: "ls" }, { name: "Liberia", code: "lr" }, { name: "Libya", code: "ly" }, { name: "Liechtenstein", code: "li" }, { name: "Lithuania", code: "lt" }, { name: "Luxembourg", code: "lu" }, { name: "Madagascar", code: "mg" }, { name: "Malawi", code: "mw" }, { name: "Malaysia", code: "my" }, { name: "Maldives", code: "mv" }, { name: "Mali", code: "ml" }, { name: "Malta", code: "mt" }, { name: "Marshall Islands", code: "mh" }, { name: "Mauritania", code: "mr" }, { name: "Mauritius", code: "mu" }, { name: "Mexico", code: "mx" }, { name: "Micronesia", code: "fm" }, { name: "Moldova", code: "md" }, { name: "Monaco", code: "mc" }, { name: "Mongolia", code: "mn" }, { name: "Montenegro", code: "me" }, { name: "Morocco", code: "ma" }, { name: "Mozambique", code: "mz" }, { name: "Myanmar (formerly Burma)", code: "mm" }, { name: "Namibia", code: "na" }, { name: "Nauru", code: "nr" }, { name: "Nepal", code: "np" }, { name: "Netherlands", code: "nl" }, { name: "New Zealand", code: "nz" }, { name: "Nicaragua", code: "ni" }, { name: "Niger", code: "ne" }, { name: "Nigeria", code: "ng" }, { name: "North Korea", code: "kp" }, { name: "North Macedonia", code: "mk" }, { name: "Norway", code: "no" }, { name: "Oman", code: "om" }, { name: "Pakistan", code: "pk" }, { name: "Palau", code: "pw" }, { name: "Palestine State", code: "ps" }, { name: "Panama", code: "pa" }, { name: "Papua New Guinea", code: "pg" }, { name: "Paraguay", code: "py" }, { name: "Peru", code: "pe" }, { name: "Philippines", code: "ph" }, { name: "Poland", code: "pl" }, { name: "Portugal", code: "pt" }, { name: "Qatar", code: "qa" }, { name: "Romania", code: "ro" }, { name: "Russia", code: "ru" }, { name: "Rwanda", code: "rw" }, { name: "Saint Kitts and Nevis", code: "kn" }, { name: "Saint Lucia", code: "lc" }, { name: "Saint Vincent and the Grenadines", code: "vc" }, { name: "Samoa", code: "ws" }, { name: "San Marino", code: "sm" }, { name: "Sao Tome and Principe", code: "st" }, { name: "Saudi Arabia", code: "sa" }, { name: "Senegal", code: "sn" }, { name: "Serbia", code: "rs" }, { name: "Seychelles", code: "sc" }, { name: "Sierra Leone", code: "sl" }, { name: "Singapore", code: "sg" }, { name: "Slovakia", code: "sk" }, { name: "Slovenia", code: "si" }, { name: "Solomon Islands", code: "sb" }, { name: "Somalia", code: "so" }, { name: "South Africa", code: "za" }, { name: "South Korea", code: "kr" }, { name: "South Sudan", code: "ss" }, { name: "Spain", code: "es" }, { name: "Sri Lanka", code: "lk" }, { name: "Sudan", code: "sd" }, { name: "Suriname", code: "sr" }, { name: "Sweden", code: "se" }, { name: "Switzerland", code: "ch" }, { name: "Syria", code: "sy" }, { name: "Tajikistan", code: "tj" }, { name: "Tanzania", code: "tz" }, { name: "Thailand", code: "th" }, { name: "Timor-Leste", code: "tl" }, { name: "Togo", code: "tg" }, { name: "Tonga", code: "to" }, { name: "Trinidad and Tobago", code: "tt" }, { name: "Tunisia", code: "tn" }, { name: "Turkey", code: "tr" }, { name: "Turkmenistan", code: "tm" }, { name: "Tuvalu", code: "tv" }, { name: "Uganda", code: "ug" }, { name: "Ukraine", code: "ua" }, { name: "United Arab Emirates", code: "ae" }, { name: "United Kingdom", code: "gb" }, { name: "United States of America", code: "us" }, { name: "Uruguay", code: "uy" }, { name: "Uzbekistan", code: "uz" }, { name: "Vanuatu", code: "vu" }, { name: "Venezuela", code: "ve" }, { name: "Vietnam", code: "vn" }, { name: "Yemen", code: "ye" }, { name: "Zambia", code: "zm" }, { name: "Zimbabwe", code: "zw" }
];

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [sectorsList, setSectorsList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_PROJECT);
  const [editId, setEditId] = useState(null);
  const [activeTab, setActiveTab] = useState("EN");
  const [errorMsg, setErrorMsg] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/admin/projects`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProjects(res.data);
    } catch (err) { console.error("Error fetching projects", err); }
  };

  const fetchSectors = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/admin/sectors`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSectorsList(res.data);
    } catch (err) { console.error("Error fetching sectors", err); }
  };

  const fetchProductsList = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/admin/solutions`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProductsList(res.data);
    } catch (err) { console.error("Error fetching products", err); }
  };

  useEffect(() => { 
    fetchProjects(); 
    fetchSectors();
    fetchProductsList();
  }, []);

  const handleOpen = (item = null) => {
    setErrorMsg("");
    setImageFile(null);
    if (item) {
      const parse = (val) => val ? val : "";
      
      let parsedProducts = [];
      if (item.products) {
          if (Array.isArray(item.products)) {
              parsedProducts = item.products;
          } else if (typeof item.products === 'string') {
              try { parsedProducts = JSON.parse(item.products); } catch(e) { parsedProducts = []; }
          }
      }

      setForm({
        ...item,
        title_en: parse(item.title_en),
        title_ar: parse(item.title_ar),
        title_fr: parse(item.title_fr),
        slug: parse(item.slug),
        image_url: parse(item.image_url),
        completion_date: formatDate(item.completion_date),
        country: parse(item.country),
        countryCode: parse(item.countryCode),
        subtitle: parse(item.subtitle),
        sector: parse(item.sector),
        client_en: parse(item.client_en),
        client_ar: parse(item.client_ar),
        location_en: parse(item.location_en),
        location_ar: parse(item.location_ar),
        description_en: parse(item.description_en),
        description_ar: parse(item.description_ar),
        description_fr: parse(item.description_fr),
        products: parsedProducts
      });
      setEditId(item.id);
    } else {
      setForm(EMPTY_PROJECT);
      setEditId(null);
    }
    setActiveTab("EN");
    setModalOpen(true);
  };

  const handleClose = () => { setModalOpen(false); setForm(EMPTY_PROJECT); setEditId(null); };

  const addProductField = () => {
      setForm({ ...form, products: [...form.products, ""] });
  };
  
  const updateProductField = (index, value) => {
      const newProducts = [...form.products];
      newProducts[index] = value;
      setForm({ ...form, products: newProducts });
  }

  const removeProductField = (index) => {
      const newProducts = [...form.products];
      newProducts.splice(index, 1);
      setForm({ ...form, products: newProducts });
  }

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const countryObj = COUNTRY_OPTIONS.find(c => c.name === selectedCountry);
    setForm({ 
        ...form, 
        country: selectedCountry,
        countryCode: countryObj ? countryObj.code : ""
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if(!form.title_en || !form.slug || !form.title_ar) {
        setErrorMsg("Please fill in Title EN, Title AR, and Slug.");
        return;
    }
    try {
      const method = editId ? "put" : "post";
      const url = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/admin/projects${editId ? `/${editId}` : ""}`;
      
      const formData = new FormData();
      
      // Append all simple text fields
      Object.keys(form).forEach(key => {
          if (key === 'products') {
              formData.append('products', JSON.stringify(form.products));
          } else if (key !== 'id' && key !== 'image_url') { // Ignore id and old image_url in form body
              formData.append(key, form[key]);
          }
      });

      if (imageFile) {
          formData.append("image", imageFile);
      } else if (editId) {
          formData.append("image_url", form.image_url); // Keep existing if no new file is uploaded
      }
      
      await axios[method](url, formData, {
        headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
        }
      });
      fetchProjects();
      handleClose();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.error || "Error saving project");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/admin/projects/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchProjects();
      } catch (err) { alert("Error deleting project"); }
    }
  };

  const renderLangTab = (lang) => {
    const l = lang.toLowerCase();
    return (
      <TabPane tabId={lang}>
        <Row className="mt-3">
          <Col md="12">
            <FormGroup>
              <label>Title ({lang}) {lang === 'EN' || lang === 'AR' ? '*' : ''}</label>
              <Input
                value={form[`title_${l}`] || ""}
                onChange={e => {
                    const val = e.target.value;
                    const newForm = { ...form, [`title_${l}`]: val };
                    if (l === 'en' && !editId) {
                        // Auto-generate slug for new projects
                        newForm.slug = slugify(val);
                    }
                    setForm(newForm);
                }}
                required={lang === 'EN' || lang === 'AR'}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label>Client ({lang})</label>
              <Input
                value={form[`client_${l}`]}
                onChange={e => setForm({ ...form, [`client_${l}`]: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label>Location ({lang})</label>
              <Input
                value={form[`location_${l}`]}
                onChange={e => setForm({ ...form, [`location_${l}`]: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <label>Description ({lang})</label>
              <Editor
                value={form[`description_${l}`]}
                onChange={e => setForm({ ...form, [`description_${l}`]: e.target.value })}
              />
            </FormGroup>
          </Col>
        </Row>
      </TabPane>
    );
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <CardTitle tag="h4">Projects Portfolio</CardTitle>
              <Button color="primary" onClick={() => handleOpen()}>Add New Project</Button>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Image</th>
                    <th>Title (EN)</th>
                    <th>Sector</th>
                    <th>Country</th>
                    <th>Client</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(item => (
                    <tr key={item.id}>
                      <td>
                        {item.image_url ? (
                            <img src={item.image_url.startsWith('http') ? item.image_url : `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}${item.image_url}`} alt="Project" style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px'}} />
                        ) : "No Image"}
                      </td>
                      <td>{item.title_en}</td>
                      <td>{item.sector || 'N/A'}</td>
                      <td>
                        {item.countryCode && (
                            <img src={`https://flagcdn.com/w20/${item.countryCode.toLowerCase()}.png`} alt={item.country} className="mr-2" style={{width: '20px', display: 'inline-block'}}  />
                        )}
                        {item.country || 'N/A'}
                      </td>
                      <td>{item.client_en || 'N/A'}</td>
                      <td className="text-right">
                        <Button size="sm" color="warning" className="mr-2" onClick={() => handleOpen(item)}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr><td colSpan="6" className="text-center">No projects found.</td></tr>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modalOpen} toggle={handleClose} size="xl">
        <ModalHeader toggle={handleClose}>{editId ? "Edit Project" : "Add Project"}</ModalHeader>
        <Form onSubmit={handleSave}>
          <ModalBody>
            {errorMsg && <Alert color="danger">{errorMsg}</Alert>}
            
            <Nav tabs>
              {["General", "EN", "AR", "FR", "Products"].map(tabName => (
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

            <TabContent activeTab={activeTab} className="p-3 border border-top-0">
              <TabPane tabId="General">
                <Row className="mt-3">
                  <Col md="4">
                    <FormGroup>
                      <label>Slug / URL</label>
                      <div className="p-2 border rounded bg-light text-muted" style={{ minHeight: '38px' }}>
                        {form.slug || <small>Will be generated from title...</small>}
                      </div>
                      <small className="text-muted">Automatically generated for website links.</small>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label>Sector / Category</label>
                      <Input type="select" value={form.sector || ""} onChange={e => setForm({ ...form, sector: e.target.value })}>
                          <option value="">Select Sector</option>
                          {sectorsList.map((s, idx) => (
                              <option key={idx} value={s.name_en}>{s.name_en}</option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label>Subtitle / Tagline</label>
                      <Input value={form.subtitle || ""} onChange={e => setForm({ ...form, subtitle: e.target.value })} placeholder="e.g. Concrete mix design" />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label>Country</label>
                      <Input type="select" value={form.country || ""} onChange={handleCountryChange}>
                          <option value="">Select Country</option>
                          {COUNTRY_OPTIONS.map((c, idx) => (
                              <option key={idx} value={c.name}>{c.name}</option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label>Completion Date / Year</label>
                      <Input type="date" value={form.completion_date || ""} onChange={e => setForm({ ...form, completion_date: e.target.value })} />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label>Main Image</label>
                      <Input type="file" onChange={e => setImageFile(e.target.files[0])} accept="image/*" />
                      {form.image_url && !imageFile && <div className="text-muted small mt-1">Current Image: {form.image_url}</div>}
                    </FormGroup>
                  </Col>
                </Row>
              </TabPane>
              
              {renderLangTab("EN")}
              {renderLangTab("AR")}
              {renderLangTab("FR")}
              
              <TabPane tabId="Products">
                  <Row className="mt-3">
                      <Col md="12">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6>Products Used (Tags)</h6>
                                <Button size="sm" color="info" onClick={addProductField}>+ Add Product</Button>
                          </div>
                          {(Array.isArray(form.products) ? form.products : []).map((product, idx) => (
                             <div key={idx} className="d-flex mb-2">
                                 <Input type="select" value={product || ""} onChange={e => updateProductField(idx, e.target.value)} className="mr-2">
                                     <option value="">Select Product...</option>
                                     {productsList.map((p, i) => (
                                         <option key={i} value={p.name_en}>{p.name_en}</option>
                                     ))}
                                 </Input>
                                 <Button size="sm" color="danger" onClick={() => removeProductField(idx)}>X</Button>
                             </div>
                          ))}
                      </Col>
                  </Row>
              </TabPane>
            </TabContent>

          </ModalBody>
          <div className="modal-footer">
            <Button color="secondary" type="button" onClick={handleClose}>Cancel</Button>
            <Button color="primary" type="submit">Save</Button>
          </div>
        </Form>
      </Modal>

    </div>
  );
}

export default AdminProjects;

