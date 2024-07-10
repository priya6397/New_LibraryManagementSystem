import React from "react";
import { Link } from "react-router-dom";
import Slider from "./slider";
import Vmc from "./inc/Vmc";
import Service1 from "../images/library4.jpg";
import Service2 from "../images/library2.jpg";
import Service3 from "../images/library5.jpg";

const Home = () => {
  return (
    <div className="container-fluid mb-2">
      <Slider />
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h3 className="main-heading"> Our Library</h3>
              <div className="underline mx-auto"></div>
              <p>
                A library is a collection of books and other materials
                accessible for use by its members and allied institutions.
                Libraries provide both physical (hard copies) and digital (soft
                copies) materials, and they can exist as physical locations,
                virtual spaces, or a combination of both12. Library science,
                also known as library studies or library economy, is an
                interdisciplinary field that deals with the organization,
                access, collection, and regulation of information in both
                physical and digital forms1. It encompasses practices related to
                the management, preservation, and dissemination of information
                resources, as well as the political economy of information1.
                Historically, library science has also included archival
                science. <br />
                “A public library is an organization established, supported and
                funded by the community, either through local, regional, or
                national government or through some form of community
                organization. It provides access to knowledge, information and
                works of imagination through range of resources and services and
                is equally available to all members of the community regardless
                of race, nationality, age, gender, religion, language,
                disability, economic and employment status and educational
                attainment.”
              </p>
              <Link to="/About" className="btn btn-warning shadow">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <Vmc />  */}

      <section className="section border-top">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-4 text-center">
              <h3 className="main-heading"> Our Services </h3>
              <div className="underline mx-auto"></div>
            </div>

            <div className="col-md-4">
              <div className="card shadow">
                <img
                  src={Service1}
                  className="w-100 border-bottom"
                  alt="Services"
                />
                <div className="card-body">
                  <h6>Find Books</h6>
                  <div
                    className="underline"
                    style={{ display: "inline-block" }}
                  ></div>
                  <p>
                    You can quickly locate any book in our library by going to
                    the book list area. There are two dropdown menus: city and
                    library. Choose the location where you want to go through
                    the books, then choose the library option. This will display
                    the books that are available in that library, where you can
                    quickly locate your book.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow">
                <img
                  src={Service2}
                  className="w-100 border-bottom"
                  alt="Services"
                />
                <div className="card-body">
                  <h6>Issue Book</h6>
                  <div
                    className="underline"
                    style={{ display: "inline-block" }}
                  ></div>
                  <p>
                    You can issue any book in our library by first registering
                    on our library app, going to the books list, and clicking
                    the "issue book" button. This will automatically display the
                    book name and ID that you want to issue. Next, you must
                    enter your ID confirmation code and the expiration date, and
                    then click "save."
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow">
                <img
                  src={Service3}
                  className="w-100 border-bottom"
                  alt="Services"
                />
                <div className="card-body">
                  <h6>Return Book</h6>
                  <div
                    className="underline"
                    style={{ display: "inline-block" }}
                  ></div>
                  <p>
                    You can return any book in our library with ease. Simply go
                    to the users list section and click on the issued books icon
                    button. From there, you can view the history of the books
                    you've been issued. If you returned a book, the date of
                    expiration will be indicated; if not, click the return book
                    icon to have the book returned.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
