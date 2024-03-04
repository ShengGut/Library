class Book {
  constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`
  }
}

const myLibrary = [
  new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'not read yet'),
  new Book(
    "Harry Potter and the Sorceror's Stone",
    'J.K. Rowling',
    '309 pages',
    'read'
  ),
  new Book('The Blade Itself', 'Joe Abercrombie', '515 pages', 'read'),
  new Book("Assassin's Apprentice", 'Robin Hobb', '448 pages', 'read'),
  new Book('Lonesome Dove', 'Larry McMurtry', '843 pages', 'not read yet'),
]

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read))
}

function toggleReadStatus(index) {
  const book = myLibrary[index]
  const currentBookStatus = book.read.toLowerCase()
  const newStatus = currentBookStatus === 'read' ? 'not read yet' : 'read'
  console.log(newStatus)
  book.read = newStatus
  displayBook(myLibrary)
}

function displayBook(myLibrary) {
  const bookList = document.getElementById('bookList')
  bookList.innerHTML = ''
  for (let i = 0; i < myLibrary.length; i++) {
    console.log(myLibrary[i].info())
    const bookInfo = myLibrary[i].info()

    const listItem = document.createElement('li')

    // create delete button and add to the list
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'x'
    deleteButton.setAttribute('data-index', i)
    deleteButton.addEventListener('click', (event) => {
      const index = parseInt(event.target.getAttribute('data-index'))
      myLibrary.splice(index, 1)
      displayBook(myLibrary)
    })

    // create read toggle button and add to the list
    const toggleButton = document.createElement('button')
    toggleButton.textContent = 'read'
    toggleButton.setAttribute('data-index', i)
    toggleButton.addEventListener('click', (event) => {
      const index = parseInt(event.target.getAttribute('data-index'))
      toggleReadStatus(index)
    })

    listItem.appendChild(deleteButton)
    const bookTextNode = document.createTextNode(bookInfo)
    listItem.appendChild(bookTextNode)
    listItem.appendChild(toggleButton)
    bookList.appendChild(listItem)
  }
}
displayBook(myLibrary)

const showFormButton = document.getElementById('showFormButton')
const inputForm = document.getElementById('inputForm')
const form = document.getElementById('addBook')
const submitButton = document.getElementById('submitButton')

showFormButton.addEventListener('click', () => {
  if (inputForm.style.display === 'none') {
    inputForm.style.display = 'block'
  } else {
    inputForm.style.display = 'none'
  }
})
const titleInput = document.getElementById('title')
const titleError = document.querySelector('#title + span.error')
const authorInput = document.getElementById('author')
const authorError = document.querySelector('#author + span.error')
const pageInput = document.getElementById('pages')
const pageError = document.querySelector('#pages + span.error')
const readInput = document.getElementById('read')
const readError = document.querySelector('#read + span.error')
// do Live eventlistener checks on each of the html input items. Ensure no blanks edit and constraints enforced

function showTitleError() {
  if (titleInput.validity.valueMissing) {
    titleError.innerHTML = 'You need to enter a title.'
  } else {
    titleError.innerHTML = ''
  }
  titleError.classList.toggle('active', titleInput.validity.valueMissing)
}

function showAuthorError() {
  // if the field is empty, display error message
  if (authorInput.validity.valueMissing) {
    authorError.textContent = 'You need to enter an author.'
  }

  authorError.className = 'error active'
}

function showPageError() {
  // if the field is empty, display error message
  if (pageInput.validity.valueMissing) {
    pageError.textContent = 'You need to enter pages (1-9999).'
  }

  pageError.className = 'error active'
}

function showReadError() {
  // if the field is empty, display error message
  if (readInput.validity.valueMissing) {
    readError.textContent = 'You need to enter "read" or "not read yet".'
  }

  readError.className = 'error active'
}

titleInput.addEventListener('input', (e) => {
  //each time user types something, check if it's valid or not
  if (titleInput.validity.valid) {
    titleInput.textContent = ''
    titleInput.className = 'error'
  } else {
    showTitleError()
  }
})

authorInput.addEventListener('input', (e) => {
  if (authorInput.validity.valid) {
    authorInput.textContent = ''
    authorInput.classname = 'error'
  } else {
    showAuthorError()
  }
})

pageInput.addEventListener('input', (e) => {
  if (pageInput.validity.valid) {
    pageInput.textContent = ''
    pageInput.classname = 'error'
  } else {
    showPageError()
  }
})

readInput.addEventListener('input', (e) => {
  if (readInput.validity.valid) {
    readInput.textContent = ''
    readInput.classname = 'error'
  } else {
    showReadError()
  }
})

submitButton.addEventListener('click', function (event) {
  event.preventDefault()

  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const pages = document.getElementById('pages').value + ' pages'
  const read = document.getElementById('read').value

  // Reset error messages
  titleError.innerHTML = ''
  authorError.innerHTML = ''
  pageError.innerHTML = ''
  readError.innerHTML = ''

  // Validate input fields
  let isValid = true

  if (titleInput.validity.valueMissing) {
    showTitleError()
    isValid = false
  }

  if (authorInput.validity.valueMissing) {
    showAuthorError()
    isValid = false
  }

  if (
    pageInput.validity.valueMissing ||
    pageInput.value < 1 ||
    pageInput.value > 9999
  ) {
    pageError.innerHTML = 'You need to enter pages (1-9999).'
    pageError.classList.add('active')
    isValid = false
  }

  if (
    readInput.validity.valueMissing ||
    (read.trim().toLowerCase() !== 'read' &&
      read.trim().toLowerCase() !== 'not read yet')
  ) {
    showReadError()
    isValid = false
  }

  if (isValid) {
    addBookToLibrary(title, author, pages, read)
    displayBook(myLibrary)

    alert(
      `Successfully added new book: ${title} by ${author}, ${pages}, ${read}`
    )
    inputForm.style.display = 'none'
  }
})
