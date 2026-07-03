# 🚀 Quick Start Guide - Interactive Learning Platform

## For Students

### Accessing the Platform
1. Visit: **https://slmrag.vercel.app** (or your deployed URL)
2. No login required - start learning immediately!

### Your Learning Journey

#### 1️⃣ **Start on Home Page**
- View your progress tracker (top of page)
- Browse 6 workshop days
- Click any day to explore topics

#### 2️⃣ **Explore Topics**
Each topic has 8 interactive sections:
- 📖 **Story Time** - Learn through narratives (with audio!)
- 🔢 **Math Modeling** - Interactive visualizations
- 🎯 **Activities** - 4 levels: Teacher → You → Team → Individual
- 🚀 **Projects** - Real-world applications
- ❓ **Questions** - Test your knowledge
- 🧪 **Virtual Lab** - Hands-on coding
- 💡 **Insights** - Key takeaways
- 💬 **Feedback** - Share your thoughts

#### 3️⃣ **Virtual Lab Experience**
1. Read step description
2. Review code example
3. Click **"Run Code"** to execute
4. View output and explanation
5. Try modifying the code
6. Click **"Next Step"** to continue

#### 4️⃣ **Track Your Progress**
- Green checkmarks = Completed
- Progress bar shows overall completion
- Milestones unlock at 25%, 50%, 75%, 100%

---

## For Instructors

### Before Class
1. Review topic content in advance
2. Test virtual labs to ensure familiarity
3. Prepare discussion questions from reflection sections
4. Check student progress dashboard (coming soon)

### During Class
1. **Demo Mode**: Use Auto-Play in virtual labs
2. **Story Narration**: Click speaker icon for text-to-speech
3. **Interactive Math**: Adjust sliders to show concepts
4. **Group Activities**: Use Level 3 activities for teams

### After Class
1. Review student quiz scores
2. Check feedback submissions
3. Identify struggling topics
4. Assign virtual labs as homework

---

## For Developers

### Local Setup
```bash
# Clone repository
git clone https://github.com/muzabasha/slmrag.git
cd slmrag

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
http://localhost:5173
```

### Making Changes
```bash
# Create new branch
git checkout -b feature/your-feature

# Make changes, then:
npm run lint    # Check for errors
npm run build   # Verify build works
git add .
git commit -m "Description"
git push origin feature/your-feature
```

### Adding New Lab Content
1. Edit `src/data/labStepsAdvanced.ts`
2. Add new steps with code, hints, explanations
3. Map to topics in `src/components/TopicLabMapper.tsx`
4. Test thoroughly before committing

---

## Key Features

### 🎵 Text-to-Speech
Click the speaker icon on story cards to hear narration.

### 🎮 Auto-Play Mode
Virtual labs can progress automatically for demonstrations.

### 💾 Progress Saving
Your progress is saved locally - no account needed!

### 📱 Mobile Friendly
Works perfectly on phones and tablets.

### 🌓 Dark Mode
Automatically adapts to your system preferences.

---

## Tips & Tricks

### For Students
- ✏️ Take notes in reflection text boxes
- 🔊 Use text-to-speech while commuting
- 🎯 Complete quizzes multiple times to master concepts
- 💻 Download code examples for practice

### For Instructors
- 📊 Use interactive math sliders for live demonstrations
- 🎭 Read stories aloud in class using narration feature
- 🏆 Celebrate milestones with students (25%, 50%, 75%, 100%)
- 📝 Assign specific lab steps as homework

### For Everyone
- 🔄 Refresh page if components don't load
- 📱 Rotate phone to landscape for better lab experience
- 🌐 Use modern browsers (Chrome, Firefox, Safari)
- 💡 Click hints in code editor if stuck

---

## Troubleshooting

### Code Editor Not Working?
- Make sure JavaScript is enabled
- Try refreshing the page
- Check browser console (F12) for errors

### Text-to-Speech Not Working?
- Browser must support Web Speech API
- Check system volume settings
- Try Chrome/Edge for best compatibility

### Progress Not Saving?
- Check if cookies/localStorage is enabled
- Don't use incognito/private mode
- Clear browser cache if issues persist

### Visual Glitches?
- Update browser to latest version
- Disable browser extensions temporarily
- Try different browser

---

## Support & Resources

### Documentation
- **Full Guide**: `IMPROVEMENTS.md`
- **Deployment Info**: `DEPLOYMENT_SUCCESS.md`
- **README**: `README.md`

### Getting Help
1. Check documentation first
2. Ask in class discussion forum
3. Email workshop coordinators
4. Report bugs on GitHub Issues

### Feedback
We want to hear from you!
- Use feedback boxes at end of topics
- Suggest features on GitHub
- Rate your learning experience

---

## What's Next?

### Coming Soon
- ✨ Real Python execution (no simulation!)
- 👤 User accounts with cloud sync
- 🎓 Completion certificates
- 🤖 AI tutor chatbot
- 📹 Video tutorials
- 🌍 Multilingual support

### Get Involved
- Star the GitHub repo
- Share with classmates
- Contribute improvements
- Spread the word!

---

## Quick Links

- 🌐 **Live Site**: https://slmrag.vercel.app
- 💻 **GitHub**: https://github.com/muzabasha/slmrag
- 📚 **Documentation**: See IMPROVEMENTS.md
- 🐛 **Report Bug**: GitHub Issues
- 💬 **Feedback**: Use in-app feedback forms

---

**Happy Learning! 🎓✨**

*Built with ❤️ for REVA University SLM & RAG Workshop*
