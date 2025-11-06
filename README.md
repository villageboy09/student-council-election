# 🗳️ VGU Student Council Election App

A modern, secure voting application for VGU Student Council Elections 2025. Built with React, Supabase, and TailwindCSS.

## ✨ Features

- **Multi-step voting process** for 5 positions (President, Vice President, Secretary, Treasurer, Management Head)
- **ERP Number validation** with format checking (VGU + 5-6 digits)
- **Duplicate vote prevention** using Supabase Row Level Security
- **Responsive design** with VGU branding (blue and gold theme)
- **Smooth animations** using Framer Motion
- **Success confirmation** with animated checkmark
- **Mobile-friendly** interface

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Styling:** TailwindCSS with Poppins font
- **Backend/Database:** Supabase (PostgreSQL)
- **Animation:** Framer Motion + Lottie
- **Routing:** React Router DOM
- **State Management:** React Context API

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor in your Supabase dashboard
3. Run the SQL script from `database.sql` to create the votes table and set up RLS policies

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   You can find these values in your Supabase project settings under API.

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## 📱 Application Flow

1. **Voter Entry** - Enter name and ERP number
2. **President Selection** - Choose your preferred president candidate
3. **Vice President Selection** - Choose your preferred VP candidate
4. **Secretary Selection** - Choose your preferred secretary candidate
5. **Treasurer Selection** - Choose your preferred treasurer candidate
6. **Management Head Selection** - Choose your preferred management head
7. **Confirmation** - Review all selections before submitting
8. **Thank You** - Success confirmation with animated checkmark

## 🔒 Security Features

- **ERP format validation** (client-side)
- **Duplicate submission prevention** (database constraint + RLS)
- **Row Level Security policies** in Supabase
- **One vote per ERP number** enforcement
- **Back button disabled** after submission

## 🎨 Customization

### Update Candidates

Edit `src/data/candidates.js` to modify candidate information:

```javascript
export const candidates = {
  president: [
    {
      id: 'p1',
      name: 'Candidate Name',
      description: 'Description text',
      photo: 'image_url',
    },
    // Add more candidates
  ],
  // Other positions...
};
```

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'vgu-blue': '#004AAD',  // Primary blue
  'vgu-gold': '#FFD700',  // Gold accent
}
```

## 📂 Project Structure

```
student-council-election/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Header.jsx
│   │   └── CandidateCard.jsx
│   ├── context/          # React Context
│   │   └── VoteContext.jsx
│   ├── data/             # Candidate data
│   │   └── candidates.js
│   ├── lib/              # Supabase client
│   │   └── supabaseClient.js
│   ├── pages/            # Page components
│   │   ├── VoterEntry.jsx
│   │   ├── SelectionPage.jsx
│   │   ├── ConfirmationPage.jsx
│   │   └── ThankYouPage.jsx
│   ├── App.jsx           # Main app with routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── database.sql          # Database schema
└── package.json
```

## 🐛 Troubleshooting

### "Vote already submitted" error
- Each ERP number can only vote once
- Check if the ERP was already used in the Supabase dashboard

### Supabase connection errors
- Verify your `.env` file has correct credentials
- Check if your Supabase project is active
- Ensure RLS policies are properly set up

### Styling issues
- Clear browser cache
- Run `npm install` again
- Check if TailwindCSS config is properly set up

## 📝 License

This project is created for VGU Student Council Elections.

## 🤝 Contributing

For issues or improvements, please contact the development team.

---

Made with ❤️ for VGU Student Council Elections 2025
