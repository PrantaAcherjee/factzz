import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Image } from "react-bootstrap";
import AddCardModal from "../../helper/AddCardModal";
import "./CardsIndex.css";
import {
  fetchCardDetailsStart,
  selectDefaultCardStart,
  deleteCardStart,
} from "../../../store/actions/CardsAction";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentAddCardModal from "../../helper/PaymentAddCardModal";
import NoDataFound from "../../NoDataFound/NoDataFound";
import CardListLoader from "../../Loader/CardListLoader";
import configuration from "react-global-configuration";
import { translate, t } from "react-multi-lang";

const CardsIndex = (props) => {
  useEffect(() => {
    props.dispatch(fetchCardDetailsStart());
  }, []);

  const stripePromise = loadStripe(
    configuration.get("configData.stripe_publishable_key")
  );

  const [addCard, setAddCard] = useState(false);

  const closeAddCardModal = () => {
    setAddCard(false);
  };

  const [paymentAddCard, setPaymentAddCard] = useState(false);

  const closePaymentAddCardModal = () => {
    setPaymentAddCard(false);
  };

  const { cards } = props;

  return (
    <>
      <div className="card-list-sec">
        <Container>
          <h3 className="head-title">{t("Manage your cards")}</h3>
          {/* <Row>
            <Col sm={12} md={6} xl={4}>
              <div
                className="card-list-box cursor-pointer-link"
                onClick={() => setPaymentAddCard(true)}
              >
                <div className="add-account-sec">
                  <Image
                    src="/assets/images/icons/add-card.svg"
                    className="add-card-img"
                  />
                  <h5 className="text-muted">{t("add_card")}</h5>
                </div>
              </div>
            </Col>
          </Row> */}
          <Row>
            {cards.loading ? (
              <CardListLoader />
            ) : cards.data.cards.length > 0 ? (
              <>
              {cards.data.cards.map((card) => (
                <Col sm={12} md={6} xl={4}>
                  <div className="card-list-box">
                    <h5 style={{color:'white'}} >XXXX XXXX XXXX {card.last_four}</h5>
                    <h5 className="text-warning my-2">{card.card_type}</h5>
                    <h2 className="text-white"><i class="fa-brands fa-cc-visa px-2"/><i class="fa-brands fa-cc-mastercard px-2"/>
                    <i class="fa-brands fa-cc-paypal px-2"></i>
                    <i class="fa-brands fa-cc-stripe px-2"></i>
                    </h2>

                    <div className="payment-bottom">
                      <div className="action-btn">
                        {card.is_default == 1 ? (
                          <p className="card-link-text text-success fw-bold">
                            {t("default_card")}
                          </p>
                        ) : (
                          <Link
                            className="card-link-text text-info fw-bold"
                            onClick={() =>
                              props.dispatch(
                                selectDefaultCardStart({
                                  user_card_id: card.id,
                                })
                              )
                            }
                          >
                            {t("mark_as_default")}
                          </Link>
                        )}
                        <Link
                            className="card-link-text text-info"
                            onClick={() =>
                              {if(window.confirm(t("delete_cards_confirmation"))){ 
                                props.dispatch(
                                  deleteCardStart({
                                    user_card_id: card.id,
                                  })
                                )};}
                            }
                          >
                           <i style={{color:'indianred'}} class="fa-solid fa-trash-can  fs-5 fw-bold"></i>
                          </Link>
                      </div>
                      <Image
                        src="/assets/images/icons/credit-card.svg"
                        className="credit-img"
                      />
                    </div>
                  </div>
                </Col>
              ))}
              </>
            ) : null}
            <Col sm={12} md={6} xl={4}>
              <div
                className="card-list-box cursor-pointer-link"
                onClick={() => setPaymentAddCard(true)}
              >
                <div className="add-account-sec">
                  <Image
                    src="/assets/images/icons/add-card.svg"
                    className="add-card-img"
                  />
                  <h5 className="text-muted">{t("add_card")}</h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Elements stripe={stripePromise}>
        <PaymentAddCardModal
          paymentAddCard={paymentAddCard}
          closePaymentAddCardModal={closePaymentAddCardModal}
        />
      </Elements>
    </>
  );
};

const mapStateToPros = (state) => ({
  cards: state.cards.cardDetails,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(CardsIndex));
