# 💰 Finance Dashboard - Frontend Assignment

A modern, interactive finance dashboard built with React, Tailwind CSS, and Recharts. Designed to help users track financial activity, visualize spending patterns, and manage transactions with role-based access control.

**Live at:** http://localhost:5173 (after npm run dev)

---

## ✨ Features Overview

### 1. 📊 Dashboard Overview

- **Summary Cards** displaying:
  - 💼 Total Balance with status indicator
  - 📈 Total Income this month
  - 📉 Total Expenses this month
- **Time-Based Visualization**: Interactive line chart showing balance trends over time with gradient fills
- **Categorical Visualization**: Donut chart displaying expense breakdown by category

### 2. 📋 Transactions Section

- **Complete Transaction List** with:
  - Date, Amount, Category, Type (Income/Expense)
  - Color-coded transaction types
  - Transaction counter badge
- **Advanced Filtering**:
  - 🔍 Search by category name
  - 📊 Filter by type (All/Income/Expense)
  - 📅 Sort by Date, Amount, or Category
  - Dynamic sorting indicators
- **Admin Features** (when in Admin role):
  - 🗑️ Delete transactions from table rows

### 3. 🔐 Role-Based UI

- **Two Distinct Roles**:
  - **Viewer**: Read-only access, no add/delete buttons
  - **Admin**: Full access to add and delete transactions
- **Visual Role Indicator**: Professional role switcher with status badge
- **Dynamic UI**: Components show/hide based on current role
- **LocalStorage Integration**: Role persists across sessions

### 4. 💡 Financial Insights

- **Highest Spending Category**: Shows top expense category with amount
- **Month-over-Month Comparison**: Current month vs last month expense change percentage
- **Average Transaction**: Calculated across all transactions
- **Trend Analysis**: Identifies spending patterns and provides insights
- **Interactive Cards**: Hover effects and detailed breakdowns

### 5. 🌙 Dark Mode

- **System-wide Toggle**: Sun/Moon button in header
- **Persistent Storage**: Dark mode preference saved to localStorage
- **Professional Theme**:
  - Light Mode: Clean grays and blues
  - Dark Mode: Deep navy (#0B1120) with slate accents
- **Smooth Transitions**: All colors animate smoothly

### 6. 💾 Data Persistence

- **Automatic LocalStorage Saving**:
  - All transactions synced to browser storage
  - User role preference saved
  - Dark mode setting preserved
- **Data Recovery**: User data persists across browser sessions

---

## 🛠️ Tech Stack

| Technology       | Purpose                      |
| ---------------- | ---------------------------- |
| **React 19**     | UI Framework                 |
| **Vite**         | Build tool & dev server      |
| **Tailwind CSS** | Styling & responsive design  |
| **Recharts**     | Data visualizations (charts) |
| **Lucide React** | Icons throughout app         |
| **Context API**  | State management             |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── DashboardCards.jsx          # Summary cards with metrics
│   ├── BalanceChart.jsx            # Time-based line chart
│   ├── CategoryChart.jsx           # Category breakdown pie/donut
│   ├── TransactionsTable.jsx       # Filterable transactions list
│   ├── RoleSwitcher.jsx            # Role toggle component
│   ├── Insights.jsx                # Financial insights panel
│   └── AddTransactionModal.jsx     # Modal for adding transactions
│
├── context/
│   └── FinanceContext.jsx          # Context API state management
│
├── pages/
│   └── Dashboard.jsx               # Main dashboard layout
│
├── data/
│   └── mockData.js                 # Mock transactions & categories
│
├── App.jsx                         # Root component
├── index.css                       # Tailwind & custom styles
└── main.jsx                        # React entry point

tailwind.config.js                  # Tailwind configuration
postcss.config.js                   # PostCSS configuration
vite.config.js                      # Vite configuration
package.json                        # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to project directory:**

   ```bash
   cd "Banking system/Assessment/vite-project"
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # If issues occur, use:
   npm install --legacy-peer-deps
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📖 How to Use the Dashboard

### 1️⃣ View Financial Summary

- See **Total Balance**, **Income**, and **Expenses** in summary cards
- Cards update automatically as you add/remove transactions
- Color indicators show financial health status

### 2️⃣ Analyze Trends

- **Balance Chart**: Shows how your balance changes over time
- Hover over data points for exact values
- Visual gradient indicates balance trajectory

### 3️⃣ Understand Spending

- **Category Chart**: Donut chart showing expense distribution
- Click legend items to highlight categories
- Percentages shown for quick analysis

### 4️⃣ Manage Role Access

**As Viewer:**

- Click "Viewer" button in Role Access Control
- You can view all data but cannot modify
- No "Add Transaction" button visible
- Delete buttons hidden in transactions table

**As Admin:**

- Click "Admin" button in Role Access Control
- Green "➕ Add Transaction" button appears
- Can add new transactions via modal
- Can delete transactions from table
- Full control over financial data

### 5️⃣ Add Transactions (Admin Only)

1. Click the **➕ Add Transaction** button (appears only when Admin)
2. Fill in the modal form:
   - Select **Date** from calendar picker
   - Enter **Amount** (validates positive numbers)
   - Choose **Type** (Income or Expense)
   - Select **Category** from dropdown
3. Click **✅ Add Transaction** to save
4. Transaction appears immediately in table and updates all cards
5. Data automatically saved to browser storage

### 6️⃣ Filter & Search Transactions

- **Search**: Type category name in search box (e.g., "Food", "Rent")
- **Filter**: Select from dropdown (All Types, Income, Expense)
- **Sort**: Click column headers to sort by Date, Amount, or Category
- Sorting indicators (↑↓) show active sort direction

### 7️⃣ View Insights

- Scroll to the **Financial Insights** section
- See highest spending category
- Compare this month vs last month
- View average transaction amount
- All insights update as you add/remove transactions

### 8️⃣ Toggle Dark Mode

- Click Sun/Moon icon in top-right header
- Dashboard smoothly transitions between light/dark themes
- Your preference is saved automatically

---

## 📋 Requirements Checklist

### Core Requirements ✅

#### 1. Dashboard Overview

- ✅ Summary cards (Total Balance, Income, Expenses)
- ✅ Time-based visualization (Balance over time - Line Chart)
- ✅ Categorical visualization (Expense breakdown - Donut Chart)
- ✅ Real-time updates as transactions change

#### 2. Transactions Section

- ✅ Display with Date, Amount, Category, Type
- ✅ Filtering (by type)
- ✅ Searching (by category)
- ✅ Sorting (by date, amount, category with direction toggle)
- ✅ Color-coded type badges
- ✅ Transaction counter

#### 3. Basic Role-Based UI

- ✅ Viewer role: Read-only access
- ✅ Admin role: Can add/delete transactions
- ✅ Visual role switcher with status indicator
- ✅ Dynamic UI changes based on role
- ✅ Role persisted in localStorage

#### 4. Insights Section

- ✅ Highest spending category analysis
- ✅ Month-over-month expense comparison
- ✅ Average transaction calculation
- ✅ Trend indicators and insights
- ✅ Interactive insight cards with visual feedback

#### 5. State Management

- ✅ Context API implementation
- ✅ Centralized transaction management
- ✅ Filter state handling
- ✅ Role switching logic
- ✅ Dark mode state persistence

#### 6. UI & UX

- ✅ Clean, modern design with gradient colors
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Empty state handling (shows "No transactions" message)
- ✅ Loading states and visual feedback
- ✅ Professional color scheme
- ✅ Proper spacing and typography

### Optional Enhancements ✅

- ✅ **Dark Mode**: Full light/dark theme with localStorage persistence
- ✅ **Data Persistence**: All data saved to browser localStorage
- ✅ **Animations**: Spring pop, slide-up, float, and hover effects
- ✅ **Mock Data**: 15 pre-loaded transactions for testing
- ✅ **Icons**: Lucide React icons throughout UI
- ✅ **Modal Dialog**: Add transaction with validation
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Visual Feedback**: Hover effects, transitions, status indicators

---

## 🎨 Design Highlights

### Color Palette

```
Background: #0B1120 (Dark) / #F3F4F6 (Light)
Primary: #38BDF8 (Cyan)
Success: #4ADE80 (Green)
Danger: #F87171 (Red)
Accent: #A78BFA (Purple)
```

### Animation Effects

- **Spring Pop**: Cards appear with spring animation
- **Slide Up**: Sections animate in on page load
- **Float**: Background elements gently float
- **Scale**: Buttons scale on hover
- **Shimmer**: Subtle shimmer effects

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 🧪 Testing the Dashboard

### Test as Viewer:

1. Load the dashboard
2. Click "Viewer" in Role Access Control
3. Observe: "Add Transaction" button is hidden
4. Try searching, filtering, sorting transactions
5. View all charts and insights (read-only)

### Test as Admin:

1. Click "Admin" in Role Access Control
2. Click "➕ Add Transaction" button
3. Fill form with sample data
4. Click "✅ Add Transaction"
5. See transaction appear in table immediately
6. Try deleting a transaction (🗑️ icon in table)
7. Observe all cards and charts update automatically

### Test Dark Mode:

1. Click Sun/Moon icon in header
2. Entire dashboard switches to dark theme
3. Refresh page - dark mode persists
4. Switch back to light mode

### Test Data Persistence:

1. Add some transactions as Admin
2. Toggle role to Viewer and back
3. Refresh the entire page
4. All transactions and role preference are restored

---

## 📊 Mock Data

The dashboard comes pre-loaded with **15 sample transactions** including:

- Income: Salary, Freelance work
- Expenses: Food, Transport, Rent, Entertainment, Groceries, Bills, Health, Travel
- Date ranges: March 27 - April 10, 2026
- Realistic amounts in Indian Rupees (₹)

To modify mock data, edit `src/data/mockData.js`

---

## 🔍 Key Technical Decisions

### 1. Context API for State Management

- Chosen for simplicity and no extra dependencies
- Centralized transactions, role, and dark mode state
- Easy to extend with additional features

### 2. Tailwind CSS + Custom Animations

- Utility-first approach for rapid development
- Custom keyframes for unique animations
- Dark mode support built-in

### 3. Recharts for Visualizations

- Lightweight and flexible chart library
- Works seamlessly with React
- Responsive and interactive by default

### 4. Component-Based Architecture

- Each component handles single responsibility
- Easy to test and maintain
- Reusable across the application

### 5. LocalStorage for Persistence

- No backend required
- Instant persistence
- Works offline
- Perfect for frontend-only assignment

---

## 🎯 What This Project Demonstrates

✅ **React Knowledge**: Hooks, Context, component composition, side effects
✅ **State Management**: Proper handling of complex application state
✅ **UI/UX Design**: Intuitive interface, accessibility, responsive design
✅ **Data Visualization**: Charts, trends, insights
✅ **CSS/Styling**: Tailwind proficiency, animations, dark mode
✅ **Problem Solving**: Role-based access, data filtering, sorting
✅ **Attention to Detail**: Polish, edge cases, user feedback
✅ **Code Quality**: Clean structure, modularity, best practices

---

## 📝 Notes

- This is a **frontend-only** implementation perfect for learning and assessment
- **No backend** required - all data stored locally
- **Fully responsive** - works on all devices
- **Production-ready code** - clean, documented, and maintainable
- **Extensible** - easy to add new features or integrate with a real API

---

## 📞 Assignment Submission

This Finance Dashboard meets **all core requirements** and includes several **optional enhancements**:

| Requirement          | Status      | Details                                                 |
| -------------------- | ----------- | ------------------------------------------------------- |
| Dashboard Overview   | ✅ Complete | Cards + 2 charts + real-time updates                    |
| Transactions Section | ✅ Complete | Filtering, searching, sorting with 15 mock transactions |
| Role-Based UI        | ✅ Complete | Viewer/Admin roles with dynamic permission-based UI     |
| Insights Section     | ✅ Complete | 4 different insights with visual indicators             |
| State Management     | ✅ Complete | Context API with proper data flow                       |
| UI/UX                | ✅ Complete | Modern design, responsive, animations                   |
| Dark Mode            | ✅ Bonus    | Full light/dark support with persistence                |
| Data Persistence     | ✅ Bonus    | LocalStorage integration                                |
| Responsiveness       | ✅ Complete | Mobile, tablet, desktop all optimized                   |
| Documentation        | ✅ Complete | Comprehensive README with setup & usage                 |

---

## 🚀 Future Enhancements

Potential features for expansion:

- Export to CSV/JSON
- Budget goals and alerts
- Recurring transactions
- Receipt/attachment uploads
- Multi-currency support
- Advanced analytics
- Backend API integration

---

**Built with ❤️ by Rishank**  
_Finance Dashboard - React + Vite + Tailwind + Recharts_
