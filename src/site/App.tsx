import { useEffect, useState } from 'react';

type Language = 'en' | 'ja' | 'my';
type Filter = 'all' | 'web' | 'ui' | 'app';
type Project = { title: string; category: Filter[]; image: string; tags: string[]; description: Record<Language, string>; number: string; featured?: boolean };

const copy = {
  en: {
    nav: ['About', 'Work', 'Contact'], eyebrow: 'WEB DEVELOPER · CLOUD ENGINEERING FOCUS', intro: 'I build for the cloud', accent: 'and the people who use it.', rolePrefix: 'I AM', role: ['Aspiring Cloud Engineer', 'Web Developer', 'Cloud Engineering Learner'], summary: 'I’m Han Wai Htun, a web developer in Osaka transitioning toward cloud engineering. I’m building on my web foundations while learning how to deploy and support reliable cloud experiences.', work: 'Explore selected work', available: 'OPEN TO CLOUD & WEB OPPORTUNITIES', aboutLabel: 'A LITTLE ABOUT ME', aboutTitle: 'Curious by nature.\nBuilding toward the cloud.', aboutText: 'I studied web development at MMS-IT and am now growing toward cloud engineering. I’m strengthening my foundations in cloud infrastructure, networking, and deployment while building practical projects.', skillsLabel: 'LANGUAGES & TOOLS ON GITHUB', skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SCSS', 'TypeScript', 'Java', 'SQL'], projectsLabel: 'SELECTED PROJECTS', projectsTitle: 'A few things I’ve made.', projectsIntro: 'A collection of projects from my portfolio. Open an image to take a closer look.', filters: { all: 'All work', web: 'Web', ui: 'UI', app: 'Apps' }, contactLabel: 'HAVE A PROJECT IN MIND?', contactTitle: 'Let’s make it\nwork beautifully.', contactText: 'Looking for a web developer or want to talk about an idea? I’d be glad to hear from you.', email: 'Email me', location: 'Osaka, Japan', footer: 'DESIGNED & BUILT WITH CARE', image: 'View project image', projectCount: 'PUBLIC REPOS', languages: 'CODE LANGUAGES', focus: 'CLOUD FOCUS', themeLight: 'Switch to light theme', themeDark: 'Switch to dark theme', menu: 'Open menu',
  },
  ja: {
    nav: ['自己紹介', '制作実績', '連絡先'], eyebrow: 'WEB DEVELOPER · CLOUD ENGINEERING FOCUS', intro: 'クラウドを通じて', accent: '人に届く体験を。', rolePrefix: '私は', role: ['クラウドエンジニアを目指しています', 'Web開発者', 'クラウド技術を学習中'], summary: '大阪を拠点に活動するハン・ウェイ・トゥンです。Web開発の経験を土台に、信頼性の高いクラウド環境の構築・運用を学んでいます。', work: '制作実績を見る', available: 'クラウド・Web分野の機会を探しています', aboutLabel: '私について', aboutTitle: '好奇心を大切に。\nクラウドの未来へ。', aboutText: 'MMS-ITでWeb開発を学び、現在はクラウドエンジニアを目指しています。クラウドインフラ、ネットワーク、デプロイの基礎を学びながら、実践的なプロジェクトに取り組んでいます。', skillsLabel: 'GitHubで使用している言語', skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SCSS', 'TypeScript', 'Java', 'SQL'], projectsLabel: '制作実績', projectsTitle: 'これまでに作ったもの。', projectsIntro: 'ポートフォリオに掲載しているプロジェクトです。画像を開いてご覧ください。', filters: { all: 'すべて', web: 'Web', ui: 'UI', app: 'アプリ' }, contactLabel: 'プロジェクトのご相談', contactTitle: '一緒に、素敵な\nWebを作りましょう。', contactText: 'Web開発のご相談やアイデアについて、お気軽にご連絡ください。', email: 'メールを送る', location: '日本・大阪', footer: '心を込めてデザイン・制作', image: 'プロジェクト画像を見る', projectCount: '公開リポジトリ', languages: 'コード言語', focus: 'クラウド分野', themeLight: 'ライトテーマに切替', themeDark: 'ダークテーマに切替', menu: 'メニューを開く',
  },
  my: {
    nav: ['မိတ်ဆက်', 'လက်ရာများ', 'ဆက်သွယ်ရန်'], eyebrow: 'WEB DEVELOPER · CLOUD ENGINEERING FOCUS', intro: 'Cloud အတွက်', accent: 'အသုံးဝင်တဲ့ Web တွေ တည်ဆောက်မယ်။', rolePrefix: 'ကျွန်တော်က', role: ['Cloud Engineer ဖြစ်ဖို့ ရည်မှန်းထားသူ', 'Web Developer', 'Cloud Engineering ကို လေ့လာနေသူ'], summary: 'ကျွန်တော် ဟန်ဝေထွန်းပါ။ Osaka မှာနေထိုင်ပြီး Web Development အခြေခံကနေ Cloud Engineering ဘက်ကို တက်လှမ်းနေပါတယ်။ Cloud ပေါ်မှာ ယုံကြည်စိတ်ချရတဲ့ app တွေ တင်ပြီး ထိန်းသိမ်းနိုင်ဖို့ ဆက်လက်လေ့လာနေပါတယ်။', work: 'လက်ရာများကိုကြည့်ရန်', available: 'Cloud နှင့် Web အလုပ်အကိုင်အခွင့်အလမ်း ရှာဖွေနေပါသည်', aboutLabel: 'ကျွန်တော့်အကြောင်း', aboutTitle: 'စူးစမ်းလေ့လာရတာကြိုက်တယ်။\nCloud နယ်ပယ်ဆီ တက်လှမ်းနေတယ်။', aboutText: 'MMS-IT မှာ Web Development ကို သင်ယူခဲ့ပြီး အခု Cloud Engineer ဖြစ်ဖို့ ရည်မှန်းလေ့လာနေပါတယ်။ Cloud infrastructure၊ networking နဲ့ deployment အခြေခံတွေကို လေ့လာရင်း လက်တွေ့ project တွေ တည်ဆောက်သွားပါမယ်။', skillsLabel: 'GitHub မှာသုံးထားတဲ့ programming language များ', skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SCSS', 'TypeScript', 'Java', 'SQL'], projectsLabel: 'ရွေးချယ်ထားသော လက်ရာများ', projectsTitle: 'ကျွန်တော် ဖန်တီးထားတာတွေ။', projectsIntro: 'Portfolio မှာရှိပြီးသား project များကို စုစည်းပြထားပါတယ်။ ပုံကိုနှိပ်ပြီး အကြီးကြည့်နိုင်ပါတယ်။', filters: { all: 'အားလုံး', web: 'Web', ui: 'UI', app: 'Apps' }, contactLabel: 'အကြံဉာဏ်တစ်ခုရှိပါသလား?', contactTitle: 'အတူတူ ကောင်းမွန်တဲ့\nWeb တစ်ခု ဖန်တီးကြရအောင်။', contactText: 'Web developer ရှာနေပါသလား၊ idea တစ်ခုအကြောင်း ဆွေးနွေးချင်ပါသလား? အီးမေးလ်ပို့လို့ရပါတယ်။', email: 'အီးမေးလ်ပို့ရန်', location: 'အိုဆာကာ၊ ဂျပန်', footer: 'ဂရုတစိုက် ဒီဇိုင်းရေးဆွဲ ဖန်တီးထားသည်', image: 'Project ပုံကိုကြည့်ရန်', projectCount: 'PUBLIC REPOS', languages: 'CODE LANGUAGES', focus: 'CLOUD FOCUS', themeLight: 'အလင်း theme သို့ပြောင်းရန်', themeDark: 'အမှောင် theme သို့ပြောင်းရန်', menu: 'Menu ဖွင့်ရန်',
  },
} satisfies Record<Language, Record<string, any>>;

const projects: Project[] = [
  { number: '01', title: 'Personal Portfolio', category: ['web', 'ui'], image: '/img/portfolio-01.jpg', tags: ['HTML', 'CSS', 'JavaScript'], featured: true, description: { en: 'A personal portfolio exploring clear storytelling, adaptable themes, and a responsive layout.', ja: '読みやすいストーリーとテーマ切替、レスポンシブデザインを試したポートフォリオ。', my: 'အကြောင်းအရာကို ရှင်းရှင်းလင်းလင်းတင်ပြပြီး theme နှင့် screen အရွယ်အစားလိုက် ပြောင်းလဲအသုံးပြုနိုင်သော portfolio။' } },
  { number: '02', title: 'Landing Page', category: ['web', 'ui'], image: '/img/portfolio-02.jpg', tags: ['UI', 'Responsive', 'Web'], description: { en: 'A focused page concept with a clear call to action and mobile-friendly composition.', ja: '明確な導線とモバイル対応を意識したランディングページ。', my: 'CTA ရှင်းလင်းပြီး mobile နဲ့လည်း အဆင်ပြေစေဖို့ စီစဉ်ထားတဲ့ landing page။' } },
  { number: '03', title: 'Task Manager', category: ['app'], image: '/img/todolist.png', tags: ['JavaScript', 'LocalStorage', 'App'], featured: true, description: { en: 'A to-do app concept with quick actions, filters, and local storage.', ja: 'クイック操作、絞り込み、ローカル保存に対応したタスクアプリ。', my: 'အလုပ်စာရင်းတွေကို filter လုပ်နိုင်ပြီး browser ထဲမှာ သိမ်းထားနိုင်တဲ့ to-do app။' } },
  { number: '04', title: 'Product Showcase', category: ['ui'], image: '/img/portfolio-04.jpg', tags: ['UI', 'Grid', 'UX'], description: { en: 'A product display concept using a clear grid and modular visual sections.', ja: '見やすいグリッドとモジュール構成を使った商品紹介ページ。', my: 'ကြည့်ရလွယ်ကူတဲ့ grid နဲ့ အပိုင်းလိုက်တည်ဆောက်ထားတဲ့ product showcase။' } },
  { number: '05', title: 'Photo Gallery', category: ['web', 'ui'], image: '/img/portfolio-03.jpg', tags: ['Gallery', 'Lightbox', 'UI'], description: { en: 'A minimal gallery concept that puts photography first.', ja: '写真を主役にしたシンプルなギャラリー。', my: 'ဓာတ်ပုံတွေကို အဓိကထားပြသတဲ့ ရိုးရှင်းသော gallery။' } },
  { number: '06', title: 'Blog UI Concept', category: ['app', 'ui'], image: '/img/portfolio-05.jpg', tags: ['Typography', 'Cards', 'UI'], description: { en: 'A readable editorial layout with card previews, clear type hierarchy, and tags.', ja: 'カード形式のプレビュー、文字の階層、タグを使った読みやすいレイアウト。', my: 'ဖတ်ရလွယ်ကူတဲ့ editorial layout၊ preview card နဲ့ tag တွေ ပါဝင်ပါတယ်။' } },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="arrow-icon"><path d={diagonal ? 'M7 17 17 7M8 7h9v9' : 'M4 12h15m-6-6 6 6-6 6'} /></svg>;
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (requested === 'en' || requested === 'ja' || requested === 'my') return requested;
    const saved = localStorage.getItem('portfolio-language');
    return saved === 'en' || saved === 'ja' || saved === 'my' ? saved : 'en';
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('portfolio-theme') as 'light' | 'dark') || 'light');
  const [filter, setFilter] = useState<Filter>('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeImage, setActiveImage] = useState<Project | null>(null);
  const t = copy[language];
  const visibleProjects = projects.filter((project) => filter === 'all' || project.category.includes(filter));

  useEffect(() => { document.documentElement.lang = language; document.title = language === 'ja' ? 'ハン・ウェイ・トゥン — Cloud Engineering' : language === 'my' ? 'ဟန်ဝေထွန်း — Cloud Engineering' : 'Han Wai Htun — Cloud Engineering'; localStorage.setItem('portfolio-language', language); }, [language]);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('portfolio-theme', theme); }, [theme]);
  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 64);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);
  useEffect(() => { const timer = window.setInterval(() => setRoleIndex((index) => (index + 1) % t.role.length), 2600); return () => window.clearInterval(timer); }, [t.role]);
  useEffect(() => {
    if (!activeImage) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setActiveImage(null); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [activeImage]);

  return <>
    <div className="topbar-shell"><header className={isScrolled ? 'topbar topbar-scrolled' : 'topbar'}><a className="wordmark" href="#home" aria-label="Han Wai Htun home"><svg className="brand-cloud" aria-hidden="true" viewBox="0 0 40 32"><path d="M10.4 25.5h19a7.3 7.3 0 0 0 .6-14.6A10.1 10.1 0 0 0 11 9.4a8.1 8.1 0 0 0-.6 16.1Z"/><path d="M14.8 21V15h4.5v6m-4.5-3h4.5m3.1-3v6h4"/><circle cx="31.4" cy="7.3" r="2"/></svg><span className="brand-text">HW<span>.</span></span></a>
      <button className="menu-toggle" aria-label={t.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation">{t.nav.map((item, index) => <a key={item} href={['#about', '#work', '#contact'][index]} onClick={() => setMenuOpen(false)}><span className="nav-index">0{index + 1}</span>{item}</a>)}
        <div className="nav-tools"><div className="language-switch" aria-label="Language">{(['en', 'ja', 'my'] as const).map((code) => <button key={code} aria-pressed={language === code} onClick={() => setLanguage(code)}>{code.toUpperCase()}</button>)}</div>
          <button className="theme-toggle" aria-label={theme === 'light' ? t.themeDark : t.themeLight} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}><span>{theme === 'light' ? '◐' : '☼'}</span></button></div>
      </nav>
    </header></div>

    <main id="home">
      <section className="hero page-wrap"><div className="hero-copy"><p className="eyebrow"><span className="status-dot" />{t.eyebrow}</p><h1>{t.intro}<br /><span className="hero-accent">{t.accent}</span></h1><div className="role-line"><span className="role-prefix">{t.rolePrefix}</span><span className="role-value" key={`${language}-${roleIndex}`}>{t.role[roleIndex]}</span><span className="cursor" /></div><p className="hero-summary">{t.summary}</p><div className="hero-actions"><a className="button button-dark" href="#work">{t.work}<Arrow /></a><span className="availability"><span className="status-dot" />{t.available}</span></div></div>
        <div className="hero-visual"><div className="portrait-frame"><span className="cloud-pulse" aria-hidden="true" /><span className="cloud-path" aria-hidden="true">CLOUD<br />ENGINEERING</span><img src="/img/me_1.png" alt="Han Wai Htun" /><span className="portrait-label">HAN WAI HTUN<br />CLOUD ENGINEERING · WEB</span></div><span className="orbit orbit-one" /><span className="orbit orbit-two" /><div className="hero-side-note">CLOUD<br />WEB · CODE</div><span className="visual-cross cross-one">+</span><span className="visual-cross cross-two">+</span></div>
        <div className="hero-bottom"><span>OSAKA, JP</span><span>SCROLL TO EXPLORE <span className="scroll-line" /></span><span>CLOUD · WEB · CODE</span></div>
      </section>

      <section className="intro-strip" id="about"><div className="page-wrap intro-grid"><p className="eyebrow">{t.aboutLabel}</p><h2>{t.aboutTitle.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h2><div className="intro-copy"><p>{t.aboutText}</p><a href="#contact" className="text-link">{t.nav[2]} <Arrow /></a></div><div className="quick-stats"><div><strong>34</strong><span>{t.projectCount}</span></div><div><strong>08</strong><span>{t.languages}</span></div><div><strong>01</strong><span>{t.focus}</span></div></div><div className="skills-block"><p className="eyebrow">{t.skillsLabel}</p><div className="skill-list">{t.skills.map((skill, index) => <span key={skill}><i>{String(index + 1).padStart(2, '0')}</i>{skill}</span>)}</div></div></div></section>

      <section id="work" className="work-section page-wrap"><div className="section-heading"><div><p className="eyebrow">{t.projectsLabel}</p><h2>{t.projectsTitle}</h2></div><p className="section-intro">{t.projectsIntro}</p></div><div className="project-toolbar"><span>WEB · UI · APP</span><div className="filter-list">{(['all', 'web', 'ui', 'app'] as const).map((key) => <button key={key} className={filter === key ? 'filter-button active' : 'filter-button'} aria-pressed={filter === key} onClick={() => setFilter(key)}>{t.filters[key]}</button>)}</div><span>{String(visibleProjects.length).padStart(2, '0')} / 06</span></div>
        <div className="project-grid">{visibleProjects.map((project, index) => <article className={`project-card ${project.featured ? 'project-featured' : ''}`} key={project.number} style={{ animationDelay: `${index * 70}ms` }}><button className="project-image" onClick={() => setActiveImage(project)} aria-label={`${t.image}: ${project.title}`}><img src={project.image} alt={project.title} loading="lazy" /><span className="image-open"><Arrow diagonal /></span><span className="image-number">{project.number} / 06</span></button><div className="project-meta"><span>{project.category.map((category) => t.filters[category]).join(' / ')}</span><span>{project.number}</span></div><div className="project-title-row"><h3>{project.title}</h3><button className="round-arrow" onClick={() => setActiveImage(project)} aria-label={`${t.image}: ${project.title}`}><Arrow diagonal /></button></div><p className="project-description">{project.description[language]}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div>
      </section>

      <section className="contact-section" id="contact"><div className="page-wrap contact-inner"><div><p className="eyebrow">{t.contactLabel}</p><h2>{t.contactTitle.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h2></div><div className="contact-aside"><p>{t.contactText}</p><a className="button button-light" href="https://mail.google.com/mail/?view=cm&fs=1&to=hanwaihtun1e%40gmail.com" target="_blank" rel="noreferrer">{t.email}<Arrow /></a><div className="social-links"><a href="https://github.com/Jack13-Han" target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a><a href="https://www.linkedin.com/in/han-wai-htun-35b337269/" target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a></div><span className="contact-location">{t.location} · <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hanwaihtun1e%40gmail.com" target="_blank" rel="noreferrer">hanwaihtun1e@gmail.com</a></span></div><span className="contact-mark">LET’S<br />TALK<span>↗</span></span></div></section>
    </main>
    <footer className="footer page-wrap"><a className="wordmark" href="#home" aria-label="Han Wai Htun home"><svg className="brand-cloud" aria-hidden="true" viewBox="0 0 40 32"><path d="M10.4 25.5h19a7.3 7.3 0 0 0 .6-14.6A10.1 10.1 0 0 0 11 9.4a8.1 8.1 0 0 0-.6 16.1Z"/><path d="M14.8 21V15h4.5v6m-4.5-3h4.5m3.1-3v6h4"/><circle cx="31.4" cy="7.3" r="2"/></svg><span className="brand-text">HW<span>.</span></span></a><span>{t.footer} · © 2026 HAN WAI HTUN</span><a href="#home">BACK TO TOP ↑</a></footer>
    {activeImage && <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeImage.title} onClick={() => setActiveImage(null)}><button className="lightbox-close" aria-label="Close" onClick={() => setActiveImage(null)}>×</button><img src={activeImage.image} alt={activeImage.title} onClick={(event) => event.stopPropagation()} /><p>{activeImage.number} — {activeImage.title}</p></div>}
  </>;
}

