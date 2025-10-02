# Demo Mode Checklist ✓

Use this checklist to ensure your demo goes smoothly!

## 📋 Pre-Demo Setup

### Environment Configuration
- [ ] Create `.env` file from `.env.example`
- [ ] Set `USE_HARDCODED_VALUES=true`
- [ ] Add Clerk publishable key
- [ ] Add Clerk secret key
- [ ] Verify all credentials are correct

### Application Setup
- [ ] Run `npm install` (if first time)
- [ ] Start dev server: `npm run dev`
- [ ] Verify app loads at http://localhost:3000
- [ ] Check console for "Using hardcoded..." messages
- [ ] Clear browser cache and cookies

### Mock Data Review
- [ ] Review `mock-data/routes.json` content
- [ ] Verify data is current and realistic
- [ ] Check dates are recent
- [ ] Ensure no placeholder text remains
- [ ] Validate JSON syntax if edited

### Test Run
- [ ] Test login with real credentials
- [ ] Browse home page posts
- [ ] Click on a post to view details
- [ ] Navigate to search page
- [ ] Search for a user
- [ ] Check activity feed
- [ ] Test logout and re-login

## 🎬 During Demo

### Opening (2 minutes)
- [ ] Introduce CareerBoost
- [ ] Explain the purpose
- [ ] Mention demo mode: "Backend in development, using mock data"
- [ ] State that authentication is real

### Authentication (2 minutes)
- [ ] Show login page
- [ ] Enter credentials slowly (so audience can follow)
- [ ] Highlight successful authentication
- [ ] Point out real Clerk authentication

### Content Browsing (3 minutes)
- [ ] Show TNP dashboard
- [ ] Scroll through job posts
- [ ] Read one post title aloud
- [ ] Click to view details
- [ ] Show comment section
- [ ] Highlight UI responsiveness

### Search & Discovery (2 minutes)
- [ ] Navigate to search page
- [ ] Type a search query
- [ ] Show search results
- [ ] Click on user profile
- [ ] Demonstrate navigation

### Wrap-up (1 minute)
- [ ] Summarize features shown
- [ ] Reiterate backend coming soon
- [ ] Show the simple toggle: open `.env` file
- [ ] Answer questions

## 🔍 Post-Demo Tasks

### Immediate
- [ ] Stop the dev server
- [ ] Review any questions that came up
- [ ] Note any suggestions for improvement
- [ ] Document any issues encountered

### Follow-up
- [ ] Send demo recording (if recorded)
- [ ] Share relevant documentation
- [ ] Update mock data based on feedback
- [ ] Schedule next demo if needed

## ⚠️ Troubleshooting During Demo

### If Login Fails
1. Check internet connection
2. Verify Clerk credentials
3. Clear browser cache
4. Reload page
5. Have backup browser ready

### If Data Doesn't Load
1. Check console for errors
2. Verify `USE_HARDCODED_VALUES=true`
3. Restart dev server
4. Reload browser

### If Page Crashes
1. Go back to home page
2. Continue from another section
3. Apologize briefly, move on
4. Don't spend time debugging

## 💡 Pro Tips

### Before Demo
- Practice the flow 3 times minimum
- Time yourself (should be 10 minutes)
- Prepare for common questions
- Have backup plan if tech fails
- Test on same network you'll demo on

### During Demo
- Speak slowly and clearly
- Explain what you're clicking before clicking
- Make eye contact with audience
- Don't rush through slides
- Pause for questions at key points

### Common Questions & Answers
Q: "Is this the real data?"
A: "We're using realistic mock data for this demo. The backend APIs are in development."

Q: "When will it be live?"
A: "We're on track for [date]. The frontend is complete and ready to connect."

Q: "Can users create posts?"
A: "Yes, in production. Demo mode is read-only to keep data consistent."

Q: "How do you switch to real data?"
A: "Just one environment variable: `USE_HARDCODED_VALUES=false`. That's it!"

## 📊 Success Metrics

After demo, evaluate:
- [ ] Audience understood the platform
- [ ] Questions were answered satisfactorily
- [ ] Demo ran without technical issues
- [ ] Time was well-managed (8-12 minutes)
- [ ] Audience seemed engaged

## 🎯 Next Steps

Based on feedback:
- [ ] Update mock data
- [ ] Adjust demo script
- [ ] Improve documentation
- [ ] Schedule follow-up demos
- [ ] Plan backend integration timeline

## 📝 Demo Log

**Date**: ___________
**Audience**: ___________
**Duration**: _____ minutes
**Issues**: ___________
**Feedback**: ___________
**Follow-ups**: ___________

---

## Quick Reference

**Start Demo:**
```bash
# Check env
cat .env | grep USE_HARDCODED_VALUES

# Start app
npm run dev
```

**Stop Demo:**
```bash
# Ctrl+C to stop server
```

**Emergency Reset:**
```bash
# Stop server (Ctrl+C)
# Clear cache
rm -rf .next
# Restart
npm run dev
```

---

✅ **Ready to demo? Run through this checklist and you're good to go!**
