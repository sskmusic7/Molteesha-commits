# Google Apps Script Deployment Guide

## Quick Setup (2 minutes)

1. **Open Google Sheets** and create a new sheet
2. **Extensions → Apps Script**
3. **Copy both files** from this repo:
   - `Code.gs` (copy the entire content)
   - `index.html` (copy the entire content)
4. **Paste in Apps Script Editor**:
   - Paste `Code.gs` into the default `Code.gs` file
   - Click **+** next to Files → **HTML** → Name it `index` → Paste the HTML content
5. **Save** (Ctrl+S or Cmd+S)
6. **Deploy**:
   - Click **Deploy → New deployment**
   - Click the gear → Select **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**
7. **Copy the Web app URL** and share it!

That's it! Your form is now live.

## Testing

Open the deployed URL and test the form. Submissions will appear in your Google Sheet automatically.

## Need to update email?

Edit line 119 in `Code.gs`:
```javascript
to: 'contact@playbookmpr.com',  // Change this
```

Then redeploy.
