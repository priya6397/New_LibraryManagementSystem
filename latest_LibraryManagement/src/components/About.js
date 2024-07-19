import React from "react";
import Vmc from "./inc/Vmc";

const About = () => {
  return (
    <div>
      <section className="py-4 bg-info">
        <div className="container">
          <div className="row">
            <div className="col-md-4 my-auto">
              <h4>About Us</h4>
            </div>
            <div className="col-md-8 my-auto">
              <h6 className="float-end">Home / About Us</h6>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-c-light border-bottom">
        <div className="container">
          <h5 className="main-heading" style={{ display: "flex" }}>
            Our Library
          </h5>
          <div className="underline"></div>
          <p className="text-align">
            Libraries can vary widely in size and may be organised and
            maintained by a public body such as a government, an institution
            (such as a school or museum), a corporation, or a private
            individual. In addition to providing materials, libraries also
            provide the services of librarians who are trained experts in
            finding, selecting, circulating and organising information while
            interpreting information needs and navigating and analysing large
            amounts of information with a variety of resources. Library
            buildings often provide quiet areas for studying, as well as common
            areas for group study and collaboration, and may provide public
            facilities for access to their electronic resources, such as
            computers and access to the Internet.
          </p>
        </div>
      </section>
      <Vmc />
    </div>
  );
};

export default About;
