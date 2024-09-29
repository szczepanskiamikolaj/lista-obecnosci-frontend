import React, { useState, useEffect } from 'react';
import LectureService from '../services/lecture.service';
// import './YourComponent.css'; // Import your custom CSS file for component-specific styles

const YourComponent = () => {
  const [lectures, setLectures] = useState([]);
  const [editableFields, setEditableFields] = useState({});

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = () => {
    LectureService.getModeratorLectures()
      .then((response) => {
        const sortedLectures = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setLectures(sortedLectures);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Redirect the user to the login page when unauthorized
          window.location.href = '/login';
        } else {
          console.error('Błąd podczas pobierania wykładów:', error);
        }
      });
  };

  const handleDeleteLecture = (lectureName) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten wykład?')) {
      LectureService.deleteLecture(lectureName)
        .then(() => {
          fetchLectures();
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            // Redirect the user to the login page when unauthorized
            window.location.href = '/login';
          } else {
            console.error('Błąd podczas usuwania wykładu:', error);
          }
        });
    }
  };

  const handleDoubleClick = (lectureName, field) => {
    if (field !== 'date') {
      setEditableFields((prevEditableFields) => ({
        ...prevEditableFields,
        [`${lectureName}_${field}`]: true,
      }));
    }
  };

  const handleEditEnter = (lectureName, field, updatedValue) => {
    const updatedData = { [field]: updatedValue };

    LectureService.editLecture(lectureName, updatedData)
      .then(() => {
        setEditableFields((prevEditableFields) => ({
          ...prevEditableFields,
          [`${lectureName}_${field}`]: false,
        }));
        fetchLectures();
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Redirect the user to the login page when unauthorized
          window.location.href = '/login';
        } else {
          console.error('Błąd podczas edytowania wykładu:', error);
        }
      });
  };

  const fieldTranslations = {
    name: 'Nazwa',
    date: 'Data',
    gradeName: 'Klasa',
    subject: 'Przedmiot',
  };

  return (
    <div className="your-component-container">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {lectures.map((lecture) => (
          <div key={lecture.name} className="col">
            <div className="card h-100">
              <div className="card-body">
                {Object.keys(lecture).map((field) => (
                  <div key={`${lecture.name}_${field}`}>
                    {field === 'date' ? (
                      <p className="field-text">
                        {fieldTranslations[field]}: {new Date(lecture[field]).toLocaleString()}
                      </p>
                    ) : (
                      <>
                        {editableFields[`${lecture.name}_${field}`] ? (
                          <input
                            type="text"
                            defaultValue={lecture[field]}
                            onBlur={(e) => handleEditEnter(lecture.name, field, e.target.value)}
                            autoFocus
                            className="form-control"
                          />
                        ) : (
                          <p
                            onDoubleClick={() => handleDoubleClick(lecture.name, field)}
                            className="field-text"
                          >
                            {fieldTranslations[field]}: {lecture[field]}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => handleDeleteLecture(lecture.name)}
                  className="btn btn-danger"
                >
                  Usuń
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourComponent;
