// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const esprima = require("esprima");
// const fs = require("fs");
// const { spawnSync } = require("child_process");
// const MarkdownIt = require("markdown-it");
// const htmlPdf = require("html-pdf");
// const axios = require("axios");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// const md = new MarkdownIt();

// // Function to detect the file type
// const detectLanguage = (filename) => {
//     if (filename.endsWith(".js")) return "javascript";
//     if (filename.endsWith(".py")) return "python";
//     if (filename.endsWith(".java")) return "java";
//     return "unknown";
// };

// // Extract comments from JavaScript using Esprima
// const extractCommentsJS = (code) => {
//   try {
//       const tokens = esprima.tokenize(code, { comment: true });
//       return tokens
//           .filter(t => t.type === "LineComment" || t.type === "BlockComment")
//           .map(c => c.value);
//   } catch (error) {
//       console.error("Esprima Parsing Error:", error.message);
//       return ["Error extracting comments from JavaScript file."];
//   }
// };


// // Extract comments from Python using AST
// const extractCommentsPython = (filePath) => {
//     const pythonScript = `
// import ast, sys
// def extract_comments(filename):
//     with open(filename, "r", encoding="utf-8") as f:
//         tree = ast.parse(f.read(), filename=filename)
//     comments = [node.value.s for node in ast.walk(tree) if isinstance(node, ast.Expr) and isinstance(node.value, ast.Str)]
//     print("\\n".join(comments))
// if __name__ == "__main__":
//     extract_comments(sys.argv[1])
// `;
//     fs.writeFileSync("extract_python.py", pythonScript);
//     const result = spawnSync("python3", ["extract_python.py", filePath]);
//     return result.stdout.toString().split("\n").filter(Boolean);
// };

// // Extract comments from Java using Regex
// const extractCommentsJava = (code) => {
//     const regex = /(\/\*[\s\S]*?\*\/|\/\/.*?$)/gm;
//     return code.match(regex) ? code.match(regex).map(m => m.trim()) : [];
// };

// // Convert extracted comments into Markdown
// const generateMarkdown = (comments) => {
//     let markdown = "# Project Documentation\n\n";
//     comments.forEach((comment, index) => {
//         markdown += `### Section ${index + 1}\n${comment}\n\n`;
//     });
//     return markdown;
// };

// // AI-enhanced documentation generation (Hugging Face API)
// const enhanceDocumentationWithAI = async (markdown) => {
//     try {
//         const response = await axios.post(
//             "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
//             { inputs: `Improve the following software documentation:\n\n${markdown}` },
//             { headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` } }
//         );
//         return response.data[0].generated_text || "Error generating AI-enhanced documentation.";
//     } catch (error) {
//         console.error("AI API Error:", error);
//         return "Failed to enhance documentation with AI.";
//     }
// };

// // Upload and process code file
// app.post("/upload", upload.single("file"), async (req, res) => {
//     const code = req.file.buffer.toString("utf-8");
//     const language = detectLanguage(req.file.originalname);

//     let comments = [];
//     if (language === "javascript") {
//         comments = extractCommentsJS(code);
//     } else if (language === "python") {
//         fs.writeFileSync("temp.py", code);
//         comments = extractCommentsPython("temp.py");
//         fs.unlinkSync("temp.py");
//     } else if (language === "java") {
//         comments = extractCommentsJava(code);
//     } else {
//         return res.status(400).json({ error: "Unsupported file type" });
//     }

//     const markdown = generateMarkdown(comments);
//     const aiEnhancedMarkdown = await enhanceDocumentationWithAI(markdown);
//     res.json({ markdown, aiEnhancedMarkdown });
// });

// // Convert Markdown to HTML
// app.post("/generate-html", (req, res) => {
//     const { markdown } = req.body;
//     res.json({ html: md.render(markdown) });
// });

// // Download Markdown file
// app.get("/download-markdown", (req, res) => {
//     const markdown = req.query.markdown || "# No documentation available";
//     fs.writeFileSync("documentation.md", markdown);
//     res.download("documentation.md", "documentation.md");
// });

// // Download HTML file
// app.get("/download-html", (req, res) => {
//     const html = md.render(req.query.markdown || "# No documentation available");
//     fs.writeFileSync("documentation.html", html);
//     res.download("documentation.html", "documentation.html");
// });

// // Download PDF file
// app.get("/download-pdf", (req, res) => {
//     const html = md.render(req.query.markdown || "# No documentation available");
//     htmlPdf.create(html).toFile("documentation.pdf", (err, pdf) => {
//         if (err) return res.status(500).json({ error: "Error generating PDF" });
//         res.download("documentation.pdf", "documentation.pdf");
//     });
// });

// app.post("/generate-image", async (req, res) => {
//   try {
//       const { prompt } = req.body;

//       if (!prompt) {
//           return res.status(400).json({ error: "Prompt is required to generate an image" });
//       }

//       const CLOUDFLARE_API_URL = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`;

//       const response = await axios.post(
//           CLOUDFLARE_API_URL,
//           { prompt },
//           {
//               headers: {
//                   Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
//                   "Content-Type": "application/json",
//               },
//           }
//       );

//       if (response.data.success) {
//           const generatedImage = response.data.result.image.trim();
//           return res.status(200).json({ photo: `data:image/jpeg;base64,${generatedImage}` });
//       } else {
//           return res.status(500).json({ error: "Failed to generate image using Cloudflare API" });
//       }
//   } catch (error) {
//       return res.status(500).json({ error: "Error generating image" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const esprima = require("esprima");
// const fs = require("fs-extra");
// const { spawnSync } = require("child_process");
// const MarkdownIt = require("markdown-it");
// const htmlPdf = require("html-pdf");
// const axios = require("axios");
// const simpleGit = require("simple-git");
// const path = require("path");
// const glob = require("glob");
// const mongoose = require("mongoose"); // ✅ Mongoose added
// const bcrypt = require("bcryptjs"); // ✅ For password hashing
// const jwt = require("jsonwebtoken"); // ✅ For token generation
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// const md = new MarkdownIt();



// // ✅ Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

// // ✅ User Schema and Model
// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   });


//   const User = mongoose.model("User", userSchema);
// // ✅ Signup Route
// // ========================
// app.post("/signup", async (req, res) => {
//     const { username, password } = req.body;
//     try {
//       // Check if user already exists
//       const existingUser = await User.findOne({ username });
//       if (existingUser) {
//         return res.status(400).json({ error: "User already exists" });
//       }
  
//       // Hash password
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new User({ username, password: hashedPassword });
  
//       // Save user to database
//       await newUser.save();
//       res.status(201).json({ message: "User created successfully" });
//     } catch (error) {
//       res.status(500).json({ error: "Error creating user" });
//     }
//   });
  
//   // ========================
//   // ✅ Login Route
//   // ========================
//   app.post("/login", async (req, res) => {
//     const { username, password } = req.body;
//     try {
//       // Find user by username
//       const user = await User.findOne({ username });
//       if (!user) {
//         return res.status(400).json({ error: "Invalid username or password" });
//       }
  
//       // Check password
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return res.status(400).json({ error: "Invalid username or password" });
//       }
  
//       // Generate JWT token
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//         expiresIn: "1h",
//       });
  
//       res.json({ token, message: "Login successful" });
//     } catch (error) {
//       res.status(500).json({ error: "Error during login" });
//     }
//   });










// const IGNORED_FILES = ["node_modules", "\.env", "\.git", "\.png", "\.jpg", "\.jpeg", "\.mp3", "\.mp4", "\.wav"];

// const detectLanguage = (filename) => {
//     if (filename.endsWith(".js")) return "javascript";
//     if (filename.endsWith(".py")) return "python";
//     if (filename.endsWith(".java")) return "java";
//     return "unknown";
// };

// const extractCommentsJS = (code) => {
//     try {
//         const tokens = esprima.tokenize(code, { comment: true });
//         return tokens.filter(t => t.type === "LineComment" || t.type === "BlockComment").map(c => c.value);
//     } catch (error) {
//         return ["Error extracting comments from JavaScript file."];
//     }
// };

// const extractCommentsPython = (filePath) => {
//     const pythonScript = `
// import ast, sys
// with open(sys.argv[1], "r", encoding="utf-8") as f:
//     tree = ast.parse(f.read())
// comments = [node.value.s for node in ast.walk(tree) if isinstance(node, ast.Expr) and isinstance(node.value, ast.Str)]
// print("\n".join(comments))
// `;
//     fs.writeFileSync("extract_python.py", pythonScript);
//     const result = spawnSync("python3", ["extract_python.py", filePath]);
//     return result.stdout.toString().split("\n").filter(Boolean);
// };

// const extractCommentsJava = (code) => {
//     const regex = /(\/\*[\s\S]*?\*\/|\/\/.*?$)/gm;
//     return code.match(regex) ? code.match(regex).map(m => m.trim()) : [];
// };

// const generateMarkdown = (comments) => {
//     let markdown = "# Project Documentation\n\n";
//     comments.forEach((comment, index) => {
//         markdown += `### Section ${index + 1}\n${comment}\n\n`;
//     });
//     return markdown;
// };

// const enhanceDocumentationWithAI = async (markdown) => {
//     try {
//         const response = await axios.post(
//             "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
//             { inputs: `Improve the following software documentation:\n\n${markdown}` },
//             { headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` } }
//         );
//         return response.data[0].generated_text || "Error generating AI-enhanced documentation.";
//     } catch (error) {
//         return "Failed to enhance documentation with AI.";
//     }
// };


// const processFile = (filePath) => {
//     try {
//         // Check if the path is a file (not a directory)
//         if (fs.statSync(filePath).isDirectory()) {
//             console.log(`Skipping directory: ${filePath}`);
//             return [];
//         }

//         const code = fs.readFileSync(filePath, "utf-8");
//         const language = detectLanguage(filePath);
//         let comments = [];

//         switch (language) {
//             case "javascript":
//                 comments = extractCommentsJS(code);
//                 break;
//             case "python":
//                 const tempFile = "temp.py";
//                 try {
//                     fs.writeFileSync(tempFile, code);
//                     comments = extractCommentsPython(tempFile);
//                 } finally {
//                     fs.unlinkSync(tempFile); // Ensure temp file is removed even if an error occurs
//                 }
//                 break;
//             case "java":
//                 comments = extractCommentsJava(code);
//                 break;
//             default:
//                 console.log(`Skipping unsupported file type: ${filePath}`);
//                 return [];
//         }

//         return comments;
//     } catch (error) {
//         console.error(`Error processing file ${filePath}:`, error.message);
//         return [];
//     }
// };




// app.post("/process-repo", async (req, res) => {
//     const { repoUrl } = req.body;
//     if (!repoUrl) return res.status(400).json({ error: "GitHub repository URL is required." });

//     const repoDir = path.join(__dirname, "temp_repo");
//     await fs.remove(repoDir);
//     await simpleGit().clone(repoUrl, repoDir);

//     const files = glob.sync(`${repoDir}/**/*.{js,py,java}`, { ignore: IGNORED_FILES.map(f => `${repoDir}/**/${f}`) });
//     let allComments = [];
//     files.forEach(file => allComments.push(...processFile(file)));

//     const markdown = generateMarkdown(allComments);
//     const aiEnhancedMarkdown = await enhanceDocumentationWithAI(markdown);

//     res.json({ markdown, aiEnhancedMarkdown });
// });

// app.post("/upload", upload.single("file"), async (req, res) => {
//     const code = req.file.buffer.toString("utf-8");
//     const language = detectLanguage(req.file.originalname);
//     let comments = [];
//     if (language === "javascript") comments = extractCommentsJS(code);
//     if (language === "python") comments = extractCommentsPython("temp.py");
//     if (language === "java") comments = extractCommentsJava(code);
//     const markdown = generateMarkdown(comments);
//     const aiEnhancedMarkdown = await enhanceDocumentationWithAI(markdown);
//     res.json({ markdown, aiEnhancedMarkdown });
// });

// app.post("/generate-html", (req, res) => {
//     res.json({ html: md.render(req.body.markdown) });
// });

// app.get("/download-markdown", (req, res) => {
//     fs.writeFileSync("documentation.md", req.query.markdown || "# No documentation available");
//     console.log("Markdown file created!");
//     res.download("documentation.md");
// });

// app.get("/download-html", (req, res) => {
//     fs.writeFileSync("documentation.html", md.render(req.query.markdown || "# No documentation available"));
//     console.log("Markdown file created!");
//     res.download("documentation.html");
// });

// app.get("/download-pdf", (req, res) => {
//     htmlPdf.create(md.render(req.query.markdown || "# No documentation available")).toFile("documentation.pdf", (err, pdf) => {
//         if (err) return res.status(500).json({ error: "Error generating PDF" });
//         res.download("documentation.pdf");
//     });
// });


// app.post("/generate-image", async (req, res) => {
//   try {
//       const { prompt } = req.body;

//       if (!prompt) {
//           return res.status(400).json({ error: "Prompt is required to generate an image" });
//       }

//       const CLOUDFLARE_API_URL = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`;

//       const response = await axios.post(
//           CLOUDFLARE_API_URL,
//           { prompt },
//           {
//               headers: {
//                   Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
//                   "Content-Type": "application/json",
//               },
//           }
//       );

//       if (response.data.success) {
//           const generatedImage = response.data.result.image.trim();
//           return res.status(200).json({ photo: `data:image/jpeg;base64,${generatedImage}` });
//       } else {
//           return res.status(500).json({ error: "Failed to generate image using Cloudflare API" });
//       }
//   } catch (error) {
//       return res.status(500).json({ error: "Error generating image" });
//   }
// });

// const PORT = process.env.PORT || 6969;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const express = require("express");
const cors = require("cors");
const multer = require("multer");
const esprima = require("esprima");
const fs = require("fs-extra");
const { spawnSync } = require("child_process");
const MarkdownIt = require("markdown-it");
const htmlPdf = require("html-pdf");
const axios = require("axios");
const simpleGit = require("simple-git");
const path = require("path");
const glob = require("glob");
const mongoose = require("mongoose"); // ✅ Mongoose added
const bcrypt = require("bcryptjs"); // ✅ For password hashing
const jwt = require("jsonwebtoken"); // ✅ For token generation
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });
const md = new MarkdownIt();



// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// ✅ User Schema and Model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });


  const User = mongoose.model("User", userSchema);
// ✅ Signup Route
// ========================
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
  
      // Save user to database
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  });
  
  // ========================
  // ✅ Login Route
  // ========================
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
  
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.json({ token, message: "Login successful" });
    } catch (error) {
      res.status(500).json({ error: "Error during login" });
    }
  });










const IGNORED_FILES = ["node_modules", "\.env", "\.git", "\.png", "\.jpg", "\.jpeg", "\.mp3", "\.mp4", "\.wav"];

const detectLanguage = (filename) => {
    if (filename.endsWith(".js")) return "javascript";
    if (filename.endsWith(".py")) return "python";
    if (filename.endsWith(".java")) return "java";
    return "unknown";
};

const extractCommentsJS = (code) => {
    try {
        const tokens = esprima.tokenize(code, { comment: true });
        return tokens.filter(t => t.type === "LineComment" || t.type === "BlockComment").map(c => c.value);
    } catch (error) {
        return ["Error extracting comments from JavaScript file."];
    }
};

// const extractCommentsPython = (filePath) => {
//     const pythonScript = `
// import ast, sys
// with open(sys.argv[1], "r", encoding="utf-8") as f:
//     tree = ast.parse(f.read())
// comments = [node.value.s for node in ast.walk(tree) if isinstance(node, ast.Expr) and isinstance(node.value, ast.Str)]
// print("\n".join(comments))
// `;
//     fs.writeFileSync("extract_python.py", pythonScript);
//     const result = spawnSync("python", ["extract_python.py", filePath]);
//     return result.stdout.toString().split("\n").filter(Boolean);
// };

// const extractCommentsPython = (filePath) => {
//     const pythonScript = `
// import ast, sys
// import re

// with open(sys.argv[1], "r", encoding="utf-8") as f:
//     tree = ast.parse(f.read())

// # Extract docstrings (triple-quoted strings) and single-line comments (starting with '#')
// comments = []

// # Extract docstrings
// for node in ast.walk(tree):
//     if isinstance(node, ast.FunctionDef) or isinstance(node, ast.ClassDef):
//         if ast.get_docstring(node):
//             comments.append(ast.get_docstring(node))

// # Extract single-line comments
// with open(sys.argv[1], "r", encoding="utf-8") as f:
//     lines = f.readlines()
//     for line in lines:
//         if line.strip().startswith("#"):
//             comments.append(line.strip())

// print("\\n".join(comments))
// `;

//     // Write Python script to a temp file
//     fs.writeFileSync("extract_python.py", pythonScript);
    
//     // Execute the Python script to extract comments
//     const result = spawnSync("python", ["extract_python.py", filePath]);
//     return result.stdout.toString().split("\n").filter(Boolean);
// };


const extractCommentsPython = (filePath) => {
    const pythonScript = `
import tokenize
import sys

comments = []
with open(sys.argv[1], "rb") as f:
    tokens = tokenize.tokenize(f.readline)
    for toknum, tokval, *_ in tokens:
        if toknum == tokenize.COMMENT:
            comments.append(tokval.strip("# ").strip())

for c in comments:
    print(c)
`;
    fs.writeFileSync("extract_python.py", pythonScript);
    const result = spawnSync("python", ["extract_python.py", filePath]);
    return result.stdout.toString().split("\n").filter(Boolean);
};



const extractCommentsJava = (code) => {
    const regex = /(\/\*[\s\S]*?\*\/|\/\/.*?$)/gm;
    return code.match(regex) ? code.match(regex).map(m => m.trim()) : [];
};

const generateMarkdown = (comments) => {
    let markdown = "# Project Documentation\n\n";
    comments.forEach((comment, index) => {
        markdown += `### Section ${index + 1}\n${comment}\n\n`;
    });
    return markdown;
};



const enhanceDocumentationWithAI = async (markdown) => {
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-1.3B',
        {
          inputs: `You are a helpful AI assistant. Improve and elaborate the following software documentation with clear formatting and explanations:\n\n${markdown}`,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          },
        }
      );
  
      console.log('Response from HuggingFace:', response.data);
      return response.data[0]?.generated_text || 'Error generating AI-enhanced documentation.';
    } catch (error) {
      console.error('Hugging Face API Error:', error.response?.data || error.message);
      return 'Failed to enhance documentation with AI.';
    }
  };

const processFile = (filePath) => {
    try {
        // Check if the path is a file (not a directory)
        if (fs.statSync(filePath).isDirectory()) {
            console.log(`Skipping directory: ${filePath}`);
            return [];
        }

        const code = fs.readFileSync(filePath, "utf-8");
        const language = detectLanguage(filePath);
        let comments = [];

        switch (language) {
            case "javascript":
                comments = extractCommentsJS(code);
                break;
            case "python":
                const tempFile = "temp.py";
                try {
                    fs.writeFileSync(tempFile, code);
                    comments = extractCommentsPython(tempFile);
                } finally {
                    fs.unlinkSync(tempFile); // Ensure temp file is removed even if an error occurs
                }
                break;
            case "java":
                comments = extractCommentsJava(code);
                break;
            default:
                console.log(`Skipping unsupported file type: ${filePath}`);
                return [];
        }

        return comments;
    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error.message);
        return [];
    }
};




app.post("/process-repo", async (req, res) => {
    const { repoUrl } = req.body;
    if (!repoUrl) return res.status(400).json({ error: "GitHub repository URL is required." });

    const repoDir = path.join(__dirname, "temp_repo");
    await fs.remove(repoDir);
    await simpleGit().clone(repoUrl, repoDir);

    const files = glob.sync(`${repoDir}/**/*.{js,py,java}`, { ignore: IGNORED_FILES.map(f => `${repoDir}/**/${f}`) });
    let allComments = [];
    files.forEach(file => allComments.push(...processFile(file)));

    const markdown = generateMarkdown(allComments);
    const aiEnhancedMarkdown = await enhanceDocumentationWithAI(markdown);

    res.json({ markdown, aiEnhancedMarkdown });
});

// app.post("/upload", upload.single("file"), async (req, res) => {
//     const code = req.file.buffer.toString("utf-8");
//     const language = detectLanguage(req.file.originalname);
//     let comments = [];
//     if (language === "javascript") comments = extractCommentsJS(code);
//     if (language === "python") comments = extractCommentsPython("temp.py");
//     if (language === "java") comments = extractCommentsJava(code);
//     const markdown = generateMarkdown(comments);
//     const aiEnhancedMarkdown = await enhanceDocumentationWithAI(markdown);
//     res.json({ markdown, aiEnhancedMarkdown });
// });


app.post("/upload", upload.single("file"), async (req, res) => {
        const code = req.file.buffer.toString("utf-8");
        const language = detectLanguage(req.file.originalname);
        let comments = [];
    
        if (language === "javascript") {
            comments = extractCommentsJS(code);
        } else if (language === "python") {
            const tempFile = "temp.py";
            try {
                fs.writeFileSync(tempFile, code); // ✅ Save Python file temporarily
                comments = extractCommentsPython(tempFile);
            } finally {
                fs.unlinkSync(tempFile); // ✅ Clean up
            }
        } else if (language === "java") {
            comments = extractCommentsJava(code);
        }
    
        const markdown = generateMarkdown(comments);
        const aiEnhancedMarkdown = await enhanceDocumentationWithAI(markdown);
        res.json({ markdown, aiEnhancedMarkdown });
});
    


app.post("/generate-html", (req, res) => {
    res.json({ html: md.render(req.body.markdown) });
});

// app.get("/download-markdown", (req, res) => {
//     fs.writeFileSync("documentation.md", req.query.markdown || "# No documentation available");
//     console.log("Markdown file created!");
//     res.download("documentation.md");
// });

// app.get("/download-html", (req, res) => {
//     fs.writeFileSync("documentation.html", md.render(req.query.markdown || "# No documentation available"));
//     console.log("Markdown file created!");
//     res.download("documentation.html");
// });

// app.get("/download-pdf", (req, res) => {
//     htmlPdf.create(md.render(req.query.markdown || "# No documentation available")).toFile("documentation.pdf", (err, pdf) => {
//         if (err) return res.status(500).json({ error: "Error generating PDF" });
//         res.download("documentation.pdf");
//     });
// });


// POST - Download Markdown
app.post("/download-markdown", (req, res) => {
    const markdownContent = req.body.markdown || "# No documentation available";
    fs.writeFileSync("documentation.md", markdownContent);
    console.log("Markdown file created!");
    res.download("documentation.md");
});

// POST - Download HTML
app.post("/download-html", (req, res) => {
    const markdownContent = req.body.markdown || "# No documentation available";
    const htmlContent = md.render(markdownContent);
    fs.writeFileSync("documentation.html", htmlContent);
    console.log("HTML file created!");
    res.download("documentation.html");
});

// POST - Download PDF
app.post("/download-pdf", (req, res) => {
    const markdownContent = req.body.markdown || "# No documentation available";
    const htmlContent = md.render(markdownContent);
    htmlPdf.create(htmlContent).toFile("documentation.pdf", (err, pdf) => {
        if (err) return res.status(500).json({ error: "Error generating PDF" });
        res.download("documentation.pdf");
    });
});



app.post("/generate-image", async (req, res) => {
  try {
      const { prompt } = req.body;

      if (!prompt) {
          return res.status(400).json({ error: "Prompt is required to generate an image" });
      }

      const CLOUDFLARE_API_URL = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`;

      const response = await axios.post(
          CLOUDFLARE_API_URL,
          { prompt },
          {
              headers: {
                  Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
                  "Content-Type": "application/json",
              },
          }
      );

      if (response.data.success) {
          const generatedImage = response.data.result.image.trim();
          return res.status(200).json({ photo: `data:image/jpeg;base64,${generatedImage}` });
      } else {
          return res.status(500).json({ error: "Failed to generate image using Cloudflare API" });
      }
  } catch (error) {
      return res.status(500).json({ error: "Error generating image" });
  }
});

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
