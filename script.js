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
        btn.show();
    });

    searchBtn.click(function () {
        let searchTitle = $input1.val();
        let searchAuthor = $input1.val();
        if (searchTitle == '' && searchAuthor == '') {
            alert("Veuillez saisir le titre d'un livre SVP....");
        }  else {
            let identifiant = '';
            let title = '';
            let author = '';
            let description = '';
            let img = '';

            $.get("https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor" + searchTitle, function (response) {
                console.log(response);
            })};
        })

})