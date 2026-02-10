import React from 'react';
import './FiltersModal.css';

const FiltersModal = ({ isOpen, onClose, schedule }) => {
  if (!isOpen) return null;

  // Datos de ejemplo para los filtros
  const filtersData = {
    dateRange: `${schedule?.startDate || '2026-02-10'} - ${schedule?.endDate || 'No end date'}`,
    institutions: ['Institution A', 'Institution B', 'Institution C'],
    classes: ['Class 101', 'Class 102', 'Class 103', 'Class 104'],
    courses: ['Mathematics', 'Science', 'English', 'History'],
    progressFilter: '0% (blanks are included)',
    activeEnrollments: true,
    reportTitle: 'Progress Report - KP2-4',
    columnsSelected: [
      'Student Name',
      'Email',
      'Institution',
      'Class',
      'Course',
      'Overall Progress',
      'Unit-1 Progress',
      'Last Activity Date'
    ],
    conditionalRules: [
      { 
        id: 1, 
        color: '#FF0000', 
        name: 'Overall Progress', 
        condition: 'Between 0 and 59' 
      },
      { 
        id: 2, 
        color: '#CDDC39', 
        name: 'Overall Progress', 
        condition: 'Between 60 and 90' 
      },
      { 
        id: 3, 
        color: '#2196F3', 
        name: 'Overall Progress', 
        condition: 'Greater than or equal to 91' 
      },
      { 
        id: 4, 
        color: '#4CAF50', 
        name: 'Unit-1 Progress', 
        condition: 'Greater than or equal to 60' 
      },
      { 
        id: 5, 
        color: '#000000', 
        name: 'Unit-1 Progress', 
        condition: 'Less than 60' 
      }
    ]
  };

  return (
    <div className="filters-modal-overlay" onClick={onClose}>
      <div className="filters-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="filters-modal-header">
          <h2>🔍 Applied Filters & Settings</h2>
          <button className="filters-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="filters-modal-body">
          <div className="filter-section">
            <label className="filter-label">📅 Date Range</label>
            <div className="filter-value">{filtersData.dateRange}</div>
            <div className="filter-warning">
              ⚠️ Date range end date will be adjusted based on scheduled executions
            </div>
          </div>

          <div className="filter-section">
            <label className="filter-label">🏛️ Institutions</label>
            <div className="filter-list">
              {filtersData.institutions.map((inst, index) => (
                <span key={index} className="filter-tag">{inst}</span>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label className="filter-label">👥 Classes</label>
            <div className="filter-list">
              {filtersData.classes.map((cls, index) => (
                <span key={index} className="filter-tag">{cls}</span>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label className="filter-label">📚 Courses</label>
            <div className="filter-list">
              {filtersData.courses.map((course, index) => (
                <span key={index} className="filter-tag">{course}</span>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label className="filter-label">📊 Filter Progress Greater Than or Equal To</label>
            <div className="filter-value">{filtersData.progressFilter}</div>
          </div>

          <div className="filter-section">
            <label className="filter-label">✅ Export Only Active Enrollments</label>
            <div className="filter-value">
              <span className={`boolean-badge ${filtersData.activeEnrollments ? 'true' : 'false'}`}>
                {filtersData.activeEnrollments ? 'True' : 'False'}
              </span>
            </div>
          </div>

          <div className="filter-section">
            <label className="filter-label">📄 Report Title</label>
            <div className="filter-value">{filtersData.reportTitle}</div>
          </div>

          <div className="filter-section">
            <label className="filter-label">📋 Columns Selected</label>
            <div className="filter-list">
              {filtersData.columnsSelected.map((col, index) => (
                <span key={index} className="column-tag">{col}</span>
              ))}
            </div>
          </div>

          <div className="filter-section conditional-section">
            <label className="filter-label">🎨 Conditional Formatting Rules</label>
            <div className="rules-header">Active Rules ({filtersData.conditionalRules.length})</div>
            <div className="rules-list">
              {filtersData.conditionalRules.map((rule) => (
                <div key={rule.id} className="rule-item">
                  <div 
                    className="rule-color" 
                    style={{ backgroundColor: rule.color }}
                  ></div>
                  <div className="rule-details">
                    <div className="rule-name">{rule.name}</div>
                    <div className="rule-condition">{rule.condition}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="filters-modal-footer">
          <button className="close-modal-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
