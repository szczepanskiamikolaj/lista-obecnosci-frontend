import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

import EventBus from "./common/EventBus";
import AddGrade from "./components/AddGrade";
import AddUsersToGrade from "./components/AddUsersToGrade";
import CreateLecture from "./components/CreateLecture";
import GetActiveLectures from "./components/GetActiveLectures";
import UserAttendances from "./components/UserAttendances";
import ModeratorAttendance from "./components/ModeratorAttendance";
import ModeratorLectures from "./components/ModeratorLectures";
import RoleManagement from "./components/RoleManagment";
import { AnimationProvider } from './AnimationContext';

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));      
      setShowUserBoard(user.roles.includes("ROLE_USER"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setShowUserBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
    <div className="main-background"></div>
    <div className="main-content">
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <Link to={"/"} className="navbar-brand">
          e-Obecność
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Strona Główna
            </Link>
          </li>
          {showAdminBoard && (
            <>
              <li className="nav-item">
                <Link to="/addGrade" className="nav-link">
                  Dodaj Klasę
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/addUsers" className="nav-link">
                  Dodaj Nauczyciela do klasy
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/manageRoles" className="nav-link">
                  Zarządzanie uprawnieniami
                </Link>
              </li>
            </>
          )}
          {showModeratorBoard && (
            <>
              <li className="nav-item">
                <Link to="/addUsers" className="nav-link">
                Dodaj Użytkownika do klasy
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/createLecture" className="nav-link">
                  Nowe zajęcia
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/modAttendances" className="nav-link">
                  Lista obecności
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/modLectures" className="nav-link">
                  Lista zajęć
                </Link>
              </li>
            </>
          )}
          {showUserBoard && (
            <>
              <li className="nav-item">
                <Link to="/activeLectures" className="nav-link">
                  Aktywne zajęcia
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/attendances" className="nav-link">
                  Obecności
                </Link>
              </li>
            </>
          )}
        </div>

        {/* Right-aligned links */}
        <div className="navbar-nav ml-auto">
          {currentUser ? (
            <>
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Wyloguj
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Zaloguj
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Zarejestruj
                </Link>
              </li>
            </>
          )}
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/mod" element={<BoardModerator/>} />
          <Route path="/admin" element={<BoardAdmin/>} />
          <Route path="/addGrade" element={<AddGrade/>} />
          <Route path="/addUsers" element={<AddUsersToGrade/>} />
          <Route path="/createLecture" element={<CreateLecture/>} />
          <Route path="/activeLectures" element={<GetActiveLectures/>} />
          <Route path="/attendances" element={<UserAttendances/>}/>
          <Route path="/modAttendances" element={<ModeratorAttendance/>}/>
          <Route path="/modLectures" element={<ModeratorLectures/>}/>
          <Route path="/manageRoles" element={<RoleManagement/>}/>
        </Routes>
      </div>

    </div>
    </div>
  );
};

export default App;
