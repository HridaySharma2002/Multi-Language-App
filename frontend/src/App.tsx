import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './index.css';

function App() {
  const { t, i18n } = useTranslation();
  const [greeting, setGreeting] = useState('');
  const [messagesCount, setMessagesCount] = useState(0);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    
    // Fetch data from backend API
    const apiUrl = import.meta.env.VITE_API_URL || '';
    fetch(`${apiUrl}/api/greeting`, {
      headers: {
        'Accept-Language': i18n.language
      }
    })
      .then(res => res.json())
      .then(data => setGreeting(data.message))
      .catch(console.error);
  }, [i18n, i18n.language]);

  const price = 1234.56;
  const date = new Date();

  return (
    <div className="container">
      <header>
        <h1>{t('app.title')}</h1>
        <div className="backend-greeting" style={{ marginTop: '10px', fontSize: '1.2rem', color: '#646cff' }}>
          {greeting ? `Backend says: ${greeting}` : 'Loading backend message...'}
        </div>
        <div className="language-selector">
          <button onClick={() => changeLanguage('en')}>English</button>
          <button onClick={() => changeLanguage('fr')}>Français</button>
          <button onClick={() => changeLanguage('ar')}>العربية (RTL)</button>
          <button onClick={() => changeLanguage('es')}>Español</button>
          <button onClick={() => changeLanguage('en-US-pseudoloc')}>Pseudo-loc</button>
        </div>
      </header>

      <main>
        <section className="intro">
          <h2>{t('section.intro.heading')}</h2>
          <p>{t('section.intro.description')}</p>
        </section>

        <section className="demo-plurals">
          <h2>{t('section.plurals.heading')}</h2>
          <div>
            <button onClick={() => setMessagesCount(c => Math.max(0, c - 1))}>-</button>
            <span className="count-display">{messagesCount}</span>
            <button onClick={() => setMessagesCount(c => c + 1)}>+</button>
          </div>
          <p className="plural-message">
            {t('message.unread_count', { count: messagesCount })}
          </p>
        </section>

        <section className="demo-formatting">
          <h2>{t('section.formatting.heading')}</h2>
          <div className="format-grid">
            <div className="format-item">
              <strong>{t('label.price')}: </strong>
              {new Intl.NumberFormat(i18n.language?.includes('pseudo') ? 'en' : i18n.language, { style: 'currency', currency: 'USD' }).format(price)}
            </div>
            <div className="format-item">
              <strong>{t('label.date')}: </strong>
              {new Intl.DateTimeFormat(i18n.language?.includes('pseudo') ? 'en' : i18n.language, { dateStyle: 'full' }).format(date)}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
