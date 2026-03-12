// Google Apps Script for Playbook NPR Presentation Notes Form
// This script handles form submissions and writes them to Google Sheets

// CONFIGURATION
// The sheet name where data will be stored
const SHEET_NAME = 'Signups';

function doGet(e) {
  return HtmlService.createHtmlOutput('Form is running. Use POST to submit data.');
}

function doPost(e) {
  try {
    // Get the spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Add headers
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone']);
      // Freeze header row
      sheet.setFrozenRows(1);
      // Set header row style
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold').setBackground('#667eea').setFontColor('white');
      // Auto-resize columns
      sheet.autoResizeColumns(1, 4);
    }

    // Get form data
    const params = e.parameter;

    // Validate required fields
    const name = params.name || '';
    const email = params.email || '';
    const phone = params.phone || '';
    const timestamp = params.timestamp || new Date().toISOString();

    if (!name || !email || !phone) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Missing required fields'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Append row to sheet
    sheet.appendRow([
      new Date(timestamp),
      name,
      email,
      phone
    ]);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Form submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to set up the sheet (run this once manually)
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (sheet) {
    sheet.clear();
  } else {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Add headers
  sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone']);

  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, 4);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#667eea');
  headerRange.setFontColor('white');
  headerRange.setHorizontalAlignment('center');

  // Freeze header row
  sheet.setFrozenRows(1);

  // Auto-resize columns
  sheet.autoResizeColumns(1, 4);

  return 'Sheet setup complete!';
}

// Function to view all submissions (for debugging/testing)
function getSubmissions() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    return 'No sheet found. Run setupSheet() first.';
  }

  const data = sheet.getDataRange().getValues();
  return JSON.stringify(data);
}
