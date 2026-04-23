let myLibrary = [];

window.addEventListener("load", function () {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    let book1 = new Book("Robison Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
    render();
  }
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const check = document.getElementById("check");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  // 1. Preprocess and store cleaned values in variables / removes spaces from the beginning and end
  const cleanTitle = title.value.trim();
  const cleanAuthor = author.value.trim();

  // Convert string input to a Number for calculation/validation
  const pageCount = Number(pages.value);
  const isRead = check.checked;

  // 2. VALIDATION: // Check if strings are empty after trimming spaces
  if (cleanTitle === "" || cleanAuthor === "") {
    alert("Title and Author cannot be empty!");
    return false;
  }
  // Check if page count is a valid number and greater than 0
  if (isNaN(pageCount) || pageCount <= 0) {
    alert("Please enter a valid number of pages!");
    return false;
  }

  // 3. If all validations pass, create a new Book object and add it to the library
  let book = new Book(cleanTitle, cleanAuthor, pageCount, isRead);
  myLibrary.push(book);

  // 4. Clear the form fields after submission
  title.value = "";
  author.value = "";
  pages.value = "";
  check.checked = false;

  render();
}

class Book {
  constructor(title, author, pages, check) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.check = check;
  }
}

function render() {
  const table = document.getElementById("display");
  const tbody = table.querySelector("tbody");
  //delete old table
  if (tbody) {
    tbody.innerHTML = "";
  }
  //insert updated row and cells
  const length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    const row = table.insertRow(-1);
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);
    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    //add and wait for action for read/unread button
    const changeBut = document.createElement("button");
    changeBut.className = "btn btn-success";
    wasReadCell.appendChild(changeBut);
    changeBut.innerText = myLibrary[i].check ? "Yes" : "No";

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    //add delete button to every row and render again
    const delButton = document.createElement("button");
    deleteCell.appendChild(delButton);
    delButton.className = "btn btn-warning";
    delButton.innerHTML = "Delete";
    delButton.addEventListener("click", function () {
      const deletedTitle = myLibrary[i].title;
      myLibrary.splice(i, 1);
      render();
      alert(`You've deleted title: ${deletedTitle}`);
    });
  }
}
