# Playbook MPR Sign Up Form

A beautiful, dark-themed signup form matching the Playbook MPR brand. Connects directly to Google Sheets via Google Apps Script with email notifications.

## 📁 Files

- `index.html` - The signup form (host this anywhere)
- `Code.gs` - Google Apps Script (deploy to Google Apps Script)
- `README.md` - Setup instructions

## 🎨 Features

- **Dark Theme Design** - Matches the Playbook MPR aesthetic
- **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- **Service Interest Selection** - Users can select what they're interested in
- **Email Notifications** - Get notified instantly when someone signs up
- **Google Sheets Integration** - All submissions stored automatically
- **Form Validation** - Client-side validation for better UX

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click "Blank" to create a new spreadsheet
3. Name it: "Playbook MPR Signups"
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

Your Google Sheet now has headers: **Timestamp, Name, Email, Phone, Interest**

### Step 4: Update Email Notification (Optional)

If you want to receive email notifications, update line 60 in `Code.gs`:

```javascript
to: 'contact@playbookmpr.com',  // Change to your email
```

### Step 5: Deploy as Web App

1. In Apps Script editor, click **Deploy > New deployment**
2. Click the gear icon > select **Web app**
3. Configure:
   - **Description:** "Playbook MPR Sign Up Form"
   - **Execute as:** "Me (your-email@example.com)"
   - **Who has access:** "Anyone" ⚠️ Important!
4. Click **Deploy**
5. Copy the **Web app URL** (starts with `https://script.google.com/.../exec`)

### Step 6: Update the HTML Form

1. Open `index.html` in a text editor
2. Find this line (around line 366):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace with your actual Web App URL from Step 5:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
   ```
4. Save the file

### Step 7: Host the Form

**Option A: GitHub Pages (Free & Easy)**
1. Create a GitHub repo and upload `index.html`
2. Go to repo Settings > Pages
3. Select "main" branch and save
4. Your form is live at `https://your-username.github.io/repo-name`

**Option B: Netlify (Free & Fast)**
1. Drag `index.html` to [netlify.com/drop](https://app.netlify.com/drop)
2. Get your URL instantly (e.g., `https://random-name.netlify.app`)

**Option C: Vercel (Free & Fast)**
1. Drag `index.html` to [vercel.com/new](https://vercel.com/new)
2. Get your URL instantly

## ✅ Testing

1. Open your hosted form URL
2. Fill in: Name, Email, Phone (optional), Interest (optional)
3. Click "Sign Up"
4. Check your Google Sheet - a new row should appear!
5. You should receive an email notification (if configured)

## 🔧 Customization

### Change Colors

Edit the CSS in `index.html`:

**Gradient colors (lines 58, 67, 85, 176):**
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

**Background color:**
```css
background: #0a0a0a;  /* Line 19 */
```

**Accent color:**
```css
color: #667eea;  /* Lines 131, 154, 266 */
```

### Add More Fields

**In `index.html`:**
```html
<div class="form-group">
    <label for="company">Company</label>
    <div class="input-wrapper">
        <i class="fa-regular fa-building"></i>
        <input type="text" id="company" name="company" placeholder="Your company name">
    </div>
</div>
```

**In `Code.gs`:**
```javascript
const company = params.company || '';
// Add to appendRow (line 49)
sheet.appendRow([timestamp, name, email, phone, interest, company]);
// Update header (line 22)
sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Interest', 'Company']);
// Update headerRange (line 105)
const headerRange = sheet.getRange(1, 1, 1, 6);
```

**In `index.html` JavaScript (line 391):**
```javascript
formData.append('company', document.getElementById('company').value);
```

### Change Sheet Name

Edit `Code.gs` (line 6):
```javascript
const SHEET_NAME = 'Your Custom Name';
```

Then run `setupSheet()` again to recreate with new name.

### Disable Email Notifications

Comment out lines 57-74 in `Code.gs`:
```javascript
/* Optional: Send email notification
try {
  MailApp.sendEmail({...});
} catch (emailError) {
  console.log('Email notification failed:', emailError);
}
*/
```

## 📊 Viewing Data

All submissions go to your Google Sheet automatically. You can:
- Export to CSV/Excel
- Create charts and graphs
- Share with team members
- Set up additional notifications (Tools > Notification rules)

## 📈 Stats Function

To get submission statistics, run `getStats()` in the Apps Script editor:

```javascript
const stats = getStats();
console.log(stats.total);        // Total signups
console.log(stats.byInterest);   // Signups by interest
```

## 🔒 Security Notes

- The form submits data to your Google Sheet
- Only you have access to your Google Sheet
- Set "Who has access" to "Anyone" so form submissions work from anywhere
- Never share your Web App URL publicly if you want to restrict access
- Consider adding CAPTCHA if you receive spam

## 🎯 Form Features

### Required Fields
- Name
- Email

### Optional Fields
- Phone
- Interest (dropdown with services)

### Validation
- Email format validation
- Required field checking
- User-friendly error messages
- Loading state during submission
- Success message after submission

## 🆘 Troubleshooting

**"Something went wrong" error:**
- Check that `GOOGLE_SCRIPT_URL` is correct in `index.html`
- Verify the Web App is deployed with "Anyone" access
- Check browser console (F12) for error messages
- Make sure you're not opening the HTML file directly (use `http://` not `file://`)

**No data in Google Sheet:**
- Run `setupSheet()` in Apps Script editor
- Check that the sheet name matches `SHEET_NAME` in `Code.gs`
- Verify you granted permissions to the script

**No email notifications:**
- Check your Gmail "All Mail" folder
- Verify the email address in `Code.gs` line 60
- Check Apps Script logs for errors (View > Logs)

**Form won't submit:**
- Make sure required fields are filled in
- Check email format is valid
- Try a different browser
- Check if Web App URL is correct

**CORS errors:**
- Make sure you deployed as "Web App" not "API Executable"
- Verify "Who has access" is set to "Anyone"
- Check that you're using the `/exec` endpoint, not `/dev`

## 📝 License

Free to use for any purpose. No attribution required.

---

Built with ❤️ for Playbook MPR | Creative Solutions
