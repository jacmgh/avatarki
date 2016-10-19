$(function () {

  /* ===========================================================================
   * SPA linki
   * ======================================================================== */

  // Ukryj scrollbar
  // (slaba wydajnosc)
//  function removeBodyScroll() {
//    $('body').addClass('noscroll');
//  }
//
//  // Pokaz scrollbar
//  function addBodyScroll() {
//    $('body').removeClass('noscroll');
//  }


  $('[data-load]').on('click', function (e) {
    // Po kliknieciu w button/link ladujacy podstrone/okno

    // Wylacz domyslna akcje
    e.preventDefault();

    // Button/link ladujacy podstrone/okno
    var $this = $(this);

    // Podstrona czy okno
    var type = $this.data('load');

    // Odnosnik (help, contact, create itd.)
    var item = $this.attr('href') || $this.data('href');

    if (item === '/') {
      item = 'index';
    }

    if (type === 'dialog' || type === 'dialog-confirm') {
      // Jesli okno

      // Wczytaj szablon
      var $dialogContent = $('#' + type + '-content');

      // Zaladuj tresc okna (klasa 'load') do szablonu
      $dialogContent.load(type + '/' + item + ' .load', function () {

        // Pokaz okno z zaladowana trescia
        $(this).closest('.dialog-container').fadeIn(200);

        // Ukryj scrollbar
//        removeBodyScroll();
      });

      if (type === 'dialog-confirm') {
        // Zmien tekst buttona potwierdzajacego akcje z 'OK' na np. 'Utworz' 
        // i ustaw id
        $dialogContent.next().find('.btn-ok').text($this.data('ok')).attr('id', 'confirm-' + item);
      }

    } else if (type === 'page') {
      // Jesli cala podstrona

      // Ukryj wszystkie podstrony
      $('[class*=page-]').fadeOut(200, function () {

        // Pokaz tylko dana podstrone
        $('.' + type + '-' + item).fadeIn(200, function () {
          // Ustaw widok na sama gore strony
          $(window).scrollTop(0);
        });

      });

      // Ukryj wszystkie elementy podstron umieszczane w roznych miejscach
      $('[class^=items-]').fadeOut(200);

      // Pokaz tylko elementy danej podstrony
      $('.items-' + item).fadeIn(200);

    }

  });


  /* ===========================================================================
   * Zamknij okno
   * ======================================================================== */

  $('.dialog-container .btn-flat').on('click', function () {
    // Po kliknieciu w dowolny button w oknie

    // Ukryj okno
    $(this).closest('.dialog-container').fadeOut(200);

    // Pokaz scrollbar
//    addBodyScroll();
  });

  $('.dialog-container').on('click', function (e) {
    // Po kliknieciu w przyciemnione tlo

    // Przyciemnione tlo
    $this = $(this);

    if ($this.is(e.target)) {
      // Jesli kliknieto dokladnie w tlo (ale nie elementy w nim zawarte)

      // Ukryj okno
      $this.fadeOut(200);

      // Pokaz scrollbar
//      addBodyScroll();
    }
  });

});