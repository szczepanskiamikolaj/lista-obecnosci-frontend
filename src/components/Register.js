import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        To pole jest wymagane!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Ten adres email jest niepoprawny.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Nazwa użytkownika musi mieć między 3 a 20 znakami.
      </div>
    );
  }
};

const vpassword = (value) => {
  let errorMessage = "";

  if (value.length < 6) {
    errorMessage = "Hasło musi mieć przynajmniej 6 znaków.";
  } else if (value.length > 40) {
    errorMessage = "Hasło nie może mieć więcej niż 40 znaków.";
  } else {
    if (!/[a-z]/.test(value)) {
      errorMessage = "Hasło musi zawierać co najmniej jedną małą literę.";
    } else if (!/[A-Z]/.test(value)) {
      errorMessage = "Hasło musi zawierać co najmniej jedną wielką literę.";
    } else if (!/\d/.test(value)) {
      errorMessage = "Hasło musi zawierać co najmniej jedną cyfrę.";
    } else if (!/[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]/.test(value)) {
      errorMessage = "Hasło musi zawierać co najmniej jeden znak specjalny.";
    }
  }

  if (errorMessage) {
    return (
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
    );
  }
};



const Register = () => {
  const [passwordError, setPasswordError] = useState("");
  const form = useRef();
  const checkBtn = useRef();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    const passwordValidationResult = vpassword(password);
    setPasswordError(passwordValidationResult && passwordValidationResult.props.children);
  
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  
  const onChangeSurname = (e) => {
    const surname = e.target.value;
    setSurname(surname);
  };
  

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0 && !passwordError) {
      AuthService.register(username, email, password, name, surname).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage = error.response.data ||error.message;

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Nazwa Użytkownika</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Imię</label>
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
                <label htmlFor="surname">Nazwisko</label>
                <Input
                  type="text"
                  className="form-control"
                  name="surname"
                  value={surname}
                  onChange={onChangeSurname}
                  validations={[required]}
                />
              </div>

                <div className="form-group">
                <label htmlFor="password">Hasło</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
                {passwordError && (
                  <div className="alert alert-danger" role="alert">
                    {passwordError}
                  </div>
                )}
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Zarejestruj</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
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

export default Register;
