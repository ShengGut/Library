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
    for(let i = 0; i < myLibrary.length;i++) {
        console.log(myLibrary[i].info());
    }
}