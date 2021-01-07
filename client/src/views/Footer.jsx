import React from "react";

const d = new Date();

let copyYear = d.getFullYear();

function Footer() {
  return (<div><footer>Copyright {copyYear}</footer></div>);
}

export default Footer;
