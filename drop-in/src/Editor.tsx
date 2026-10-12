import { useEffect, useRef } from 'react';
import { DdocEditor } from '@fileverse-dev/ddoc';
import { seedOnce } from './seed';

export const SUPPORTS_NAVBAR_CONTAINER = true;

const DDOC_ID = 'ddoc-demo-drop-in';

type Props = {
  navbarContainer?: HTMLElement | null;
  showNavbarToggle?: boolean;
  onNavbarVisibleChange?: (visible: boolean) => void;
};

const renderNavbar = () => (
  <div className="flex items-center justify-between gap-3 px-4 py-2 w-full shrink-0 color-bg-default border-b color-border-default">
    <span className="text-heading-xsm truncate">Quarterly plan</span>
    <span className="text-body-sm color-text-secondary shrink-0">
      navbar from renderNavbar
    </span>
  </div>
);

// 6.x: no UI-state props. Zoom, navbar, outline, comments, presentation and
// split view all run on the editor's own state.
export const Editor = ({
  navbarContainer,
  showNavbarToggle,
  onNavbarVisibleChange,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  useEffect(() => seedOnce(DDOC_ID, () => ref.current?.getEditor?.()), []);

  return (
    <DdocEditor
      ref={ref}
      ddocId={DDOC_ID}
      enableIndexeddbSync
      preferredSchemaVersion={2}
      renderNavbar={renderNavbar}
      navbarContainer={navbarContainer}
      showNavbarToggle={showNavbarToggle}
      onNavbarVisibleChange={onNavbarVisibleChange}
    />
  );
};

// The whole integration: one element, no props.
export const BareEditor = () => <DdocEditor />;

export const USAGE = `<DdocEditor
  ddocId="ddoc-demo-drop-in"
  enableIndexeddbSync
  renderNavbar={renderNavbar}
/>`;

export const BARE_USAGE = `<DdocEditor />`;
