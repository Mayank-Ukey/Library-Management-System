console.log('Library Management System');

function Book(title, author, genre){
        this.title = title;
        this.author = author;
        this.genre = genre;
}

function bookMethods(){

}

let bMethod = new bookMethods();
bookMethods.prototype.addBookLocalStorage = function(book){
    let booksArray = [];
    let books = JSON.parse(localStorage.getItem('books'));
    if(books==null){
        booksArray = [];
        booksArray.push(book);
        localStorage.setItem('books', JSON.stringify(booksArray));
    }
    else{
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
}

bookMethods.prototype.clear = function(){
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

bookMethods.prototype.showBooks = function(){
    let books = JSON.parse(localStorage.getItem('books'));
    console.log(books);
    let tBody = document.getElementById('tBody');
    if(books==null){
        tBody.innerHTML = `No books to view! Please add some books!`;
    }
    else{
        tBody.innerHTML = "";
        books.forEach(element => {
            tBody.innerHTML += `<tr>
            <td>${element.title}</td>
            <td>${element.author}</td>
            <td>${element.genre}</td>
            <td><button id="remove" type="button" class="btn btn-info btn-sm">Remove</button></td>
            </tr>`
        });
    }
}

bookMethods.prototype.validate = function(book){
    if(book.title.length < 2 || book.author.length<2){
        return false;
    }
    else{
        return true;
    }
}

bookMethods.prototype.showAlert = function(type, msg){
    let alert = document.getElementById('alert');
    alert.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    ${msg}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
  setTimeout(function(){
      alert.innerHTML = "";
  }, 5000);
}

bMethod.showBooks();
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', onSubmit);

function onSubmit(e){
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let genre;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    if(fiction.checked){
        genre = fiction.value;
    }
    else if(programming.checked){
        genre = programming.value;
    }
    else{
        genre = cooking.value;
    }

    let book = new Book(title, author, genre);
    if(bMethod.validate(book)){
        bMethod.addBookLocalStorage(book);
        bMethod.showBooks();
        bMethod.clear();
        bMethod.showAlert('success', `You've successfully added this book.`);
    }
    else{
        bMethod.showAlert('warning', `You can't add this book.`);
    }
    e.preventDefault();
}
