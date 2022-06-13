import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { translate, t } from "react-multi-lang";

const InboxNoDataFound = () => {
  return (
    <>
      <div className="message-no-data-found-sec">
        <Row>
          <Col sm="12" md="12">
            <h4>
              {t("start_chat_para")}
            </h4>
            {/* <Button className="save-btn">
                New Message
            </Button> */}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default translate(InboxNoDataFound);
