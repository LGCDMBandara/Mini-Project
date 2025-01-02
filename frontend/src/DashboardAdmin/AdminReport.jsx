import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AdminNav from '../Component/AdminNav';
import AdminMainNav from '../Component/AdminMainNav';
import './adminReport.css';
import logo from '../Image/Logo.png'; // Import the logo image

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
                    <button onClick={downloadPDF1} className="download-btn"> Download PDF </button>
                </div>
            </div>
        </div>
    );
};

export default AdminReport;
