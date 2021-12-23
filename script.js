//submit button
let submit = document.getElementById("submit");

const allBookNames = [];

//click on add Book to add a book
submit.addEventListener('click', function addBook(event){
    event.preventDefault();

    //get values
    let bookName = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let authorEmail = document.getElementById("authorEmail").value;
    let language = document.getElementById("language").value;
    let type = document.querySelector('input[name="Type"]:checked').value;
    let date = document.getElementById("date").value;
    let price = document.getElementById("price").value;

    //check email input
    let at = /@/;
    let domain = /.com/;
    let result1 = at.test(authorEmail);
    let result2 = domain.test(authorEmail);

    if ((bookName == "") || (author == "") || (authorEmail == "") || (date == "") || (price == "") || (language == "Language") || (language == "") ){
        alert("fill all blanks");
    }
    else if((bookName.length > 30) || (author.length > 30)){
        alert("try less characters");
    }
    else if(price <= 0){
        alert("enter a correct price");
    }
    else if((result1 == false) || (result2 == false)){
        alert("enter a valid Email");
    }
    else{
        //sort book Names
        allBookNames.push(bookName);
        allBookNames.sort();
        let index = 1;
        index += allBookNames.indexOf(bookName);
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
        cell1.innerHTML = bookName;
        cell2.innerHTML = author;
        cell3.innerHTML = authorEmail;
        cell4.innerHTML = language;
        cell5.innerHTML = type;
        cell6.innerHTML = date;
        cell7.innerHTML = price;
        cell8.innerHTML = '<button type="button" value="Edit" class="modify" id="modify" onclick="ModifyRow(this)">Modify</button>';
        cell9.innerHTML = '<button class="delete" onclick="deleteRow(this)">Delete</button>';

        //make the input boxes empty again
        document.getElementById("bookName").value = "";
        document.getElementById("author").value = "";
        document.getElementById("date").value = "";
        document.getElementById("price").value = "";
        document.getElementById("authorEmail").value = "";

        //show all book infos (DétailOuvrage)
        function detailOuvrage(){
        let allInfos = `L'ouvrage "${bookName}" est un ${type} en langue ${language}, écrit par "${author}" et publié le ${date}. Le prix de "${bookName}" est de ${price} Dhs.`;
        alert(allInfos);
        console.log(allBookNames);
        console.log(index);
        console.log(result1);
        console.log(result2);
        }
        detailOuvrage();
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
