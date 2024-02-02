const The_Stranger = new Book("The Stranger", "Albert Camus", "200", "Yes")
const Zen_Motorcylce_Maintence = new Book("Zen and the Art of Motorcycle Maintenence", "Robert Pirsig", "400", "Yes")
const BICOE = new Book("Break in Case of Emergency", "Unknown", "300", "Yes")

const titleRow = document.getElementById('titleRow');
const authorRow = document.getElementById('authorRow');
const pageRow = document.getElementById('pageRow');
const readRow = document.getElementById('readStatus');
const readChangeRow = document.getElementById('changeRead');
const removeRow = document.getElementById('removeRow');

const bookBtn = document.getElementById('newBookBtn');
const headerDiv = document.getElementById('secondDiv');

const myLibrary = [The_Stranger, Zen_Motorcylce_Maintence, BICOE];

function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};


function addBookToLibrary(i) {
  var column = document.createElement("td");
  column.innerText = myLibrary[i].title;
  titleRow.appendChild(column);
  column.dataset.index = i; 

  var column = document.createElement("td");
  column.innerText = myLibrary[i].author;
  authorRow.appendChild(column);
  column.dataset.index = i; 

  var column = document.createElement("td");
  column.innerText = myLibrary[i].pages;
  pageRow.appendChild(column);
  column.dataset.index = i; 

  var column = document.createElement("td");
  column.innerText = myLibrary[i].read;
  readRow.appendChild(column);
  column.dataset.index = i;  


  var column = document.createElement("td");  //creates space for buttons
  var readBtn = document.createElement('button') //creates bbutton and add text/eventlisteners
  readBtn.innerText = "Read?";
  readBtn.className = "readBtn"
  readBtn.dataset.index = i
  readBtn.addEventListener('click', () => {
    const bookIndex = readBtn.dataset.index;
    const book = myLibrary[bookIndex];
  
    // Toggle the read status
    if (book.read === 'Yes') {
      book.read = 'No';
    } else {
      book.read = 'Yes';
    }
  
    const readChangeRow = document.getElementById('readStatus'); //selects row
    const readCell = readChangeRow.querySelector(`[data-index="${bookIndex}"]`); //selects correct cell
    readCell.innerText = book.read;
  });
  column.appendChild(readBtn);
  column.dataset.index = i;  
  readChangeRow.appendChild(column);

  var column = document.createElement("td");
  var removeBtn = document.createElement('button');
  removeBtn.innerText = "Delete Book?";
  removeBtn.dataset.index = i;
  removeBtn.addEventListener('click', () => {
    const bookIndex = readBtn.dataset.index;
    myLibrary.splice(bookIndex, 1);
    titleRow.querySelector(`[data-index="${bookIndex}"]`).remove();
    authorRow.querySelector(`[data-index="${bookIndex}"]`).remove();
    pageRow.querySelector(`[data-index="${bookIndex}"]`).remove();
    readRow.querySelector(`[data-index="${bookIndex}"]`).remove();
    readChangeRow.querySelector(`[data-index="${bookIndex}"]`).remove();
    removeRow.querySelector(`[data-index="${bookIndex}"]`).remove();    
  })
  column.appendChild(removeBtn);
  column.dataset.index = i;  
  removeRow.appendChild(column);
};


bookBtn.addEventListener('click', () => {
  const bookForm = document.createElement('form');
  const bookTitle = document.createElement('input');
  bookTitle.setAttribute('type', 'text');
  bookTitle.setAttribute('name', 'book title');
  bookTitle.setAttribute('placeholder', 'Book Title');
  const bookAuthor = document.createElement('input');
  bookAuthor.setAttribute('type', 'text');
  bookAuthor.setAttribute('name', 'book author');
  bookAuthor.setAttribute('placeholder', 'Book Author');
  const bookPages = document.createElement('input');
  bookPages.setAttribute('type', 'text');
  bookPages.setAttribute('name', 'book pages');
  bookPages.setAttribute('placeholder', 'Number of Pages');
  const bookStatus = document.createElement('input');
  bookStatus.setAttribute('type', 'text');
  bookStatus.setAttribute('name', 'book read status');
  bookStatus.setAttribute('placeholder', 'Have you read this?');
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  
  bookForm.appendChild(bookTitle);
  bookForm.appendChild(bookAuthor);
  bookForm.appendChild(bookPages);
  bookForm.appendChild(bookStatus);
  bookForm.appendChild(submitButton);
  headerDiv.appendChild(bookForm);

  submitButton.addEventListener('click', reset, false);

  function reset(event){
    const table = document.getElementById('table');
    const originalElements = table.querySelectorAll('.original');
    const otherElements = table.querySelectorAll('td:not(.original)');

    for (const element of otherElements) {
    element.remove();
    }

    libraryAddition = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookStatus.value);
    myLibrary.push(libraryAddition);
    for(let i = 0;i < myLibrary.length; i++){
      addBookToLibrary(i);
    }
    event.preventDefault(); 
  }
});

 