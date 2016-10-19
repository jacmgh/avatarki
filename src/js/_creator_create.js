$(function () {

  /* ===========================================================================
   * Utworz avatar
   * ======================================================================== */

  // Wczytaj formularz
  var $form = $('#form-creator');

  // Wylacz domyslne dzialanie (wyslanie formularza)
  $form.on('submit', function (e) {
    e.preventDefault();
  });

  // Po kliknieciu w button potwierdzenia
  $('#dialog-confirm-content').parent().on('click', '#confirm-create', function () {

    // Wyslij formularz z wszystkimi danymi
    $.post('dialog/create', $form.serialize(), function (data) {

      // Wczytaj komunikat o utworzeniu avatara
      $('#dialog-content').html($('.load', data))
              .closest('.dialog-container').fadeIn(200)
              .find('input').on('click', function () {
        $(this).select();
      });

    });

  });

});