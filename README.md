# omniDiary
Develop a Web application as the diary allowing the user to share and record the daily life.

## Each diary has:
* Title
* Image
* Diary content

## Web Development:
* Front-end: semantic ui, css, HTML
* Back-end: Node.js, express
* Database: MongoDB
* Development Environment: Cloud9

## RESTful
| Route   |   url             | HTTP verb  |  Description                                |
| :------ |:---------------   | :--------- | :-----------------------------------------  |
| INDEX   |  /diary           | GET        |  Display all diaries                        |
| NEW     |  /diary/new       | GET        |  A form to create a new diary               |
| CREATE  |  /diary           | POST       |  Add new diary to DB; redirect to index     |
| SHOW    |  /diary/:id       | GET        |  Show more info about a specific diary      |
| EDIT    |  /diary/:id/edit  | GET        |  Show a form for editing diary              |
| UPDATE  |  /diary/:id       | PUT        |  Updata a specific diary; redirect to show  |
| DELETE  |  /diary/:id       | DELETE     |  Delete a specific diary; redirect to index |
