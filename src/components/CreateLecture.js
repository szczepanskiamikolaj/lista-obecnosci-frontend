import React, { useState } from "react";
import LectureService from "../services/lecture.service";

const CreateLecture = () => {
  const [name, setName] = useState("");
  const [timeLimit, setTimeLimit] = useState(0);
  const [gradeName, setGradeName] = useState("");
  const [subject, setSubject] = useState(""); // New field
  const [isSecure, setIsSecure] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const handleCreateLecture = () => {
    if (!name || !timeLimit || !gradeName || !subject) {
      setMessage("Prosze wypełnić wszystkie pola");
      setSuccessful(false);
      return;
    }

    LectureService.createLecture({ name, timeLimit, gradeName, subject }, isSecure)
    .then(response => {
      setMessage(response);
      setSuccessful(true);
      setName("");
      setTimeLimit(0);
      setGradeName("");
      setSubject("");
      setIsSecure(false);
    })
    .catch(error => {
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
        <div className="card-body">

          <div className="form-group">
            <label htmlFor="name">Nazwa Wykładu:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="timeLimit">Ograniczenie Czasu (minuty):</label>
            <input
              type="number"
              className="form-control"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="gradeName">Nazwa Klasy:</label>
            <input
              type="text"
              className="form-control"
              value={gradeName}
              onChange={(e) => setGradeName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Przedmiot:</label>
            <input
              type="text"
              className="form-control"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={isSecure}
              onChange={() => setIsSecure(!isSecure)}
            />
            <label className="form-check-label">Zabezpieczenie</label>
          </div>

          <div className="form-group mt-3">
            <button className="btn btn-primary btn-block" onClick={handleCreateLecture}>
              Utwórz Zajęcia
            </button>
          </div>

          {message && (
            <div className={`alert ${successful ? 'alert-success' : 'alert-danger'}`} role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
