import React, { useState } from 'react';
import UserService from '../services/user.service';

const RoleManagementComponent = () => {
  const [emailInput, setEmailInput] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckUser = async () => {
    try {
      const response = await UserService.checkUser(emailInput);
      setUserRole(response.data.roleId);
      setError(null); 
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = '/login';
      } else {
        console.error('Błąd podczas sprawdzania użytkownika:', error);
        setError('Błąd podczas sprawdzania użytkownika.'); 
      }
    }
  };  

  const handleUpdateUserRole = async () => {
    try {
      const confirmation = window.confirm(`Czy na pewno chcesz zaktualizować rolę użytkownika na ${userRole === 1 ? 'nauczyciel' : 'uczen'}?`);
      if (confirmation) {
        const response = await UserService.updateUser(emailInput);
        setUserRole(response.data.roleId); 
        handleCheckUser();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = '/login';
      } else {
        console.error('Błąd podczas aktualizacji roli użytkownika:', error);
        setError('Błąd podczas aktualizacji roli użytkownika.'); 
      }
    }
  };
  

  return (
    <div className="col-md-6 offset-md-3 mt-5">
      <div className="card card-container">
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="emailInput">Email:</label>
            <input
              type="text"
              className="form-control"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={handleCheckUser}>
            Sprawdź rolę użytkownika
          </button>

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}

          {userRole !== null && !error && (
            <div className="mt-3">
              <p>{`Aktualna rola: ${userRole === 1 ? 'uczeń' : 'nauczyciel'}`}</p>
              <button className="btn btn-secondary" onClick={handleUpdateUserRole}>
                Zaktualizuj rolę użytkownika
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleManagementComponent;
