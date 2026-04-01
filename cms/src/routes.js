import Dashboard from "views/Dashboard.js";
import AdminHomeHero from "views/AdminHomeHero.js";
import AdminHomeSections from "views/AdminHomeSections.js";
import AdminMenuItems from "views/AdminMenuItems.js";
import AdminNews from "views/AdminNews.js";
import AdminBlog from "views/AdminBlog.js";
import AdminJobs from "views/AdminJobs.js";
import AdminApplications from "views/AdminApplications.js";
import AdminRegionalOffices from "views/AdminRegionalOffices.js";
import AdminServices from "views/AdminServices.js";
import AdminSolutions from "views/AdminSolutions.js";
import AdminCategories from "views/AdminCategories.js";
import AdminSectors from "views/AdminSectors.js";
import AdminProjects from "views/AdminProjects.js";
import AdminProjectSections from "views/AdminProjectSections.js";
import AdminPartnerSections from "views/AdminPartnerSections.js";
import AdminSustainabilitySections from "views/AdminSustainabilitySections.js";
import AdminAboutSections from "views/AdminAboutSections.js";
import AdminAcademySections from "views/AdminAcademySections.js";
import AdminNewsSections from "views/AdminNewsSections.js";
import AdminBlogSections from "views/AdminBlogSections.js";
import AdminCareersSection from "views/AdminCareersSection.js";
import AdminPositions from "views/AdminPositions.js";
import AdminSettings from "views/AdminSettings.js";
import AdminUsers from "views/AdminUsers.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/menu-items",
    name: "Header Menu",
    icon: "nc-icon nc-bullet-list-67",
    component: <AdminMenuItems />,
    layout: "/admin",
  },
  {
    path: "/home-hero",
    name: "Home Hero",
    icon: "nc-icon nc-image",
    component: <AdminHomeHero />,
    layout: "/admin",
  },
  {
    path: "/home-sections",
    name: "Home Sections",
    icon: "nc-icon nc-layout-11",
    component: <AdminHomeSections />,
    layout: "/admin",
  },
  {
    path: "/news",
    name: "News",
    icon: "nc-icon nc-map-big",
    component: <AdminNews />,
    layout: "/admin",
  },
  {
    path: "/blog",
    name: "Blog Posts",
    icon: "nc-icon nc-send",
    component: <AdminBlog />,
    layout: "/admin",
  },
  {
    path: "/jobs",
    name: "Job Postings",
    icon: "nc-icon nc-briefcase-24",
    component: <AdminJobs />,
    layout: "/admin",
  },
  {
    path: "/applications",
    name: "Applications",
    icon: "nc-icon nc-single-02",
    component: <AdminApplications />,
    layout: "/admin",
  },
  {
    path: "/regional-offices",
    name: "Regional Offices",
    icon: "nc-icon nc-pin-3",
    component: <AdminRegionalOffices />,
    layout: "/admin",
  },
  {
    path: "/services",
    name: "Services",
    icon: "nc-icon nc-settings-gear-65",
    component: <AdminServices />,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "nc-icon nc-tile-56",
    component: <AdminCategories />,
    layout: "/admin",
  },
  {
    path: "/solutions",
    name: "Solutions",
    icon: "nc-icon nc-app",
    component: <AdminSolutions />,
    layout: "/admin",
  },
  {
    path: "/sectors",
    name: "Sectors & Areas",
    icon: "nc-icon nc-box-2",
    component: <AdminSectors />,
    layout: "/admin",
  },
  {
    path: "/projects",
    name: "Projects Portfolio",
    icon: "nc-icon nc-album-2",
    component: <AdminProjects />,
    layout: "/admin",
  },
  {
    path: "/projects-sections",
    name: "Projects Static Text",
    icon: "nc-icon nc-caps-small",
    component: <AdminProjectSections />,
    layout: "/admin",
  },
  {
    path: "/partners-sections",
    name: "Partners Static Text",
    icon: "nc-icon nc-tie-bow",
    component: <AdminPartnerSections />,
    layout: "/admin",
  },
  {
    path: "/sustainability-sections",
    name: "Sustainability Content",
    icon: "nc-icon nc-globe",
    component: <AdminSustainabilitySections />,
    layout: "/admin",
  },
  {
    path: "/about-sections",
    name: "About Us Content",
    icon: "nc-icon nc-single-copy-04",
    component: <AdminAboutSections />,
    layout: "/admin",
  },
  {
    path: "/academy-sections",
    name: "AFG Academy Content",
    icon: "nc-icon nc-hat-3",
    component: <AdminAcademySections />,
    layout: "/admin",
  },
  {
    path: "/news-sections",
    name: "News & Press Settings",
    icon: "nc-icon nc-send",
    component: <AdminNewsSections />,
    layout: "/admin",
  },
  {
    path: "/blog-sections",
    name: "Blog Page Settings",
    icon: "nc-icon nc-paper",
    component: <AdminBlogSections />,
    layout: "/admin",
  },
  {
    path: "/careers-section",
    name: "Careers Page Content",
    icon: "nc-icon nc-briefcase-24",
    component: <AdminCareersSection />,
    layout: "/admin",
  },
  {
    path: "/positions",
    name: "Application Positions",
    icon: "nc-icon nc-badge",
    component: <AdminPositions />,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings & Footer",
    icon: "nc-icon nc-settings-gear-65",
    component: <AdminSettings />,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "User Management",
    icon: "nc-icon nc-single-02",
    component: <AdminUsers />,
    layout: "/admin",
    superAdminOnly: true
  }
];

export default routes;
