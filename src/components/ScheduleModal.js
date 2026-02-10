import React, { useState, useEffect } from 'react';
import './ScheduleModal.css';

const ScheduleModal = ({ isOpen, onClose, reportId, onScheduleCreated, editingSchedule }) => {
  const [frequency, setFrequency] = useState('daily');
  const [time, setTime] = useState('09:00');
  const [timezone, setTimezone] = useState('America/New_York');
  const [selectedDays, setSelectedDays] = useState(['tuesday']);
  const [selectedDaysOfMonth, setSelectedDaysOfMonth] = useState([1]);
  const [includeLastDay, setIncludeLastDay] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [enableEndDate, setEnableEndDate] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');

  // Cargar datos cuando se está editando
  useEffect(() => {
    if (editingSchedule) {
      setFrequency(editingSchedule.frequency || 'daily');
      setTime(editingSchedule.time || '09:00');
      setTimezone(editingSchedule.timezone || 'America/New_York');
      setSelectedDays(editingSchedule.daysOfWeek || ['tuesday']);
      setSelectedDaysOfMonth(editingSchedule.daysOfMonth || [1]);
      setIncludeLastDay(editingSchedule.includeLastDay || false);
      setStartDate(editingSchedule.startDate || '');
      setEndDate(editingSchedule.endDate || '');
      setEnableEndDate(!!editingSchedule.endDate);
      setRecipients(editingSchedule.recipients || []);
      setEmailInput('');
      setEmailError('');
    } else {
      // Reset al crear nuevo
      setFrequency('daily');
      setTime('09:00');
      setTimezone('America/New_York');
      setSelectedDays(['tuesday']);
      setSelectedDaysOfMonth([1]);
      setIncludeLastDay(false);
      setStartDate('');
      setEndDate('');
      setEnableEndDate(false);
      setRecipients([]);
      setEmailInput('');
      setEmailError('');
    }
  }, [editingSchedule, isOpen]);

  const daysOfWeek = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
    { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)' },
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'Europe/London', label: 'London (GMT/BST)' },
    { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
    { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
    { value: 'Asia/Dubai', label: 'Dubai (GST)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT/AEST)' },
  ];

  const toggleDay = (day) => {
    setSelectedDays(prev => {
      if (prev.includes(day)) {
        return prev.filter(d => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  const toggleDayOfMonth = (day) => {
    setSelectedDaysOfMonth(prev => {
      if (prev.includes(day)) {
        return prev.filter(d => d !== day);
      } else {
        return [...prev, day].sort((a, b) => a - b);
      }
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddEmail = () => {
    const trimmedEmail = emailInput.trim();
    
    if (!trimmedEmail) {
      setEmailError('Please enter an email address');
      return;
    }
    
    if (!validateEmail(trimmedEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    if (recipients.includes(trimmedEmail)) {
      setEmailError('This email has already been added');
      return;
    }
    
    setRecipients([...recipients, trimmedEmail]);
    setEmailInput('');
    setEmailError('');
  };

  const handleRemoveEmail = (emailToRemove) => {
    setRecipients(recipients.filter(email => email !== emailToRemove));
  };

  const handleEmailKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEmail();
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const scheduleData = {
      reportId,
      frequency,
      time,
      timezone,
      recipients,
      ...(frequency === 'weekly' && { daysOfWeek: selectedDays }),
      ...(frequency === 'monthly' && { 
        daysOfMonth: selectedDaysOfMonth,
        includeLastDay 
      }),
      startDate,
      ...(enableEndDate && { endDate })
    };
    
    console.log('Schedule created:', scheduleData);
    
    if (onScheduleCreated) {
      onScheduleCreated(scheduleData);
    }
    
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📅 {editingSchedule ? 'Edit Schedule' : 'Schedule Report'}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="frequency">Frequency</label>
              <select 
                id="frequency"
                value={frequency} 
                onChange={(e) => setFrequency(e.target.value)}
                className="form-control"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {frequency === 'weekly' && (
              <div className="form-group">
                <label>Days of Week</label>
                <div className="days-selector">
                  {daysOfWeek.map(day => (
                    <div 
                      key={day.value}
                      className={`day-option ${selectedDays.includes(day.value) ? 'selected' : ''}`}
                      onClick={() => toggleDay(day.value)}
                    >
                      {selectedDays.includes(day.value) && <span className="check-icon">✓</span>}
                      <span>{day.label}</span>
                    </div>
                  ))}
                </div>
                {selectedDays.length === 0 && (
                  <p className="error-text">Please select at least one day</p>
                )}
              </div>
            )}

            {frequency === 'monthly' && (
              <div className="form-group">
                <label>Days of Month</label>
                <div className="selected-days-summary">
                  {selectedDaysOfMonth.length > 0 || includeLastDay ? (
                    <span>
                      Selected: {[...selectedDaysOfMonth, ...(includeLastDay ? ['Last Day'] : [])].join(', ')}
                    </span>
                  ) : (
                    <span className="no-selection">No days selected</span>
                  )}
                </div>
                <div className="days-of-month-grid">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <button
                      key={day}
                      type="button"
                      className={`day-number ${selectedDaysOfMonth.includes(day) ? 'selected' : ''}`}
                      onClick={() => toggleDayOfMonth(day)}
                    >
                      {day}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={`day-number last-day ${includeLastDay ? 'selected' : ''}`}
                    onClick={() => setIncludeLastDay(!includeLastDay)}
                  >
                    Last Day
                  </button>
                </div>
                {selectedDaysOfMonth.length === 0 && !includeLastDay && (
                  <p className="error-text">Please select at least one day</p>
                )}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input 
                type="time" 
                id="time"
                value={time} 
                onChange={(e) => setTime(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="timezone">Timezone</label>
              <select 
                id="timezone"
                value={timezone} 
                onChange={(e) => setTimezone(e.target.value)}
                className="form-control"
              >
                {timezones.map(tz => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="recipients">Recipients</label>
              <div className="email-input-wrapper">
                <input 
                  type="email" 
                  id="recipients"
                  value={emailInput} 
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    setEmailError('');
                  }}
                  onKeyPress={handleEmailKeyPress}
                  className="form-control"
                  placeholder="Enter email address"
                />
                <button 
                  type="button" 
                  className="btn-add-email"
                  onClick={handleAddEmail}
                >
                  Add
                </button>
              </div>
              {emailError && <p className="error-text">{emailError}</p>}
              
              {recipients.length > 0 && (
                <div className="recipients-list">
                  {recipients.map((email, index) => (
                    <div key={index} className="recipient-chip">
                      <span>{email}</span>
                      <button 
                        type="button"
                        className="remove-chip"
                        onClick={() => handleRemoveEmail(email)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {recipients.length === 0 && (
                <p className="help-text">Add at least one recipient to receive the scheduled report</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input 
                type="date" 
                id="startDate"
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={enableEndDate}
                  onChange={(e) => setEnableEndDate(e.target.checked)}
                />
                <span>Set End Date</span>
              </label>
            </div>

            {enableEndDate && (
              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input 
                  type="date" 
                  id="endDate"
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="form-control"
                  required={enableEndDate}
                />
              </div>
            )}

            <div className="info-box">
              <p>📋 <strong>Report ID:</strong> {reportId}</p>
              <p>
                This report will be automatically generated {frequency} 
                {frequency === 'weekly' && selectedDays.length > 0 && ` on ${selectedDays.map(d => d.charAt(0).toUpperCase() + d.slice(1) + 's').join(', ')}`}
                {frequency === 'monthly' && (selectedDaysOfMonth.length > 0 || includeLastDay) && 
                  ` on ${[...selectedDaysOfMonth.map(d => `day ${d}`), ...(includeLastDay ? ['the last day'] : [])].join(', ')}`
                }
                {` at ${time}`} ({timezones.find(tz => tz.value === timezone)?.label})
                {recipients.length > 0 && ` and sent to ${recipients.length} recipient${recipients.length > 1 ? 's' : ''}`}
              </p>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-submit"
              disabled={
                (frequency === 'weekly' && selectedDays.length === 0) ||
                (frequency === 'monthly' && selectedDaysOfMonth.length === 0 && !includeLastDay) ||
                recipients.length === 0
              }
            >
              {editingSchedule ? 'Update Schedule' : 'Create Schedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleModal;
