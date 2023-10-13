const myLibrary = [
    new Book("The Hobbit", "J.R.R. Tolkien", "295 pages", "not read yet"),
    new Book("Harry Potter and the Sorceror's Stone", "J.K. Rowling", "309 pages", "read"),
    new Book("The Blade Itself", "Joe Abercrombie", "515 pages", "read"),
    new Book("Assassin's Apprentice", "Robin Hobb", "448 pages", "read"),
    new Book("Lonesome Dove", "Larry McMurtry", "843 pages", "not read yet")
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages}, ${read}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function displayBook(myLibrary) {
    const display = document.getElementById("displayLibrary");
    display.textContent = "Library:";
    for(let i = 0; i < myLibrary.length;i++) {
        console.log(myLibrary[i].info());
        const bookInfo = myLibrary[i].info();
        const bookElement = document.createElement("p");
        bookElement.textContent = bookInfo;
        display.appendChild(bookElement);
    }
}
displayBook(myLibrary);

const form = document.getElementById("addBook");
const submitButton = document.getElementById("submitButton");
const output = document.getElementById("output");

submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;

    addBookToLibrary(title, author, pages, read);
    displayBook(myLibrary);

    alert(`Successfully added new book: ${title} by ${author}, ${pages}, ${read}`);
})