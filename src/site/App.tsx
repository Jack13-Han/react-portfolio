import { useEffect, useState } from 'react';

type Language = 'en' | 'ja' | 'my';
type Project = { title: string; subtitle: Record<Language, string>; description: Record<Language, string>; features: Record<Language, string[]>; category: string; image: string; background: string; tags: string[]; github: string; demo: string };

const copy = {
  en: {
    nav: ['About', 'Work', 'Contact'], eyebrow: 'WEB DEVELOPER · CLOUD ENGINEERING FOCUS', intro: 'I build for the cloud', accent: 'and the people who use it.', rolePrefix: 'I AM', role: ['Aspiring Cloud Engineer', 'Web Developer', 'Cloud Engineering Learner'], summary: 'I’m Han Wai Htun, a web developer in Osaka transitioning toward cloud engineering. I’m building on my web foundations while learning how to deploy and support reliable cloud experiences.', work: 'Explore selected work', available: 'OPEN TO CLOUD & WEB OPPORTUNITIES', aboutLabel: 'A LITTLE ABOUT ME', aboutTitle: 'Curious by nature.\nBuilding toward the cloud.', aboutText: 'I studied web development at MMS-IT and am now growing toward cloud engineering. I’m strengthening my foundations in cloud infrastructure, networking, and deployment while building practical projects.', skillsLabel: 'LANGUAGES & TOOLS ON GITHUB', skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SCSS', 'TypeScript', 'Java', 'SQL'], projectsLabel: 'REPRESENTATIVE WORK', projectsTitle: 'Featured Projects', projectsIntro: 'Real applications, built from ideas into working products.', filters: { all: 'All work', web: 'Web', ui: 'UI', app: 'Apps' }, contactLabel: 'HAVE A PROJECT IN MIND?', contactTitle: 'Let’s make it\nwork beautifully.', contactText: 'Looking for a web developer or want to talk about an idea? I’d be glad to hear from you.', email: 'Email me', location: 'Osaka, Japan', footer: 'DESIGNED & BUILT WITH CARE', image: 'View project image', projectCount: 'PUBLIC REPOS', languages: 'CODE LANGUAGES', focus: 'CLOUD FOCUS', themeLight: 'Switch to light theme', themeDark: 'Switch to dark theme', menu: 'Open menu', github: 'GitHub repository', demo: 'Open demo', featureHeading: 'WHAT IT DOES',
  },
  ja: {
    nav: ['自己紹介', '制作実績', '連絡先'], eyebrow: 'WEB DEVELOPER · CLOUD ENGINEERING FOCUS', intro: 'クラウドを通じて', accent: '人に届く体験を。', rolePrefix: '私は', role: ['クラウドエンジニアを目指しています', 'Web開発者', 'クラウド技術を学習中'], summary: '大阪を拠点に活動するハン・ウェイ・トゥンです。Web開発の経験を土台に、信頼性の高いクラウド環境の構築・運用を学んでいます。', work: '制作実績を見る', available: 'クラウド・Web分野の機会を探しています', aboutLabel: '私について', aboutTitle: '好奇心を大切に。\nクラウドの未来へ。', aboutText: 'MMS-ITでWeb開発を学び、現在はクラウドエンジニアを目指しています。クラウドインフラ、ネットワーク、デプロイの基礎を学びながら、実践的なプロジェクトに取り組んでいます。', skillsLabel: 'GitHubで使用している言語', skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SCSS', 'TypeScript', 'Java', 'SQL'], projectsLabel: '代表制作', projectsTitle: '代表制作', projectsIntro: 'アイデアを実際のプロダクトにしたプロジェクトをご紹介します。', filters: { all: 'すべて', web: 'Web', ui: 'UI', app: 'アプリ' }, contactLabel: 'プロジェクトのご相談', contactTitle: '一緒に、素敵な\nWebを作りましょう。', contactText: 'Web開発のご相談やアイデアについて、お気軽にご連絡ください。', email: 'メールを送る', location: '日本・大阪', footer: '心を込めてデザイン・制作', image: 'プロジェクト画像を見る', projectCount: '公開リポジトリ', languages: 'コード言語', focus: 'クラウド分野', themeLight: 'ライトテーマに切替', themeDark: 'ダークテーマに切替', menu: 'メニューを開く', github: 'GitHubリポジトリ', demo: 'デモを開く', featureHeading: '主な機能',
  },
  my: {
    nav: ['မိတ်ဆက်', 'လက်ရာများ', 'ဆက်သွယ်ရန်'], eyebrow: 'WEB DEVELOPER · CLOUD ENGINEERING FOCUS', intro: 'Cloud အတွက်', accent: 'အသုံးဝင်တဲ့ Web တွေ တည်ဆောက်မယ်။', rolePrefix: 'ကျွန်တော်က', role: ['Cloud Engineer ဖြစ်ဖို့ ရည်မှန်းထားသူ', 'Web Developer', 'Cloud Engineering ကို လေ့လာနေသူ'], summary: 'ကျွန်တော် ဟန်ဝေထွန်းပါ။ Osaka မှာနေထိုင်ပြီး Web Development အခြေခံကနေ Cloud Engineering ဘက်ကို တက်လှမ်းနေပါတယ်။ Cloud ပေါ်မှာ ယုံကြည်စိတ်ချရတဲ့ app တွေ တင်ပြီး ထိန်းသိမ်းနိုင်ဖို့ ဆက်လက်လေ့လာနေပါတယ်။', work: 'လက်ရာများကိုကြည့်ရန်', available: 'Cloud နှင့် Web အလုပ်အကိုင်အခွင့်အလမ်း ရှာဖွေနေပါသည်', aboutLabel: 'ကျွန်တော့်အကြောင်း', aboutTitle: 'စူးစမ်းလေ့လာရတာကြိုက်တယ်။\nCloud နယ်ပယ်ဆီ တက်လှမ်းနေတယ်။', aboutText: 'MMS-IT မှာ Web Development ကို သင်ယူခဲ့ပြီး အခု Cloud Engineer ဖြစ်ဖို့ ရည်မှန်းလေ့လာနေပါတယ်။ Cloud infrastructure၊ networking နဲ့ deployment အခြေခံတွေကို လေ့လာရင်း လက်တွေ့ project တွေ တည်ဆောက်သွားပါမယ်။', skillsLabel: 'GitHub မှာသုံးထားတဲ့ programming language များ', skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SCSS', 'TypeScript', 'Java', 'SQL'], projectsLabel: 'ကိုယ်စားပြု ပရောဂျက်များ', projectsTitle: 'ကိုယ်စားပြုလုပ်ထားသော project များ', projectsIntro: 'တကယ်ဖန်တီးထားတဲ့ app တွေကို project တစ်ခုချင်း အသေးစိတ် ကြည့်နိုင်ပါတယ်။', filters: { all: 'အားလုံး', web: 'Web', ui: 'UI', app: 'Apps' }, contactLabel: 'အကြံဉာဏ်တစ်ခုရှိပါသလား?', contactTitle: 'အတူတူ ကောင်းမွန်တဲ့\nWeb တစ်ခု ဖန်တီးကြရအောင်။', contactText: 'Web developer ရှာနေပါသလား၊ idea တစ်ခုအကြောင်း ဆွေးနွေးချင်ပါသလား? အီးမေးလ်ပို့လို့ရပါတယ်။', email: 'အီးမေးလ်ပို့ရန်', location: 'အိုဆာကာ၊ ဂျပန်', footer: 'ဂရုတစိုက် ဒီဇိုင်းရေးဆွဲ ဖန်တီးထားသည်', image: 'Project ပုံကိုကြည့်ရန်', projectCount: 'PUBLIC REPOS', languages: 'CODE LANGUAGES', focus: 'CLOUD FOCUS', themeLight: 'အလင်း theme သို့ပြောင်းရန်', themeDark: 'အမှောင် theme သို့ပြောင်းရန်', menu: 'Menu ဖွင့်ရန်', github: 'GitHub repository', demo: 'Demo ဖွင့်ရန်', featureHeading: 'ပါဝင်တဲ့လုပ်ဆောင်ချက်များ',
  },
} satisfies Record<Language, Record<string, any>>;

const projects: Project[] = [
  { title: 'Pet Saver', category: 'PERSONAL PROJECT', image: 'https://raw.githubusercontent.com/Jack13-Han/pet_saver/main/frontend/src/assets/pets/cat_idle.png', background: 'https://raw.githubusercontent.com/Jack13-Han/pet_saver/main/frontend/src/assets/backgrounds/pet-room-bg.png', tags: ['React', 'PHP', 'MySQL', 'Vite', 'Gemini AI'], github: 'https://github.com/Jack13-Han/pet_saver', demo: 'https://petsaver.infy.click/', subtitle: { en: 'A gamified savings & spending app', ja: 'ゲーム感覚の貯金・支出管理アプリ', my: 'ဂိမ်းကစားသလို ငွေစုခြင်းနှင့် အသုံးစရိတ် စီမံခန့်ခွဲမှု app' }, description: { en: 'A full-stack personal finance app where savings goals and daily spending help you care for a virtual pet. Built with React, PHP, and MySQL, with receipt scanning powered by Gemini AI.', ja: '貯金目標や日々の支出を管理しながら、バーチャルペットを育てるフルスタック家計管理アプリです。React、PHP、MySQLを使用し、Gemini AIによるレシート読み取り機能も備えています。', my: 'ငွေစုရည်မှန်းချက်နှင့် နေ့စဉ်အသုံးစရိတ်ကို စီမံရင်း virtual pet ကို ပြုစုနိုင်တဲ့ full-stack finance app ဖြစ်ပါတယ်။ React၊ PHP၊ MySQL ကိုသုံးထားပြီး Gemini AI နဲ့ receipt scan လုပ်နိုင်ပါတယ်။' }, features: { en: ['Login & user authentication', 'Savings goals and progress tracking', 'Deposit and withdrawal records', 'Pet reactions, care, and rewards', 'Receipt scanning with Gemini AI', 'Spending insights and charts'], ja: ['ログイン・ユーザー認証', '貯金目標と進捗管理', '入金・出金の記録', 'ペットのリアクション・お世話・報酬', 'Gemini AIによるレシート読み取り', '支出分析とチャート'], my: ['Login နှင့် user authentication', 'Savings goal နှင့် progress tracking', 'ငွေသွင်း၊ ငွေထုတ်မှတ်တမ်း', 'Pet တုံ့ပြန်မှု၊ ပြုစုမှုနှင့် reward', 'Gemini AI ဖြင့် receipt ဖတ်ခြင်း', 'အသုံးစရိတ် analysis နှင့် chart'] } },
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const t = copy[language];

  useEffect(() => { document.documentElement.lang = language; document.title = language === 'ja' ? 'ハン・ウェイ・トゥン — Cloud Engineering' : language === 'my' ? 'ဟန်ဝေထွန်း — Cloud Engineering' : 'Han Wai Htun — Cloud Engineering'; localStorage.setItem('portfolio-language', language); }, [language]);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('portfolio-theme', theme); }, [theme]);
  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 64);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);
  useEffect(() => { const timer = window.setInterval(() => setRoleIndex((index) => (index + 1) % t.role.length), 2600); return () => window.clearInterval(timer); }, [t.role]);

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

      <section id="work" className="work-section">
        <div className="work-heading"><p className="eyebrow">{t.projectsLabel}</p><h2>{t.projectsTitle}</h2><p>{t.projectsIntro}</p></div>
        <div className="project-showcases">{projects.map((project) => <article className="showcase-card" key={project.title}>
          <div className="showcase-copy"><span className="project-badge">✳ &nbsp;{project.category}</span><h3>{project.title}</h3><h4>{project.subtitle[language]}</h4><p className="showcase-description">{project.description[language]}</p>
            <div className="showcase-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <ul className="showcase-features">{project.features[language].map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <div className="showcase-actions"><a className="showcase-link showcase-link-primary" href={project.github} target="_blank" rel="noreferrer">{t.github}<Arrow diagonal /></a><a className="showcase-link" href={project.demo} target="_blank" rel="noreferrer">{t.demo}<Arrow diagonal /></a></div>
          </div>
          <div className="showcase-visual" style={{ backgroundImage: `linear-gradient(135deg,rgba(255,250,242,.34),rgba(255,250,242,.08)),url("${project.background}")` }} aria-label={`${project.title} app preview`}>
            <div className="app-preview"><div className="app-preview-top"><span className="app-preview-brand"><i>✿</i> Pet Saver</span><span>{language === 'ja' ? 'ホーム　目標　支出' : language === 'my' ? 'ပင်မ　ရည်မှန်းချက်　အသုံးစရိတ်' : 'Home　Goals　Spending'}</span><b>●</b></div>
              <div className="app-preview-content"><aside className="app-preview-sidebar"><strong>Pet Saver</strong><span>⌂ &nbsp;{language === 'ja' ? 'ホーム' : language === 'my' ? 'ပင်မစာမျက်နှာ' : 'Dashboard'}</span><span>◎ &nbsp;{language === 'ja' ? '貯金目標' : language === 'my' ? 'ငွေစုရည်မှန်းချက်' : 'Savings goals'}</span><span>↗ &nbsp;{language === 'ja' ? '支出' : language === 'my' ? 'အသုံးစရိတ်' : 'Expenses'}</span><span>▤ &nbsp;{language === 'ja' ? 'レポート' : language === 'my' ? 'အစီရင်ခံစာ' : 'Reports'}</span></aside>
                <div className="app-preview-main"><div className="preview-greeting"><div><small>WELCOME BACK</small><strong>{language === 'ja' ? '今日も貯金を続けよう！' : language === 'my' ? 'ဒီနေ့လည်း ငွေစုကြမယ်!' : 'Keep saving today!'}</strong></div><span>◉</span></div><div className="preview-dashboard"><div className="preview-pet-card"><div><small>YOUR PET</small><strong>Mochi</strong><p>✦ Growing with your savings</p></div><img src={project.image} alt="Pet Saver cat mascot" loading="lazy" /></div><div className="preview-goal"><small>{language === 'ja' ? '貯金の進捗' : language === 'my' ? 'ငွေစုတိုးတက်မှု' : 'SAVINGS PROGRESS'}</small><strong>━━━●━━━━</strong><span>{language === 'ja' ? '目標に向かって進んでいます' : language === 'my' ? 'ရည်မှန်းချက်ဆီ တိုးတက်နေပါတယ်' : 'You are making progress'}</span></div><div className="preview-quest"><span>✦ &nbsp;{language === 'ja' ? 'デイリークエスト' : language === 'my' ? 'နေ့စဉ်လုပ်ဆောင်ချက်' : 'Daily quest'}</span><b>{language === 'ja' ? '完了' : language === 'my' ? 'ပြီးပါပြီ' : 'Complete'}</b></div></div></div></div><div className="app-preview-bottom"><span>✦ {language === 'ja' ? '貯金習慣を楽しく' : language === 'my' ? 'ငွေစုအလေ့အကျင့်ကို ပျော်ရွှင်စွာ' : 'Make saving a habit'}</span><i>•••</i></div></div>
          </div>
        </article>)}</div>
      </section>

      <section className="contact-section" id="contact"><div className="page-wrap contact-inner"><div><p className="eyebrow">{t.contactLabel}</p><h2>{t.contactTitle.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h2></div><div className="contact-aside"><p>{t.contactText}</p><a className="button button-light" href="https://mail.google.com/mail/?view=cm&fs=1&to=hanwaihtun1e%40gmail.com" target="_blank" rel="noreferrer">{t.email}<Arrow /></a><div className="social-links"><a href="https://github.com/Jack13-Han" target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a><a href="https://www.linkedin.com/in/han-wai-htun-35b337269/" target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a></div><span className="contact-location">{t.location} · <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hanwaihtun1e%40gmail.com" target="_blank" rel="noreferrer">hanwaihtun1e@gmail.com</a></span></div><span className="contact-mark">LET’S<br />TALK<span>↗</span></span></div></section>
    </main>
    <footer className="footer page-wrap"><a className="wordmark" href="#home" aria-label="Han Wai Htun home"><svg className="brand-cloud" aria-hidden="true" viewBox="0 0 40 32"><path d="M10.4 25.5h19a7.3 7.3 0 0 0 .6-14.6A10.1 10.1 0 0 0 11 9.4a8.1 8.1 0 0 0-.6 16.1Z"/><path d="M14.8 21V15h4.5v6m-4.5-3h4.5m3.1-3v6h4"/><circle cx="31.4" cy="7.3" r="2"/></svg><span className="brand-text">HW<span>.</span></span></a><span>{t.footer} · © 2026 HAN WAI HTUN</span><a href="#home">BACK TO TOP ↑</a></footer>
  </>;
}

