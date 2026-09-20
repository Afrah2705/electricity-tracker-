# Home Energy Consumption Tracker

A professional, beginner-friendly web application to monitor and analyze your household electricity usage.

## 📋 Project Overview

The **Home Energy Consumption Tracker** allows you to:
- Add multiple home appliances with their power consumption details
- Calculate daily and monthly energy consumption
- Estimate monthly electricity bills based on your tariff rate
- Visualize energy consumption with interactive charts (pie and bar charts)
- Get detailed analysis about which appliances consume the most energy
- Remove appliances and recalculate instantly

## 🚀 How to Run the Application

### Option 1: Using VS Code (Easiest for Beginners)

1. **Open the folder in VS Code:**
   - Open VS Code
   - Go to `File` → `Open Folder`
   - Select the `application` folder

2. **Install Live Server Extension (Optional but Recommended):**
   - Go to the Extensions panel (left sidebar, or press `Ctrl+Shift+X`)
   - Search for "Live Server"
   - Click "Install" on the extension by Ritwick Dey
   - This allows you to run the app with auto-refresh

3. **Run the Application:**
   - Right-click on `index.html` in the file explorer
   - Select "Open with Live Server"
   - The application will open in your default browser

4. **Alternative without Live Server:**
   - Right-click on `index.html`
   - Select "Open with" → Choose your browser

### Option 2: Using Python (Simple Method)

If you have Python installed, run this command in the application folder:

```bash
python -m http.server 8000
```

Then open your browser and go to: `http://localhost:8000`

### Option 3: Using Node.js

If you have Node.js installed:

```bash
npx http-server
```

Then open your browser and go to the provided URL (usually `http://localhost:8080`)

## 📁 Project Structure

```
application/
├── index.html      # Main HTML file - the structure and layout
├── styles.css      # CSS file - colors, fonts, and responsive design
├── script.js       # JavaScript file - calculations and interactivity
└── README.md       # This file - project documentation
```

### File Descriptions:

**index.html** (HTML Structure)
- Contains the HTML structure of the entire application
- Defines input forms, table, cards, and chart sections
- Uses Chart.js library from a CDN for creating charts
- Beginner tip: This is where you see what elements appear on the page

**styles.css** (Styling)
- Contains all the visual styling (colors, fonts, sizes, spacing)
- Uses a gradient purple theme for a professional look
- Includes responsive design media queries for mobile, tablet, and desktop
- Beginner tip: Change colors/fonts here if you want to customize the look

**script.js** (JavaScript Logic)
- Contains all the calculation and interactive logic
- Handles form submissions, calculations, and data management
- Updates the table, cards, and charts automatically
- Beginner tip: This is where the "brain" of the app is - it does all the math

## 🎯 How to Use the Application

### Step 1: Set Electricity Tariff
- Enter your local electricity rate in **₹ per kWh** at the top
- Example: If your local rate is 5.50 per unit, enter `5.5`
- This is used to calculate your estimated monthly bill

### Step 2: Add Appliances
Fill in the form with your appliance details:
- **Appliance Name:** e.g., "Air Conditioner", "Refrigerator"
- **Power Rating (Watts):** The wattage (check the appliance label or manual)
- **Quantity:** How many of this appliance do you have?
- **Hours per Day:** How many hours per day do you use it?
- **Days per Month:** How many days per month do you use it?

Click **"Add Appliance"** to add it to your list.

### Step 3: View Results
The application automatically shows:
- **Summary Cards:** Total appliances, total consumption, estimated bill, highest consumer
- **Appliances Table:** Detailed breakdown of each appliance with energy consumption and cost
- **Charts:** (Only if you have 2+ appliances)
  - Pie chart showing percentage of total consumption
  - Bar chart comparing monthly consumption of appliances
- **Analysis Section:** Detailed insights about consumption patterns

### Step 4: Remove or Modify
- Click the **"Delete"** button in any row to remove that appliance
- The calculations update instantly
- Modify the tariff to see how it affects your bill

## 🧮 Energy Calculation Formula

The application uses this formula to calculate monthly energy consumption:

```
Energy (kWh) = (Watts × Quantity × Hours per day × Days per month) / 1000
```

Example:
- Air Conditioner: 1500W, 1 unit, 8 hours/day, 30 days/month
- Energy = (1500 × 1 × 8 × 30) / 1000 = 360 kWh

## 📊 Understanding the Results

### Summary Cards
- **Total Appliances:** Count of appliances you've added
- **Total Monthly Consumption:** Sum of all appliances' energy consumption in kWh
- **Estimated Monthly Bill:** Total consumption × Electricity tariff
- **Highest Energy Consumer:** The appliance that uses the most electricity

### Appliances Table
- **Monthly kWh:** Energy consumption for that appliance per month
- **Monthly Cost:** Cost of using that appliance per month
- **% of Total:** What percentage of your total consumption this appliance uses

### Charts (2+ appliances only)
- **Pie Chart:** Visual representation of which appliances consume what percentage
- **Bar Chart:** Comparison of consumption levels (horizontal bar chart)

### Analysis Section
Provides insights such as:
- Which appliance is your highest consumer
- Which appliance is your lowest consumer
- Estimated daily and monthly costs
- Tips for reducing electricity consumption

## 💡 Learning Points for Beginners

This project teaches you:

1. **HTML Structure:** How to organize elements on a webpage
2. **CSS Styling:** How to make a website look professional and responsive
3. **JavaScript Basics:**
   - Variables and data types
   - Arrays and objects (storing appliances)
   - Functions (organizing code)
   - Event listeners (responding to user input)
   - DOM manipulation (updating the page dynamically)
4. **Calculations:** Implementing formulas programmatically
5. **Data Visualization:** Using Chart.js library for charts
6. **Responsive Design:** Making the app work on all screen sizes

## 🔧 Modifying the Project

### Change the Default Tariff
Open `index.html` and find the line:
```html
<input type="number" id="tariff" placeholder="Enter tariff rate (e.g., 5.5)" min="0" step="0.01" value="7.5">
```
Change `value="7.5"` to your desired default tariff.

### Change the Color Theme
Open `styles.css` and look for color definitions like:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
You can change these hex color codes to customize the theme.

### Modify the Layout
- Edit `index.html` to change the structure
- Edit `styles.css` to change how elements are arranged
- Edit `script.js` to change calculation logic

## 📝 Example Usage

Here's what happens when you use the app:

1. Set tariff to ₹5.50 per kWh
2. Add "Air Conditioner" - 1500W, 1 unit, 8 hrs/day, 30 days/month
3. Add "Refrigerator" - 150W, 1 unit, 24 hrs/day, 30 days/month
4. Add "LED Light" - 10W, 5 units, 6 hrs/day, 30 days/month

Results:
- AC: 360 kWh/month = ₹1,980
- Fridge: 108 kWh/month = ₹594
- Lights: 9 kWh/month = ₹49.50
- **Total: 477 kWh/month = ₹2,623.50**

The app shows which appliance uses the most energy and provides tips to save power!

## 🌐 Browser Compatibility

The application works on:
- Chrome/Chromium
- Firefox
- Safari
- Edge
- Any modern browser with JavaScript enabled

## 📱 Responsive Design

The application is fully responsive and works great on:
- Desktop computers (1920px and above)
- Tablets (768px - 1024px)
- Mobile phones (320px - 767px)

## ⚙️ Technical Details

### Libraries Used
- **Chart.js:** For creating interactive charts (loaded from CDN)
- **HTML5:** For semantic structure
- **CSS3:** For styling and responsive design
- **Vanilla JavaScript:** No frameworks, pure JavaScript

### Data Storage
- All data is stored in the browser's memory during the session
- Data is lost if you refresh the page (no database or local storage currently)
- To save data permanently, you would need to add localStorage or a backend

## 🐛 Troubleshooting

### Charts not showing?
- Make sure you have 2+ appliances added
- Check that your internet connection is working (Chart.js is loaded from CDN)

### Calculations seem wrong?
- Double-check your input values
- Verify your tariff rate is entered correctly
- The formula is: (Watts × Quantity × Hours × Days) / 1000

### Page not loading?
- Make sure all three files (index.html, styles.css, script.js) are in the same folder
- Try opening index.html directly in a browser
- Check the browser console for errors (F12)

## 📚 Learning Resources

To deepen your understanding:
- Learn JavaScript: https://www.w3schools.com/js/
- Learn HTML: https://www.w3schools.com/html/
- Learn CSS: https://www.w3schools.com/css/
- Chart.js Docs: https://www.chartjs.org/docs/latest/

## 🎓 Extension Ideas

Once you're comfortable with the basic project, you could add:
1. **localStorage:** Save appliances so data persists after refresh
2. **Export to CSV:** Download the data as a spreadsheet
3. **Comparison:** Compare consumption between months
4. **Alerts:** Warning when consumption exceeds a threshold
5. **Dark Mode:** Toggle between light and dark themes
6. **Multiple Users:** Track different household members

## 📄 License

This project is provided for educational purposes.

## 👨‍💼 Author's Notes

This project is designed for:
- Beginners learning web development
- EEE (Electrical and Electronics Engineering) students
- Anyone interested in home energy consumption analysis

The code is intentionally simple and well-commented so you can understand how everything works. Feel free to modify and experiment!

---

**Happy Tracking! 🔌⚡**
