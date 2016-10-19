$(function () {

  /* ===========================================================================
   * Button 'Hamburger'
   * ======================================================================== */

  // Wczytaj button menu
  var $btnMenu = $('.btn-menu');

  // Wczytaj div z przyciemnionym tlem
  var $navDim = $('.nav-dim');

  // Obsluga klikniec
  $btnMenu.on('click', handlerMenu);
  $navDim.on('click', handlerMenuRemove);

  function handlerMenu() {

    // Zmien wyglad buttona 'Hamburger'
    $btnMenu.toggleClass('active');

    // Pokaz/ukryj menu
    $('nav').toggleClass('active');

    // Pokaz/ukryj przyciemnione tlo
    $navDim.toggleClass('active');

    // Ukryj/pokaz scrollbar
    // (slaba wydajnosc)
//    $('body').toggleClass('noscroll');

  }

  function handlerMenuRemove() {

    // Ustaw domyslny wyglad buttona 'Hamburger'
    $btnMenu.removeClass('active');

    // Ukryj menu
    $('nav').removeClass('active');

    // Ukryj przyciemnione tlo
    $navDim.removeClass('active');

    // Pokaz scrollbar
//    $('body').removeClass('noscroll');

  }


  /* ===========================================================================
   * Kreator: Nawigacja
   * ======================================================================== */

  // Po kliknieciu w link w menu
  $('nav').on('click', 'a', function (e) {

    // Wylacz domyslna akcje
    e.preventDefault();

    // Link
    var $this = $(this);

    // Ustaw styl 'aktywny' tylko dla kliknietego linka
    $this.closest('ul').find('.active').removeClass('active');
    $this.addClass('active');

    // Ukryj aktywny kontener (z stylami i kolorem) dla danej czesci ciala
    $('.part-pickers.active').fadeOut(200, function () {

      // Usun styl 'aktywny'
      $(this).removeClass('active');

      // Ustaw nowy naglowek
      $('h2').text($this.text());

      // Pokaz kontener dla danej czesci ciala
      $('#' + $this.attr('data-toggle') + '-pickers').fadeIn(200, function () {
        // Ustaw styl 'aktywny'
        $(this).addClass('active');
      });
    });

    // Ukryj menu (w wersji mobilnej)
    handlerMenuRemove();
  });

});