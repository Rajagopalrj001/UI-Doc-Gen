import { useState } from "react";
import axios from "axios";
import Nav from "./Nav";

function ImageGeneration() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");

    // UI-related keywords for validation
    const uiKeywords = [
      "ui", "user interface", "dashboard", "layout", "design", "mockup", "wireframe", "prototype", "template",
      "landing page", "login page", "signup page", "profile page", "home page", "contact page", "about page", 
      "settings page", "error page", "404 page", "product page", "checkout page", "cart page", "admin panel", 
      "dashboard page", "authentication page", "pricing page", "help page", "faq page",
      "form", "button", "input field", "text field", "checkbox", "radio button", "toggle switch", "slider",
      "dropdown", "select box", "search bar", "progress bar", "spinner", "tooltip", "breadcrumb", "pagination",
      "modal", "popup", "accordion", "carousel", "tabs", "stepper", "progress indicator", "alert", "badge",
      "navbar", "sidebar", "menu", "top bar", "bottom navigation", "breadcrumb navigation", "floating action button",
      "card", "widget", "hero section", "call to action", "testimonial section", "pricing table", "feature section",
      "banner", "infobox", "content block", "grid layout", "split layout", "masonry grid", "image gallery",
      "table", "data table", "sortable table", "filterable table", "list", "grid list", "tree view", "kanban board",
      "drag and drop", "image upload", "file uploader", "rich text editor", "markdown editor", "color picker",
      "code editor", "autocomplete", "multiselect", "date picker", "calendar", "step form",
      "footer", "header", "side panel", "floating menu", "sticky header", "cards layout", "hover effects",
      "dark mode toggle", "animations", "theme switcher", "notifications", "chat ui", "avatar",
      "material UI", "bootstrap UI", "tailwind UI", "ant design", "chakra ui", "bulma ui", "foundation ui", "site",
      "web site", "web ui","theme"
    ];

    const isValidUIPrompt = (text) => {
        return uiKeywords.some(keyword => text.toLowerCase().includes(keyword));
    };

    const generateImage = async () => {
        if (!prompt) {
            setError("Please enter a prompt!");
            return;
        }

        if (!isValidUIPrompt(prompt)) {
            setError("Invalid prompt! Please enter a UI-related prompt.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:6969/generate-image", { prompt });
            setImage(response.data.photo);
            setError("");
        } catch (err) {
            setError("Failed to generate image. Try again.");
        }
    };

    return (
        <>
  <div className="container my-5">
    <h1 className="text-center mb-4 text-light">🎨 AI UI Generator</h1>

    <div className="card bg-dark text-light shadow-lg p-4 mb-4">
      {/* Input Section */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a UI-related prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <button
        className="btn btn-danger btn-animate"
        onClick={generateImage}
      >
        🎨 Generate UI
      </button>

      {/* Error Message */}
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>

    {/* Generated UI Preview */}
    {image && (
      <div className="card bg-dark text-light shadow-lg p-4 mb-4 text-center d-flex align-items-center justify-content-center">
        <h2 className="text-light mb-3">✨ Generated UI</h2>
        <img
          src={image}
          alt="Generated UI"
          className="img-fluid rounded shadow-lg mb-3"
          style={{ width: "400px", height: "auto" }}
        />
        <a href={image} download="generated-ui.jpg">
          <button className="btn btn-outline-light btn-animate">
            ⬇️ Download UI
          </button>
        </a>
      </div>
    )}
  </div>
</>

    );
}

export default ImageGeneration;