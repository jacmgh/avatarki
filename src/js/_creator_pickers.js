$(function () {

  /* ===========================================================================
   * Funkcja pomocnicza: zmiana ksztaltu i koloru
   * ======================================================================== */

  function setPreview(part, options) {

    // Ustaw styl na przekazany przez funkcje lub domyslny (wczytaj z formularza)
    var style = options.style || $('input[name=' + part + '-style').val();

    // Ustaw kolor na przekazany przez funkcje lub domyslny (wczytaj z formularza)
    var color = options.color || $('input[name=' + part + '-color]').val();

    if (part === 'eyes' || part === 'hair') {
      // Podwojne czesci (tyl/przod): oczy, wlosy

      // Przod: ustaw obrazek w podgladzie (z dana czescia ciala, wybranym 
      // stylem i kolorem)
      $('#preview-' + part + '-f').attr('src', 'creator/' + part + '-f' + '-' + style + '/' + color + '.png');

      // Ustaw neutralny kolor dla tylnego elementu oczu
      var tmpColor;
      if (part === 'eyes') {
        tmpColor = '128,128,128';
      } else {
        tmpColor = color;
      }

      // Tyl: ustaw obrazek w podgladzie (z dana czescia ciala, wybranym 
      // stylem i kolorem)
      $('#preview-' + part + '-b').attr('src', './creator/' + part + '-b' + '-' + style + '/' + tmpColor + '.png');

    } else {
      // Pozostale czesci (pojedyncze: brwi, usta, itd.)

      // Ustaw obrazek w podgladzie (z dana czescia ciala, wybranym stylem 
      // i kolorem)
      $('#preview-' + part).attr('src', './creator/' + part + '-' + style + '/' + color + '.png');

    }

    // Ustaw wartosci (styl i kolor) pol formularza (dla danej czesci ciala)
    $('input[name=' + part + '-style').val(style);
    $('input[name=' + part + '-color').val(color);

    if (part === 'body') {
      // Jesli cialo, to ustaw rowniez kolor twarzy

      // Obrazek z podgladem
      $('#preview-face').attr('src', './creator/face-' + $('input[name=face-style').val() + '/' + color + '.png');

      // Wartosc forularza
      $('input[name=face-color').val(color);
    }

  }


  /* ===========================================================================
   * Zmiana stylu
   * ======================================================================== */

  $('.style-picker').on('click', 'button', function () {
    // Po kliknieciu w button zmiany stylu

    // Wczytaj dane z buttona (ktora czesc ciala i jaki styl)
    $this = $(this);
    var part = $this.data('part');
    var style = $this.data('style').toString();

    // Ustaw obrazek z podgladem i wartosci formularza
    setPreview(part, {style: style});

    // Ustaw css 'aktywny' tylko dla tego buttona
    $('.active[data-part=' + part + ']').removeClass('active');
    $(this).addClass('active');
  });


  /* ===========================================================================
   * Zmiana koloru
   * ======================================================================== */

  // Timeout dla wtyczki, zeby ograniczyc natychmiastowe 
  // odswiezanie
  var cpTimeout;

  // Ustawienia wtyczki
  $('.color-picker').colorPicker({
    animationSpeed: 0,
    opacity: false,
    forceAlpha: false,
    renderCallback: function ($elm) {

      // Usun stary timeout, jesli nie minal odpowiedni czas i ustaw nowy
      clearTimeout(cpTimeout);
      cpTimeout = setTimeout(function () {

        // Wczytaj dane o czesci ciala i kolorze
        var part = $elm.data('part');
        var color = $elm.val();
        color = color.replace(/(rgb\(|\)|\s)/g, '');

        // Ustaw obrazek z podgladem i wartosci formularza
        setPreview(part, {color: color});
      }, 300);

    }
  });

});