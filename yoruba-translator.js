const XLSX = require('xlsx');

function excelToJson(filePath) {
    // Read the Excel file
    const workbook = XLSX.readFile(filePath);

    // Get the first sheet name
    const sheetName = workbook.SheetNames[0];

    // Get the worksheet
    const worksheet = workbook.Sheets[sheetName];

    // Convert the worksheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Extract the headers (first row)
    const headers = jsonData[0];

    // Initialize the result array
    const result = [];

    // Loop through the rows (starting from the second row)
    for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i];
        const obj = {};

        // Map each row to an object using the headers as keys
        headers.forEach((header, index) => {
            obj[header] = row[index] || ""; // Use empty string if the cell is empty
        });

        // Add the object to the result array
        result.push(obj);
    }

    return result;
}

// Example usage
const filePath = '/Users/apple/Desktop/Work/ededun/ededun-recorder-backend/Yoruba_Dataset.xlsx'; // Replace with your file path
const jsonOutput = excelToJson(filePath);

// Save the JSON output to a file (optional)
const fs = require('fs');
fs.writeFileSync('output.json', JSON.stringify(jsonOutput, null, 2));

console.log(jsonOutput);