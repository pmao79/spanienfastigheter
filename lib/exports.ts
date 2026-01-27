
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// === EXCEL EXPORT ===

export const exportToExcel = (data: any[], filename: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(blob, `${filename}.xlsx`);
};

// === PDF EXPORT ===

interface PDFColumn {
    header: string;
    dataKey: string;
}

export const exportToPDF = (title: string, data: any[], columns: PDFColumn[], filename: string, summary?: string) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text(title, 14, 22);

    // Summary
    if (summary) {
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(summary, 14, 30);
    }

    // Timestamp
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, summary ? 38 : 30);

    // Table
    autoTable(doc, {
        head: [columns.map(c => c.header)],
        body: data.map(row => columns.map(c => row[c.dataKey])),
        startY: summary ? 45 : 35,
        theme: 'grid',
        headStyles: { fillColor: [26, 54, 93] }, // #1a365d (Brand Primary)
    });

    doc.save(`${filename}.pdf`);
};
