import React, { useEffect } from "react";
import {
  Row,
  Col,
  Image,
  Container,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { connect } from "react-redux";
import { getReferralStart } from "../../store/actions/ReferralAction";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  RedditIcon,
} from "react-share";
import "./Referrals.css";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { getSuccessNotificationMessage } from "../helper/NotificationMessage";
import ReferralsLoader from "../Loader/ReferralsLoader";

const $ = window.$;

const ReferralsIndex = (props) => {
  useEffect(() => {
    props.dispatch(getReferralStart());
  }, []);

  const onCopy = () => {
    const notificationMessage = getSuccessNotificationMessage("Link Copied");
    props.dispatch(createNotification(notificationMessage));
  };

  return (
    <>
      <div className="referrals-sec">
        {props.referrals.loading ? (
          <ReferralsLoader />
        ) : (
          <Container>
            <h4 className="head-title">
              <Image
                src={
                  window.location.origin + "/assets/images/icons/referral.png"
                }
                className="referrals-header-icons"
              />{" "}
              {t("tell_friends_about FACTZZ")}{" "}
               
            </h4>
            <Row>
              <Col md={12}>
                <div className="referrals-box">
                  <h3>{t("referral_code_note")}</h3>
                  <div className="referrel-earn">
                    <div><span className="earn-title">No of Users Joined</span><br />{props.referrals.data.total_referrals}</div>
                    <div><span className="earn-title">Referral Earnings</span><br />{
                     props.referrals.data
                      .referral_earnings_formatted
                        }</div>
                    <div><span className="earn-title">Referee Earnings</span><br />{
                        props.referrals.data
                        .referee_earnings_formatted
                         }</div>
                    <div><span className="earn-title">Total</span><br />{props.referrals.data.total_formatted}</div>
                    <div><span className="earn-title">Used</span><br />{props.referrals.data.used_formatted}</div>
                    <div><span className="earn-title">Remaining</span>
                    <br />{props.referrals.data.remaining_formatted}</div>
                  </div>
                  <div className="referrals-sub-sec">
                    <Row className="align-items-center">
                      <Col md={6}>
                        <div className="referrals-email">
                          <InputGroup className="">
                            <FormControl
                              disabled
                              placeholder={
                                props.referrals.data.referrals_signup_url
                              }
                              aria-label="Recipient's username"
                              aria-describedby="basic-addon2"
                            />
                            <CopyToClipboard
                              onCopy={onCopy}
                              text={props.referrals.data.referrals_signup_url}
                            >
                              <InputGroup.Text id="basic-addon2">
                                <Button variant='outline-danger'>
                                  {t('copy_Url')}
                                </Button>
                              </InputGroup.Text>
                            </CopyToClipboard>
                          </InputGroup>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="referrals-social-link-sec">
                          <div className="referrals-social-link-card">
                            <div className="email-bg">
                              <EmailShareButton
                                subject={configuration.get(
                                  "configData.site_name"
                                )}
                                body={props.referrals.data.share_message}
                                className="Demo__some-network__share-button"
                                url=""
                              >
                                <EmailIcon size={32} round />
                              </EmailShareButton>
                            </div>
                            <p>{t("email")}</p>
                          </div>
                          <div className="referrals-social-link-card">
                            <div className="whatsapp-bg">
                              <WhatsappShareButton
                                url={props.referrals.data.share_message}
                                // title={props.referrals.data.share_message}
                                // separator=":: "
                                className="Demo__some-network__share-button"
                              >
                                <WhatsappIcon size={32} round />
                              </WhatsappShareButton>
                            </div>
                            <p>{t("whatsapp")}</p>
                          </div>
                          <div className="referrals-social-link-card">
                            <div className="facebook-bg">
                              <FacebookShareButton
                                url={props.referrals.data.referrals_signup_url}
                                quote={props.referrals.data.share_message}
                                className="Demo__some-network__share-button"
                              >
                                <FacebookIcon size={32} round />
                              </FacebookShareButton>
                            </div>
                            <p>{t("facebook")}</p>
                          </div>
                          <div className="referrals-social-link-card">
                            <div className="twitter-bg">
                              <TwitterShareButton
                                url={props.referrals.data.share_message}
                                // title={props.referrals.data.share_message}
                                className="Demo__some-network__share-button"
                              >
                                <TwitterIcon size={32} round />
                              </TwitterShareButton>
                            </div>
                            <p>{t("twitter")}</p>
                          </div>
                          <div className="referrals-social-link-card">
                            <div className="reddit-bg">
                              <RedditShareButton
                                url={props.referrals.data.share_message}
                                // title={props.referrals.data.share_message}
                                windowWidth={660}
                                windowHeight={460}
                                className="Demo__some-network__share-button"
                              >
                                <RedditIcon size={32} round />
                              </RedditShareButton>
                            </div>
                            <p>{t("reddit")}</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h4>{t("how_it_works_referral")}</h4>
                <div className="how-its-work-sec">
                  <div className="how-its-work-card">
                    <div classname="how-its-work-icon-sec">
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/share-referal.svg"
                        }
                        className="how-its-work-icons"
                      />
                    </div>
                    <div className="how-its-work-info">
                      <h5>{t("referral_step1")}</h5>
                      <p>{t("referral_step1_content")}</p>
                    </div>
                  </div>
                  <div className="how-its-work-card">
                    <div classname="how-its-work-icon-sec">
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/referal-friend.svg"
                        }
                        className="how-its-work-icons"
                      />
                    </div>
                    <div className="how-its-work-info">
                      <h5>{t("referral_step2")}</h5>
                      <p>{t("referral_step2_content")}</p>
                    </div>
                  </div>
                  <div className="how-its-work-card">
                    <div classname="how-its-work-icon-sec">
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/message-1.svg"
                        }
                        className="how-its-work-icons"
                      />
                    </div>
                    <div className="how-its-work-info">
                      <h5>{t("referral_step3")}</h5>
                      <p>{t("referral_step3_content")}</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  referrals: state.referral.referralDetails,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(ReferralsIndex));
