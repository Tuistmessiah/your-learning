# MySQL Database Exercises

These exercises assume you have the `pub.sql` database schema and data in your local MySQL database.

### Exercise 1: Easy

**Objective**: Create an endpoint to filter authors by city and state.  
**Example**: `GET /authors?city=Oakland&state=CA`

---

### Exercise 2: Medium

**Objective**: Create an endpoint to update a specific title's price but only for a specific minimum price of 20.  
**Example**: `PUT /titles/title_id?price=19`

---

### Exercise 3: Easy

**Objective**: Create an Endpoint to List Employees and Their Job Descriptions  
Create an Express endpoint that retrieves a list of all employees along with their job descriptions using a `JOIN` between the employee and jobs tables.

---

### Exercise 4: Hard (Complex Query)

**Query**: Find Authors with Published Books and Their Total Sales  
**Task**: Create a query that returns a list of authors who have published books, along with the following information:

-   Full name of the author (concatenated `au_fname` and `au_lname`).
-   Phone number formatted as `(XXX) XXX-XXXX`.
-   Total number of books they've authored.
-   Total sales for all their books combined.
-   A list of titles they've authored, separated by commas.

This query should also be implemented in a Node.js endpoint that should be called like: `GET /authors/published`

---

### Exercise 5: Very Hard (Authentication)

**Task**: Lookup how to create a Login and Signup endpoint in a Node.js server using JWT tokens.  
**Suggestions**:

-   Use the libraries `jsonwebtoken` (to get the token from cookies and verify authentication) and/or `bcryptjs` (to encrypt your password before storing) and/or `cookie-parser` (to parse cookies).
-   You can also check tutorials online to make something simple:
    -   [Medium](https://medium.com/@gb.usmanumar/how-to-create-and-implement-json-web-token-jwt-in-node-js-with-express-js-28b45848ee73)
    -   [GeeksForGeeks](https://www.geeksforgeeks.org/how-to-implement-jwt-authentication-in-express-js-app/)
    -   Or use Google
    -   Or ChatGPT :)

---

### Exercise 6: Mini JS Challenge - Managing a Library of Books

---

Exercise6: Mini JS challenge - Managing a Library of Books

Step 1: Create and Manipulate Basic Variables (Easy)
Create Variables: Start by creating three variables: bookTitle, author, and publicationYear.
Example: let bookTitle = "To Kill a Mockingbird";
Example: let author = "Harper Lee";
Example: let publicationYear = 1960;

Print Variables: Write a function printBookDetails that takes these variables and prints them in a formatted string.
Example: console.log("The book 'To Kill a Mockingbird' was written by Harper Lee in 1960.");

Step 2: Use Arrays and Loops (Moderate)
Create an Array of Books: Create an array library that holds multiple book objects. Each book object should have the properties title, author, and year.
Example:
let library = [
{ title: "1984", author: "George Orwell", year: 1949 },
{ title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 }
];

Loop Through the Array: Write a function listBooks that loops through the library array and prints each book’s details using the printBookDetails function created earlier.
Example Output:
The book '1984' was written by George Orwell in 1949.
The book 'The Great Gatsby' was written by F. Scott Fitzgerald in 1925.

Step 3: Add Books Dynamically (Challenging)
Add a Book: Create a function addBook that accepts a title, author, and year as parameters and adds a new book object to the library array.
Example: addBook("The Catcher in the Rye", "J.D. Salinger", 1951);

Update the Loop: Update the listBooks function to include the newly added books when listing all books.

Step 4: Filter and Search (Advanced)
Filter by Year: Create a function filterBooksByYear that takes a year as a parameter and returns an array of books published on or after that year.
Example: filterBooksByYear(1950); should return books published in or after 1950.

Search by Title: Create a function searchBookByTitle that takes a searchTerm and returns the first book that matches the title (case-insensitive).
Example: searchBookByTitle("1984"); should return the object for the book "1984".

Step 5: Higher-Order Functions (Very Challenging)
Sort Books: Write a function sortBooksByYear that sorts the books in the library array by their publication year in ascending order using a higher-order function.
Example: sortBooksByYear(); should modify the library array so that the books are in the correct order.

Custom Filter Function: Create a higher-order function filterBooks that takes a callback function as an argument.
This callback function should define the condition for filtering. Use this higher-order function to create a new list of books by a specific author.
Example:
const booksByOrwell = filterBooks(book => book.author === "George Orwell");

Bonus Step: Object-Oriented Approach (Expert)
Create a Book Class: Refactor the code to use a Book class that includes methods like printDetails, matchesTitle, and isPublishedAfter.
Example:
class Book {
constructor(title, author, year) {
this.title = title;
this.author = author;
this.year = year;
}

    printDetails() {
        console.log(`The book '${this.title}' was written by ${this.author} in ${this.year}.`);
    }

    matchesTitle(searchTerm) {
        return this.title.toLowerCase().includes(searchTerm.toLowerCase());
    }

    isPublishedAfter(year) {
        return this.year >= year;
    }

}

Library Class: Create a Library class that manages an array of Book objects. Implement methods like addBook, listBooks, filterBooksByYear, searchBookByTitle, and sortBooksByYear.
Example:
class Library {
constructor() {
this.books = [];
}

    addBook(book) {
        this.books.push(book);
    }

    listBooks() {
        this.books.forEach(book => book.printDetails());
    }

    // Implement other methods...

}

---

```

```
