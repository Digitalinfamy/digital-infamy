import Image from "next/image";
import React from "react";
import { GrGithub, GrInstagram, GrLinkedin, GrTwitter } from "react-icons/gr";
import ScrollToTop from "../scroll-to-top/ScrollToTop";

function Footer() {
  return ( <>
    <footer className="footer-container">
      <div className="footer-logo">
        <Image alt="Digital Infamy Ltd" src="/LOGO_D_Teal.svg" width={256} height={256} />
      </div>
      <div className="copyright-text">
        <h2 className="text-center">Socials</h2>
        <div className="social-icons">
          {/*<div>*/}
          {/*  <Link href="http://facebook.com/digitalinfamyltd">*/}
          {/*    <GrFacebook />*/}
          {/*  </Link>*/}
          {/*</div>*/}
          <div>
            <a href="https://twitter.com/InfamyLtd" rel="noreferrer noopener" target="_blank">
              <GrTwitter />
            </a>
          </div>
          <div>
            <a href="https://www.instagram.com/digitalinfamyltd/" rel="noreferrer noopener" target="_blank">
              <GrInstagram />
            </a>
          </div>
          <div>
            <a href="https://www.linkedin.com/company/digital-infamy" rel="noreferrer noopener" target="_blank">
              <GrLinkedin />
            </a>
          </div>
          <div>
            <a href="https://github.com/Digitalinfamy" rel="noreferrer noopener" target="_blank">
              <GrGithub />
            </a>
          </div>
        </div>
        <div>
          <p>©2022 Didital Infamy Ltd Trading as Digital Infamy - Didital Infamy Limited is a private limited company
            registered in England and Wales with company registration number 14439049.</p>
        </div>
      </div>
    </footer>
    <ScrollToTop key={`scroll-to-top`} />
  </> );
}

export default Footer;