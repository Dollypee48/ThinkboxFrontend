import html2pdf from "html2pdf.js";
import { useRef } from "react";

export default function ExportPDF({ problem, notes }) {
  const pdfRef = useRef();

  const exportToPDF = () => {
    if (!problem || !problem.title) {
      alert("Problem data missing");
      return;
    }

    // Temporarily make the hidden content visible
    const element = pdfRef.current;
    element.style.display = "block";

    setTimeout(() => {
      html2pdf()
        .from(element)
        .set({
          margin: 0.5,
          filename: `${problem.title || "ThinkBox_Report"}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .save()
        .then(() => {
          // Hide the element again after export
          element.style.display = "none";
        });
    }, 200); // Wait for DOM to render
  };

  return (
    <div className="mb-6">
      <button
        onClick={exportToPDF}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Export to PDF
      </button>

      {/* Hidden but printable content */}
      <div
        ref={pdfRef}
        style={{ display: "none" }} // Start as hidden
        className="bg-white p-6 rounded shadow space-y-6 mt-6 max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-2">🧠 ThinkBox Report</h2>

        {/* Problem Section */}
        <section>
          <h3 className="text-xl font-semibold mb-1">Title & Description</h3>
          <p><strong>Title:</strong> {problem.title}</p>
          <p><strong>Category:</strong> {problem.category}</p>
          <p><strong>Description:</strong> {problem.description}</p>
        </section>

        {/* Notes */}
        <section>
          <h3 className="text-xl font-semibold mt-4 mb-1">Notes</h3>
          {Array.isArray(notes) && notes.length > 0 ? (
            <ul className="list-disc ml-5 space-y-1 text-sm">
              {notes.map((note) => (
                <li key={note._id}>{note.text}</li>
              ))}
            </ul>
          ) : (
            <p>No notes available.</p>
          )}
        </section>

        {/* Optional: Mind Map */}
        {problem.mindMap && problem.mindMap.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold mt-4 mb-1">Mind Map</h3>
            <ul className="list-disc ml-5 text-sm">
              {problem.mindMap.map((node) => (
                <li key={node.id}>
                  {node.label}{" "}
                  {node.parentId && <span>(Child of {node.parentId})</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Optional: SWOT */}
        {problem.swot && (
          <section>
            <h3 className="text-xl font-semibold mt-4 mb-1">SWOT Analysis</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Strengths</strong>
                <ul className="list-disc ml-4">
                  {problem.swot.strengths?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div>
                <strong>Weaknesses</strong>
                <ul className="list-disc ml-4">
                  {problem.swot.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
              <div>
                <strong>Opportunities</strong>
                <ul className="list-disc ml-4">
                  {problem.swot.opportunities?.map((o, i) => <li key={i}>{o}</li>)}
                </ul>
              </div>
              <div>
                <strong>Threats</strong>
                <ul className="list-disc ml-4">
                  {problem.swot.threats?.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
