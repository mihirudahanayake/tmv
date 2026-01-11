


import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function downloadAttendeesPDF({ attendees, eventTitle, locationName, eventDateTime }) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(eventTitle || "Attendees", 14, 16);
  doc.setFontSize(12);
  doc.text(`Location: ${locationName || ''}`, 14, 24);
  doc.text(`Event Date & Time: ${eventDateTime ? new Date(eventDateTime).toLocaleString() : ''}`, 14, 32);
  const tableData = attendees.map(a => [
    a.name || "",
    a.registrationNumber || a.userId || ""
  ]);
  autoTable(doc, {
    head: [["Name", "Registration Number"]],
    body: tableData,
    startY: 40,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185] },
  });
  doc.save(`${eventTitle || "attendees"}_${new Date().toISOString().slice(0, 10)}.pdf`);
}
