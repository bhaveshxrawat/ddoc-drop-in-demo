import { useEffect, useRef, useState } from "react";
import { DdocEditor } from "@fileverse-dev/ddoc";
import { seedOnce } from "./seed";

export const SUPPORTS_NAVBAR_CONTAINER = false;

const DDOC_ID = "ddoc-demo-latest";

type Props = {
  navbarContainer?: HTMLElement | null;
  showNavbarToggle?: boolean;
  onNavbarVisibleChange?: (visible: boolean) => void;
};

const renderNavbar = () => (
  <div className="flex items-center justify-between gap-3 px-4 py-2 w-full">
    <span className="text-heading-xsm truncate">Quarterly plan</span>
    <span className="text-body-sm color-text-secondary shrink-0">
      navbar from renderNavbar
    </span>
  </div>
);

// 5.x: the host owns every piece of UI state. Zoom, navbar and preview mode
// are required; the rest do nothing unless their setter is passed.
export const Editor = (_props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const [zoomLevel, setZoomLevel] = useState("1");
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [showTOC, setShowTOC] = useState(false);
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [isSplitView, setIsSplitView] = useState(false);

  useEffect(() => seedOnce(DDOC_ID, () => ref.current?.getEditor?.()), []);

  return (
    <DdocEditor
      ref={ref}
      ddocId={DDOC_ID}
      enableIndexeddbSync
      preferredSchemaVersion={2}
      renderNavbar={renderNavbar}
      isPreviewMode={false}
      zoomLevel={zoomLevel}
      setZoomLevel={setZoomLevel}
      isNavbarVisible={isNavbarVisible}
      setIsNavbarVisible={setIsNavbarVisible}
      showTOC={showTOC}
      setShowTOC={setShowTOC}
      commentDrawerOpen={commentDrawerOpen}
      setCommentDrawerOpen={setCommentDrawerOpen}
      isPresentationMode={isPresentationMode}
      setIsPresentationMode={setIsPresentationMode}
      isSplitView={isSplitView}
      setIsSplitView={setIsSplitView}
    />
  );
};

// The least 5.x accepts: five required props and two pieces of host state.
export const BareEditor = () => {
  const [zoomLevel, setZoomLevel] = useState("1");
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  return (
    <DdocEditor
      isPreviewMode={false}
      zoomLevel={zoomLevel}
      setZoomLevel={setZoomLevel}
      isNavbarVisible={isNavbarVisible}
      setIsNavbarVisible={setIsNavbarVisible}
    />
  );
};

export const USAGE = `const [zoomLevel, setZoomLevel] = useState('1');
const [isNavbarVisible, setIsNavbarVisible] = useState(true);
const [showTOC, setShowTOC] = useState(false);
const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
const [isPresentationMode, setIsPresentationMode] = useState(false);
const [isSplitView, setIsSplitView] = useState(false);

<DdocEditor
  ddocId="ddoc-demo-latest"
  enableIndexeddbSync
  renderNavbar={renderNavbar}
  isPreviewMode={false}
  zoomLevel={zoomLevel}
  setZoomLevel={setZoomLevel}
  isNavbarVisible={isNavbarVisible}
  setIsNavbarVisible={setIsNavbarVisible}
  showTOC={showTOC}
  setShowTOC={setShowTOC}
  commentDrawerOpen={commentDrawerOpen}
  setCommentDrawerOpen={setCommentDrawerOpen}
  isPresentationMode={isPresentationMode}
  setIsPresentationMode={setIsPresentationMode}
  isSplitView={isSplitView}
  setIsSplitView={setIsSplitView}
/>`;

export const BARE_USAGE = `const [zoomLevel, setZoomLevel] = useState('1');
const [isNavbarVisible, setIsNavbarVisible] = useState(true);

<DdocEditor
  isPreviewMode={false}
  zoomLevel={zoomLevel}
  setZoomLevel={setZoomLevel}
  isNavbarVisible={isNavbarVisible}
  setIsNavbarVisible={setIsNavbarVisible}
/>`;
