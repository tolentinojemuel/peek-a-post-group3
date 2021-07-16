import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/NotFound.css"
export default function NotFound() {
  const history = useHistory();
  const back = (e) => {
    e.preventDefault();
    history.push("/login");
  };
  return (
    <div className="not-found">
      <div id="error-page">
        <div className="content">
          <h2 className="header" data-text="404">
            404
          </h2>
          <h4 data-text="Opps! Page not found">Opps! Page not found</h4>
          <p>
            Sorry, the page you're looking for doesn't exist. If you think
            something is broken, report a problem.
          </p>
          <div className="btns">
            <button onClick={back}>Go Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
