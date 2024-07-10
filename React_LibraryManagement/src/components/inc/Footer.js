import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className="section footer bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h6>Library Information</h6>
            <hr />
            <p className="text-white">
              The services that libraries offer are variously described as
              library services, information services, or the combination
              "library and information services", although different
              institutions and sources define such terminology differently.
            </p>
          </div>
          <div className="col-md-4">
            <h6>Quick Links</h6>
            <hr />
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/About">About</Link>
            </div>
            <div>
              <Link to="/Contact">Contact</Link>
            </div>
          </div>
          <div className="col-md-4">
            <h6>Contact Information</h6>
            <hr />
            <div>
              <p className="text-white mb-1">#64, Bangalore Karnataka India</p>
            </div>
            <div>
              <p className="text-white mb-1">+91 8272XXXXX6</p>
            </div>
            <div>
              <p className="text-white mb-1">+91 9999XXXXX9</p>
            </div>
            <div>
              <p className="text-white mb-1">email@domain.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
