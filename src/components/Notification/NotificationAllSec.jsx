import React from "react";
import { Image } from "react-bootstrap";
import NoDataFound from "../NoDataFound/NoDataFound";
import VerifiedBadgeNoShadow from "../Handlers/VerifiedBadgeNoShadow";
import { translate, t } from "react-multi-lang";
import { Paper } from "@material-ui/core";

const NotificationAllSec = (props) => {
  const { notifications } = props;

  return (
    <>
      <div
        role="tabpanel"
        className={
          props.activeSec === "notify-all"
            ? "tab-pane fade in active"
            : "tab-pane fade"
        }
        id="Section1"
      >
        <div className="notification-list">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Paper elevation={1} className="notify-item">
                <div className="post-header">
                  <div className="alignleft">
                    <a
                      className="title-container"
                      href={notification.action_url}
                      target="_blank"
                    >
                      <Image
                        src={notification.from_userpicture}
                        className="user-image img-responsive notification-user-img "
                      />
                      <div className="user-name">
                        <span className="post-user-name">
                          {notification.from_displayname}{" "}
                          {notification.from_user.is_verified_badge == 1 ? (
                            <div className="pl-2">
                              <VerifiedBadgeNoShadow />
                            </div>
                          ) : null}
                        </span>
                        <p style={{color:'white'}}>
                          {notification.message}
                        </p>
                        <span className="post-user-notify-date">
                          {notification.updated_formatted}
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </Paper>
            ))
          ) : (
            <NoDataFound></NoDataFound>
          )}
        </div>
      </div>
    </>
  );
};

export default translate(NotificationAllSec);
