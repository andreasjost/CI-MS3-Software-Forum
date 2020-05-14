# Testing

## Automated testing

I ran the code through the W3 validators for HTML and CSS.

## Manual testing of functionality

### Opening page:
- Topics are fetched from monbodb and displayed in the 'topics-section'

### Pagination
- Only a limited number of topics are displayed
- On the first and last page, the arrow left and right ( < > ) respectively is not active
- Arrows left and right ( < > ) work and render 1 page forward or backward
- Choosing an inactive page number jumps to the corresponding page
- Pagination-links are hidden if the page number <= limit (checked by applying a search)

### Navigation
- The three navigation links 'Search', 'Topics', and 'Add topic' work, page jumps to the right section
- Click on the logo jumps home ('Search'-section)

### Search
- Searching the database when entering one or more search keyword(s)
- Search ignores lowercase/uppercase entry
- Selection 'Search scope': selecting/deselecting the different items
- Link 'Reset search options" clears the previous input
- Clicking on "More search and sort options" shows more options
- Check out all the extra options one by one
- Check extra option in combination with a search keyword
- Every individual option/entry stays selected and works in combination
- Pagination works correctly after every change in the search
- If no items were found, an error appears
- Materialize Preloader is displayed when the user has to wait for database feedback

Found issue: Changed search command from $regex to $text, because with regex, the words had to be in the right order and next to each other.

### Topics-list

- Materialize collapsible opens and closes topics correctly when clicking on it, the blue arrow changes (up/down)
- The details and comments are shown in an open (active) topic
- Button 'Delete topic' deletes the topic from the database
- Button 'Edit topic' opens a new page with the edit-from
    - the 'Back'-button brings me back to the homepage
    - the 'Update'-button saves the changes I made to the topic
    - Error handling when an input is invalid (see chapter 'Defensive Programming' for details)
- Rating (Thumbs up and down) works
    - The user an rate up or down only once per comment, to avoid boosting that comment. A 2nd click/tap on the thumbs icon removes
    the rating, in case the rating was done accidentally
    - after re-loading the topics (eg. through pagination), the comments appear sorted according to their popularity
- Button 'New comments' opens a form to enter a new comment
    - 'Cancel'-button closes the comment-form again
    - 'Save'-button saves the comment top the corresponding topic
    - Error handling when an input is invalid (see chapter 'Defensive Programming' for details)

Found issue: Topic is deleted without warning. Added a delete-warning

>Issue for a future release: After the error handling in case of invalid input
(comments and topics), the form disappears and the content is cleared. The error page should be a pop-up
rather than a separate html page

### Add topic

- The 'Save'-button adds the topic to the database
    - Error handling when an input is invalid (see chapter 'Defensive Programming' for details)
    - When returning from the error, the fields are still filled

## Testing browsers and screen sizes


| Browser       | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

