import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

export const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-auto pt-4 pb-3 border-top shadow-sm">
      <div className="container">
        <div className="row">

          {/* Brand & About */}
          <div className="col-md-4 mb-3">
            <h5 className="text-warning">
              <i className="bi bi-stack me-2"></i>StackIt
            </h5>
            <p className="small text-muted">
              StackIt is a simple Q&A platform focused on collaborative learning and structured knowledge sharing.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-md-4 mb-3">
            <h6 className="text-light">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link className="text-muted text-decoration-none" to="/ask">Ask a Question</Link></li>
              <li><Link className="text-muted text-decoration-none" to="/tags">Tags</Link></li>
              <li><Link className="text-muted text-decoration-none" to="/notifications">Notifications</Link></li>
            </ul>
          </div>

          {/* Contact / Socials */}
          <div className="col-md-4 mb-3">
            <h6 className="text-light">Connect</h6>
            <p className="small text-muted">Join the community and share what you know.</p>
            <div className="d-flex gap-3">
              <a href="#" className="text-light"><i className="bi bi-github"></i></a>
              <a href="#" className="text-light"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-light"><i className="bi bi-discord"></i></a>
            </div>
          </div>

        </div>

        {/* Bottom Text */}
        <div className="text-center border-top pt-3 mt-3 text-muted small">
          &copy; {new Date().getFullYear()} StackIt. All rights reserved.
        </div>
      </div>
    </footer>
  );
};


