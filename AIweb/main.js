// 「DOM（ドム）コンテンツが読み込まれました」というイベントを待つ
// これは、HTMLの構造が全部読み終わったよ、という合図。
// この合図を待ってからJavaScriptを実行すると安全（エラーが起きにくい）
document.addEventListener('DOMContentLoaded', () => {

  /* ==================================
     スムーススクロール機能
     ================================== */
  // 'href'属性（リンク先）が '#' で始まる <a> タグを全部見つけてくる
  // querySelectorAll は「条件に合う要素を全部（All）取ってきて」という命令
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  // 見つけてきたリンク（が複数あるかもしれない）を1つずつ処理する
  // forEach は「それぞれ（Each）に対して以下の処理（{}の中身）を実行して」という命令
  smoothScrollLinks.forEach(link => {
    
    // それぞれのリンクに「クリックされたら」というイベント監視役（リスナー）を付ける
    link.addEventListener('click', event => {
      
      // まず、ブラウザが標準で持ってる「クリックしたら一瞬で飛ぶ」動きを止める
      // preventDefault は「デフォルト（標準）の動きを防ぐ（Prevent）」という意味
      event.preventDefault();

      // クリックされたリンクの 'href' 属性（例: '#section1'）を取得する
      const href = link.getAttribute('href');

      // リンク先が '#' だけでないか、または空でないかをチェック
      if (href === '#' || href === '') {
        // トップ（document.documentElement）にスムーズにスクロール
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // 取得した href（例: '#section1'）に一致するIDを持つ要素（ジャンプ先のセクション）を探す
        // querySelector は「条件に合う最初の1個の要素を取ってきて」という命令
        const targetElement = document.querySelector(href);

        // もし、ジャンプ先の要素がちゃんとページ内に見つかったら
        if (targetElement) {
          
          // その要素（targetElement）が見える位置まで「スムーズに」スクロールする
          // これが「スルスル動く」魔法の1行！
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });

  /* ==================================
     ハンバーガーメニュー機能 (追記)
     ================================== */
  // HTMLからハンバーガーボタン（.nav-toggle）を探してくる
  const navToggle = document.querySelector('.nav-toggle');
  // HTMLからナビ本体（.global-nav）を探してくる
  const globalNav = document.querySelector('.global-nav');

  // もしボタン（navToggle）とナビ（globalNav）がどっちも見つかったら
  if (navToggle && globalNav) {
    
    // ハンバーガーボタンに「クリックされたら」という監視役を付ける
    navToggle.addEventListener('click', () => {
      
      // ボタン自体に 'is-active' というクラス名を付けたり、外したりする
      // （CSS側で、.is-active が付いたらバツ印になるように設定してる）
      navToggle.classList.toggle('is-active');
      
      // ナビ本体にも 'is-active' というクラス名を付けたり、外したりする
      // （CSS側で、.is-active が付いたら表示されるように設定してる）
      globalNav.classList.toggle('is-active');
    });
  }

}); // DOMContentLoaded の閉じカッコ