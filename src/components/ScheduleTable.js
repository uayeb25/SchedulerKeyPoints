import React, { useState } from 'react';
import './ScheduleTable.css';
import FiltersModal from './FiltersModal';

const ScheduleTable = ({ schedules, onDeleteSchedule, onEditSchedule }) => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const handleDelete = (scheduleId) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      onDeleteSchedule(scheduleId);
    }
  };

  const handleEdit = (scheduleIndex) => {
    onEditSchedule(scheduleIndex);
  };

  const handleViewFilters = (schedule) => {
    setSelectedSchedule(schedule);
    setIsFiltersModalOpen(true);
  };

  const formatDays = (schedule) => {
    if (schedule.frequency === 'daily') {
      return 'Every day';
    }
    
    if (schedule.frequency === 'weekly') {
      return schedule.daysOfWeek.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ');
    }
    
    if (schedule.frequency === 'monthly') {
      const days = [...schedule.daysOfMonth];
      if (schedule.includeLastDay) {
        days.push('Last Day');
      }
      return days.join(', ');
    }
    
    return '-';
  };

  const getTimezoneLabel = (timezoneValue) => {
    const timezones = [
      { value: 'America/New_York', label: 'ET' },
      { value: 'America/Chicago', label: 'CT' },
      { value: 'America/Denver', label: 'MT' },
      { value: 'America/Los_Angeles', label: 'PT' },
      { value: 'America/Anchorage', label: 'AKT' },
      { value: 'Pacific/Honolulu', label: 'HT' },
      { value: 'UTC', label: 'UTC' },
      { value: 'Europe/London', label: 'GMT' },
      { value: 'Europe/Paris', label: 'CET' },
      { value: 'Europe/Berlin', label: 'CET' },
      { value: 'Asia/Tokyo', label: 'JST' },
      { value: 'Asia/Shanghai', label: 'CST' },
      { value: 'Asia/Dubai', label: 'GST' },
      { value: 'Australia/Sydney', label: 'AEDT' },
    ];
    
    return timezones.find(tz => tz.value === timezoneValue)?.label || timezoneValue;
  };

  return (
    <div className="schedule-table-container">
      <div className="table-header">
        <div className="table-info">
          <h3>📅 My Schedules</h3>
          <span className="schedule-count">{schedules.length} Schedule{schedules.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
      
      <p className="table-description">View and manage your scheduled reports</p>

      {schedules.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h3>No schedules yet</h3>
          <p>Create a schedule from "My Requests" to automatically generate reports</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="schedules-table">
            <thead>
              <tr>
                <th>REPORT ID</th>
                <th>FREQUENCY</th>
                <th>DAYS</th>
                <th>TIME</th>
                <th>TIMEZONE</th>
                <th>RECIPIENTS</th>
                <th>START DATE</th>
                <th>END DATE</th>
                <th>FILTERS APPLIED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, index) => (
                <tr key={index}>
                  <td className="report-id-column">{schedule.reportId}</td>
                  <td>
                    <span className="frequency-badge">
                      {schedule.frequency.charAt(0).toUpperCase() + schedule.frequency.slice(1)}
                    </span>
                  </td>
                  <td className="days-column">{formatDays(schedule)}</td>
                  <td className="time-column">{schedule.time}</td>
                  <td>
                    <span className="timezone-badge">{getTimezoneLabel(schedule.timezone)}</span>
                  </td>
                  <td className="recipients-column">
                    {schedule.recipients.length} recipient{schedule.recipients.length !== 1 ? 's' : ''}
                  </td>
                  <td className="date-column">{schedule.startDate}</td>
                  <td className="date-column">{schedule.endDate || 'No end date'}</td>
                  <td className="filters-column">
                    <button 
                      className="view-filters-btn"
                      onClick={() => handleViewFilters(schedule)}
                    >
                      👁️ View
                    </button>
                  </td>
                  <td>
                    <div className="actions-buttons">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEdit(index)}
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(index)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <FiltersModal 
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        schedule={selectedSchedule}
      />
    </div>
  );
};

export default ScheduleTable;
