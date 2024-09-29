import React, { useState } from "react";
import GradeService from "../services/grade.service";
import Form from "react-validation/build/form";

const AddUsersToGrade = () => {
  const [gradeName, setGradeName] = useState("");
  const [userEmails, setUserEmails] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const handleAddUsers = (e) => {
    e.preventDefault(); 

    if (!gradeName || !userEmails) {
      setMessage("Wszystkie pola są wymagane.");
      setSuccessful(false);
      return;
    }
  
    const emailsArray = userEmails.split(",").map((email) => email.trim());
  
    GradeService.addUsersToGrade(gradeName, emailsArray)
  .then((response) => {
    const resMessage =
      (response.data && response.data.message && response) ||
      response.message || response.toString();

    setMessage(resMessage);
    setSuccessful(true);
  })
  .catch((error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    } else {
      const resMessage = error.response.data ||error.message;

      setMessage(resMessage);
      setSuccessful(false);
    }
  });

  };  
  return (
    <div className="col-md-6 offset-md-3 mt-5">
      <div className="card card-container">
        <Form onSubmit={handleAddUsers}>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="gradeName">Klasa:</label>
              <input
                type="text"
                className="form-control"
                value={gradeName}
                onChange={(e) => setGradeName(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="userEmails">Adresy email (oddzielone przecinkami):</label>
              <input
                type="text"
                className="form-control"
                value={userEmails}
                onChange={(e) => setUserEmails(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <button className="btn btn-primary btn-block" type="submit">
                Dodaj użytkowników
              </button>
            </div>
          </div>
        </Form>
  
        {message && (
          <div className="card-footer">
            <div
              className={`alert ${successful ? "alert-success" : "alert-danger"}`}
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUsersToGrade;
