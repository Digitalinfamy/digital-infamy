import React, { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import {  animateScroll as scroll } from "react-scroll";

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  const gotToTop = () => {
    scroll.scrollToTop();
  }

  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, []);

  return (
    <div className="top-to-btm">
      {showTopBtn ? <FaAngleUp onClick={gotToTop} className="icon-position icon-style" /> : null}
    </div>
  );
};
export default ScrollToTop;