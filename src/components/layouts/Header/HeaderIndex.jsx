import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Image, Media, Button, Badge, Form,Row,Col} from "react-bootstrap";
import configuration from "react-global-configuration";
import VerifiedBadgeNoShadow from "../../Handlers/VerifiedBadgeNoShadow";
import io from "socket.io-client";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import CreateContentCreatorModal from "../../helper/CreateContentCreatorModal";
import LoginModal from "../../Model/LoginModal";
import SignupModal from "../../Model/SignupModal";
import "./header.css"
 

let chatSocket;

const HeaderIndex = (props) => {
  const [chatCount, setChatCount] = useState(0);
  const [bellCount, setBellCount] = useState(0);

  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  useEffect(() => {
    console.log("Inside");
    let chatSocketUrl = configuration.get("configData.chat_socket_url");
    if (chatSocketUrl === "") {
      console.log("no keys configured");
    }
    if (configuration.get("configData.is_notification_count_enabled") == 1) {
      chatSocketConnect();
    }
    if (configuration.get("configData.is_web_notification_enabled")) {
      navigator.serviceWorker.addEventListener("message", (message) => {
        showNotification(message.data.notification);
      });
    }
  }, []);

  const showNotification = (message) => {
    var options = {
      body: message.body,
      icon: configuration.get("configData.site_icon"),
      dir: "ltr",
    };
    var notification = new Notification(message.title, options);
    notification.onclick = function (event) {
      event.preventDefault();
      window.location.replace(
        configuration.get("configData.frontend_url") + message.click_action
      );
    };
    setTimeout(notification.close.bind(notification), 5000);
  };
  const chatSocketConnect = () => {
    // check the socket url is configured
    let chatSocketUrl = configuration.get("configData.chat_socket_url");
    if (chatSocketUrl) {
      chatSocket = io(chatSocketUrl, {
        query:
          `commonid:'user_id_` +
          localStorage.getItem("userId") +
          `',myid:` +
          localStorage.getItem("userId"),
      });
      chatSocket.emit("notification update", {
        commonid: "user_id_" + localStorage.getItem("userId"),
        myid: localStorage.getItem("userId"),
      });
      if (localStorage.getItem("socket") == "true") {
        chatSocket.on("notification", (newData) => {
          console.log(newData);
          setChatCount(newData.chat_notification);
          setBellCount(newData.bell_notification);
        });
      } else {
        console.log(false);
        chatSocket.disconnect();
      }
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  const [createContentCreatorModal, setCreateContentCreatorModal] =
    useState(false);

  const closeCreateContentCreatorModal = () => {
    setCreateContentCreatorModal(false);
  };

  const closeLoginModal = () => {
    setLoginModal(false);
  };
  const closeSignupModal = () => {
    setSignupModal(false);
  };

  const openSignupModal = () => {
    setLoginModal(false);
    setSignupModal(true);
  };
  const { pathname } = useLocation()
  // const slas = pathname.split('')
  const char = pathname.split(' ')
  console.log();
  return (
    <>
      {localStorage.getItem("userId") ? (
       <Row>
        <Col xs={12} sm={12}>
        <header className="main-header">
          <Container>
            <nav className="main-header-menu">        
                <Link
                to={"/home"}
                className="main-header-menu icon-with-round-hover m-current"
                onClick={() => setIsVisible(false)}
              >
                <div>
                <i class="fas fa-home"></i>
                 <span>{char[0]}</span>
                 </div>
                  </Link>            
              <div className="header__right">
                <div className="links">
     
              
               <div class="dropdown show">
               <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               <i class="fa-solid fa-circle-user"></i>
               </a>

               <div style={{width:'185px',marginTop:'14px',overflow:"hidden",background:'#fff'}}  class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">             
               <Link style={{fontSize:'16px',fontWeight:'500'}} class="dropdown-item" to={"/explore"}><i class="fa-solid fa-arrows-rotate"></i> Explore More </Link> 
               <hr/>
               <Link style={{fontSize:'16px',fontWeight:'500'}} class="dropdown-item" to={"/live-videos"}><i class="fa-solid fa-arrows-rotate"></i> Live Videos</Link> 
               <hr/>            
               {
                localStorage.getItem("is_content_creator") != 2 ?  <Link style={{fontSize:'16px',fontWeight:'500'}} class="dropdown-item"  to={"/become-a-content-creator"}><i class="fa-solid fa-arrows-rotate"></i> Content Creator</Link>
    
                :
                <Link style={{fontSize:'16px',fontWeight:'500'}}class="dropdown-item"  to={"/add-post"}><i class="fa-solid fa-arrows-rotate"></i> Add Post</Link>
               }             
             </div>
              </div>

 
                  <Link
                    to={"/inbox"}
                    className="main-header-menu icon-with-round-hover m-current"
                    onClick={() => setIsVisible(false)}
                  >
                    {/* <Image
                    src={
                      window.location.origin +
                      "/assets/images/logo/Logo PNG.png"
                    }
                  /> */}
                    <i class="fa-regular fa-envelope"></i>
                    {/* <i class="fas fa-home"></i> */}
                  </Link>
                  {/* <Link
                    to={"/inbox"}
                    className="main-header-menu icon-with-round-hover"
                    onClick={() => setIsVisible(false)}
                  > */}
                  {/* <Image
                  src={window.location.origin + "/assets/images/icons/chat.svg"}
                /> */}
                  {/* <i className='fas fa-envolpe'></i> */}
                  {/* <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/new/mail-new.svg"
                    }
                  /> */}
                  {/* <span className="main-header-menu__count"> 5 </span>  */}
                  {/* {chatCount > 0 ? (
                      <Badge variant="light" className="badge-notify">
                        {chatCount}
                      </Badge>
                    ) : (
                      ""
                    )}
                  </Link> */}

                  <Link
                    to={"/notification"}
                    className="main-header-menu icon-with-round-hover"
                    active-classname="m-current"
                    exact-active-classname=""
                    onClick={() => setIsVisible(false)}
                  >
                    {/* <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/notification.svg"
                    }
                  /> */}
                    <i className='fas fa-bell'></i>
                    {/* <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/new/bell-new.svg"
                    }
                  /> */}
                    {bellCount > 0 ? (
                      <Badge variant="light" className="badge-notify">
                        {bellCount}
                      </Badge>
                    ) : (
                      ""
                    )}
                  </Link>
                  <Button
                    type="button"
                    style={{marginLeft:'6px'}}
                    className="main-header-menu icon-with-round-hover"
                    to="#"
                    data-drawer-trigger
                    aria-controls="drawer-name"
                    aria-expanded="false"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    {/* <Image
                  src={window.location.origin + "/assets/images/icons/user.svg"}
                /> */}
                    <i class="fa-solid fa-circle-chevron-down"></i>                   
                    {/* <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/new/user-new.svg"
                    }
                  /> */}
                  </Button>
                </div>
              </div>
            </nav>

            {/* {localStorage.getItem("is_document_verified") == 3 ? (
                  <div className="pl-2">
                    <Alert key={1} variant='danger'>
                      The user updated documents decined by Admin.
                    </Alert>
                  </div>
                ) : null} */}
          </Container>
        </header>
        </Col>
       </Row>
      ) : (
        <Row>
          <Col xs={12} sm={12}>
          <header className="main-header">
          <Container>
            <nav className="main-header-menu">
              <Link
                to={"/"}
                className="main-header-menu icon-with-round-hover m-current"
                onClick={() => setIsVisible(false)}
              >
                <Image
                  src={window.location.origin + "/assets/images/icons/home.svg"}
                />
              </Link>
              <ul className="list-unstyled single-profile-menu">
                <Media as="li">
                  <Link
                    to="#"
                    className="nav-link"
                    onClick={() => {
                      setSignupModal(false);
                      setLoginModal(true);
                    }}
                  >
                    Login
                  </Link>
                </Media>
                <Media as="li">
                  <Link
                    to="#"
                    className="nav-link"
                    onClick={() => {
                      setSignupModal(true);
                      setLoginModal(false);
                    }}
                  >
                    Signup
                  </Link>
                </Media>
              </ul>
            </nav>
          </Container>
        </header>
          </Col>
        </Row>       
      )}
      {isVisible && localStorage.getItem("userId") ? (
        <div className="drawer" id="drawer-name" data-drawer-target>
          <div
            className="drawer__overlay"
            data-drawer-close
            tabIndex="-1"
            onClick={() => setIsVisible(!isVisible)}
          ></div>
          <div className="drawer__wrapper">
            <div className="drawer__header">
              <div className="drawer__title">
                <Link to="#" className="l-sidebar__avatar" data-name="Profile">
                  <span className="sidebar-hamburger-user-profile">
                    <Image
                      src={localStorage.getItem("user_picture")}
                      alt={configuration.get("configData.site_name")}
                    />
                  </span>
                  <span onClick={() => setIsVisible(!isVisible)}>
                    {" "}
                    <i className="material-icons add-icon">clear</i>
                  </span>
                </Link>
                <div className="pull-left side-user-head">
                  <Link
                    to={"/profile"}
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    <h3 className="g-user-name">
                      {localStorage.getItem("name")} {"  "}
                      {localStorage.getItem("is_verified_badge") == 1 ? (
                        <div className="pl-2">
                          <VerifiedBadgeNoShadow />
                        </div>
                      ) : null}
                    </h3>
                    <span className="user-id">
                      @{localStorage.getItem("username")}
                    </span>
                  </Link>

                  <ul className="list-inline">
                    <Media as="li">
                      <Link to={"/fans"} onClick={() => setIsVisible(false)}>
                        <span className="fans-follow">
                          {localStorage.getItem("total_followers")
                            ? localStorage.getItem("total_followers")
                            : 0}
                        </span>{" "}
                        {t("fans")}
                      </Link>
                    </Media>
                    <Media as="li">
                      <Link
                        to={"/following"}
                        onClick={() => setIsVisible(false)}
                      >
                        <span className="fans-follow">
                          {localStorage.getItem("total_followings")
                            ? localStorage.getItem("total_followings")
                            : 0}
                        </span>{" "}
                        {t("following")}
                      </Link>
                    </Media>
                  </ul>
                </div>

                {/* <div className="pull-right">
                  <span className="m-arrow">
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/icons/arrow-down.svg"
                      }
                      alt={configuration.get("configData.site_name")}
                    />
                  </span>
                </div> */}
              </div>
              {/* <Button
                className="drawer__close"
                data-drawer-close
                aria-label="Close Drawer"
              ></Button> */}
            </div>
            <div className="drawer__content">
              <div className="right-sidebar-menu-item">
                <Link
                  to={"/profile"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/Profile.png"
                    }
                    alt="Factzz"
                  />{" "}
                  {t("my_profile")}
                </Link>
                

                {localStorage.getItem("is_content_creator") != 2 ? (
                  <Link
                    to={"/become-a-content-creator"}
                    className="sidebar-menus-item"
                    data-name="Profile"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/icons/referal-friend.svg"
                      }
                      alt={configuration.get("configData.site_name")}
                    />{" "}
                    {t("become_a_content_creator")}
                  </Link>
                ) : (
                  <>
                   <Link
                    to={"/dashboard"}
                    className="sidebar-menus-item"
                    data-name="Profile"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/icons/analytics.svg"
                      }
                      alt={configuration.get("configData.site_name")}
                    />{" "}
                    {t("dashboard")}
                  </Link>
                   
                  
                  </>                
                )}

                <Link
                  to={"/product-list"}
                  className="sidebar-menus-item"
                  data-name="ecommerce"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <i className="fas fa-shopping-bag"></i>
                  {t("Product List")}
                </Link>

                <Link
                  to={"/stories"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <i class="fas fa-history"></i>
                  {t("stories")}
                </Link>

                <Link
                  to={"/bookmarks"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/bookmarks.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("bookmarks")}
                </Link>
                <Link
                  to={"/list"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/lists.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("lists")}
                </Link>
                <hr className="sidebar-menu-divider" />

                <Link
                  to={"/live-videos"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/live.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("live_videos")}
                </Link>
                {configuration.get("configData.is_one_to_one_call_enabled") ==
                  1 ? (
                  <>
                    <Link
                      to={"/video-calls-history"}
                      className="sidebar-menus-item"
                      data-name="Profile"
                      onClick={() => setIsVisible(!isVisible)}
                    >
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/video.svg"
                        }
                        alt={configuration.get("configData.site_name")}
                      />{" "}
                      {t("video_calls")}
                    </Link>
                    <Link
                      to={"/audio-calls-history"}
                      className="sidebar-menus-item"
                      data-name="Profile"
                      onClick={() => setIsVisible(!isVisible)}
                    >
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/audio.png"
                        }
                        alt={configuration.get("configData.site_name")}
                      />{" "}
                      {t("audio_calls")}
                    </Link>
                  </>
                ) : (
                  ""
                )}

                <Link
                  to={"/edit-profile"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/settings.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("settings")}
                </Link>
                {configuration.get("configData.is_referral_enabled") == 1 ? (
                  <Link
                    to={"/referrals"}
                    className="sidebar-menus-item"
                    data-name="Profile"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    <i className="fas fa-gift"></i> {t("referrals")}
                  </Link>
                ) : (
                  ""
                )}

                <div to="#" className="sidebar-menus-dark">
                  <div className="toggle-mode">
                    <div className="toggle-switch">
                      <label className="switch">
                        <input
                          type="checkbox"
                          id="switch-style"
                          onChange={props.toggleTheme}
                        />
                        <div className="slider round" id="switch-style"></div>
                      </label>
                      <div className="toggle-label">
                        <p>Dark Mode</p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="sidebar-menu-divider" />

                <Link
                  to={"/cards"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/card.svg"
                    }
                    alt="Your Cards"
                  />{" "}
                  {t("your_cards")}{" "}
                  <span className="desc">({t("to_subscribe")})</span>
                </Link>

                <Link
                  to={"/add-bank"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/bank.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("add_bank")} <span className="desc">({t("to_earn")})</span>
                </Link>
                <Link
                  to={"/wallet"}
                  className="sidebar-menus-item"
                  data-name="Wallet"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/wallet.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("wallet")}{" "}
                  <span className="desc">({t("your_earnings")})</span>
                </Link>

                <hr className="sidebar-menu-divider" />

                <Link
                  to={`/page/help`}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/help.svg"
                    }
                    alt={configuration.get("configData.site_name")}
                  />{" "}
                  {t("help_and_support")}
                </Link>

                <Link
                  to=""
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                  style={{ display: "none" }}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/dark.svg"
                    }
                    alt="Factzz"
                  />{" "}
                  {t("dark_mode")}
                </Link>
                <hr className="sidebar-menu-divider" />
                <Link
                  to={"/logout"}
                  className="sidebar-menus-item"
                  data-name="Profile"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <Image
                    src={
                      window.location.origin + "/assets/images/icons/logout.svg"
                    }
                    alt="Factzz"
                  />{" "}
                  {t("logout")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <CreateContentCreatorModal
        createContentCreatorModal={createContentCreatorModal}
        closeCreateContentCreatorModal={closeCreateContentCreatorModal}
      />
      <LoginModal
        loginModal={loginModal}
        closeLoginModal={closeLoginModal}
        openSignupModal={openSignupModal}
      />
      <SignupModal
        signupModal={signupModal}
        closeSignupModal={closeSignupModal}
      />
    </>
  );
};

const mapStateToPros = (state) => ({
  notifications: state.notification.notifications,
  searchUser: state.home.searchUser,

});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(HeaderIndex));