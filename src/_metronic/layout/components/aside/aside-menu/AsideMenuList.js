/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { menu } from './menuData'
export function AsideMenuList({ layoutProps }) {
  const [type, setType] = useState();
  const location = useLocation();
  const types = JSON.parse(localStorage.getItem("setStores"));
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };
  useEffect(() => {
    const Id = JSON.parse(localStorage.getItem("userinfo")).userType;
    // export const usertype = Id

    setType(Id);
  }, []);
  // console.log("type", 2)
  return (
    <>
      {/* begin::Menu Nav */}
      {type === 1 || type === 3 ? (
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          {/*begin::1 Level*/}
          {
            menu.map(nav =>

              <li
                className={`menu-item ${nav.subMenu ? 'menu-item-submenu' : getMenuItemActive(`/${nav.pathname}`, false)} `}
                aria-haspopup="true"
                data-menu-toggle={nav.subMenu && "hover"}
              >
                <NavLink className="menu-link menu-toggle" to={nav.pathname}>
                  <span className="svg-icon menu-icon">
                    <SVG
                      src={toAbsoluteUrl(nav.img)}
                    />
                  </span>
                  <span className="menu-text">{nav.title}</span>
                  {nav.subMenu && <i className="menu-arrow" />}
                </NavLink>
                {
                  nav.subMenu &&
                  <div className="menu-submenu ">
                    <i className="menu-arrow" />
                    <ul className="menu-subnav">

                      {
                        nav.subMenu.map(subNav =>
                          <li
                            className={`menu-item ${getMenuItemActive(`/${subNav.pathname}`)}`}
                            aria-haspopup="true"
                          >
                            <NavLink className="menu-link" to={subNav.pathname}>
                              <i className="menu-bullet menu-bullet-dot">
                                <span />
                              </i>
                              <span className="menu-text">{subNav.title}</span>
                            </NavLink>
                          </li>)
                      }

                    </ul>
                  </div>
                }
              </li>
            )
          }

        </ul>
      ) : type === 4 ? (
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          {
            menu.filter(val => val.flag === true).map(nav =>
              <li
                className={`menu-item ${getMenuItemActive(`/${nav.pathname}`, false)}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to={nav.pathname}>
                  <span className="svg-icon menu-icon">
                    <SVG
                      src={toAbsoluteUrl(nav.img)}
                    />
                  </span>
                  <span className="menu-text">{nav.title}</span>
                </NavLink>
              </li>
            )
          }
        </ul>
      ) : (
        ""
      )}
    </>
  );
}
