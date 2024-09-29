import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import GradeService from "../services/grade.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Pole wymagane!
      </div>
    );
  }
};

const AddGrade = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [name, setName] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeName = (e) => {
    const gradeName = e.target.value;
    setName(gradeName);
  };

  const handleAddGrade = (e) => {
    e.preventDefault();
  
    setMessage("");
    setSuccessful(false);
  
    form.current.validateAll();
  
    if (checkBtn.current.context._errors.length === 0) {
      GradeService.addGrade(name)
        .then(
          (response) => {
            const resMessage =
              (response.data && response.data.message && response) ||
              response.message || response.toString();
        
            setMessage(resMessage);
            setSuccessful(true);
          },
          (error) => {
            if (error.response && error.response.status === 401) {
              window.location.href = '/login';
            } else {
              const resMessage = error.response.data ||error.message;
  
              setMessage(resMessage);
              setSuccessful(false);
            }
          }
        );
    }
  };
  

  return (
    <div className="col-md-6 offset-md-3 mt-5">
      <div className="card card-container">
        <Form onSubmit={handleAddGrade} ref={form}>
          {!successful && (
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="name">Nazwa Klasy:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChangeName}
                  validations={[required]}
                />
              </div>
  
              <div className="form-group">
                <button className="btn btn-primary btn-block">Dodaj Klasę</button>
              </div>
            </div>
          )}
  
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
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
  
};

export default AddGrade;
