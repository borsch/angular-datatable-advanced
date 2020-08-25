$(document).ready(function () {
  $('a.scrollto').on('click', function (e) {
    var target = this.hash;
    e.preventDefault();
    $('body').scrollTo(target, 800, {offset: 0, 'axis': 'y'});
  });
  $('.spoiler-trigger').click(function (e) {
    e.preventDefault();
    var target = $(this).data('target');

    $(this).toggleClass('active');
    $('#' + target).slideToggle(300);
  })
});
