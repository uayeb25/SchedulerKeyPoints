import React, { useState, useEffect } from 'react';
import './ReportTable.css';
import ScheduleModal from './ScheduleModal';
import FiltersModal from './FiltersModal';

const ReportTable = ({ onAddSchedule, editingSchedule, onCancelEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [triggeredByFilter, setTriggeredByFilter] = useState('All');
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    if (editingSchedule) {
      setSelectedReportId(editingSchedule.reportId);
      setIsModalOpen(true);
    }
  }, [editingSchedule]);

  const reports = [
    { id: '260128D244E4.xlsx', date: '1/27/2026, 10:04:47 PM', type: 'KP2-4', status: 'Completed', generatedBy: 'uayeb@edusofilearning.com', triggerBy: 'Manual' },
    { id: '260120D23A3D.xlsx', date: '1/27/2026, 10:03:52 PM', type: 'KP2-4', status: 'Completed', generatedBy: 'uayeb@edusofilearning.com', triggerBy: 'Scheduled' },
    { id: '260121418B8.xlsx', date: '1/22/2026, 10:18:58 AM', type: 'KP2-4', status: 'Completed', generatedBy: 'uayeb@edusofilearning.com', triggerBy: 'Manual' },
    { id: '260114088144.xlsx', date: '1/14/2026, 4:51:49 AM', type: 'KP2-4', status: 'Completed', generatedBy: 'uayeb@edusofilearning.com', triggerBy: 'Scheduled' },
    { id: '260108008014.xlsx', date: '1/8/2026, 5:09:14 AM', type: 'KP2-4', status: 'Completed', generatedBy: 'uayeb@edusofilearning.com', triggerBy: 'Manual' },
    { id: '251223210642.xlsx', date: '12/23/2025, 5:28:42 PM', type: 'KP2-4', status: 'Completed', generatedBy: 'uayeb@edusofilearning.com', triggerBy: 'Manual' },
    { id: '251222210037.xlsx', date: '12/22/2025, 5:26:37 PM', type: 'KP2-4', status: 'Completed', generatedBy: 'uayeb@edusofilearning.com', triggerBy: 'Scheduled' },
    { id: '251222201225.xlsx', date: '12/22/2025, 4:12:25 PM', type: 'KP2-4', status: 'Completed', generatedBy: 'uayeb@edusofilearning.com', triggerBy: 'Manual' },
    { id: '251220001916.xlsx', date: '12/19/2025, 8:19:17 PM', type: 'KP2-4', status: 'Completed', generatedBy: 'uayeb@edusofilearning.com', triggerBy: 'Scheduled' },
    { id: '251219133210.xlsx', date: '12/19/2025, 7:22:10 PM', type: 'KP2-4', status: 'Completed', generatedBy: 'uayeb@edusofilearning.com', triggerBy: 'Manual' },
    { id: '251216225248.xlsx', date: '12/18/2025, 8:52:48 PM', type: 'KP2-4', status: 'Completed', generatedBy: 'uayeb@edusofilearning.com', triggerBy: 'Manual' },
    { id: '251218D02323.xlsx', date: '12/18/2025, 4:23:28 PM', type: 'KP2-4', status: 'Completed', generatedBy: 'uayeb@edusofilearning.com', triggerBy: 'Scheduled' },
    { id: '251218182157.xlsx', date: '12/18/2025, 9:21:57 AM', type: 'KP2-4', status: 'Completed', generatedBy: 'uayeb@edusofilearning.com', triggerBy: 'Manual' },
  ];

  // Filtrar reportes según el filtro seleccionado
  const filteredReports = triggeredByFilter === 'All' 
    ? reports 
    : reports.filter(report => report.triggerBy === triggeredByFilter);

  const handleDownload = (reportId) => {
    // Simular descarga de Excel
    console.log(`Downloading report: ${reportId}`);
    
    // En una implementación real, aquí harías una llamada a la API
    // fetch(`/api/reports/download/${reportId}`)
    //   .then(response => response.blob())
    //   .then(blob => {
    //     const url = window.URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = reportId;
    //     document.body.appendChild(a);
    //     a.click();
    //     a.remove();
    //   });
    
    alert(`Downloading ${reportId}`);
  };

  const handleViewFilters = (report) => {
    setSelectedReport(report);
    setIsFiltersModalOpen(true);
  };

  const handleSchedule = (reportId) => {
    console.log(`Scheduling report: ${reportId}`);
    setSelectedReportId(reportId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReportId(null);
    if (editingSchedule && onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="report-table-container">
      <div className="table-header">
        <div className="table-info">
          <h3>📋 My Requests</h3>
          <span className="report-count">{filteredReports.length} Reports</span>
        </div>
        <div className="filters-group">
          <select className="filter-dropdown">
            <option>Institution: All</option>
            <option>Institution A</option>
            <option>Institution B</option>
            <option>Institution C</option>
          </select>
          <select 
            className="filter-dropdown"
            value={triggeredByFilter === 'All' ? 'Triggered by: All' : triggeredByFilter}
            onChange={(e) => {
              const value = e.target.value;
              if (value === 'Triggered by: All') {
                setTriggeredByFilter('All');
              } else {
                setTriggeredByFilter(value);
              }
            }}
          >
            <option>Triggered by: All</option>
            <option>Manual</option>
            <option>Scheduled</option>
          </select>
        </div>
      </div>
      
      <p className="table-description">View and download your previously requested reports</p>

      <div className="table-wrapper">
        <table className="reports-table">
          <thead>
            <tr>
              <th>DATE & TIME</th>
              <th>TYPE</th>
              <th>STATUS</th>
              <th>GENERATED BY</th>
              <th>TRIGGER BY</th>
              <th>FILTERS APPLIED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report, index) => (
              <tr key={index}>
                <td className="date-column">{report.date}</td>
                <td>
                  <span className="type-badge">{report.type}</span>
                </td>
                <td>
                  <span className="status-badge completed">
                    ✓ {report.status}
                  </span>
                </td>
                <td className="email-column">{report.generatedBy}</td>
                <td>
                  <span className={`trigger-badge ${report.triggerBy.toLowerCase()}`}>
                    {report.triggerBy === 'Manual' ? '👤' : '🕒'} {report.triggerBy}
                  </span>
                </td>
                <td>
                  <button 
                    className="view-filters-btn"
                    onClick={() => handleViewFilters(report)}
                  >
                    👁 View Filters
                  </button>
                </td>
                <td>
                  <div className="actions-buttons">
                    {report.triggerBy === 'Manual' && (
                      <button 
                        className="schedule-btn"
                        onClick={() => handleSchedule(report.id)}
                      >
                        📅 Schedule
                      </button>
                    )}
                    <button 
                      className="download-btn"
                      onClick={() => handleDownload(report.id)}
                    >
                      ⬇ Download
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ScheduleModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        reportId={selectedReportId}
        onScheduleCreated={onAddSchedule}
        editingSchedule={editingSchedule}
      />

      <FiltersModal 
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        schedule={selectedReport}
      />
    </div>
  );
};

export default ReportTable;
