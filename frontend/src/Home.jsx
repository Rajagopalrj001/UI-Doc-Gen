
import Nav from "./Nav";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {

    return (
        
        <div className="container content-container my-5">
        <h2 className="text-center mb-4 text-light">Choose a Feature</h2>
      
        <div className="row justify-content-center">
          {/* Documentation Generator Card */}
          <div className="col-md-5 mb-4">
            <div className="card feature-card shadow-lg text-center">
              <div className="card-body">
                <h5 className="card-title">📚 Documentation Generator</h5>
                <p className="card-text text-muted">
                  Generate high-quality, well-structured documentation for your
                  projects in seconds.
                </p>
                <Link to="/documentation" className="btn btn-danger btn-animate">
                  Explore
                </Link>
              </div>
            </div>
          </div>
      
          {/* AI UI Generator Card */}
          <div className="col-md-5 mb-4">
            <div className="card feature-card shadow-lg text-center">
              <div className="card-body">
                <h5 className="card-title">🎨 AI UI Generator</h5>
                <p className="card-text text-muted">
                  Generate stunning UI designs with AI-powered creativity and
                  innovation.
                </p>
                <Link to="/image-generation" className="btn btn-danger btn-animate">
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-5 mb-4">
            <div className="card feature-card shadow-lg text-center">
              <div className="card-body">
                <h5 className="card-title">🎨Image to Html Generator</h5>
                <p className="card-text text-muted">
                  Convert designs in to code in matter of time
                </p>
                <Link to="http://127.0.0.1:8080" className="btn btn-danger btn-animate">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
              
        {/* Additional Content */}
        <div className="text-center mt-5">
          <h5 className="text-light">More Features Coming Soon...</h5>
          <p className="text">
            Stay tuned for exciting new tools to enhance your workflow!
          </p>
        </div>
      </div>
          );
}

export default Home;
