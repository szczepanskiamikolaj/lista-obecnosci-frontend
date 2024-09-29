import React, { useState, useEffect } from 'react';
import LectureService from '../services/lecture.service';

const LectureComponent = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLectures = async () => {
    try {
      const response = await LectureService.getActiveLecturesForUser();
      setLectures(response);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        window.location.href = '/login';
      } else {
        setError(err.message);
        setLoading(false);
      }
    }
  };
  
  const calculateTimeRemaining = (timeLimit) => {
    const now = new Date();
    const limit = new Date(timeLimit);
    const timeDiff = limit - now;
    const secondsRemaining = Math.max(0, Math.floor(timeDiff / 1000));
    return secondsRemaining;
  };
  
  const formatTimeLimit = (timeLimit) => {
    const date = new Date(timeLimit);
    return date.toLocaleString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };
  
  const handleLectureClick = async (lectureName) => {
    try {
      await LectureService.addAttendance({ lectureName });
      console.log(`Attendance added for lecture: ${lectureName}`);
      fetchLectures();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Redirect the user to the login page when unauthorized
        window.location.href = '/login';
      } else {
        console.error('Error adding attendance:', err.message);
      }
    }
  };  

  useEffect(() => {
    fetchLectures();
    const intervalId = setInterval(fetchLectures, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update remaining time every second
      setLectures((prevLectures) =>
        prevLectures.map((lecture) => ({
          ...lecture,
          secondsRemaining: calculateTimeRemaining(lecture.timeLimit),
        }))
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [lectures]);

  if (loading) {
    return <p>Ładowanie...</p>;
  }

  if (error) {
    return <p>Błąd: {error}</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Aktywne Wykłady</h1>
      <div className="row">
        {lectures.map((lecture, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div
              onClick={() => handleLectureClick(lecture.name)}
              className="card h-100"
              style={{ cursor: 'pointer', border: lecture.secondsRemaining === 0 ? '1px solid red' : '1px solid black' }}
            >
              <div className="card-body">
                <p className="card-text">Nazwa: {lecture.name}</p>
                <p className="card-text">Klasa: {lecture.gradeName}</p>
                <p className="card-text">Nauczyciel: {lecture.teacherName}</p>
                <p className="card-text">
                  Pozostały czas:{' '}
                  <span style={{ color: lecture.secondsRemaining === 0 ? 'red' : 'white' }}>
                    {lecture.secondsRemaining} sekundy
                  </span>
                </p>
                <p className="card-text">Limit czasu: {formatTimeLimit(lecture.timeLimit)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LectureComponent;
