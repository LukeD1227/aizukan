// 「DOM（ドム）コンテンツが読み込まれました」というイベントを待つ
// これは、HTMLの構造が全部読み終わったよ、という合図。
// この合図を待ってからJavaScriptを実行すると安全（エラーが起きにくい）
document.addEventListener('DOMContentLoaded', () => {

  /* ==================================
     ダークテーマ機能
     ================================== */
  // 保存されたテーマ設定を読み込む（localStorageから）
  // 'prefers-color-scheme' は、ユーザーのOSやブラウザの設定を読み取る
  const getThemePreference = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // 保存されていない場合は、OSの設定を参照
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  // テーマを適用する関数
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // ボタンのアイコンとタイトルを更新
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      if (theme === 'dark') {
        themeToggle.textContent = '☀️';
        themeToggle.setAttribute('title', 'ライトモードに切り替え');
      } else {
        themeToggle.textContent = '🌙';
        themeToggle.setAttribute('title', 'ダークモードに切り替え');
      }
    }
  };

  // ページ読み込み時に保存されたテーマを適用
  const currentTheme = getThemePreference();
  applyTheme(currentTheme);

  // テーマトグルボタンのクリックイベント
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

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