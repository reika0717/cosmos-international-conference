$(function () {
  /* functions
   ---------------------------------------------------- */

  $(".hamburger").on("click", function () {
    $("#global-nav").fadeToggle(function () {
      if (!$(this).is(":visible")) {
        $("#global-nav .nav__list-parent").removeClass("show");
      }
    });
    $("#global-nav .nav__list-parent").each(function (i) {
      let delay = 50;
      $(this)
        .delay(i * delay)
        .queue(function (next) {
          $(this).addClass("show");
          next();
        });
    });
  });

  //URLのハッシュ値を取得
  var urlHash = location.hash;
  //ハッシュ値があればページ内スクロール
  if (urlHash) {
    //スクロールを0に戻す
    $("body,html").stop().scrollTop(0);
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
    var hash = href == "#" || href == "" ? "html" : href;
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
    $("body,html").stop().animate(
      {
        scrollTop: position,
      },
      500
    );
  }

  var client = contentful.createClient({
    space: "nl18ogxireh6",
    accessToken: "PzDWKCS691VB0eOhvIaEkRECKA_5NodC0zNlyeP0fT8",
  });

  const fileName = window.location.href.split("/").pop();
  const currentPath = fileName.replace(".html", "");

  client
    .getEntries({
      content_type: "contents",
    })
    .then((entries) => {
      let contents = entries.items.find(
        (item) => item.fields.name === currentPath
      ).fields.text;
      var md = window.markdownit({
        breaks: true,
        html: true,
      });
      contents = md.render(contents);
      // console.log(contents);
      // let domparser = new DOMParser();
      // console.log(domparser.parseFromString(contents, "text/html"));
      $(".content-box__wrapper").html(contents);
    })
    .catch(console.error);
});
