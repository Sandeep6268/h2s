import React from "react";
import "./Contact.css";
import Footer from "../../Component/Footer/Footer";
import Header from "../../Component/Header/Header";

const Contact = () => {
  return (
    <>
      <Header />
      <div class="landing_page">
        <div class="responsive-container-block big-container">
          <img
            class="bg-img"
            id="iq5bf"
            src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/clothes-bg.png"
          />
          <div class="responsive-container-block container">
            <div class="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12 left-one">
              <div class="content-box">
                <p class="text-blk section-head">H2S Tech Support</p>
                <p class="text-light section-subhead">
                  We’re here to help! Whether you have a question, feedback, or
                  need support, feel free to reach out to us using any of the
                  methods below. We aim to respond within 24 hours.
                </p>
                <div class="icons-container">
                  <a  href="https://x.com/h2s_tech_77?t=0ZEToDRrgK7j8YJZA3CCfw&s=08" target="_blank"
                   class="share-icon">
                    <img
                      class="img"
                      src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-twitter.png"
                    />
                  </a>
                  <a class="share-icon">
                    <img
                      class="img"
                      src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-facebook.png"
                    />
                  </a>
                  <a
                    class="share-icon"
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=h2stechsolutions@gmail.com"
                    target="_blank"
                  >
                    <img
                      class="img"
                      src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-google.png"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/h2stechsolutions?igsh=d3BkOTMxYWxpNjN5"
                    target="_blank"
                    class="share-icon"
                  >
                    <img
                      class="img"
                      src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-instagram.png"
                    />
                  </a>
                </div>
                <p className="mt-4 text-light">
                  <span className="fw-bolder fs-4 text-white">Head Quarter At :-</span>
                  <br />
                  91Springboard, 4th Floor, Salarpuria Tower-I,
                  <br /> No. 22, Hosur Road, Koramangala, <br />
                  Bengaluru, Karnataka – 560095
                </p>
              </div>
            </div>
            <div
              class="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-6 right-one"
              id="i1zj"
            >
              <form class="form-box">
                <div class="container-block form-wrapper">
                  <p class="text-blk contactus-head">
                    <a class="link" href=""></a>
                    Get In Touch
                  </p>
                  <p class="text-blk contactus-subhead">
                    We will get back to you in 24 hours
                  </p>
                  <div class="responsive-container-block">
                    <div
                      class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                      id="i10mt-7"
                    >
                      <input
                        class="input"
                        id="ijowk-7"
                        name="FirstName"
                        placeholder="First Name"
                      />
                    </div>
                    <div
                      class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                      id="i1ro7"
                    >
                      <input
                        class="input"
                        id="indfi-5"
                        name="Last Name"
                        placeholder="Last Name"
                      />
                    </div>
                    <div
                      class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-6 wk-ipadp-6 emial"
                      id="ityct"
                    >
                      <input
                        class="input"
                        id="ipmgh-7"
                        name="Email"
                        placeholder="Email"
                      />
                    </div>
                    <div class="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                      <input
                        class="input"
                        id="imgis-6"
                        name="PhoneNumber"
                        placeholder="Phone Number"
                      />
                    </div>
                    <div
                      class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                      id="i634i-7"
                    >
                      <textarea
                        aria-placeholder="Type message here"
                        class="textinput"
                        id="i5vyy-7"
                        placeholder="Type message here"
                      ></textarea>
                    </div>
                  </div>
                  <button class="submit-btn">Get quote</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
