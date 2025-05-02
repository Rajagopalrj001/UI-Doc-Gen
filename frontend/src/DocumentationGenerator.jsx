// import { useState } from "react";
// import axios from "axios";
// import Nav from "./Nav";

// function DocumentationGenerator() {
//     const [file, setFile] = useState(null);
//     const [repoUrl, setRepoUrl] = useState("");
//     const [markdown, setMarkdown] = useState("");
//     const [aiMarkdown, setAiMarkdown] = useState("");
//     const [html, setHtml] = useState("");
//     const [error, setError] = useState("");
//     const [mode, setMode] = useState("file"); // "file" or "repo"

//     const uploadFile = async () => {
//         if (!file) {
//             setError("Please select a file first.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//             const response = await axios.post("https://ui-doc-gen-backend.onrender.com/upload", formData);
//             processResponse(response);
//         } catch (err) {
//             setError("Failed to process the file. Please upload a supported file.");
//         }
//     };

//     const processRepo = async () => {
//         if (!repoUrl) {
//             setError("Please enter a valid GitHub repository URL.");
//             return;
//         }

//         try {
//             const response = await axios.post("https://ui-doc-gen-backend.onrender.com/process-repo", { repoUrl });
//             processResponse(response);
//         } catch (err) {
//             setError("Failed to process the repository. Ensure the URL is correct and accessible.");
//         }
//     };

//     const processResponse = async (response) => {
//         setMarkdown(response.data.markdown);
//         setAiMarkdown(response.data.aiEnhancedMarkdown);
//         setError("");

//         const htmlResponse = await axios.post("https://ui-doc-gen-backend.onrender.com/generate-html", {
//             markdown: response.data.aiEnhancedMarkdown,
//         });
//         setHtml(htmlResponse.data.html);
//     };

//     return (
//         <>
//   <div className="container my-5">
//     <h1 className="text-center mb-4 text-light">📚 Internal Documentation Generator</h1>

//     <div className="card bg-dark text-light shadow-lg p-4 mb-4">
//       {/* Mode Selection */}
//       <div className="mb-3">
//         <label className="form-check-label me-4">
//           <input
//             type="radio"
//             name="mode"
//             value="file"
//             checked={mode === "file"}
//             onChange={() => setMode("file")}
//             className="form-check-input"
//           />{" "}
//           Upload File
//         </label>
//         <label className="form-check-label">
//           <input
//             type="radio"
//             name="mode"
//             value="repo"
//             checked={mode === "repo"}
//             onChange={() => setMode("repo")}
//             className="form-check-input"
//           />{" "}
//           Process GitHub Repo
//         </label>
//       </div>

//       {/* File or Repo Input */}
//       {mode === "file" ? (
//         <div className="mb-3">
//           <input
//             type="file"
//             className="form-control mb-3"
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//           <button
//             className="btn btn-danger btn-animate"
//             onClick={uploadFile}
//           >
//             📤 Upload & Generate
//           </button>
//         </div>
//       ) : (
//         <div className="mb-3">
//           <input
//             type="text"
//             className="form-control mb-3"
//             placeholder="Enter GitHub Repo URL"
//             value={repoUrl}
//             onChange={(e) => setRepoUrl(e.target.value)}
//           />
//           <button
//             className="btn btn-danger btn-animate"
//             onClick={processRepo}
//           >
//             🔎 Process Repo
//           </button>
//         </div>
//       )}

//       {/* Error Message */}
//       {error && <p className="text-danger mt-2">{error}</p>}
//     </div>

//     {/* Extracted Markdown */}
//     <div className="card bg-dark text-light shadow-lg p-4 mb-4">
//       <h2 className="text-light">📝 Extracted Markdown</h2>
//       <pre className="bg-secondary text-light p-3 rounded">{markdown}</pre>
//     </div>

//     {/* AI-Enhanced Documentation */}
//     <div className="card bg-dark text-light shadow-lg p-4 mb-4">
//       <h2 className="text-light">🤖 AI-Enhanced Documentation</h2>
//       <pre className="bg-secondary text-light p-3 rounded">{aiMarkdown}</pre>
//     </div>

//     {/* HTML Preview */}
//     <div className="card bg-dark text-light shadow-lg p-4 mb-4">
//       <h2 className="text-light">🌐 HTML Preview</h2>
//       <div
//         className="bg-secondary p-3 rounded text-light"
//         dangerouslySetInnerHTML={{ __html: html }}
//       />
//     </div>

//     {/* Download Options */}
//     <div className="text-center mt-4">
//       <h2 className="text-light mb-3">📥 Download Options</h2>
//       <button
//         className="btn btn-outline-light me-2 btn-animate"
//         onClick={() =>
//           window.open(
//             `https://ui-doc-gen-backend.onrender.com/download-markdown?markdown=${encodeURIComponent(
//               aiMarkdown
//             )}`
//           )
//         }
//       >
//         ⬇️ Download Markdown
//       </button>
//       <button
//         className="btn btn-outline-light me-2 btn-animate"
//         onClick={() =>
//           window.open(
//             `https://ui-doc-gen-backend.onrender.com/download-html?markdown=${encodeURIComponent(
//               aiMarkdown
//             )}`
//           )
//         }
//       >
//         🌐 Download HTML
//       </button>
//       <button
//         className="btn btn-outline-light btn-animate"
//         onClick={() =>
//           window.open(
//             `https://ui-doc-gen-backend.onrender.com/download-pdf?markdown=${encodeURIComponent(
//               aiMarkdown
//             )}`
//           )
//         }
//       >
//         📄 Download PDF
//       </button>
//     </div>
//   </div>
// </>

//     );
// }

// export default DocumentationGenerator;






import { useState } from "react";
import axios from "axios";
import Nav from "./Nav";

function DocumentationGenerator() {
  const [file, setFile] = useState(null);
  const [repoUrl, setRepoUrl] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [aiMarkdown, setAiMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("file"); // "file" or "repo"

  // ✅ Upload File
  const uploadFile = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("https://ui-doc-gen-backend.onrender.com/upload", formData);
      processResponse(response);
    } catch (err) {
      setError("Failed to process the file. Please upload a supported file.");
    }
  };

  // ✅ Process GitHub Repo
  const processRepo = async () => {
    if (!repoUrl) {
      setError("Please enter a valid GitHub repository URL.");
      return;
    }

    try {
      const response = await axios.post("https://ui-doc-gen-backend.onrender.com/process-repo", { repoUrl });
      processResponse(response);
    } catch (err) {
      setError("Failed to process the repository. Ensure the URL is correct and accessible.");
    }
  };

  // ✅ Process Response and Generate HTML
  const processResponse = async (response) => {
    setMarkdown(response.data.markdown);
    setAiMarkdown(response.data.aiEnhancedMarkdown);
    setError("");

    const htmlResponse = await axios.post("https://ui-doc-gen-backend.onrender.com/generate-html", {
      markdown: response.data.aiEnhancedMarkdown,
    });
    setHtml(htmlResponse.data.html);
  };

  // Dummy markdown data for download
  const markdownData = markdown || "# Sample Markdown Documentation\n\nThis is a sample generated documentation.";

  // ✅ Download Markdown
  const downloadMarkdown = async () => {
    try {
      const response = await axios.post(
        "https://ui-doc-gen-backend.onrender.com/download-markdown",
        { markdown: markdownData },
        { responseType: "blob" }
      );
      downloadFile(response.data, "documentation.md");
    } catch (error) {
      console.error("Error downloading markdown:", error);
    }
  };

  // ✅ Download HTML
  const downloadHTML = async () => {
    try {
      const response = await axios.post(
        "https://ui-doc-gen-backend.onrender.com/download-html",
        { markdown: markdownData },
        { responseType: "blob" }
      );
      downloadFile(response.data, "documentation.html");
    } catch (error) {
      console.error("Error downloading HTML:", error);
    }
  };

  // ✅ Download PDF
  const downloadPDF = async () => {
    try {
      const response = await axios.post(
        "https://ui-doc-gen-backend.onrender.com/download-pdf",
        { markdown: markdownData },
        { responseType: "blob" }
      );
      downloadFile(response.data, "documentation.pdf");
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  // ✅ File Download Helper
  const downloadFile = (data, fileName) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <div className="container my-5">
        <h1 className="text-center mb-4 text-light">📚 Internal Documentation Generator</h1>

        {/* Mode Selection */}
        <div className="card bg-dark text-light shadow-lg p-4 mb-4">
          <div className="mb-3">
            <label className="form-check-label me-4">
              <input
                type="radio"
                name="mode"
                value="file"
                checked={mode === "file"}
                onChange={() => setMode("file")}
                className="form-check-input"
              />{" "}
              Upload File
            </label>
            <label className="form-check-label">
              <input
                type="radio"
                name="mode"
                value="repo"
                checked={mode === "repo"}
                onChange={() => setMode("repo")}
                className="form-check-input"
              />{" "}
              Process GitHub Repo
            </label>
          </div>

          {/* File or Repo Input */}
          {mode === "file" ? (
            <div className="mb-3">
              <input
                type="file"
                className="form-control mb-3"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button
                className="btn btn-danger btn-animate"
                onClick={uploadFile}
              >
                📤 Upload & Generate
              </button>
            </div>
          ) : (
            <div className="mb-3">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter GitHub Repo URL"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
              <button
                className="btn btn-danger btn-animate"
                onClick={processRepo}
              >
                🔎 Process Repo
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>

                  {/* Download Options */}
        <div className="text-center mt-4">
          <h2 className="text-light mb-3">📥 Download Options</h2>
          <button
            className="btn btn-outline-light me-2 btn-animate"
            onClick={downloadMarkdown}
          >
            ⬇️ Download Markdown
          </button>
          <button
            className="btn btn-outline-light me-2 btn-animate"
            onClick={downloadHTML}
          >
            🌐 Download HTML
          </button>
          <button
            className="btn btn-outline-light btn-animate"
            onClick={downloadPDF}
          >
            📄 Download PDF
          </button>
        </div>


        {/* Extracted Markdown */}
        <div className="card bg-dark text-light shadow-lg p-4 mb-4">
          <h2 className="text-light">📝 Extracted Markdown</h2>
          <pre className="bg-secondary text-light p-3 rounded">{markdown || "No markdown generated yet."}</pre>
        </div>

        {/* AI-Enhanced Documentation */}
        <div className="card bg-dark text-light shadow-lg p-4 mb-4">
          <h2 className="text-light">🤖 AI-Enhanced Documentation</h2>
          <pre className="bg-secondary text-light p-3 rounded">{aiMarkdown || "No AI-enhanced markdown yet."}</pre>
        </div>

        {/* HTML Preview */}
        <div className="card bg-dark text-light shadow-lg p-4 mb-4">
          <h2 className="text-light">🌐 HTML Preview</h2>
          <div
            className="bg-secondary p-3 rounded text-light"
            dangerouslySetInnerHTML={{ __html: html || "<p>No HTML preview available yet.</p>" }}
          />
        </div>


      </div>
    </>
  );
}

export default DocumentationGenerator;
