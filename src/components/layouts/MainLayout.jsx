import React, { useEffect, useState } from "react";
import SideNav from "../SideNav/index";
import { Notify } from "react-redux-notify";
import LatestFooter from "./Footer/LatestFooter";
import { connect } from "react-redux";
import { fetchUserDetailsStart } from "../../store/actions/UserAction";
import { useHistory } from 'react-router-dom';
import HeaderIndex from "./Header/HeaderIndex";
import { Col, Row } from "react-bootstrap";

const MainLayout = (props) => {
  let history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('userLoginStatus'))

  const [themeState, setThemeState] = useState(false);

  const toggleClass = () => {
    setThemeState(!themeState);
  };

  useEffect(() => {
    props.dispatch(fetchUserDetailsStart());
  }, []);

  useEffect(() => {
    if (!props.profile.loading && props.profile.data.is_email_verified === 0) {
      history.push('/register/verify');
    }
  }, [props.profile]);
  useEffect(() => {
    if (localStorage.getItem('userLoginStatus') === "true") {
      setIsLoggedIn(true)
    }
    else {
      setIsLoggedIn(false)
    }
  }, [])
 

   
  console.log(isLoggedIn)
  return (
    <div style={{overflow:'hidden'}}  className={`${themeState ? "dark-mode" : ""}`} >
      <div className="app-admin-wrap layout-sidebar-large">
        <Notify position="TopRight" />
        <Row>
        <HeaderIndex toggleTheme={toggleClass} />
          <Col xl={2} style={{marginTop:'4rem'}}>
          {localStorage.getItem("is_content_creator") != 2 ? (
                 ""  
                ) : (
                  <SideNav />                 
                )}        
          </Col>
          <Col xl={10}>
          <div style={{marginTop:'1.5rem',overflow:'hidden'}}    className="main-content-wrap sidenav-open d-flex flex-column">
          <div className="main-wrap-sec">
            {React.cloneElement(props.children)}
          </div>
          {/* <LatestFooter /> */}
        </div>
          </Col>       
        </Row>  
      </div>
      <LatestFooter />
    </div>
  );
}

const mapStateToPros = (state) => ({
  profile: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros, mapDispatchToProps
)(MainLayout);