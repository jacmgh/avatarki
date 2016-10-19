$(function () {
  
  $('#cookies button').on('click', function () {
    
    // ustaw nowe cookie
    document.cookie = 'cookies_message=true; expires=Mon, 01 Jan 2035 00:00:00 GMT; path=/';

    // ukryj info o cookies
    $('#cookies').fadeOut(200);
    
  });
  
});