//submit button
let submit = document.getElementById("submit");

let allBookNames = [];
const bookStorage = JSON.parse(localStorage.getItem("localData")) ?? []

//locale storage
function lclStorage(){
    bookStorage.push({
        titre : book.bookName,
        auteur : book.author,
        auteurEmail : book.authorEmail,
        langue : book.language,
        tipe : book.type,
        date : book.date,
        prix : book.price
    });
    localStorage.setItem("localData", JSON.stringify(bookStorage));
}



//click on add Book to add a book
submit.addEventListener('click', function addBook(event){
    event.preventDefault();
    //get values
    class newBook{
        constructor (bookName, author, authorEmail, language, type, date, price){
            this.bookName = bookName;
            this.author = author;
            this.authorEmail = authorEmail;
            this.language = language;
            this.type = type;
            this.date = date;
            this.price = price;
        }
        detailOuvrage(){
            let allInfos = `L'ouvrage "${book.bookName}" est un ${book.type} en langue ${book.language}, écrit par "${book.author}" et publié le ${book.date}. Le prix de "${book.bookName}" est de ${book.price} Dhs.`;
            alert(allInfos);
        }
    }
    book = new newBook(
        document.getElementById("bookName").value,
        document.getElementById("author").value,
        document.getElementById("authorEmail").value,
        document.getElementById("language").value,
        document.querySelector('input[name="Type"]:checked').value,
        document.getElementById("date").value,
        document.getElementById("price").value
    );

    //check email input
    let at = /@/;
    let domain = /.com/;
    let result1 = at.test(book.authorEmail);
    let result2 = domain.test(book.authorEmail);

    if ((book.bookName == "") || (book.author == "") || (book.authorEmail == "") || (book.date == "") || (book.price == "") || (book.language == "Language") || (book.language == "") ){
        alert("fill all blanks");
    }
    else if((book.bookName.length > 30) || (book.author.length > 30)){
        alert("try less characters");
    }
    else if(price <= 0){
        alert("enter a correct price");
    }
    else if((result1 == false) || (result2 == false)){
        alert("enter a valid Email");
    }
    else{
        lclStorage();

        //sort book Names
        allBookNames.push(book.bookName);
        allBookNames.sort();
        let index = 1;
        index += allBookNames.indexOf(book.bookName);
        var table = document.getElementById('table');

        //add rows to the table
        var row = table.insertRow(index);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);

        //add values to table cells
        cell1.innerHTML = book.bookName;
        cell2.innerHTML = book.author;
        cell3.innerHTML = book.authorEmail;
        cell4.innerHTML = book.language;
        cell5.innerHTML = book.type;
        cell6.innerHTML = book.date;
        cell7.innerHTML = book.price;
        cell8.innerHTML = '<button type="button" value="Edit" class="modify" id="modify" onclick="ModifyRow(this)">Modify</button>';
        cell9.innerHTML = '<button class="delete" onclick="deleteRow(this)">Delete</button>';

        //make the input boxes empty again
        document.getElementById("bookName").value = "";
        document.getElementById("author").value = "";
        document.getElementById("date").value = "";
        document.getElementById("price").value = "";
        document.getElementById("authorEmail").value = "";

        //show all book infos (DétailOuvrage):
        book.detailOuvrage();
    }
});

//click on delete button to delete row
function deleteRow(r){
    if(confirm('You sure you want to delete this row?')){
        var i = r.parentNode.parentNode.rowIndex;
        document.getElementById("table").deleteRow(i);
    }
}

// make the input boxes empty again
function resetForm(){
    document.getElementById("bookName").value = "";
    document.getElementById("author").value = "";
    document.getElementById("date").value = "";
    document.getElementById("price").value = "";
    document.getElementById("language").value = "";
    document.getElementById("authorEmail").value = "";
}

// edit       
function ModifyRow(r){
    var i = r.parentNode.parentNode.rowIndex;
    var R = table.rows[i];
    if(document.getElementById("modify").value == "Edit"){
        document.getElementById("bookName").value = R.cells[0].innerHTML;
        document.getElementById("author").value = R.cells[1].innerHTML;
        document.getElementById("authorEmail").value = R.cells[2].innerHTML;
        document.getElementById("language").value = R.cells[3].innerHTML;
        document.getElementById("price").value = R.cells[6].innerHTML;
        document.getElementById("date").value = R.cells[5].innerHTML;
        document.querySelector('input[name="Type"]:checked').value = R.cells[4].innerHTML;

        document.getElementById("modify").value = "save";
        document.getElementById('submit').setAttribute("disabled","true");         
    }     
    else{
        R.cells[0].innerHTML = document.getElementById("bookName").value;
        R.cells[1].innerHTML =  document.getElementById("author").value;
        R.cells[2].innerHTML =  document.getElementById("authorEmail").value;
        R.cells[6].innerHTML =  document.getElementById("price").value;
        R.cells[5].innerHTML =  document.getElementById("date").value;
        R.cells[3].innerHTML =  document.getElementById("language").value;
        R.cells[4].innerHTML = document.querySelector('input[name="Type"]:checked').value 
        document.getElementById("modify").value = "Edit";
        document.getElementById('submit').removeAttribute("disabled");  
        resetForm();          
    } 
};

//fixed table infos
function tableau(){
    const bookStorage = JSON.parse(localStorage.getItem("localData")) ?? [];
    let i = 0;
    allBookNames = [];

    while(i <= bookStorage.length){
        allBookNames.push(bookStorage[i].titre);
        allBookNames.sort();
        var index2 = 1;
        index2 += allBookNames.indexOf(bookStorage[i].titre);

        //add rows to the table
        var table = document.getElementById('table');
        var row = table.insertRow(index2);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);

        //add values to table cells
        cell1.innerHTML = bookStorage[i].titre;
        cell2.innerHTML = bookStorage[i].auteur;
        cell3.innerHTML = bookStorage[i].auteurEmail;
        cell4.innerHTML = bookStorage[i].langue;
        cell5.innerHTML = bookStorage[i].tipe;
        cell6.innerHTML = bookStorage[i].date;
        cell7.innerHTML = bookStorage[i].prix;
        cell8.innerHTML = '<button type="button" value="Edit" class="modify" id="modify" onclick="ModifyRow(this)">Modify</button>';
        cell9.innerHTML = '<button class="delete" onclick="deleteRow(this)">Delete</button>';
        i++;
    }
}
tableau();