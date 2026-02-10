import React, { useState } from 'react';
import './ProgressReport.css';
import ReportTable from './ReportTable';
import ScheduleTable from './ScheduleTable';

const ProgressReport = () => {
  const [activeTab, setActiveTab] = useState('myRequests');
  const [activeNav, setActiveNav] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [editingScheduleIndex, setEditingScheduleIndex] = useState(null);

  const handleAddSchedule = (scheduleData) => {
    if (editingScheduleIndex !== null) {
      // Editar schedule existente
      const updatedSchedules = [...schedules];
      updatedSchedules[editingScheduleIndex] = { ...scheduleData, createdAt: schedules[editingScheduleIndex].createdAt };
      setSchedules(updatedSchedules);
      setEditingScheduleIndex(null);
    } else {
      // Agregar nuevo schedule
      setSchedules([...schedules, { ...scheduleData, createdAt: new Date().toISOString() }]);
    }
    setActiveTab('mySchedules');
  };

  const handleDeleteSchedule = (scheduleIndex) => {
    setSchedules(schedules.filter((_, index) => index !== scheduleIndex));
  };

  const handleEditSchedule = (scheduleIndex) => {
    setEditingScheduleIndex(scheduleIndex);
    setActiveTab('myRequests');
  };

  return (
    <div className="progress-report-container">
      <div className="header">
        <button className="back-button">
          ← Back to Key Points
        </button>
        <div className="nav-menu">
          <span 
            className={activeNav === 'dashboards' ? 'active' : ''}
            onClick={() => setActiveNav('dashboards')}
          >
            Dashboards
          </span>
          <span 
            className={activeNav === 'internalReports' ? 'active' : ''}
            onClick={() => setActiveNav('internalReports')}
          >
            Internal Reports
          </span>
          <span 
            className={activeNav === 'keyPoints' ? 'active' : ''}
            onClick={() => setActiveNav('keyPoints')}
          >
            Key Points
          </span>
        </div>
        <div className="user-info">
          <span className="cluster-info">🟠 Cluster: Starting</span>
          <span className="user-name">👤 Uayeb Caballero</span>
        </div>
      </div>

      <div className="content">
        <div className="title-section">
          <h1>Progress Report (KP2-4)</h1>
          <span className="kp-badge">KP2-4</span>
        </div>
        <p className="subtitle">Student progress tracking across units and courses</p>

        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'reportMaker' ? 'active' : ''}`}
            onClick={() => setActiveTab('reportMaker')}
          >
            📊 Report Maker
          </button>
          <button 
            className={`tab ${activeTab === 'myRequests' ? 'active' : ''}`}
            onClick={() => setActiveTab('myRequests')}
          >
            📋 My Requests
          </button>
          <button 
            className={`tab ${activeTab === 'mySchedules' ? 'active' : ''}`}
            onClick={() => setActiveTab('mySchedules')}
          >
            📅 My Schedules
          </button>
        </div>

        {activeTab === 'myRequests' && (
          <ReportTable 
            onAddSchedule={handleAddSchedule} 
            editingSchedule={editingScheduleIndex !== null ? schedules[editingScheduleIndex] : null}
            onCancelEdit={() => setEditingScheduleIndex(null)}
          />
        )}
        {activeTab === 'mySchedules' && (
          <ScheduleTable 
            schedules={schedules} 
            onDeleteSchedule={handleDeleteSchedule}
            onEditSchedule={handleEditSchedule}
          />
        )}
        {activeTab === 'reportMaker' && (
          <div className="report-maker-placeholder">
            <p>Report Maker content goes here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressReport;
