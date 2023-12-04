class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
    }
}

const myLibrary = [
    new Book("The Hobbit", "J.R.R. Tolkien", "295 pages", "not read yet"),
    new Book("Harry Potter and the Sorceror's Stone", "J.K. Rowling", "309 pages", "read"),
    new Book("The Blade Itself", "Joe Abercrombie", "515 pages", "read"),
    new Book("Assassin's Apprentice", "Robin Hobb", "448 pages", "read"),
    new Book("Lonesome Dove", "Larry McMurtry", "843 pages", "not read yet")
];

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function toggleReadStatus (index) {
    const book = myLibrary[index];
    const currentBookStatus = book.read.toLowerCase();
    const newStatus = currentBookStatus === "read" ? "not read yet" : "read";
    console.log(newStatus);
    book.read = newStatus;
    displayBook(myLibrary);
}

function displayBook(myLibrary) {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";
    for(let i = 0; i < myLibrary.length;i++) {
        console.log(myLibrary[i].info());
        const bookInfo = myLibrary[i].info();

        const listItem = document.createElement("li");
        
        // create delete button and add to the list
        const deleteButton = document.createElement("button")
        deleteButton.textContent = "x";
        deleteButton.setAttribute("data-index",i);
        deleteButton.addEventListener("click", (event) => {
            const index = parseInt(event.target.getAttribute("data-index"));
            myLibrary.splice(index, 1);
            displayBook(myLibrary);
        });

        // create read toggle button and add to the list
        const toggleButton = document.createElement("button");
        toggleButton.textContent = "read";
        toggleButton.setAttribute("data-index", i);
        toggleButton.addEventListener("click", (event) => {
            const index = parseInt(event.target.getAttribute("data-index"));
            toggleReadStatus(index);
        });

        listItem.appendChild(deleteButton);
        const bookTextNode = document.createTextNode(bookInfo);
        listItem.appendChild(bookTextNode);
        listItem.appendChild(toggleButton);
        bookList.appendChild(listItem);

    }
}
displayBook(myLibrary);

const showFormButton = document.getElementById("showFormButton");
const inputForm = document.getElementById("inputForm");
const form = document.getElementById("addBook");
const submitButton = document.getElementById("submitButton");

showFormButton.addEventListener("click", () =>{
    if(inputForm.style.display === "none")
        inputForm.style.display = "block";
    else
        inputForm.style.display = "none";
});

submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value + " pages";
    const read = document.getElementById("read").value;

    if(title.trim() === '' || author.trim() === '' || pages.trim() === '' || read.trim() === ''){
        alert("Please fill out all fields");
        return;
    }
    if(read.trim() !== 'read' && read.trim() !== 'not read yet'){
        console.log(read.trim());
        alert("Enter 'read' or 'not read yet' in the read field");
        return;
    }

    addBookToLibrary(title, author, pages, read);
    displayBook(myLibrary);

    alert(`Successfully added new book: ${title} by ${author}, ${pages}, ${read}`);
    inputForm.style.display = "none";
})