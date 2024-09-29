import React, { useState, useEffect } from 'react';
import AttendanceService from '../services/attendance.service';

const AttendanceComponent = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await AttendanceService.getAttendances();
        setAttendanceData(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          window.location.href = '/login';
        } else {
          setError(err.message);
        }
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const calculateAttendancePercentage = (attended, total) => {
    if (total === 0) {
      return '0%';
    }
    const percentage = (attended / total) * 100;
    return `${percentage.toFixed(2)}%`;
  };

  if (loading) {
    return <p>Ładowanie...</p>;
  }

  if (error) {
    return <p>Błąd: {error}</p>;
  }

  return (
    <div className="container mt-4">
      {Object.keys(attendanceData).map((subject, index) => (
        <div key={index} className="mb-4">
          <h2>
            {subject} - {calculateAttendancePercentage(
              attendanceData[subject].filter((lecture) => lecture.attended).length,
              attendanceData[subject].length
            )}
          </h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nazwa Wykładu</th>
                <th scope="col">Obecność</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData[subject].map((lecture, lectureIndex) => (
                <tr key={lectureIndex} className={lecture.attended ? '' : 'text-danger'}>
                  <td>{lecture.lectureName}</td>
                  <td>{lecture.attended ? 'Tak' : 'Nie'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AttendanceComponent;
