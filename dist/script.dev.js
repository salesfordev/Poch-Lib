"use strict";

$(document).ready(function () {
  //Creation of the button for adding a book
  var btn = $("<button id='addBook'>Ajouter un livre</button>");
  $("hr").before(btn); //Creation of the labels

  var $label1 = $("<label>").text('Titre du livre');
  var $label2 = $("<label>").text('Auteur'); //Creation of the inputs

  var $input1 = $('<input id="input1"> ');
  var $input2 = $('<input id="input2"> '); //Association of inputs and labels

  $input1.appendTo($label1);
  $input2.appendTo($label2); //Création of a DIV containing Labels

  var divForm = $('<div id="newBook"></div>');
  $label1.appendTo(divForm);
  $label2.appendTo(divForm); //Création of the search button

  var searchBtn = $("<button id='search'>Rechercher</button>");
  searchBtn.appendTo(divForm); //Création of the cancel button

  var cancelBtn = $("<button id='cancel'>Annuler</button>");
  cancelBtn.appendTo(divForm); //Injection of the form in the html code

  $("button").after(divForm);
  $("button").after("<br/>");
  $input1.before("<br/>");
  $label1.after("<br/>");
  $input2.before("<br/>");
  $label2.after("<br/>"); //display of the onclick form

  btn.click(function () {
    divForm.show();
    btn.hide();
  }); //Hide form by clicking cancel button

  cancelBtn.click(function () {
    divForm.hide();
    $("#content").show();
    divResult.hide();
    btn.show();
  }); //Création of the contain DIV Result

  var divResult = $('<div id="result"><p id="rcherche">Résultats de la recherche<p></div>');
  var divBox = $('<div id="box"></div>');
  divBox.appendTo(divResult);
  $("#myBooks").after(divResult);
  searchBtn.click(function () {
    divResult.show();
    $("#content").hide();
    var searchTitle = $input1.val();
    var searchAuthor = $input1.val();

    if (searchTitle == '' && searchAuthor == '') {
      alert("Veuillez saisir le titre d'un livre SVP....");
    } else {
      var id = '';
      var title = '';
      var author = '';
      var descrip = '';
      var image = '';
      $.get("https://www.googleapis.com/books/v1/volumes?q=search+terms" + searchTitle, function (response) {
        $(divBox).empty();

        for (i = 0; i < response.items.length; i++) {
          divCard = $("<div id='container'  + i>" + "</div>");
          var bookmark = $('<aside id="bmark"><i class="fa fa-bookmark"></i></aside>');
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
      });
    }
  });
});