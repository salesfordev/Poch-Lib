$(document).ready(function () {
    //Creation of the button for adding a book
    let btn = $("<button id='addBook'>Ajouter un livre</button>");
    $("hr").before(btn);

    //Creation of the labels
    let $label1 = $("<label>").text('Titre du livre');
    let $label2 = $("<label>").text('Auteur');

    //Creation of the inputs

    let $input1 = $('<input id="input1"> ');
    let $input2 = $('<input id="input2"> ');

    //Association of inputs and labels
    $input1.appendTo($label1);
    $input2.appendTo($label2);

    //Création of a DIV containing Labels
    let divForm = $('<div id="newBook"></div>');
    $label1.appendTo(divForm);
    $label2.appendTo(divForm);

    //Création of the search button
    let searchBtn = $("<button id='search'>Rechercher</button>");
    searchBtn.appendTo(divForm);

    //Création of the cancel button
    let cancelBtn = $("<button id='cancel'>Annuler</button>");
    cancelBtn.appendTo(divForm);

    //Injection of the form in the html code
    $("button").after(divForm);
    $("button").after("<br/>");
    $input1.before("<br/>");
    $label1.after("<br/>");
    $input2.before("<br/>");
    $label2.after("<br/>");

    //display of the onclick form
    btn.click(function () {
        divForm.show();
        btn.hide();
    });

    //Hide form by clicking cancel button
    cancelBtn.click(function () {
        divForm.hide();
        $("#content").show();
        divResult.hide();
        btn.show();
        $("content").show();
    });

    //Creation of the contain DIV Result
    let divResult = $('<div id="result"><p id="rcherche">Résultats de la recherche<p></div>');
    let divBox = $('<div id="box"></div>');
    divBox.appendTo(divResult);
    $("#myBooks").after(divResult);

    let pocheListe = $('<div id="pocheListe"></div>');
    pocheListe.appendTo($("#content"));

    //Implementation of the different actions and functions when clicking the search button
    searchBtn.click(function () {
        divResult.show();
        $("#content").hide();
        let searchTitle = $input1.val();
        let searchAuthor = $input2.val();
        if (searchTitle === '' && searchAuthor == '') {
            alert("Veuillez saisir le titre du livre et le nom de l'auteur....");

            //Creation of variables for the storage of recovered data.
        } else {
           

            //Implementation of the book search query as well as the various functions for displaying results and creating favorites.
            let authorParam = searchAuthor != "" ? "+inauthor:" + searchAuthor : ""; //s'il ya un auteur on stocke le 

            $.get("https://www.googleapis.com/books/v1/volumes?q=" + searchTitle + authorParam, function (response) {

                $(divBox).empty();

                //We retrieve the information for each book
                if (response.totalItems === 0) {
                    alert("Aucun livre n'a été trouvé")
                }
                for (let i = 0; i < response.items.length; i++) {
                    createBook(response.items[i], divBox, 'fa fa-bookmark'); // add book in search result
                }
            })
        }
    });

    let storageBooks = JSON.parse(sessionStorage.getItem("storageBooks"));
    if (storageBooks) {
        storageBooks.forEach(book => createBook(book, $("#pocheListe"), 'fa fa-trash')); //add book in poch'list
    }

})

//create book in search result
function createBook(book, container, bookmarkClass) { //parameter, book - where to add book - bookmark icon class
    title = $("<div class='center-align'><h4>Title: " + book.volumeInfo.title + "</h4>");
    id = $("<div class='center-align black-text'><h4>Id: " + book.id + "</h4>");
    author = $("<div class='center-align black-text'><h4>Author: " + book.volumeInfo.authors[0] + "</h4>");

    let img = book.volumeInfo.imageLinks.smallThumbnail ? book.volumeInfo.imageLinks.smallThumbnail : "images/unavailable.png"
    descrip = $("<div class='center-align black-text'><h4>Description : </br> " + (book.volumeInfo.description ? book.volumeInfo.description.substr(0, 200) : "information manquante") + "</h4>");
    image = $("<img src=" + img + " >");
    let divCard = $("<div class='container' id='" + book.id + "'></div>");
    let bookmark = $('<aside id="bmark" class="bmark" ><i class="' + bookmarkClass + '"></i></aside>');
    let exsistingDivCard = $("#" + book.id); //we retrieve the elements that are id the id of the book

    //Creating and setting up bookmarks.
    bookmark.click(function () {

        if (bookmark.children("i").attr("class") == "fa fa-trash") { //If the class of the icon is trash,
            divCard.remove(); //we suppress the book
            let storageBooks = JSON.parse(sessionStorage.getItem("storageBooks"));
            storageBooks = storageBooks.filter(bookToFilter => bookToFilter.id != book.id)
            sessionStorage.setItem("storageBooks", JSON.stringify(storageBooks));

        } else {
            if (exsistingDivCard.length > 0) { //the book is in the poch'list
                alert("Vous ne pouvez ajouter deux fois le même livre");
            } else { //we add it in the list pocket
                divCard.appendTo("#content");
                bookmark.children("i").removeClass();
                bookmark.children("i").addClass("fa fa-trash");
                addToStorage(book);

            }
        }

    })

    divCard.append(bookmark)
    divCard.append(title);
    divCard.append(id);
    divCard.append(author);
    divCard.append(descrip);
    divCard.append(image);
    divCard.appendTo(container);

}

//adding books to storage
function addToStorage(book) {
    let storageBooks = JSON.parse(sessionStorage.getItem("storageBooks")); //récupère le contenu de storageBooks dans session storage
    if (storageBooks) {
        storageBooks.push(book); 
        sessionStorage.setItem("storageBooks", JSON.stringify(storageBooks)); 
    } else {
        sessionStorage.setItem("storageBooks", JSON.stringify([book])); //Creation of an array with book init in the session storage
    }
}