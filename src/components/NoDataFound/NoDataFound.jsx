import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import configuration from "react-global-configuration";

const NoDataFound = () => {
  return (
    <>
      <div className="no-data-found-sec">
        <Row>
          <Col sm="12" md="12">
            <div className="no-data-found-img-sec">
              <Image
                alt="not-found"
                src={
                  // configuration.get("configData.frontend_no_data_image")
                  //   ? configuration.get("configData.frontend_no_data_image")
                  //   : window.location.origin +
                  //     "/assets/images/illustrations/error-404.png"
                  "/assets/images/illustrations/error-404.png"
                }
                
              />
              <h1 style={{color:'orange'}}>No Data Found !</h1>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default NoDataFound;
