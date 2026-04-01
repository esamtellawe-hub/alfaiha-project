import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";


var ps;

function Sidebar(props) {
  const location = useLocation();
  const sidebar = React.useRef();
  const userStr = localStorage.getItem("user");
  const currentUser = userStr ? JSON.parse(userStr) : null;
  const userRole = currentUser?.role || localStorage.getItem("userRole");

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (layout, routeName) => {
    return location.pathname === (layout + routeName) ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        {/* <a
          href="https://www.creative-tim.com"
          className="simple-text logo-mini"
        > */}
          <div className="logo-img ">
            <img src={require('../../assets/img/Al Faiha-Logo-EN-WT-landscape.png')} alt="react-logo"style={{height:"auto",width:"90%", paddingLeft:"15px", paddingBottom:"15px", paddingTop:"10px"}}/>
          </div>
        {/* </a> */}
        {/* <a
         
          className="simple-text logo-normal"
        >
         iSystem
        </a> */}
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            // Hide routes that require super_admin if current user is not a super_admin
            if (prop.superAdminOnly && userRole !== 'super_admin') {
              return null;
            }

            return (
              <li className={activeRoute(prop.layout, prop.path) + (prop.pro ? ' active-pro' : '')} key={key}>
                <NavLink to={prop.layout + prop.path} className="nav-NavLink">
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
