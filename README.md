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
2 Collections:
### 1. topics
Goal (unique)			text
Publish date			date
OS_Windows			bool
OS_Mac				bool
OS_Linux				bool
OS_iOS				bool
OS_Android			bool
OS_Other				bool
free					bool
paid					bool
answers				number
expirydate			date

### 2. answers
Topic
Answer text
Name
Rating positive
Rating negative

Cookie: To save filters, and to check if people rated a comment (prevent repeated waiting for the same comment)

## Skeleton
- wireframe

## Surface
⦁	Minimalistic design


# Features

### Current Features
⦁	Adding a topic
⦁	Adding comments to a topic
⦁	rating comments
⦁	deadline of topics (delete topics after a certain time)

### Planned Features


# Technologies used
⦁	HTML
⦁	CSS
⦁	JavaScript
⦁	Python
⦁	Materialize
⦁	(jQuery 3.4.1 (jQuery.com) to access DOM elements quicker, and react to user input)
⦁	Google Fonts (fonts.google.com) for 2 fonts
⦁	GitPod (gitpod.io) IDE
⦁	GitHub (github.com) for sharing
⦁	Git (for version control)
⦁	MongoDB
⦁	Heroku


# Testing

# Deployment

## Create a local repository

## Deployment of project


## Credits

### Media
The photos used are from pixabay.com.

### Code
Besides the Code Institute Walkthrough projects, I often consulted stackoverflow.com and w3schools.com for tips.
