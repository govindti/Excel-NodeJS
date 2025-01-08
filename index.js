// const express = require("express");
// const multer = require("multer");
// const xlsx = require("xlsx");
// const fs = require("fs");
// const path = require("path");

// const app = express();
// const port = 5000;

// // Set up Multer for file storage (in-memory or disk storage)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // specify directory where files should be saved
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // file naming convention
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/upload", upload.single("excelFile"), (req, res) => {
//   const filePath = req.file.path; // Path to the uploaded file

//   try {
//     // Read the uploaded Excel file using xlsx library
//     const workbook = xlsx.readFile(filePath);

//     // You can get the data from the first sheet (or any sheet by name)
//     const sheetName = workbook.SheetNames[0]; // Get the first sheet's name
//     const sheet = workbook.Sheets[sheetName];
//     console.log("before json");

//     // Parse the sheet into JSON format
//     const jsonData = xlsx.utils.sheet_to_json(sheet);

//     console.log("Parsed Excel Data:", jsonData);

//     // Respond with the parsed data
//     res.json({
//       message: "File uploaded and parsed successfully",
//       data: jsonData,
//     });
//   } catch (error) {
//     console.error("Error parsing the Excel file:", error);
//     res.status(500).json({ error: "Failed to parse the Excel file" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 5000;

// Set up Multer for file storage (in-memory or disk storage)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // specify directory where files should be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // file naming convention
    },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("excelFile"), (req, res) => {
    const filePath = req.file.path; // Path to the uploaded file

    try {
        // Read the uploaded Excel file using xlsx library
        const workbook = xlsx.readFile(filePath);

        // Get the first sheet (or any other sheet you need)
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        console.log("before json");

        // Parse the sheet into JSON format (row-wise)
        const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        console.log("Parsed Excel Data:", jsonData);

        // You can now map each row to the proper column names
        const id = 1;
        const headers = jsonData[0]; // Assuming first row contains the column names
        const rows = jsonData.slice(1); // Rest of the data is row-wise

        // Create an array of objects for each row
        const rowData = rows.map((row, index) => {
            let rowObject = { id: index + 1 };
            headers.forEach((header, index) => {

                rowObject[header] = row[index] || null; // Avoid undefined values
            });
            return rowObject;
        });

        // Respond with the parsed data
        res.json({
            message: "File uploaded and parsed successfully",
            data: rowData,
        });

        // Asynchronous file deletion
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting the file:", err);
            } else {
                console.log(`File ${filePath} deleted successfully.`);
            }
        });
        
        // fs.unlink(filePath);
    } catch (error) {
        console.error("Error parsing the Excel file:", error);
        res.status(500).json({ error: "Failed to parse the Excel file" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
