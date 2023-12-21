$(document).ready(function () {
  // Скролл для тарифов
  $('[data-scroll]').on('click', function (event) {
    event.preventDefault();
    let tarriffsId = $(this).data('scroll');
    let elementOffSet = $(tarriffsId).offset().top;
    console.log(tarriffsId);
    console.log(elementOffSet);
    $('html,body').animate({
      scrollTop: elementOffSet,
    });
  });
  // Меню
  let nav = $('#nav');
  $('#navToggle').on('click', function (event) {
    event.preventDefault();
    nav.toggleClass('show');
  });

  // Слайдер-1
  $('.review_slider').slick({
    infinite: true,
    speed: 300,
    prevArrow: $('#review_prev'),
    nextArrow: $('#review_next'),
    fade: true,
    swipe: false,
    draggable: false,
    slidesToShow: 1,
    adaptiveHeight: true,
  });

  $('.review_slider').on('afterChange', function (event, slick, currentSlide) {
    $('#review_number').text('0' + (currentSlide + 1));
  });

  // Слайдер-2
  $('#slider-1').slick({
    infinite: true,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10%',
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
    ],
  });

  // Слайдер-3
  $('#slider-2').slick({
    infinite: true,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10%',
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
    ],
  });

  // FAQ
  $('.promt__div:first').addClass('active');
  $('.promt__subtext:not(:first)').hide();
  $('.promt__text').click(function () {
    if (!$(this).parent().hasClass('active')) {
      $('.promt__subtext:visible').slideUp('fast');
      $(this).next('p').slideToggle('fast');
      $('.promt__div').removeClass('active');
      $(this).parent().toggleClass('active');
    } else {
      $('.faq_prompt p:visible').slideUp('fast');
      $('.promt__div').removeClass('active');
    }
  });


  // Форма
  function saveLocalStorage() {
    localStorage.setItem("footer-name", $("#footer-name").val());
    localStorage.setItem("footer-number", $("#footer-number").val());
    localStorage.setItem("footer-email", $("#footer-email").val());
    localStorage.setItem("footer-message", $("#footer-message").val());
    localStorage.setItem("footer-policy", $("#footer-policy").prop("checked"));
}

function loadLocalStorage() {
    if (localStorage.getItem("footer-name") !== null)
        $("#footer-name").val(localStorage.getItem("footer-name"));
    if (localStorage.getItem("footer-number") !== null)
        $("#footer-number").val(localStorage.getItem("footer-number"));
    if (localStorage.getItem("footer-email") !== null)
        $("#footer-email").val(localStorage.getItem("footer-email"));
    if (localStorage.getItem("footer-message") !== null)
        $("#footer-message").val(localStorage.getItem("footer-message"));
    if (localStorage.getItem("footer-policy") !== null) {
        $("#footer-policy").prop("checked", localStorage.getItem("footer-policy") === "true");
        if ($("#footer-policy").prop("checked"))
            $("#sendButton").removeAttr("disabled");
    }
}
function clear() {
    localStorage.clear()
    $("#footer-name").val("");
    $("#footer-number").val("");
    $("#footer-email").val("");
    $("#footer-message").val("");
    $("#footer-policy").val(false);
}

$(document).ready(function() {
    loadLocalStorage();
    $("#footer-form").submit(function(e) {
        e.preventDefault();
        let data =  $(this).serialize();
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "https://formcarry.com/s/BhW6BYBtdi",
            data: data,
            success: function(response){
                if(response.status == "success"){
                    alert("Success!");
                    clear();
                } else {
                    alert("Error: " + response.message);
                }
            }
        });
    });
    $("#footer-policy").change(function() {
        if((!this.checked)&&(grecaptcha.getResponse() === ""))
        $("#sendButton").attr("disabled", "");    
        else
        $("#sendButton").removeAttr("disabled");
    })
    $("#form").change(saveLocalStorage);
})

});
