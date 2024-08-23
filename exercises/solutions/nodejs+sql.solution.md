# Node Express + MySQL Database Exercises

These exercises assume you have the `pub.sql` database schema and data in your local MySQL database.

### Exercise 1: Easy

**Objective**: Create an endpoint to filter authors by city and state.  
**Example**: `GET /authors?city=Oakland&state=CA`

### Solution:

```javascript
app.get('/authors', (req, res) => {
    const { city, state } = req.query;
    const sql = `SELECT * FROM authors WHERE city = ? AND state = ?`;
    db.query(sql, [city, state], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});
```

---

### Exercise 2: Medium

**Objective**: Create an endpoint to update a specific title's price but only for a specific minimum price of 20.  
**Example**: `PUT /titles/title_id?price=19`

### Solution:

```javascript
app.put('/titles/:title_id', (req, res) => {
    const { title_id } = req.params;
    const { price } = req.query;

    const checkPriceSql = `SELECT price FROM titles WHERE title_id = ?`;
    db.query(checkPriceSql, [title_id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send({ message: 'Title not found' });
        }

        const currentPrice = results[0].price;
        if (currentPrice < 20) {
            return res.status(400).send({ message: 'Price update not allowed. Current price is below 20.' });
        }

        const updatePriceSql = `UPDATE titles SET price = ? WHERE title_id = ?`;
        db.query(updatePriceSql, [price, title_id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send({ message: 'Price updated successfully' });
        });
    });
});
```

---

### Exercise 3: Easy

**Objective**: Create an Endpoint to List Employees and Their Job Descriptions  
Create an Express endpoint that retrieves a list of all employees along with their job descriptions using a `JOIN` between the employee and jobs tables.

### Solution:

```javascript
app.get('/employees', (req, res) => {
    const sql = `
        SELECT e.emp_id, e.fname, e.lname, j.job_desc 
        FROM employee e 
        JOIN jobs j ON e.job_id = j.job_id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});
```

---

### Exercise 4: Hard (Complex Query)

### Solution:

```javascript
import express from 'express';
import { executeQuery } from '../database-setup.js';

const router = express.Router();

/**
 * @swagger
 * /authors/published:
 *   get:
 *     summary: Get authors with published books and their total sales
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of authors with published books and their total sales
 *       400:
 *         descriptions: Error response
 */
router.get('/published', function (req, res) {
    const query = `
    SELECT 
        CONCAT(au_fname, ' ', au_lname) AS full_name,
        CONCAT('(', SUBSTRING(phone, 1, 3), ') ', SUBSTRING(phone, 5, 3), '-', SUBSTRING(phone, 9, 4)) AS formatted_phone,
        COUNT(DISTINCT t.title_id) AS total_books,
        COALESCE(SUM(s.qty), 0) AS total_sales,
        GROUP_CONCAT(DISTINCT t.title ORDER BY t.title SEPARATOR ', ') AS authored_titles
    FROM 
        authors a
    JOIN 
        titleauthor ta ON a.au_id = ta.au_id
    JOIN 
        titles t ON ta.title_id = t.title_id
    LEFT JOIN 
        sales s ON t.title_id = s.title_id
    GROUP BY 
        a.au_id
    HAVING 
        total_sales > 0
    ORDER BY 
        total_sales DESC;
    `;

    executeQuery(query, [], res);
});

export default router;
```

### Exercise 5: Very Hard (Authentication)

**Objective**: Make a Simple Node.js Express App with JWT Authentication

### Solution:

-   Create a new directory and initialize the project with the dependencies:

```bash
npm install express jsonwebtoken bcryptjs body-parser
```

-   Create index.js

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const users = [];
const secretKey = 'your-secret-key';

// Signup Endpoint
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    users.push({ username, password: hashedPassword });
    res.status(201).send({ message: 'User created successfully!' });
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send({ message: 'Invalid credentials!' });
    }
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
    res.status(200).send({ token });
});

// Protected Route
app.get('/protected', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ message: 'No token provided!' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }
        res.status(200).send({ message: `Hello ${decoded.username}!` });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
```

Now you can test:

-   Signup: POST to /signup with {"username": "user1", "password": "password1"}.
-   Login: POST to /login with the same credentials to receive a token.
-   Protected Route: GET to /protected with the token in the Authorization header to access the protected content.

---

### Exercise 6: Mini JS Challenge - Managing a Library of Books

### Step 1: Create and Manipulate Basic Variables

-   Create Variables: Start by creating three variables: bookTitle, author, and publicationYear.

**Example**: let bookTitle = "To Kill a Mockingbird";

**Example**: let author = "Harper Lee";

**Example**: let publicationYear = 1960;

-   Print Variables: Write a function printBookDetails that takes these variables and prints them in a formatted string.
    **Example**: console.log("The book 'To Kill a Mockingbird' was written by Harper Lee in 1960.");

### Step 2: Use Arrays and Loops

-   Create an Array of Books: Create an array library that holds multiple book objects. Each book object should have the properties title, author, and year.
    **Example**:

```javascript
let library = [
    { title: '1984', author: 'George Orwell', year: 1949 },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
];
```

-   Loop Through the Array: Write a function listBooks that loops through the library array and prints each book’s details using the printBookDetails function created earlier.
    **Example** Output:
    The book '1984' was written by George Orwell in 1949.
    The book 'The Great Gatsby' was written by F. Scott Fitzgerald in 1925.

### Step 3: Add Books Dynamically

-   Add a Book: Create a function addBook that accepts a title, author, and year as parameters and adds a new book object to the library array.
    **Example**: addBook("The Catcher in the Rye", "J.D. Salinger", 1951);

-   Update the Loop: Update the listBooks function to include the newly added books when listing all books.

### Step 4: Filter and Search (Advanced)

-   Filter by Year: Create a function filterBooksByYear that takes a year as a parameter and returns an array of books published on or after that year.
    **Example**: filterBooksByYear(1950); should return books published in or after 1950.

-   Search by Title: Create a function searchBookByTitle that takes a searchTerm and returns the first book that matches the title (case-insensitive).
    **Example**: searchBookByTitle("1984"); should return the object for the book "1984".

### Step 5: Higher-Order Functions (Very Challenging)

-   Sort Books: Write a function sortBooksByYear that sorts the books in the library array by their publication year in ascending order using a higher-order function.
    **Example**: sortBooksByYear(); should modify the library array so that the books are in the correct order.

-   Custom Filter Function: Create a higher-order function filterBooks that takes a callback function as an argument.
-   This callback function should define the condition for filtering. Use this higher-order function to create a new list of books by a specific author.
    **Example**:
    const booksByOrwell = filterBooks(book => book.author === "George Orwell");

### Bonus Step: Object-Oriented Approach (Expert)

-   Create a Book Class: Refactor the code to use a Book class that includes methods like printDetails, matchesTitle, and isPublishedAfter.
    **Example**:

```javascript
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
```

-   Library Class: Create a Library class that manages an array of Book objects. Implement methods like addBook, listBooks, filterBooksByYear, searchBookByTitle, and sortBooksByYear.
    **Example**:

```javascript
class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    listBooks() {
        this.books.forEach((book) => book.printDetails());
    }

    // Implement other methods...
}
```

## Solution:

### Step 1: Create and Manipulate Basic Variables (Easy)

```javascript
let bookTitle = 'To Kill a Mockingbird';
let author = 'Harper Lee';
let publicationYear = 1960;

function printBookDetails(title, author, year) {
    console.log(`The book '${title}' was written by ${author} in ${year}.`);
}

// Test
printBookDetails(bookTitle, author, publicationYear);
```

### Step 2: Use Arrays and Loops (Moderate)

```javascript
let library = [
    { title: '1984', author: 'George Orwell', year: 1949 },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
];

function listBooks() {
    library.forEach((book) => printBookDetails(book.title, book.author, book.year));
}

// Test
listBooks();
```

### Step 3: Add Books Dynamically (Challenging)

```javascript
function addBook(title, author, year) {
    library.push({ title, author, year });
}

// Test
addBook('The Catcher in the Rye', 'J.D. Salinger', 1951);
listBooks(); // Updated list with the new book
```

### Step 4: Filter and Search (Advanced)

```javascript
function filterBooksByYear(year) {
    return library.filter((book) => book.year >= year);
}

// Test
console.log(filterBooksByYear(1950));

function searchBookByTitle(searchTerm) {
    return library.find((book) => book.title.toLowerCase() === searchTerm.toLowerCase());
}

// Test
console.log(searchBookByTitle('1984'));
```

### Step 5: Higher-Order Functions (Very Challenging)

```javascript
function sortBooksByYear() {
    library.sort((a, b) => a.year - b.year);
}

// Test
sortBooksByYear();
listBooks(); // Books sorted by year

function filterBooks(callback) {
    return library.filter(callback);
}

// Test
const booksByOrwell = filterBooks((book) => book.author === 'George Orwell');
console.log(booksByOrwell);
```

Bonus Step: Object-Oriented Approach (Expert)

```javascript
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

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    listBooks() {
        this.books.forEach((book) => book.printDetails());
    }

    filterBooksByYear(year) {
        return this.books.filter((book) => book.isPublishedAfter(year));
    }

    searchBookByTitle(searchTerm) {
        return this.books.find((book) => book.matchesTitle(searchTerm));
    }

    sortBooksByYear() {
        this.books.sort((a, b) => a.year - b.year);
    }
}

// Test
const myLibrary = new Library();
myLibrary.addBook(new Book('1984', 'George Orwell', 1949));
myLibrary.addBook(new Book('The Great Gatsby', 'F. Scott Fitzgerald', 1925));
myLibrary.addBook(new Book('The Catcher in the Rye', 'J.D. Salinger', 1951));

myLibrary.listBooks();
myLibrary.sortBooksByYear();
myLibrary.listBooks();
console.log(myLibrary.filterBooksByYear(1950));
console.log(myLibrary.searchBookByTitle('1984'));
```

---
