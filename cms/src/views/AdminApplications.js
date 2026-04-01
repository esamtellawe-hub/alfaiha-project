import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardHeader, CardBody, CardTitle,
  Row, Col, Table, Button, Input,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

const API = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api`;
const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

const STATUS_COLORS = {
  new: "primary",
  reviewed: "warning",
  shortlisted: "success",
  rejected: "danger"
};

function AdminApplications() {
  const [items, setItems] = useState([]);
  const [detail, setDetail] = useState(null);
  const [msg, setMsg] = useState("");

  const toast = (t) => { setMsg(t); setTimeout(() => setMsg(""), 4000); };

  const load = async () => {
    try { const r = await axios.get(`${API}/admin/applications`, { headers: getHeaders() }); setItems(r.data); }
    catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/admin/applications/${id}/status`, { status }, { headers: getHeaders() });
      load(); toast(`Status updated to: ${status}`);
    } catch (e) { toast("Error updating status"); }
  };

  return (
    <div className="content">
      {msg && <div className="alert alert-info">{msg}</div>}
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Job Applications ({items.length})</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Position</th><th>Experience</th><th>Status</th><th>Date</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {items.map((a, i) => (
                    <tr key={a.id}>
                      <td>{i+1}</td>
                      <td>{a.first_name} {a.last_name}</td>
                      <td><a href={`mailto:${a.email}`}>{a.email}</a></td>
                      <td>{a.phone || "—"}</td>
                      <td>{a.position_applied || "General"}</td>
                      <td>{a.experience_level || "—"}</td>
                      <td>
                        <span className={`badge badge-${STATUS_COLORS[a.status] || "secondary"}`}>{a.status}</span>
                      </td>
                      <td>{a.created_at ? new Date(a.created_at).toLocaleDateString() : "—"}</td>
                      <td>
                        <Button size="sm" color="info" className="mr-1" onClick={() => setDetail(a)}>View</Button>
                        <Input type="select" bsSize="sm" style={{ display: "inline-block", width: "110px" }}
                          value={a.status} onChange={e => updateStatus(a.id, e.target.value)}>
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="rejected">Rejected</option>
                        </Input>
                      </td>
                    </tr>
                  ))}
                  {!items.length && <tr><td colSpan="9" className="text-center">No applications yet</td></tr>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Detail Modal */}
      <Modal isOpen={!!detail} toggle={() => setDetail(null)} size="lg">
        <ModalHeader toggle={() => setDetail(null)}>Application Details</ModalHeader>
        <ModalBody>
          {detail && (
            <Row>
              <Col md="6"><p><strong>Name:</strong> {detail.first_name} {detail.last_name}</p></Col>
              <Col md="6"><p><strong>Email:</strong> <a href={`mailto:${detail.email}`}>{detail.email}</a></p></Col>
              <Col md="6"><p><strong>Phone:</strong> {detail.phone || "—"}</p></Col>
              <Col md="6"><p><strong>Location:</strong> {detail.location || "—"}</p></Col>
              <Col md="6"><p><strong>Position:</strong> {detail.position_applied || "General"}</p></Col>
              <Col md="6"><p><strong>Experience:</strong> {detail.experience_level || "—"}</p></Col>
              {detail.linkedin_url && <Col md="12"><p><strong>LinkedIn:</strong> <a href={detail.linkedin_url} target="_blank" rel="noreferrer">{detail.linkedin_url}</a></p></Col>}
              {detail.cover_letter && <Col md="12"><p><strong>Cover Letter:</strong></p><p style={{ whiteSpace: "pre-line", background: "#f9f9f9", padding: "10px", borderRadius: "4px" }}>{detail.cover_letter}</p></Col>}
            </Row>
          )}
        </ModalBody>
        <ModalFooter><Button color="secondary" onClick={() => setDetail(null)}>Close</Button></ModalFooter>
      </Modal>
    </div>
  );
}

export default AdminApplications;

