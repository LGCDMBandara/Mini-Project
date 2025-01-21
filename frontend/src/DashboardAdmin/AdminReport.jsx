import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AdminNav from '../Component/AdminNav';
import AdminMainNav from '../Component/AdminMainNav';
import './adminReport.css';
import logo from '../Image/Logo.png';

const AdminReport = () => {
    const [bloodData, setBloodData] = useState([]);

    useEffect(() => {
        const fetchBloodData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/blood/blood-data');
                const data = await response.json();
                setBloodData(data);
            } catch (error) {
                console.error('Error fetching blood data:', error);
            }
        };
        fetchBloodData();
    }, []);

    const downloadPDF1 = () => {
        const doc = new jsPDF();
    
        doc.setFillColor(5, 17, 57);
        doc.rect(0, 0, 210, 30, 'F');
    
        doc.setFontSize(18);
        doc.setTextColor(255, 255, 255);
        doc.text('Remaining Blood Inventory Report', 105, 20, { align: 'center' });
    
        const logoImg = new Image();
        logoImg.src = logo;
        logoImg.onload = () => {
            doc.addImage(logoImg, 'PNG', 10, 5, 30, 20); 
    
            const currentDate = new Date().toLocaleString();
            doc.setFontSize(10);
            doc.setTextColor(255, 255, 255);
            doc.text(`Generated on: ${currentDate}`, 200, 10, { align: 'right' });
    
            const tableData = bloodData.map((item) => [
                item.bloodType,
                item.quantity < 0 ? { content: item.quantity, styles: { fillColor: [220, 53, 69], textColor: [255, 255, 255] } } : item.quantity
            ]);
    
            doc.autoTable({
                head: [['Blood Type', 'Quantity(bags)']],
                body: tableData,
                startY: 40,
                theme: 'grid',
                styles: {
                    fontSize: 12,
                    cellPadding: 4,
                    halign: 'center',
                    fontStyle: 'normal',
                },
                headStyles: {
                    fillColor: [5, 17, 57],
                    textColor: [255, 255, 255],
                    fontStyle: 'bold',
                    fontSize: 14,
                },
                bodyStyles: {
                    fillColor: [245, 245, 245],
                },
                alternateRowStyles: {
                    fillColor: [255, 255, 255],
                },
                columnStyles: {
                    0: { halign: 'center' },
                    1: { halign: 'center' },
                },
            });
    
            doc.setFillColor(5, 17, 57);
            doc.rect(0, 280, 210, 20, 'F');
    
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.text('Page 1', 105, 290, { align: 'center' });
    
            doc.setFontSize(8);
            doc.text('Email : bloodconnectsl@gmail.com', 10, 295);
            doc.text('Contact : 0112345896', 173, 295);
    
            doc.save('Remaining_Blood_Inventory_Report.pdf');
        };
    };
    

    return (
        <div className='MainAdmin'>
            <AdminNav />
            <AdminMainNav />

            <div className='report-card'>
                <div className="report-main">
                    <h2>Blood Inventory Report</h2>
                    <p>The Remaining Blood Inventory Report offers a comprehensive and detailed overview of the current stock levels of blood 
                        units across all blood groups. This report plays a critical role in the management and distribution of blood within 
                        healthcare facilities or blood banks. By providing a real-time snapshot of the inventory, it allows administrators and 
                        staff to assess the availability of each blood type and identify any shortages or surplus stock that may require immediate 
                        action. This report is indispensable for ensuring a smooth and uninterrupted supply of blood to meet both routine and 
                        emergency medical needs. It helps in pinpointing critical blood groups that are in short supply and require urgent 
                        replenishment, whether through donation drives, inter-facility transfers, or external procurement. Additionally, it aids 
                        in planning for future needs by monitoring trends in blood usage and forecasting demand based on historical data and 
                        anticipated medical procedures. By highlighting blood types that are low or in negative stock, the report supports 
                        proactive decision-making to avoid supply disruptions.</p>
                    <h3>Key Details</h3>
                    <ul>
                        <li>Report Generation :- The report was generated Date and Time, providing real-time data on inventory.</li>
                        <li>Blood Group Quantities :- Blood Group Quantities section provides an inventory overview of the blood supply categorized by blood type.</li>
                    </ul>
                    <h3>Observations</h3>
                    <ul>
                        <li>Shortages Identified :- Negative stock, highlighting an urgent requirement for replenishment.</li>
                        <li>Critical Stock :- Minimum available, requires careful monitoring due to its universal donor status.</li>
                        <li>Healthy Stock :- A sufficient supply for current and near-term needs.</li>
                    </ul>
                    <button onClick={downloadPDF1} className="download-btn"> Download PDF </button>
                </div>
            </div>
        </div>
    );
};

export default AdminReport;
