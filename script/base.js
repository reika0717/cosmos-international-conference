$(function () {
  /* functions
   ---------------------------------------------------- */
  const fileName = window.location.href.split('/').pop();
  if (fileName === 'index.html') {
    $('.scroll-btn').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
      }, 500, 'linear');
    });
  }


  $('.hamburger').on('click', function () {
    $('#global-nav').slideToggle()
  })

  //URLのハッシュ値を取得
  var urlHash = location.hash;
  //ハッシュ値があればページ内スクロール
  if (urlHash) {
    //スクロールを0に戻す
    $('body,html').stop().scrollTop(0);
    setTimeout(function () {
      //ロード時の処理を待ち、時間差でスクロール実行
      scrollToAnker(urlHash);
    }, 100);
  }

  //通常のクリック時
  $('a[href^="#"]').click(function () {
    //ページ内リンク先を取得
    var href = $(this).attr("href");
    //リンク先が#か空だったらhtmlに
    var hash = href == "#" || href == "" ? 'html' : href;
    //スクロール実行
    scrollToAnker(hash);
    //リンク無効化
    return false;
  });

  // 関数：スムーススクロール
  // 指定したアンカー(#ID)へアニメーションでスクロール
  function scrollToAnker(hash) {
    var target = $(hash);
    var position = target.offset().top;
    $('body,html').stop().animate({
      scrollTop: position
    }, 500);
  }

  var client = contentful.createClient({
    space: 'nl18ogxireh6',
    accessToken: 'PzDWKCS691VB0eOhvIaEkRECKA_5NodC0zNlyeP0fT8'
  })

  const currentPath = fileName.replace('.html', '')

  client
    .getEntries({
      content_type: "contents"
    })
    .then(entries => {
      let contents = entries.items.find(item => item.fields.name === currentPath).fields.text
      var md = window.markdownit();
      contents = md.render(contents);
      $(".content-box__wrapper").html(contents)
      
    })
    .catch(console.error);
});