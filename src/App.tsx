/**
 * ============================================================================
 * App.tsx — the ROOT of the website. Wires everything together.
 * ============================================================================
 *
 * WHAT IT DOES
 *   • Wraps the whole app in <I18nProvider> so every component can read the
 *     current language and call t('key') for text.
 *   • Injects <GlobalStyles/> (fonts, resets, animations, utility classes).
 *   • Renders the fixed <Navbar/> and <Footer/> on every page.
 *   • Does simple ROUTING between two "pages" using the URL hash:
 *        #           → Home   (one long scrolling page)
 *        #/contact   → Contact (separate page with the form + map)
 *     `navigate('contact')` / `navigate('home')` switch between them and the
 *     back/forward buttons work because it listens to 'hashchange'.
 *
 * HOW TO CHANGE IT
 *   • Add a new page: add its name to ROUTES, render it in the conditional
 *     below, and call navigate('yourpage') from a button/link.
 *   • The little fade when switching pages is the `pageIn` keyframe at the end.
 * ============================================================================
 */
import React, { useEffect, useState } from 'react';
import { I18nProvider } from './i18n';
import { GlobalStyles } from './components/GlobalStyles';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { ArticlePage } from './pages/ArticlePage';

/**
 * ROUTING (hash-based). Known routes:
 *   #            → Home (one long scrolling page)
 *   #/contact    → Contact page
 *   #/admin      → HIDDEN article studio (no link points here)
 *   #/article/<id> → public reader for one article
 *
 * A route is parsed into { name, param }. `navigate('article/ID')` passes the
 * id after the slash as `param`. Admin renders WITHOUT the navbar/footer so it
 * stays a standalone, unlinked surface.
 */
interface ParsedRoute { name: string; param: string }

function routeFromHash(): ParsedRoute {
  const h = window.location.hash.replace(/^#\/?/, '');
  const [name, param] = h.split('/');
  return { name: (name || 'home').toLowerCase(), param: param || '' };
}

export const App = () => {
  const [route, setRoute] = useState<ParsedRoute>(routeFromHash());

  useEffect(() => {
    const onHash = () => setRoute(routeFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (to: string) => {
    const target = to === 'home' ? '' : `#/${to}`;
    if (window.location.hash !== target) {
      window.location.hash = target;
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else if (to === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setRoute(routeFromHash());
  };

  const key = route.name + '/' + route.param;

  // Admin is a standalone surface — no navbar/footer, no site chrome.
  if (route.name === 'admin') {
    return (
      <I18nProvider>
        <GlobalStyles />
        <Admin navigate={navigate} />
      </I18nProvider>
    );
  }

  return (
    <I18nProvider>
      <GlobalStyles />
      <Navbar route={route.name} navigate={navigate} />
      <div key={key} style={{ animation: 'pageIn 0.5s cubic-bezier(0.16,1,0.3,1) both' }}>
        {route.name === 'contact' ? (
          <Contact navigate={navigate} />
        ) : route.name === 'article' ? (
          <ArticlePage id={route.param} navigate={navigate} />
        ) : (
          <Home navigate={navigate} />
        )}
      </div>
      <Footer route={route.name} navigate={navigate} />
      <style>{`
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </I18nProvider>
  );
};

export default App;
