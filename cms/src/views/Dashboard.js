import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardFooter, Row, Col } from "reactstrap";
import '../assets/css/style.css';

const API = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api`;
const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

function Dashboard() {
  const [stats, setStats] = useState({
    solutions: 0,
    projects: 0,
    jobs: 0,
    applications: 0,
    news: 0,
    users: 0,
    categories: 0,
    services: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API}/admin/dashboard-stats`, { headers: getHeaders() });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const StatCard = ({ title, count, icon, color }) => (
    <Col lg="3" md="6" sm="6" className="mb-4">
      <Card className="card-stats">
        <CardBody>
          <Row>
            <Col md="4" xs="5">
              <div className={`icon-big text-center icon-warning text-${color}`}>
                <i className={icon} />
              </div>
            </Col>
            <Col md="8" xs="7">
              <div className="numbers">
                <p className="card-category text-uppercase font-weight-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>{title}</p>
                <CardBody className="p-0">
                  {loading ? (
                    <div className="spinner-border spinner-border-sm text-secondary" role="status"><span className="sr-only">Loading...</span></div>
                  ) : (
                    <p className="card-title" style={{ fontSize: '24px', margin: 0 }}>{count}</p>
                  )}
                </CardBody>
              </div>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <hr />
        </CardFooter>
      </Card>
    </Col>
  );

  return (
    <div className="content">
      <h4 className="mb-4 text-muted">System Overview</h4>
      <Row>
        <StatCard title="Solutions" count={stats.solutions} icon="nc-icon nc-app" color="primary" />
        <StatCard title="Projects" count={stats.projects} icon="nc-icon nc-album-2" color="danger" />
        <StatCard title="Services" count={stats.services} icon="nc-icon nc-settings-gear-65" color="warning" />
        <StatCard title="Categories" count={stats.categories} icon="nc-icon nc-tile-56" color="success" />
        
        <StatCard title="Active Jobs" count={stats.jobs} icon="nc-icon nc-briefcase-24" color="info" />
        <StatCard title="Applications" count={stats.applications} icon="nc-icon nc-single-02" color="primary" />
        <StatCard title="News / Press" count={stats.news} icon="nc-icon nc-paper" color="danger" />
        <StatCard title="Admins" count={stats.users} icon="nc-icon nc-badge" color="warning" />
      </Row>
    </div>
  );
}

export default Dashboard;

