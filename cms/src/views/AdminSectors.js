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

const EMPTY_SECTOR = {
  id: null,
  name_en: "", name_ar: "", name_fr: "",
  description_en: "", description_ar: "", description_fr: "",
  icon_name: "Building2",  slug: "",
  tabs: []
};

const EMPTY_AREA = {
  id: null, sector_id: "", slug: "", 
  name_en: "", name_ar: "", name_fr: "",
  description_en: "", description_ar: "", description_fr: ""
};

function AdminSectors() {
  const [sectors, setSectors] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_SECTOR);
  const [editId, setEditId] = useState(null);
  const [activeTab, setActiveTab] = useState("EN");
  const [errorMsg, setErrorMsg] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  // Areas Management States
  const [areasModalOpen, setAreasModalOpen] = useState(false);
  const [activeSectorForAreas, setActiveSectorForAreas] = useState(null);
  
  const [areaForm, setAreaForm] = useState(EMPTY_AREA);
  const [areaEditId, setAreaEditId] = useState(null);
  const [areaActiveTab, setAreaActiveTab] = useState("EN");
  const [areaCategories, setAreaCategories] = useState([]);

  const fetchSectors = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/admin/sectors`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSectors(res.data);
    } catch (err) { console.error("Error fetching sectors", err); }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/admin/categories`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Extract only top-level parent categories for linking
      const parents = res.data.filter(c => !c.parent_id);
      setAllCategories(parents);
    } catch (err) { console.error("Error fetching categories", err); }
  };

  useEffect(() => { 
    fetchSectors(); 
    fetchCategories();
  }, []);

  const handleOpen = (item = null) => {
    setErrorMsg("");
    if (item) {
      const parse = (val) => val ? val : "";
      
      let parsedTabs = [];
      if (item.tabs) {
          if (Array.isArray(item.tabs)) {
              parsedTabs = item.tabs;
          } else if (typeof item.tabs === 'string') {
              try { parsedTabs = JSON.parse(item.tabs); } catch(e) { parsedTabs = []; }
          }
      }

      setForm({
        ...item,
        name_en: parse(item.name_en),
        name_ar: parse(item.name_ar),
        name_fr: parse(item.name_fr),
        slug: parse(item.slug),
        
        icon_name: parse(item.icon_name),
        description_en: parse(item.description_en),
        description_ar: parse(item.description_ar),
        description_fr: parse(item.description_fr),
        tabs: parsedTabs
      });
      setEditId(item.id);
    } else {
      setForm(EMPTY_SECTOR);
      setEditId(null);
    }
    setActiveTab("EN");
    setModalOpen(true);
  };

  const handleClose = () => { setModalOpen(false); setForm(EMPTY_SECTOR); setEditId(null); };

  const addTabField = () => {
      setForm({ ...form, tabs: [...form.tabs, ""] });
  };
  
  const updateTabField = (index, value) => {
      const newTabs = [...form.tabs];
      newTabs[index] = value;
      setForm({ ...form, tabs: newTabs });
  }

  const removeTabField = (index) => {
      const newTabs = [...form.tabs];
      newTabs.splice(index, 1);
      setForm({ ...form, tabs: newTabs });
  }

  const handleSave = async (e) => {
    e.preventDefault();
    if(!form.name_en || !form.slug || !form.name_ar) {
        setErrorMsg("Please fill in Name EN, Name AR, and Slug.");
        return;
    }
    try {
      const method = editId ? "put" : "post";
      const url = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/admin/sectors${editId ? `/${editId}` : ""}`;
      
      const payload = { ...form };
      
      await axios[method](url, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchSectors();
      handleClose();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.error || "Error saving sector");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sector? It may break sub-areas!")) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/admin/sectors/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchSectors();
      } catch (err) { alert("Error deleting sector"); }
    }
  };

  // --- AREAS MANAGEMENT HANDLERS ---
  const handleOpenAreas = (sector) => {
      setActiveSectorForAreas(sector);
      setAreaForm({ ...EMPTY_AREA, sector_id: sector.id });
      setAreaEditId(null);
      setAreaActiveTab("EN");
      setAreasModalOpen(true);
  };

  const handleCloseAreas = () => {
      setAreasModalOpen(false);
      setActiveSectorForAreas(null);
      setAreaForm(EMPTY_AREA);
      setAreaEditId(null);
  };

  const handleAreaEdit = (area) => {
      const parse = (val) => val ? val : "";
      setAreaForm({
          ...area,
          slug: parse(area.slug),
          
          name_en: parse(area.name_en),
          name_ar: parse(area.name_ar),
          name_fr: parse(area.name_fr),
          description_en: parse(area.description_en),
          description_ar: parse(area.description_ar),
          description_fr: parse(area.description_fr)
      });
      setAreaCategories(area.categories || []);
      setAreaEditId(area.id);
      setAreaActiveTab("EN");
  };

  const resetAreaForm = () => {
      setAreaForm({ ...EMPTY_AREA, sector_id: activeSectorForAreas.id });
      setAreaCategories([]);
      setAreaEditId(null);
      setAreaActiveTab("EN");
  };

  const handleAreaSave = async (e) => {
      e.preventDefault();
      if(!areaForm.name_en || !areaForm.slug || !areaForm.name_ar) {
          alert("Please fill in Name EN, Name AR, and Slug for the area.");
          return;
      }
      try {
          const method = areaEditId ? "put" : "post";
          const url = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/admin/sector-areas${areaEditId ? `/${areaEditId}` : ""}`;
          
          const payload = { ...areaForm, category_ids: areaCategories.map(c => c.id) };

          await axios[method](url, payload, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          
          // Refresh sectors to get updated areas
          await fetchSectors();
          
          // Update local activeSectorForAreas state so the modal list updates immediately
          axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/admin/sectors`, {
             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }).then(res => {
             const updatedSector = res.data.find(s => s.id === activeSectorForAreas.id);
             if(updatedSector) setActiveSectorForAreas(updatedSector);
          });

          resetAreaForm();
      } catch(err) {
          console.error(err);
          alert(err.response?.data?.error || "Error saving area");
      }
  };

  const handleAreaDelete = async (id) => {
      if(window.confirm("Are you sure you want to delete this Engineering Area? It will detach all related solutions!")) {
          try {
              await axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/admin/sector-areas/${id}`, {
                  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
              });
              
              await fetchSectors();
              
              axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/admin/sectors`, {
                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
              }).then(res => {
                 const updatedSector = res.data.find(s => s.id === activeSectorForAreas.id);
                 if(updatedSector) setActiveSectorForAreas(updatedSector);
              });
              
              if(areaEditId === id) resetAreaForm();
          } catch(err) {
              alert("Error deleting area");
          }
      }
  };

  const renderLangTab = (lang) => {
    const l = lang.toLowerCase();
    return (
      <TabPane tabId={lang}>
        <Row className="mt-3">
          <Col md="12">
            <FormGroup>
              <label>Name ({lang}) *</label>
              <Input
                value={form[`name_${l}`]}
                onChange={e => {
                  const val = e.target.value;
                  const newForm = { ...form, [`name_${l}`]: val };
                  // Auto-generate slug during creation for Sectors
                  if (l === 'en' && !editId) {
                    newForm.slug = slugify(val);
                  }
                  setForm(newForm);
                }}
                required={lang === 'EN' || lang === 'AR'}
              />
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <label>Description ({lang})</label>
              <Editor
                value={form[`description_${l}`]}
                onChange={e => setForm({ ...form, [`description_${l}`]: e.target.value })}
                containerProps={{ style: { height: '200px' } }}
              />
            </FormGroup>
          </Col>
        </Row>
      </TabPane>
    );
  };

  const renderAreaLangTab = (lang) => {
    const l = lang.toLowerCase();
    return (
      <TabPane tabId={lang}>
        <Row className="mt-3">
          <Col md="12">
            <FormGroup>
              <label>Area Name ({lang}) *</label>
              <Input
                value={areaForm[`name_${l}`]}
                onChange={e => {
                  const val = e.target.value;
                  const newAreaForm = { ...areaForm, [`name_${l}`]: val };
                  // Auto-generate slug during creation for Areas
                  if (l === 'en' && !areaEditId) {
                    newAreaForm.slug = slugify(val);
                  }
                  setAreaForm(newAreaForm);
                }}
                required={lang === 'EN' || lang === 'AR'}
              />
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <label>Area Description ({lang})</label>
              <Editor
                value={areaForm[`description_${l}`]}
                onChange={e => setAreaForm({ ...areaForm, [`description_${l}`]: e.target.value })}
                containerProps={{ style: { height: '150px' } }}
              />
            </FormGroup>
          </Col>
        </Row>
      </TabPane>
    );
  };

  const renderAreaProductsTab = () => {
    return (
      <TabPane tabId="Categories">
        <Row className="mt-3">
          <Col md="12">
            <FormGroup>
              <label>Link Product Categories to this Area</label>
              <Input
                type="select"
                onChange={(e) => {
                  const catId = parseInt(e.target.value);
                  if (catId) {
                    const cat = allCategories.find(c => c.id === catId);
                    if (cat && !areaCategories.find(c => c.id === catId)) {
                        setAreaCategories([...areaCategories, cat]);
                    }
                  }
                  e.target.value = ""; // Reset select after picking
                }}
              >
                <option value="">-- Dropdown: Select a category to add --</option>
                {allCategories
                   .filter(c => !areaCategories.find(ac => ac.id === c.id))
                   .map(cat => (
                     <option key={cat.id} value={cat.id}>{cat.name_en}</option>
                ))}
              </Input>
            </FormGroup>
            
            <div className="mt-4">
               <h6>Linked Categories ({areaCategories.length}):</h6>
               {areaCategories.length === 0 ? (
                 <p className="text-muted small">No categories linked yet.</p>
               ) : (
                 <div className="list-group">
                    {areaCategories.map(cat => (
                        <div key={cat.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2">
                           <span className="font-weight-bold">{cat.name_en}</span>
                           <Button size="sm" color="danger" className="py-0 px-2 m-0" onClick={() => setAreaCategories(areaCategories.filter(c => c.id !== cat.id))}>Remove</Button>
                        </div>
                    ))}
                 </div>
               )}
            </div>
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
              <CardTitle tag="h4">Industry Sectors</CardTitle>
              <Button color="primary" onClick={() => handleOpen()}>Add New Sector</Button>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Icon</th>
                    <th>Name (EN)</th>
                    <th>Slug</th>
                    <th>Sub-Areas Count</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sectors.map(item => (
                    <tr key={item.id}>
                      <td><i className="nc-icon nc-box-2" /> {item.icon_name}</td>
                      <td>{item.name_en}</td>
                      <td><code>{item.slug}</code></td>
                      <td><span className="badge badge-info">{item.areas ? item.areas.length : 0} Areas</span></td>
                      <td className="text-right">
                        <Button size="sm" color="info" className="mr-2" onClick={() => handleOpenAreas(item)}>Manage Areas</Button>
                        <Button size="sm" color="warning" className="mr-2" onClick={() => handleOpen(item)}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                  {sectors.length === 0 && (
                    <tr><td colSpan="5" className="text-center">No sectors found.</td></tr>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modalOpen} toggle={handleClose} size="lg">
        <ModalHeader toggle={handleClose}>{editId ? "Edit Sector" : "Add Sector"}</ModalHeader>
        <Form onSubmit={handleSave}>
          <ModalBody>
            {errorMsg && <Alert color="danger">{errorMsg}</Alert>}
            
            {/* TABS NAVIGATION */}
            <Nav tabs>
              {["General", "EN", "AR", "FR", "Tabs (Badges)"].map(tabName => (
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
                        {form.slug || <small>Will be generated from name...</small>}
                      </div>
                      <small className="text-muted">Automatically generated for website links.</small>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label>Lucide Icon Name</label>
                      <Input value={form.icon_name} onChange={e => setForm({ ...form, icon_name: e.target.value })} placeholder="Building2" />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    
                  </Col>
                </Row>
              </TabPane>
              {renderLangTab("EN")}
              {renderLangTab("AR")}
              {renderLangTab("FR")}
              
              <TabPane tabId="Tabs (Badges)">
                  <Row className="mt-3">
                      <Col md="12">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6>Small feature Badge Tabs (e.g. Hotels, Clinics)</h6>
                                <Button size="sm" color="info" onClick={addTabField}>+ Add Badge</Button>
                          </div>
                          {form.tabs.map((tab, idx) => (
                             <div key={idx} className="d-flex mb-2">
                                 <Input value={tab} onChange={e => updateTabField(idx, e.target.value)} placeholder="Text" className="mr-2" />
                                 <Button size="sm" color="danger" onClick={() => removeTabField(idx)}>X</Button>
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

      {/* --- AREAS MANAGEMENT MODAL --- */}
      <Modal isOpen={areasModalOpen} toggle={handleCloseAreas} size="xl">
        <ModalHeader toggle={handleCloseAreas}>
           Manage Engineering Areas: <span className="text-primary">{activeSectorForAreas?.name_en}</span>
        </ModalHeader>
        <ModalBody style={{ backgroundColor: '#f4f3ef' }}>
            <Row>
                {/* Left Side: List of current areas */}
                <Col md="5" className="border-right">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                       <h5>Current Areas</h5>
                       <Button size="sm" color="primary" onClick={resetAreaForm}>+ New Area</Button>
                    </div>
                    {activeSectorForAreas?.areas?.length > 0 ? (
                        <div className="list-group list-group-flush mb-4" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                            {activeSectorForAreas.areas.map(area => (
                                <div key={area.id} className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${areaEditId === area.id ? 'active text-white' : ''}`} style={{ cursor: 'pointer' }}>
                                    <div onClick={() => handleAreaEdit(area)} className="flex-grow-1">
                                        <h6 className="my-0">{area.name_en}</h6>
                                        <small className={areaEditId === area.id ? "text-white" : "text-muted"}>/{area.slug}</small>
                                        <div className={`badge badge-pill mt-1 ${areaEditId === area.id ? 'badge-light text-primary' : 'badge-secondary'}`}>
                                            {area.categories?.length || 0} Categories
                                        </div>
                                    </div>
                                    <div>
                                        <Button size="sm" color="danger" className="py-0 px-2" onClick={() => handleAreaDelete(area.id)}>X</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted text-center py-4">No areas added yet.</p>
                    )}
                </Col>

                {/* Right Side: Add/Edit Area Form */}
                <Col md="7">
                    <Card className="shadow-none">
                       <CardHeader>
                           <CardTitle tag="h5">{areaEditId ? "Edit Area" : "Create New Area"}</CardTitle>
                       </CardHeader>
                       <CardBody>
                          <Form onSubmit={handleAreaSave}>
                              <Row>
                                  <Col md="6">
                                      <FormGroup>
                                          <label>Slug / URL</label>
                                          <div className="p-2 border rounded bg-light text-muted" style={{ minHeight: '38px' }}>
                                            {areaForm.slug || <small>Will be generated from name...</small>}
                                          </div>
                                          <small className="text-muted">Automatically generated for website links.</small>
                                      </FormGroup>
                                  </Col>
                                  <Col md="6">
                                      
                                  </Col>
                              </Row>

                              <Nav tabs className="mt-2">
                                {["EN", "AR", "FR", "Categories"].map(tabName => (
                                  <NavItem key={`area-${tabName}`}>
                                    <NavLink
                                      className={areaActiveTab === tabName ? "active" : ""}
                                      onClick={() => setAreaActiveTab(tabName)}
                                      style={{ cursor: 'pointer' }}
                                    >
                                      {tabName}
                                    </NavLink>
                                  </NavItem>
                                ))}
                              </Nav>

                              <TabContent activeTab={areaActiveTab} className="p-3 border border-top-0 mb-3">
                                {renderAreaLangTab("EN")}
                                {renderAreaLangTab("AR")}
                                {renderAreaLangTab("FR")}
                                {renderAreaProductsTab()}
                              </TabContent>

                              <div className="text-right">
                                  {areaEditId && <Button type="button" color="secondary" className="mr-2" onClick={resetAreaForm}>Cancel Edit</Button>}
                                  <Button type="submit" color="success">{areaEditId ? "Save Changes" : "Create Area"}</Button>
                              </div>
                          </Form>
                       </CardBody>
                    </Card>
                </Col>
            </Row>
        </ModalBody>
      </Modal>

    </div>
  );
}

export default AdminSectors;

