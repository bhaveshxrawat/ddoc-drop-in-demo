import { useState, type ReactNode } from 'react';
import {
  BARE_USAGE,
  BareEditor,
  Editor,
  SUPPORTS_NAVBAR_CONTAINER,
  USAGE,
} from './Editor';

type Scenario = 'window' | 'shell' | 'panel' | 'navbar' | 'card';

const SCENARIOS: { id: Scenario; label: string; hint: string }[] = [
  {
    id: 'window',
    label: 'Full window',
    hint: 'Baseline: the editor is the whole page.',
  },
  {
    id: 'shell',
    label: 'App shell',
    hint: 'Host header, sidebar and footer around the editor. Does it stay in its box?',
  },
  {
    id: 'panel',
    label: 'Side panel',
    hint: 'Drag the width. Does the editor switch to its narrow layout?',
  },
  {
    id: 'navbar',
    label: 'Navbar in host header',
    hint: 'The editor navbar rendered inside the host header.',
  },
  {
    id: 'card',
    label: 'Card',
    hint: 'A fixed 720 × 480 card in a scrolling page.',
  },
];

const HostHeader = ({ children }: { children?: ReactNode }) => (
  <header className="shrink-0 min-h-[56px] flex items-center gap-4 px-4 bg-slate-800 text-white">
    <span className="font-semibold shrink-0">Host app header</span>
    {children}
  </header>
);

const HostSidebar = () => (
  <nav className="shrink-0 w-[220px] bg-slate-700 text-white p-4 flex flex-col gap-2">
    <span className="font-semibold">Host sidebar</span>
    {['Dashboard', 'Projects', 'Documents', 'Settings'].map((item) => (
      <span key={item} className="text-sm opacity-80">
        {item}
      </span>
    ))}
  </nav>
);

const HostFooter = () => (
  <footer className="shrink-0 h-[40px] flex items-center px-4 bg-slate-800 text-white text-sm">
    Host app footer
  </footer>
);

const Usage = ({ code }: { code: string }) => (
  <pre className="text-xs leading-5 bg-slate-900 text-slate-100 rounded-lg p-3 overflow-auto">
    {code}
  </pre>
);

const App = () => {
  const [scenario, setScenario] = useState<Scenario>('shell');
  const [panelWidth, setPanelWidth] = useState(520);
  const [navbarHost, setNavbarHost] = useState<HTMLElement | null>(null);
  // The host either lets the toolbar chevron collapse its navbar slot, or
  // turns the chevron off with showNavbarToggle={false}.
  const [useChevron, setUseChevron] = useState(true);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [showUsage, setShowUsage] = useState(false);
  const current = SCENARIOS.find((item) => item.id === scenario)!;

  return (
    <>
      {scenario === 'window' && (
        <div className="h-dvh">
          <Editor key="window" />
        </div>
      )}

      {scenario === 'shell' && (
        <div className="h-dvh flex flex-col">
          <HostHeader />
          <div className="flex flex-1 min-h-0">
            <HostSidebar />
            <main className="flex-1 min-w-0">
              <Editor key="shell" />
            </main>
          </div>
          <HostFooter />
        </div>
      )}

      {scenario === 'panel' && (
        <div className="h-dvh flex flex-col">
          <HostHeader />
          <div className="flex flex-1 min-h-0">
            <main className="flex-1 min-w-0 bg-slate-100 text-slate-700 p-6 overflow-auto">
              <h1 className="text-xl font-semibold mb-2">Host content</h1>
              <p>
                The editor is a {panelWidth}px side panel on the right. The
                window is still wide.
              </p>
            </main>
            <aside
              className="shrink-0 border-l border-slate-300"
              style={{ width: panelWidth }}
            >
              <Editor key="panel" />
            </aside>
          </div>
          <HostFooter />
        </div>
      )}

      {scenario === 'navbar' && (
        <div className="h-dvh flex flex-col">
          <HostHeader>
            {SUPPORTS_NAVBAR_CONTAINER ? (
              <div
                ref={setNavbarHost}
                className={`flex-1 min-w-0 bg-white text-slate-900 rounded-md ddoc-navbar-row ${
                  navbarVisible ? '' : 'ddoc-navbar-row--hidden'
                }`}
              />
            ) : (
              <span className="text-sm opacity-80">
                navbarContainer does not exist in this version
              </span>
            )}
          </HostHeader>
          <div className="flex flex-1 min-h-0">
            <HostSidebar />
            <main className="flex-1 min-w-0">
              <Editor
                key={`navbar-${useChevron}`}
                showNavbarToggle={useChevron}
                onNavbarVisibleChange={setNavbarVisible}
                navbarContainer={
                  SUPPORTS_NAVBAR_CONTAINER ? navbarHost : undefined
                }
              />
            </main>
          </div>
          <HostFooter />
        </div>
      )}

      {scenario === 'card' && (
        <div className="min-h-dvh bg-slate-100 text-slate-700 p-10 pb-40">
          <h1 className="text-xl font-semibold mb-4">A host page that scrolls</h1>
          <div className="w-[720px] max-w-full h-[480px] bg-white rounded-xl border border-slate-300 overflow-hidden">
            <BareEditor key="card" />
          </div>
          <p className="mt-6 max-w-[720px]">
            Host content below the card. The page is taller than the window, so
            it scrolls on its own.
          </p>
          <div className="h-[800px]" />
          <p>End of the host page.</p>
        </div>
      )}

      {/* Demo controls: not part of the host layout. */}
      <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-[9999] w-max max-w-[calc(100vw-24px)] rounded-xl bg-black text-white shadow-2xl p-2 flex flex-col gap-2">
        {showUsage && (
          <Usage code={scenario === 'card' ? BARE_USAGE : USAGE} />
        )}
        <div className="flex flex-wrap items-center gap-1">
          {import.meta.env.BASE_URL !== '/' && (
            <a href="../" className="px-2 py-1 rounded-md text-xs bg-white/10">
              ← versions
            </a>
          )}
          <span className="px-2 py-1 rounded-md bg-white text-black text-xs font-semibold">
            ddoc {__DDOC_VERSION__}
          </span>
          {SCENARIOS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setScenario(item.id);
                setNavbarVisible(true);
              }}
              className={`px-2 py-1 rounded-md text-xs ${
                item.id === scenario ? 'bg-yellow-300 text-black' : 'bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => setShowUsage((open) => !open)}
            className="px-2 py-1 rounded-md text-xs bg-white/10"
          >
            {showUsage ? 'Hide code' : 'Show code'}
          </button>
        </div>
        <div className="flex items-center gap-3 px-1 text-xs opacity-80">
          <span>{current.hint}</span>
          {scenario === 'navbar' && SUPPORTS_NAVBAR_CONTAINER && (
            <label className="flex items-center gap-2 shrink-0">
              <input
                type="checkbox"
                checked={useChevron}
                onChange={(event) => {
                  setUseChevron(event.target.checked);
                  setNavbarVisible(true);
                }}
              />
              toolbar chevron collapses the hosted navbar
            </label>
          )}
          {scenario === 'panel' && (
            <label className="flex items-center gap-2 shrink-0">
              <input
                type="range"
                min={340}
                max={1100}
                step={10}
                value={panelWidth}
                onChange={(event) => setPanelWidth(Number(event.target.value))}
              />
              {panelWidth}px
            </label>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
