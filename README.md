# UX
## User stories:
- I would like tips when choosing a new software
- I want to know what kind of software other people are using for a specific use case
- I have tried different software and would like to share my experiences

## Strategy
A formum-type web page where users can post a goal/use case what they want to achieve with software. Other users can write answers and rate the given answer.
Scope
Besides posting a goal, users can select the preferred platform/OS, and state if they are willing to pay for software. The users have to enter a date as a deadline, in order to keep the forum up to date and relevant to current needs.
Other users can add an answer, and/or rate other answers with a thumbs up/down system. The answers are sorted by popularity (according to the thumbs).
The users can search for a topic, and sort the list according to creation date ascending or descending. In addition, there are filter options:
- Platform
- pay/free
- Answers (yes/no)
The page is fully responsive to work on a desktop or mobile

## Structure
One central page (home page) with a list of the topics. The page displays max 30 topics at a time (pagination). The list is displayed as Accordion or Collapsible (Materialize)
Database-structure:

### MongoDB collection
- Title (unique): string
- details: string
- author: string
- Publish date: date (timestamp when creating)
- OS: array (min. 1, max all, from this items: Windows, MacOS, Linux, iOS, Android, Other)
- cost: string (Any, Free, Paid)
- comments: array, adding a new object when creating a new comment containing the following keys:
    - comment_text: string
    - comment_author: string
    - comment_pos: int (number of thumbs-up)
    - comment_neg: int (number of thumbs-down)
    - popularity: int (thumbs-up minus thumbs-down: Used to sort comments according to popularity)

Cookie: To save filters, and to check if people rated a comment (prevent repeated waiting for the same comment)

## Skeleton
(wireframe)

## Surface
(Minimalistic design)


# Features

### Current Features
- Show topics from a database, display them with pagination
- Adding, edditing and deleting a topic
- sorting/filtering topics accoring to:
    - date (ascending and descending)
    - Platform
    - cost
    - Answered / unanswered (Did anyone comment the topic)
- Searching for a topic with keyword(s) in title, details and comments
- Adding comments to a topic
- rating comments, and sort comments according to their popularity (most popular first)


### Planned Features
- Important: User authentication, so that users can edit and delete only their own topics
- Search for author names (in comments and topics)
- Fixing the issues addressed in the 'Testing'-chapter

# Technologies used
- HTML
- CSS
- JavaScript
- Python
- Pymongo
- Flask
- Materialize
- (jQuery 3.4.1 (jQuery.com) to access DOM elements quicker, and react to user input)
- Google Fonts (fonts.google.com) for 2 fonts
- fontawesome for icons
- GitPod (gitpod.io) IDE
- GitHub (github.com) for sharing
- Git (for version control)
- MongoDB
- Heroku

# Testing

I ran the code through validation services
(https://validator.w3.org/, http://jigsaw.w3.org/css-validator/ and https://jshint.com/).
Please refer to the separate document testing.md for all the details

# Challenges

### Jinja/Flask/Javascript

Sometimes the behavior of the different languages was unexpected. For example:
- I had to quit the habit of putting code containing Jinja in comments in the html file, because a comment containing
{{ or }} is being read as code, and not as a comment
- Not all JavaScript is being read when it's in a separate file. Therefore, I had to add JavaScript to the html files
directly in some cases, otherwise it would never get called. Overall, that makes the code less readable 


### Structure

The project was a challenging learning experience to show the importance of careful planning at the beginning.
For every functionality, it's important to know which approach would work better after access to the database
in Python:

1. Refreshing the page (with html form action and arguments)
2. Update the page without refreshing (with the help of JavaScript)

The project is now a mix of both, which serves me as a reference for future projects. But, it makes the code more
difficult to read and it was extremely time consuming to change functions from one approach to the other. The UX
could be more consistent with careful planning, but it would have consumed too much time to change the code (which
in many cases would mean to change a lot of the basic structure)

### Materialize

I've used Materialize to get familiar with it. But I realized that Materialize is not as mature yet as Bootstrap,
which probably would have been a better choice. There was a lot of unexpected behavior (certain
margins and padding, the icons, 'hidden' color in forms, etc). In addition, it's much more difficult to find
specific solutions when searching on the internet, Bootstrap seems to have a bigger user base.

# Deployment

## Create a local repository

## Deployment of project


## Credits

### Media
The photos used are from pixabay.com.

### Code
Besides the Code Institute Walkthrough projects, I often consulted the following sites:
- stackoverflow.com (for many general issues)
- w3schools.com (mainly to refresh python syntax)
- mongodb documentation, mainly: https://docs.mongodb.com/manual/tutorial/query-array-of-documents/ in order to work with arrays
- Youtube tutorial https://www.youtube.com/watch?v=Kcka5WBMktw (part 1) and https://www.youtube.com/watch?v=A291yJ92154 (part 2)
by "Pretty Printed": learning how to update the page without refreshing
