![frameDiary](https://github.com/user-attachments/assets/a81c0f71-f29c-49c6-a655-5d87d61a3780)
# 🎬 FrameDiary — Your Personal Movie Diary  
FrameDiary is a modern, dynamic movie-logging platform inspired by Letterboxd. It allows users to discover trending films, explore in-depth details, and create personalized watchlists, favorites, and watched collections.  

Built with a strong focus on clean UI, smooth navigation, and efficient API interaction, FrameDiary delivers a polished and responsive movie-discovering experience.

---

## ✨ Features

### 🔍 **Homepage Sections**
The homepage highlights multiple curated categories:  
- **Trending Now**  
- **Recently Released**  
- **Classics**  
- **Top Rated Films**  
- **Award Winners**  
- **Old Films**  
Each section fetches live data for dynamic updates.

### 🎥 **Powerful Movie Search**
Instantly search any movie by title using real-time API results, with accurate posters, release dates, and ratings.

### 📄 **Detailed Movie Pages**
Each movie card opens a fully structured details page featuring:
- Movie poster and backdrop  
- **Runtime, release year, genres**  
- Tagline & full description  
- **Cast and crew list**  
- **Official trailer (embedded video)**  
- **Where to Watch** (platform availability)  
- **Similar Movies** carousel  

### ⭐ **User Library**
Users can organize movies into three lists:
- **Favorites**  
- **Watched**  
- **Watchlist**  

Each category supports:
- Add movie  
- Remove movie  
- Persistent storage through local state

### ⚡ **Smooth Navigation**
Fast page-to-page transitions handled through React Router.

---

## 🧰 Tech Stack

### **Frontend**
- React  
- React Router
- Custom reusable components  
- Tailwind CSS 

### **APIs**
- TMDB API  

### **Other**
- Fetch
- Local storage logic  
- Responsive design techniques  

---

## 📦 Installation & Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
