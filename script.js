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
    $("BUTTON").after(divForm);
    $("BUTTON").after("<br/>");
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
    });

    //Création of the contain DIV Result
    let divResult = $('<div id="result"><p id="rcherche">Résultats de la recherche<p></div>');
    let divBox = $('<div id="box"></div>');
    divBox.appendTo(divResult);

    $("#myBooks").after(divResult);

    searchBtn.click(function () {
        divResult.show();
        $("#content").hide();
        let searchTitle = $input1.val();
        let searchAuthor = $input1.val();
        if (searchTitle == '' && searchAuthor == '') {
            alert("Veuillez saisir le titre d'un livre SVP....");
        } else {
            let id = '';
            let title = '';
            let author = '';
            let descrip = '';
            let image = '';




            $.get("https://www.googleapis.com/books/v1/volumes?q=search+terms" + searchTitle, function (response) {
                
            
            $(divBox).empty();
            for (i = 0; i < response.items.length; i++) {
                    divCard = $("<div id='container'  + i>" + "</div>");
                    let bookmark = $('<aside id="bmark"><i class="fa fa-bookmark"></i></aside>');
                    bookmark.appendTo(divCard);

                    title = $("<div class='center-align'><h4>Title: " + response.items[i].volumeInfo.title + "</h4>");
                    id = $("<div class='center-align black-text'><h4>Id: " + response.items[i].id + "</h4>");
                    author = $("<div class='center-align black-text'><h4>Author: " + response.items[i].volumeInfo.authors + "</h4>");
                    descrip = $("<div class='center-align black-text'><h4>Descrpiption : </br> " + response.items[i].volumeInfo.description + "</h4>");
                    image = $("<img src=" + response.items[i].volumeInfo.imageLinks.smallThumbnail + " >");


                    divCard.append(title);
                    divCard.append(id);
                    divCard.append(author);
                    divCard.append(descrip);
                    divCard.append(image);
                    divCard.appendTo(divBox);
                }
                
            })
            
        }
    });

})