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

### Architectural Decisions

- The project uses Vite as it allows for a simple starting base to work from and supports scalability and future proffing. It also has built in HMR that's extremely fast due to the native ES modules.
- I have worked mainly within the App.jsx file due to the simplicity of the app at this stage. Important and reusable components have been extracted and stored in their own folders for future maintainability. In the future the whole filter and suggestion display area could be extracted into its own component, to simplify the main file and allow it to be reused elsewhere.
- States are managed locally within the main App component using React’s built-in useState hook. This keeps the architecture lightweight and simple, without introducing additional complexity from external state libraries. Filtering is done through helper functions (e.g. HandleSortAndFilterAndSlice), which centralise sorting and filtering logic to maintain predictable, testable behavior.
- I have created SmallPopup  using dyanamic compostion to act as a modal. This is a flexible container for displaying the suggestionForm, Employee data and the notes for specific suggestions.
- Due to the size of the app it was not worthwhile creating seperate css or interfaces for mobile or desktop views and as such I have tried to follow a structure that gets the best of both worlds. Further changes could be made to emphasise or enhance one version over the other, i.e. the smallPopup works well on mobile but can seem too obtusive on a desktop format.
