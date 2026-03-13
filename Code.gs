// Google Apps Script for Playbook MPR Sign Up Form
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
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Interest']);
      // Freeze header row
      sheet.setFrozenRows(1);
      // Set header row style
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#667eea').setFontColor('white');
      // Auto-resize columns
      sheet.autoResizeColumns(1, 5);
    }

    // Get form data
    const params = e.parameter;

    // Validate required fields
    const name = params.name || '';
    const email = params.email || '';
    const phone = params.phone || '';
    const interest = params.interest || 'Not specified';
    const timestamp = params.timestamp || new Date().toISOString();

    if (!name || !email) {
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
      phone,
      interest
    ]);

    // Optional: Send email notification
    try {
      MailApp.sendEmail({
        to: 'contact@playbookmpr.com',
        subject: 'New Signup: ' + name,
        htmlBody: `
          <h2>New Signup Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Interest:</strong> ${interest}</p>
          <p><strong>Timestamp:</strong> ${new Date(timestamp)}</p>
        `
      });
    } catch (emailError) {
      // Log email error but don't fail the submission
      console.log('Email notification failed:', emailError);
    }

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
  sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Interest']);

  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, 5);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#667eea');
  headerRange.setFontColor('white');
  headerRange.setHorizontalAlignment('center');

  // Freeze header row
  sheet.setFrozenRows(1);

  // Auto-resize columns
  sheet.autoResizeColumns(1, 5);

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

// Function to get submission stats
function getStats() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    return 'No sheet found. Run setupSheet() first.';
  }

  const data = sheet.getDataRange().getValues();
  const totalSignups = data.length - 1; // Exclude header

  // Count by interest
  const interestCounts = {};
  for (let i = 1; i < data.length; i++) {
    const interest = data[i][4] || 'Not specified';
    interestCounts[interest] = (interestCounts[interest] || 0) + 1;
  }

  return {
    total: totalSignups,
    byInterest: interestCounts
  };
}
