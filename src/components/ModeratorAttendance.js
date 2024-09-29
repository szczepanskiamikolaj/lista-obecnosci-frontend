import React, { useEffect, useState } from 'react';
import AttendanceService from '../services/attendance.service';

const ModeratorAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModeratorAttendance = async () => {
      try {
        const response = await AttendanceService.getModeratorAttendance();
        setAttendanceData(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.href = '/login';
        } else {
          console.error('Błąd podczas pobierania danych o obecności moderatora:', error.message);
          setLoading(false);
        }
      }
    };

    fetchModeratorAttendance();
  }, []);

  return (
    <div className="container mt-4">
      {loading ? (
        <p>Ładowanie...</p>
      ) : (
        attendanceData.map((gradeData) => (
          <div key={gradeData.gradeName} className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">{gradeData.gradeName}</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Użytkownik</th>
                    {gradeData.userAttendanceDetails[0]?.subjectAttendanceDetails.map((subjectAttendance) => (
                      <th key={subjectAttendance.subject}>{subjectAttendance.subject || 'Bez Przedmiotu'}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gradeData.userAttendanceDetails.map((userAttendance) => (
                    <tr key={userAttendance.username}>
                      <td>{userAttendance.username}</td>
                      {userAttendance.subjectAttendanceDetails.map((subjectAttendance) => (
                        <td key={subjectAttendance.subject}>
                          <p>Obecności: {subjectAttendance.attendedLectures}</p>
                          <p>Liczba wykładów: {subjectAttendance.totalLectures}</p>
                          <p>Współczynnik obecności: {subjectAttendance.attendanceRatio.toFixed(2)}</p>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ModeratorAttendance;
