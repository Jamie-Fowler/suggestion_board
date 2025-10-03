# Suggestion Board React App

```bash
# Clone git repo
git clone https://github.com/Jamie-Fowler/suggestion_board.git
# Install dependencies
npm install
```

## Start Dev Environment
```bash
npm run dev
# go to http://localhost:5173/
q + enter # to stop
```

## Build and Start Production Environment (preview)
```bash
npm run build
npm run preview
# go to http://localhost:4173/
q + enter # to stop
```

### Notes and comments

- Working entirly in-memory, in real world would use database and back end, needed for better managment of data, typeing and to save between instances.
- Due to the above created suggestions will disappear after reloading the page.
- With more time, I would add more sorting and filter options, i.e. Status. I would also look to improve the filter area and move away from a drop down, due to it growing too long and unfriendly. Maybe a dedicated pop out for filters?
- I have focused on getting a working app that meets all requirements, this has meant I have not added any testing yet. The main next step would be to add these, most likely using Jest. This would include mocking buttons and the suggestion component to test its interaction. As well as this I would add testing of the SuggestionsForm to ensure correct output.
- I would also spend some more time redesigning the Suggestion cards to better show off important information according to a larger brief.
