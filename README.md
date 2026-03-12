# Playbook MPR Presentation Notes - Onboarding Form

A beautiful, responsive signup form for collecting presentation notes and updates. Connects directly to Google Sheets via Google Apps Script.

## 📁 Files

- `index.html` - The signup form (host this anywhere)
- `Code.gs` - Google Apps Script (deploy to Google Apps Script)
- `README.md` - This file (setup instructions)

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click "Blank" to create a new spreadsheet
3. Name it: "Playbook NPR Presentation - Signups"
4. Keep this tab open

### Step 2: Open Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code
3. Copy the contents of `Code.gs` from this repo
4. Paste it into the Apps Script editor
5. Save the script (Ctrl+S or Cmd+S)

### Step 3: Set Up the Sheet

1. In the Apps Script editor, select `setupSheet` from the function dropdown
2. Click **Run**
3. Grant permissions when prompted (this is normal - it's your own script)
4. You'll see "Sheet setup complete!" in the logs

Your Google Sheet now has headers: **Timestamp, Name, Email, Phone**

### Step 4: Deploy as Web App

1. In Apps Script editor, click **Deploy > New deployment**
2. Click the gear icon > select **Web app**
3. Configure:
   - **Description:** "Playbook NPR Form"
   - **Execute as:** "Me (your-email@example.com)"
   - **Who has access:** "Anyone" ⚠️ Important!
4. Click **Deploy**
5. Copy the **Web app URL** (starts with `https://script.google.com/.../exec`)

### Step 5: Update the HTML Form

1. Open `index.html` in a text editor
2. Find this line (around line 135):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace with your actual Web App URL from Step 4:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
   ```
4. Save the file

### Step 6: Host the Form

**Option A: GitHub Pages (Free & Easy)**
1. Create a GitHub repo and upload `index.html`
2. Go to repo Settings > Pages
3. Select "main" branch and save
4. Your form is live at `https://your-username.github.io/repo-name`

**Option B: Netlify (Free & Fast)**
1. Drag `index.html` to [netlify.com/drop](https://app.netlify.com/drop)
2. Get your URL instantly (e.g., `https://random-name.netlify.app`)

**Option C: Google Drive**
1. Upload `index.html` to Google Drive
2. Right-click > Share > Get link > Copy
3. Share the link with your audience

## ✅ Testing

1. Open your hosted form URL
2. Fill in: Name, Email, Phone
3. Click "Sign Up"
4. Check your Google Sheet - a new row should appear!

## 🔧 Customization

### Change Colors
Edit the CSS in `index.html`:
- Gradient colors: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Background color: Any hex code
- Font: Change `font-family` in the body selector

### Add More Fields

**In `index.html`:**
```html
<div class="form-group">
    <label for="company">Company</label>
    <input type="text" id="company" name="company" placeholder="Your company name">
</div>
```

**In `Code.gs`:**
```javascript
const company = params.company || '';
// Add to appendRow
sheet.appendRow([timestamp, name, email, phone, company]);
// Update header
sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Company']);
```

### Change Sheet Name

Edit `Code.gs`:
```javascript
const SHEET_NAME = 'Your Custom Name';
```

Then run `setupSheet()` again to recreate with new name.

## 📊 Viewing Data

All submissions go to your Google Sheet automatically. You can:
- Export to CSV/Excel
- Create charts and graphs
- Share with team members
- Set up email notifications (Tools > Notification rules)

## 🔒 Security Notes

- The form submits data to your Google Sheet
- Only you have access to your Google Sheet
- Set "Who has access" to "Anyone" so form submissions work from anywhere
- Never share your Web App URL publicly if you want to restrict access

## 🆘 Troubleshooting

**"Something went wrong" error:**
- Check that `GOOGLE_SCRIPT_URL` is correct in `index.html`
- Verify the Web App is deployed with "Anyone" access
- Check browser console (F12) for error messages

**No data in Google Sheet:**
- Run `setupSheet()` in Apps Script editor
- Check that the sheet name matches `SHEET_NAME` in `Code.gs`
- Verify you granted permissions to the script

**Form won't submit:**
- Make sure all fields are filled in
- Check email format is valid
- Try a different browser

## 📝 License

Free to use for any purpose. No attribution required.

---

Built with ❤️ for the Playbook NPR Presentation
