import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchListsDetailsStart } from "../../../store/actions/HomeAction";
import { translate, t } from "react-multi-lang";
import ListsLoader from "../../Loader/ListsLoader";
import "./style.css";

const ListIndex = (props) => {
  useEffect(() => {
    props.dispatch(fetchListsDetailsStart());
  }, []);
  return (
    <div className="lists">
      <Container>
        <Row>
        <div className="pull-left">
                    <Link
                      className="bookmarkes-list h2"
                      to={"/home"}
                      onClick={() => props.history.goBack()}
                    >
                     <i style={{fontSize:'24px'}} class="fa-solid fa-hand-point-left"> </i> 
                      <span style={{fontSize:'24px',paddingLeft:'5px'}}>List</span> 
                    </Link>
                  </div>
          <Col sm={12} md={12}>
            {props.lists.loading ? (
              <ListsLoader />
            ) : (
              <div className="vertical-menu">
                
                   
 
                <div  className="list-style">
              
                <div className="user-lists">
                  <Link to={"/fans"}>
                    <div className="pull-left">
                      <h3><i class="fa-solid fa-user-plus"></i> {t("fans")}</h3>
                      <span className="user-list-count">
                        {props.lists.data.total_followers} {t("people")}
                      </span>
                    </div>
                    <div className="pull-right"></div>
                  </Link>
                </div>
                <div className="user-lists">
                  <Link to={"/following"}>
                    <div className="pull-left">
                      <h3><i class="fa-solid fa-people-group"></i> {t("following")}</h3>
                      <span className="user-list-count">
                        {props.lists.data.total_followings} {t("people")}
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="user-lists">
                  <Link to={"/favorites"}>
                    <div className="pull-left">
                      <h3><i class="fa-regular fa-heart"></i> {t("favorites")}</h3>
                      <span className="user-list-count">
                        {props.lists.data.total_fav_users} {t("people")}
                      </span>
                    </div>
                    <div className="pull-right"></div>
                  </Link>
                </div>
                <div className="user-lists">
                  <Link to={"/bookmarks"}>
                    <div className="pull-left">
                      <h3><i class="fa-regular fa-bookmark"></i> {t("bookmarks")}</h3>
                      <span className="user-list-count">
                        {props.lists.data.total_bookmarks} {t("posts")}
                      </span>
                    </div>
                    <div className="pull-right"></div>
                  </Link>
                </div>
                <div className="user-lists">
                  <Link to={"/blocked-users"}>
                    <div className="pull-left">
                      <h3><i class="fa-solid fa-ban"></i> {t("blocked_users")}</h3>
                      <span className="user-list-count">
                        {props.lists.data.blocked_users} {t("people")}
                      </span>
                    </div>
                    <div className="pull-right"></div>
                  </Link>
                </div>

                </div> 
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  lists: state.home.lists,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(ListIndex));
