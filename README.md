# learning-log
The [Learning Log](https://github.com/LearnTeachCode/learning-log) web app helps students document their learning process on GitHub without requiring any prior experience with Git or GitHub! Using simple web interface, students can post learning log entries right away and then gradually move to using Git and GitHub as they learn more.

**This file is currently a record of the project planning process, for demonstration purposes.** Later I'll move this to another file (or blog post?) and use this README for the usual setup instructions, etc.


## Flowcharts for first prototype

### User's experience

![Flowchart of user's experience 2017-12-29](https://raw.githubusercontent.com/LearnTeachCode/learning-log/master/learning-log-user-flow-2017-12-29.png)


### Implementation details

![Flowchart with implementation details 2017-12-29](https://raw.githubusercontent.com/LearnTeachCode/learning-log/master/learning-log-dev-flow-2017-12-29.png)


## Version 0.1.0 features (first prototype)

(Using sementic versioning" https://semver.org/)

**Summary:** Users can create and edit Markdown-formatted learning log entries for the current day based on a suggested template, which are saved as files inside a GitHub repo that's created for the user (forked from a template repo). In this first version, users can only create or edit the current day's entry, and the form only includes a simple text box for now.

  - Log in with GitHub
  - Display loading message while logging in and initializing
  - Upon login, fork a GitHub repo on behalf of the user (Current template repo: https://github.com/LearningNerd/learning-log-template)
  - Display instructions with a link to [GitHub Markdown cheat sheet](https://guides.github.com/features/mastering-markdown/) for reference
  - Display user's GitHub username and profile photo
  - Display link to user's fork of the template repo
  - Fill out a simple form containing a learning log template (for consistent structure and to help spark ideas)
  - If an entry exists for the current day, display contents in the text box; otherwise, display the template
  - Upon publishing or editing an entry, display links to view or edit the file on GitHub
  - Display loading message while publishing an entry
  - When entry has successfully been created or updated, display date and time of the latest update


## Next: Version 0.2.0 feature list

Some initial ideas for next features and fixes:

  - Display list of past entries (date/title, option to edit, link to view on GitHub)
  - Upon clicking edit link next to a past entry, display its contents in text box and allow user to save changes to that file
  - Display live Markdown preview within or alongside text box
  - Display any errors to the user in a notification area on the page
  - Save user sessions, so users won't have to log in again after every page refresh (maybe take a look at https://makerlog.org/posts/using-cookies-with-browser-side-github-auth)
  - ... collect other ideas based on initial feedback!


## All feature ideas

Initial feature brainstorming session:

- Log in with GitHub
- Initialize a new GitHub repo on each student's user account upon initial login
- Fill out a template of prompts for consistent structure and to help spark ideas
- Simple front-end form to hide GitHub process in the background
- Edit past learning logs
- Provide Markdown cheat sheet on the form subission page (or at least links to Markdown resources)
- See Markdown and formatted version side-by-side while writing (to help with learning Markdown)
- Create learning log as a Jekyll blog, automatically publishing each post
  - Or: Make publishing optional, so that students who are more shy can feel more comfortable while writing their notes?
- Post comments directly on published blog posts (probably using Disqus)
- Notify instructor when students publish a post
- Notify our private Slack channel for the class when students publish a post (using a simple Slack bot)
- Dashboard showing list of learning logs
- "Don't break the chain" style list of days a learning log was published
  - Bonus ideas: make these public so students can see each other's progress at a glance? Customize the list/calendar based on each students' target study schedule?
- Image uploads via form
- Cross-post to shared class blog using a GitHub app
- Support multiple templates, listing them on the dashboard. Template ideas:
  - Standard learning log, inspired by #100DaysOfCode template with additional prompts
  - Code experiments: hypothesis, code snippet, report results, discussion/conclusion
  - Bug report: code snippet or link to code shared online, intended behavior, description of bug, troubleshooting steps so far, hypothesis for cause of bug
  - Personal documentation: coding snippets, description, resource links
  - Question brainstorming


## All user stories

Initial feature list above structured as user stories to dig into *who* the users are and *why* the features are useful (in addition to what the features are, as listed above):

- As the instructor of a programming class (who also loves building custom tools):

  - I want students to *be able to log in with GitHub* as an initial preview of GitHub, so that they'll be enticed to use it more and learn more about it.
  
  - I want the app to *initialize a new GitHub repo on each student's user account upon initial login*, so that each student has their own personal blog, both to keep everything in one place, have complete ownership of their content, and be encouraged to look under the hood and gradually learn more about GitHub (and Git!).
  
  - I want students to *fill out a template of prompts* to help students come up with more ideas and document their process in more detail, and to have a consistent structure across all students' blogs (which will both help me provide feedback more quickly and easily, and make it easier for students to provide feedback to each other).
  
  - I want the app to *have a simple front-end form* so that students don't need to know how to use GitHub, which will enable them to start documenting their learning process right away.
  
  - I want students to be able to *edit their past learning logs via the same simple form* so they can add things they may have forgotten, without needing to know how to use GitHub to edit their posts.
  
  - I want to *provide a Markdown cheat sheet on the form subission page*, so that students can more easily practice and review using Markdown, which is useful to know since it's such a popular markup language.
  
  - I want students to be able to *see the Markdown and formatted version side-by-side while writing,* both to help them learn Markdown and to make it easier for them to format their posts the way they want to.
  
  - I want to *create the learning log as a Jekyll blog, with each post formatted accordingly,* so that students' work can automatically be published online, both to serve as a portfolio asset if they look for a junior dev job later, and to make it easier for students to read and share feedback on each others' work.
  
  - I want students to be able to *post comments directly on each others' published blog posts*, to make it easier for them to share feedback (encouraging more students to do so), and to have a more permanent record of that feedback for later reflection (which always encourages more learning).
  
  - I want the app to *automatically notify me when students publish a post*, so I won't forget to read them and give feedback!
  
  - I want the app to *automatically notify our private Slack channel for the class when students publish a post,* to encourage everyone in our class to read each others' updates and share feedback.
  
  - I want to *include a dashboard showing a list of posts*, so students can more easily review their progress and choose which post to edit if they have changes to make.
  
  - I want to *include a "don't break the chain" style list of days that a learning log was published,* so that students will feel a bit more accountable and hopefully feel encouraged to publish notes regularly. (Bonus ideas: make these public so students can see each other's progress at a glance? Customize the list/calendar based on each students' target study schedule?)

  - I want the form to *allow for image uplods* so that students can upload sketches and flowcharts along with their text and keep it all in one place, making it easier for them to review and easier for me and other students to provide feedback.

  - I want the app to *automatically cross-post updates to a shared class blog using a GitHub app* so that both I and our students can more easily find everyone's updates by keeping them all in once place, which also helps create a more collaborative atmosphere.

  - I want to *support multiple templates, listing them on the dashboard* so students can easily submit different kinds of homework assignments, encouraging them to take more detailed notes and explore concepts from multiple angles. (Note: might write down goals for each template idea later.)

- As a student in a beginner's programming class:

  - I want to have *have a simple form* to fill out for my assignment to document my learning process, so that I can get my thoughts on paper (so to speak) more quickly and easily, without needing to worry about how to use GitHub until I'm more comfortable with it later.

  - I want to *have a template of prompts* so that the assignment instructions are handy, so I won't have to find them separately each time I start a new document to write my learning logs and notes.

  - I want to be able to *edit my past learning logs via the same simple form* so I can easily things that I may have forgotten.
  
  - I want to *have a handy Markdown cheat sheet on the form subission page* so I don't have to take time away form my writing to look up Markdown syntax every time I forget something.
  
  - I want to *see the Markdown and formatted version side-by-side while writing,* so I can confirm that I'm using Markdown correctly and more easily format my notes the way I want to.
  
  - I want the app to *automatically publish my learning logs,* so I can more easily share it with others in the class to get more feedback, and more easily see what everyone else has shared.
  
  - Or: I want the option to *choose not to publish my learning logs,* so that if I don't feel comfortable sharing them with anyone other than our instructor, I can write my notes more freely without worrying about judgement.
  
  - I want to *have a dashboard showing a list of my posts*, so I can easily review them and choose which ones to edit.
  
  - I want to *have a "don't break the chain" style list of days that I published my learning logs,* to help keep myself accountable to my goals and stay motivated to keep going.
  
  - I want to *upload images directly from the easy-to-use interface*, so that I don't need to spend extra time to separately email my images to our instructor, and so that I can keep everything in one place for easier reviewing.
  
  - I want to *automatically cross-post my updates to a shared class blog*, so that I'll get more feedback from my classmates and so I can more easily see what everyone else has shared.
  
  - I want to be able to *post comments directly on our published blog posts*, so that I'll get more feedback and can more easily provide feedback to my classmates.
  

## Questions about implementation details

- Decide: which questions or prompts to include in the template? (Review my notes from past classes and https://github.com/Kallaway/100-days-of-code/blob/master/log.md)

- Decide: use Firebase for GitHub login, or use a tiny server to handle authentication myself? (For now, decided to use https://github.com/prose/gatekeeper)

  - Pros for Firebase: easier to later add private notes functionality and more custom features that GitHub alone may not support.
  
  - Pros for GitHub auth on its own: less dependencies, less likely to eventually cost money if we have more users, and this project would be easier for others to use (no Firebase setup)
