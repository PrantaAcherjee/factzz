import React, { useState,useEffect } from 'react';
import "./style.css";

function getWindowSize() {
   const { innerWidth } = window;
   return { innerWidth };
}

import { NavLink } from 'react-router-dom';
import { Image } from 'react-bootstrap';


const SideNav = (props) => {
   // const [isOpen, setIsOpen] = useState(true);
   // const toggle = () => setIsOpen(!isOpen);

   const [windowSize, setWindowSize] = useState(getWindowSize())
   useEffect(() => {
      function handleWindowResize() {
         setWindowSize(getWindowSize())
      }
      window.addEventListener('resize', handleWindowResize)
      return () => {
         window.removeEventListener('resize', handleWindowResize)
      }
   }, [])
   useEffect(() => {
      if (windowSize.innerWidth < 768) {
         setIsOpen(false)
      } else {
         setIsOpen(true)
      }
   }, [setIsOpen, windowSize])
   const menuItem = [
       
       
      {
         path: "/profile",
         name: "Profile",
         icon: <i class="fa-solid fa-circle-user"></i>
      },
      {
         path: "/dashboard",
         name: "Dashboard",
         icon: <i class="fa-solid fa-box-archive"></i>
      },
      {
         path: "/edit-profile",
         name: "Settings",
         icon: <i class="fa-solid fa-screwdriver-wrench"></i>
      },
      
      {
         path: "/product-list",
         name: "Ecommerce",
         icon: <i class="fa-solid fa-basket-shopping"></i>
      },
      {
         path: "/stories",
         name: "Stories",
         icon: <i class="fa-solid fa-clock-rotate-left"></i>
      },
      {
         path: "/bookmarks",
         name: "Bookmarks",
         icon: <i class="fa-regular fa-bookmark"></i>
      },
      {
         path: "/list",
         name: "List",
         icon: <i class="fa-solid fa-list-ul"></i>
      },
      {
         path: "/cards",
         name: "Card",
         icon: <i class="fa-solid fa-money-check-dollar"></i>
      },
      {
         path: "/wallet",
         name: "Wallet",
         icon: <i class="fa-solid fa-wallet"></i>
      },
      {
         path: "/add-bank",
         name: "Add Bank",
         icon: <i class="fa-solid fa-building-columns"></i>
      },
        
      {
         path: "/video-calls-history",
         name: "Video calls",
         icon: <i class="fa-solid fa-video"></i>
      },
      {
         path: "/audio-calls-history",
         name: "Audio calls",
         icon: <i class="fa-solid fa-phone-volume"></i>
      },
      {
         path: "/refferels",
         name: "Refferels",
         icon: <i class="fa-solid fa-gift"></i>
      },
      {
         path: "/page/help",
         name: "Help & Support",
         icon: <i class="fa-solid fa-hand-holding-hand"></i>
      },
      {
         path: "/logout",
         name: "Logout",
         icon: <i class="fa-solid fa-right-from-bracket"></i>
      },

   ]
   return (
      <div className="contain">
         <div
            style={{ width: props.isOpen ? "220px" : "82px" }}
            className="sidebar">
            <div className="top_section">
               <Image
                  style={{ width: '100%', height: '100%'}}
                  src={!props.isOpen ? "/assets/images/logo/App logo-01.png" : "/assets/images/logo/Logo PNG.png"}
               />
                
            </div>
            <hr />
            <div>
            {
               menuItem.map((item, index) => (
                <NavLink to={item.path} key={index} className="link" activeclassName="active">
                     <div className="icon">{item.icon}</div>
                     <div style={{ display: props.isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                    
                  </NavLink>
                  
               ))
            }
             
            </div>
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
         </div>

      </div>
   );
};

export default SideNav;