import React from "react";

function Footer() {
  return (
    <footer className="py-12 bg-bg-light">
      <div className="max-w-7xl mx-auto text-center">
        <div className="font-roboto font-medium tracking-[5%] text-[16px] uppercase flex flex-col md:flex-row gap-1 md:gap-2 justify-center items-center">
          <p>Ryan Beckett</p>
          <span className="text-crimson-bright text-xl"> {" // "} </span>
          <p>© 2026</p>

          <span className="text-crimson-bright text-xl"> {" // "} </span>
          <p>Auckland, NZ</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
