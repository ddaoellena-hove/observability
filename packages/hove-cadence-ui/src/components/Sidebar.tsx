import { useState, type ReactNode } from "react";
import "./sidebar.css";

// ── Types ─────────────────────────────────────────────────────────────────────

export type SidebarProduct = "datahub" | "traffic-report" | "insights";

export interface SidebarNavItem {
  id: string;
  label: string;
  onClick?: () => void;
}

export interface SidebarNavSection {
  id: string;
  label: string;
  icon: ReactNode;
  /**
   * When provided, the section is collapsible and shows sub-items.
   * When omitted, the section header acts as a direct nav link.
   */
  items?: SidebarNavItem[];
  /** Open by default. Automatically true if the active item is in this section. */
  defaultOpen?: boolean;
  /** Shows a blue notification dot next to the label. */
  notification?: boolean;
}

export interface SidebarProps {
  /** Sets the background colour theme. */
  product: SidebarProduct;
  /** Client / network name shown below the product logo. */
  clientName: string;
  /** Navigation sections. */
  sections: SidebarNavSection[];
  /** Id of the currently active item or direct-link section. */
  activeId?: string;
  /** Called when an item or direct-link section is clicked. */
  onItemClick?: (id: string) => void;
  /** Called when the «» collapse button is clicked. */
  onCollapse?: () => void;
  /** Called when the logout button is clicked. */
  onLogout?: () => void;
  /** Additional class name. */
  className?: string;
}

// ── Product labels ────────────────────────────────────────────────────────────

const PRODUCT_LABEL: Record<SidebarProduct, string> = {
  datahub: "Datahub",
  "traffic-report": "Traffic Report",
  insights: "Navitia Insights",
};

// ── Internal SVG icons ────────────────────────────────────────────────────────

const InsightsLogo = () => (
  <svg width="160" height="32" viewBox="0 0 180 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Navitia Insights">
    <g clipPath="url(#insights-logo-clip)">
      <path d="M23.6808 26.4597C23.2558 26.761 22.8085 27.0295 22.3426 27.2628L22.2281 27.32L25.3424 34.3203L28.4185 32.5062L23.7862 26.3894L23.6808 26.4597Z" fill="#00AECE"/>
      <path d="M13.4039 27.407C12.9251 27.188 12.4639 26.9323 12.0246 26.6421L11.9181 26.5718L7.4567 32.7036L10.5659 34.4625L13.5215 27.4653L13.4039 27.407Z" fill="#00AECE"/>
      <path d="M19.5059 9.84955L18.2963 0.162842L16.9592 0.174889L15.9355 9.88469L19.5059 9.84955Z" fill="#00AECE"/>
      <path d="M22.1974 8.63305C22.6721 8.8608 23.1289 9.12424 23.5637 9.42111L23.6712 9.4954L28.1406 3.35148L25.0314 1.59766L22.0819 8.57783L22.1974 8.63305Z" fill="#00AECE"/>
      <path d="M9.26396 23.9813C8.95646 23.5499 8.68273 23.0955 8.44521 22.622L8.38794 22.5076L1.49939 25.5705L3.3137 28.6404L9.34131 24.0847L9.26396 23.9813Z" fill="#00AECE"/>
      <path d="M26.2698 12.1219C26.5655 12.5541 26.8278 13.0081 27.0544 13.4802L27.1117 13.5976L34.0977 10.4875L32.2783 7.41455L26.1924 12.0165L26.2698 12.1219Z" fill="#00AECE"/>
      <path d="M11.8152 9.46528C12.2525 9.16236 12.7127 8.89385 13.1915 8.66215L13.3091 8.60594L10.2531 1.74121L7.178 3.55527L11.7087 9.53957L11.8152 9.46528Z" fill="#00AECE"/>
      <path d="M9.11077 12.2094L9.18311 12.102L3.11531 7.69385L1.35926 10.806L8.26892 13.7173L8.32417 13.6008C8.55037 13.1176 8.81334 12.6524 9.11077 12.2094Z" fill="#00AECE"/>
      <path d="M-0.0791227 17.531L-0.067068 18.8672L9.64844 19.8902L9.61428 16.3223L-0.0791227 17.531Z" fill="#00AECE"/>
      <path d="M19.6626 26.1724L16.0922 26.2065L17.3018 35.8932L18.6389 35.8812L19.6626 26.1724Z" fill="#00AECE"/>
      <path d="M35.6758 18.5264L35.6637 17.1902L25.9482 16.1672L25.9824 19.7351L35.6758 18.5264Z" fill="#00AECE"/>
      <path d="M26.1984 23.883L32.4139 28.4006L34.1689 25.2915L27.0915 22.3059L27.0373 22.4224C26.8157 22.8918 26.5595 23.3442 26.2708 23.7756L26.1984 23.883Z" fill="#00AECE"/>
    </g>
    <path d="M56.1358 9.65625H58.5489V23.8067H54.7709L48.5204 12.4265V23.8067H46.0874V9.65625H49.727L56.1358 21.2357V9.65625Z" fill="white"/>
    <path d="M63.9772 24.0259C62.0585 24.0259 60.3772 22.7903 60.3772 20.7773C60.3772 18.4654 61.7816 17.9074 64.7091 17.5885C66.9047 17.3493 66.9838 16.7713 66.9838 16.6916V16.6119C66.9838 16.1136 66.7465 14.9975 64.8278 14.9975C63.3047 14.9975 62.4344 15.7549 62.4344 16.6916L60.1794 17.1699C60.1794 15.0573 61.7421 13.0245 64.63 13.0245C68.7443 13.0245 69.2783 15.715 69.2783 17.0504V22.7903C69.2783 23.1889 69.3574 23.5476 69.397 23.6473V23.8067H67.1025C67.0432 23.6871 66.9838 23.5077 66.9838 23.0493C66.9838 22.7305 67.0432 22.292 67.3596 21.8735L67.1025 21.8137C66.6476 23.4081 65.4014 24.0259 63.9772 24.0259ZM64.2937 22.013C65.5399 22.013 67.0036 21.6343 67.0036 20.1794V18.0867C66.964 18.4056 66.8454 19.0832 64.7487 19.3224C63.0673 19.4818 62.6124 19.7609 62.6124 20.6179C62.6124 21.714 63.6607 22.013 64.2937 22.013Z" fill="white"/>
    <path d="M69.7968 13.443H72.1308L74.6825 21.3553H74.7814L77.3133 13.443H79.6473L75.9484 23.8067H73.5155L69.7968 13.443Z" fill="white"/>
    <path d="M80.6315 9.65625H83.203V12.3269H80.6315V9.65625ZM80.8096 13.443H83.025V23.8067H80.8096V13.443Z" fill="white"/>
    <path d="M88.8088 24.1056C86.7912 24.1056 86.0594 22.9896 86.0594 21.3354V15.4161H84.4572V13.443H84.655C86.4154 13.443 86.8901 11.4898 86.8901 10.7524H89.2044C89.2044 11.6094 88.7099 13.2238 87.0088 13.2238V13.443H90.7868V15.4161H88.2352V20.8172C88.2352 21.7738 88.3539 22.1525 88.9473 22.1525C89.3627 22.1525 89.7385 21.993 90.2528 21.734L90.7473 23.5875C90.3715 23.8466 89.6 24.1056 88.8088 24.1056Z" fill="white"/>
    <path d="M92.3374 9.65625H94.9088V12.3269H92.3374V9.65625ZM92.5154 13.443H94.7308V23.8067H92.5154V13.443Z" fill="white"/>
    <path d="M100.235 24.0259C98.3158 24.0259 96.6345 22.7903 96.6345 20.7773C96.6345 18.4654 98.0389 17.9074 100.966 17.5885C103.162 17.3493 103.241 16.7713 103.241 16.6916V16.6119C103.241 16.1136 103.004 14.9975 101.085 14.9975C99.562 14.9975 98.6917 15.7549 98.6917 16.6916L96.4367 17.1699C96.4367 15.0573 97.9994 13.0245 100.887 13.0245C105.002 13.0245 105.536 15.715 105.536 17.0504V22.7903C105.536 23.1889 105.615 23.5476 105.654 23.6473V23.8067H103.36C103.3 23.6871 103.241 23.5077 103.241 23.0493C103.241 22.7305 103.3 22.292 103.617 21.8735L103.36 21.8137C102.905 23.4081 101.659 24.0259 100.235 24.0259ZM100.551 22.013C101.797 22.013 103.261 21.6343 103.261 20.1794V18.0867C103.221 18.4056 103.103 19.0832 101.006 19.3224C99.3246 19.4818 98.8697 19.7609 98.8697 20.6179C98.8697 21.714 99.918 22.013 100.551 22.013Z" fill="white"/>
    <path d="M111.02 23.8067V9.65625H113.393V23.8067H111.02Z" fill="white"/>
    <path d="M115.326 23.8067V13.443H117.541C117.64 14.1405 117.6 14.7982 117.205 15.5955L117.462 15.6552C117.996 13.9612 118.886 13.0444 120.923 13.0444C123.633 13.0444 124.682 14.579 124.682 18.2063V23.8067H122.466V19.2626C122.466 16.1336 122.09 15.1769 120.409 15.1769C119.183 15.1769 117.541 16.1136 117.541 18.7644V23.8067H115.326Z" fill="white"/>
    <path d="M130.432 13.0842C133.122 13.0842 134.685 14.8182 134.685 17.0504L132.548 16.8311C132.548 15.715 131.797 14.9178 130.432 14.9178C129.245 14.9178 128.375 15.2965 128.375 16.1136C128.375 16.7913 128.711 17.1699 129.957 17.449L130.946 17.6084C133.28 18.0469 134.645 18.9437 134.645 20.8969C134.645 22.9696 132.667 24.0259 130.491 24.0259C128.157 24.0259 126.258 22.6308 126.258 20L128.434 20.2791C128.434 21.8137 129.661 22.1924 130.491 22.1924C131.619 22.1924 132.509 21.7539 132.509 20.877C132.509 20.0797 131.737 19.8605 130.353 19.5416L129.641 19.442C126.417 18.7245 126.239 17.15 126.239 16.0339C126.239 14.2402 127.821 13.0842 130.432 13.0842Z" fill="white"/>
    <path d="M136.032 9.65625H138.603V12.3269H136.032V9.65625ZM136.21 13.443H138.425V23.8067H136.21V13.443Z" fill="white"/>
    <path d="M145.118 21.8934C149.015 21.8934 150.419 22.8899 150.419 24.8231C150.419 27.0753 148.125 27.5934 145.118 27.5934C141.934 27.5934 139.797 26.6169 139.797 24.6438C139.797 23.9462 140.49 23.3084 141.795 23.2287C140.648 22.8102 140.134 22.1126 140.134 21.1759C140.134 20.6577 140.51 19.8007 141.795 19.6811C141.004 19.0234 140.569 18.1067 140.569 17.0105C140.569 14.6587 142.31 13.2437 145.158 13.2437C146.167 13.2437 147.136 13.5028 147.907 13.9811C148.422 13.443 149.49 12.2272 150.044 11.7091L150.953 13.4829C150.597 13.6822 149.272 14.4993 148.837 14.7385C149.371 15.3364 149.688 16.1136 149.688 17.0105C149.688 19.442 147.591 20.7374 145.158 20.7374C144.584 20.7374 144.07 20.6777 143.575 20.5581C142.883 20.5381 142.448 20.7972 142.448 21.1759C142.448 21.993 144.268 21.8934 145.118 21.8934ZM145.158 15.1171C143.694 15.1171 142.804 15.8147 142.804 17.0105C142.804 18.2063 143.674 18.864 145.158 18.864C147.037 18.864 147.472 17.8077 147.472 17.0105C147.472 16.2332 147.037 15.1171 145.158 15.1171ZM145.118 25.8396C147.274 25.8396 148.224 25.3812 148.224 24.8032C148.224 24.2053 147.551 23.6473 145.118 23.6473C144.386 23.6473 143.734 23.6074 143.18 23.5277C142.527 23.6273 141.934 24.1654 141.934 24.6039C141.934 25.5406 143.259 25.8396 145.118 25.8396Z" fill="white"/>
    <path d="M152.241 23.8067V9.65625H154.496L154.476 13.9213C154.476 14.6189 154.337 15.0773 154.139 15.5157L154.397 15.5755C154.891 13.8017 156.177 13.0444 157.819 13.0444C160.825 13.0444 161.854 14.3996 161.854 18.2661V23.8067H159.619V19.163C159.619 15.9741 159.401 15.1769 157.403 15.1769C156.157 15.1769 154.496 15.8944 154.476 18.8839V23.8067H152.241Z" fill="white"/>
    <path d="M167.273 24.1056C165.255 24.1056 164.523 22.9896 164.523 21.3354V15.4161H162.921V13.443H163.119C164.88 13.443 165.354 11.4898 165.354 10.7524H167.669C167.669 11.6094 167.174 13.2238 165.473 13.2238V13.443H169.251V15.4161H166.699V20.8172C166.699 21.7738 166.818 22.1525 167.411 22.1525C167.827 22.1525 168.203 21.993 168.717 21.734L169.211 23.5875C168.836 23.8466 168.064 24.1056 167.273 24.1056Z" fill="white"/>
    <path d="M174.493 13.0842C177.183 13.0842 178.746 14.8182 178.746 17.0504L176.61 16.8311C176.61 15.715 175.858 14.9178 174.493 14.9178C173.306 14.9178 172.436 15.2965 172.436 16.1136C172.436 16.7913 172.772 17.1699 174.018 17.449L175.007 17.6084C177.342 18.0469 178.706 18.9437 178.706 20.8969C178.706 22.9696 176.728 24.0259 174.553 24.0259C172.218 24.0259 170.32 22.6308 170.32 20L172.495 20.2791C172.495 21.8137 173.722 22.1924 174.553 22.1924C175.68 22.1924 176.57 21.7539 176.57 20.877C176.57 20.0797 175.799 19.8605 174.414 19.5416L173.702 19.442C170.478 18.7245 170.3 17.15 170.3 16.0339C170.3 14.2402 171.882 13.0842 174.493 13.0842Z" fill="white"/>
    <defs>
      <clipPath id="insights-logo-clip">
        <rect width="35.6044" height="36" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const HoveLogo = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-label="Hove" style={{ flexShrink: 0 }}>
    <g clipPath="url(#hove-logo-clip)">
      <path d="M26.4883 12.1231C26.7918 12.5496 27.0623 12.9986 27.2973 13.4663L27.3549 13.5812L34.4062 10.4552L32.5789 7.36743L26.4175 12.0172L26.4883 12.1231Z" fill="#00AECE"/>
      <path d="M27.4419 22.44C27.2213 22.9207 26.9637 23.3836 26.6714 23.8245L26.6006 23.9314L32.7772 28.4098L34.5489 25.2887L27.5006 22.322L27.4419 22.44Z" fill="#00AECE"/>
      <path d="M9.75741 16.314L0 17.5281L0.0121348 18.8703L9.79281 19.8978L9.75741 16.314Z" fill="#00AECE"/>
      <path d="M8.53376 13.6124C8.76318 13.1359 9.02855 12.6775 9.32758 12.241L9.40241 12.1331L3.21365 7.64673L1.44702 10.7677L8.47814 13.7284L8.53376 13.6124Z" fill="#00AECE"/>
      <path d="M23.9906 26.5946C23.5561 26.9033 23.0983 27.178 22.6214 27.4165L22.5061 27.4739L25.5914 34.3886L28.6837 32.5674L24.0948 26.517L23.9906 26.5946Z" fill="#00AECE"/>
      <path d="M12.0459 9.52435C12.4812 9.22755 12.9386 8.96427 13.4141 8.73679L13.5324 8.67931L10.3996 1.66687L7.3042 3.49309L11.9397 9.602L12.0459 9.52435Z" fill="#00AECE"/>
      <path d="M9.36907 24.0343C9.06394 23.5954 8.79347 23.1335 8.56008 22.6528L8.50345 22.5348L1.58862 25.6024L3.41593 28.6891L9.4439 24.1412L9.36907 24.0343Z" fill="#00AECE"/>
      <path d="M12.1328 26.75L12.0246 26.6774L7.58423 32.7681L10.7191 34.5308L13.6516 27.595L13.5343 27.5396C13.0476 27.3125 12.579 27.0485 12.1328 26.75Z" fill="#00AECE"/>
      <path d="M17.4944 35.9727L18.8403 35.9606L19.8708 26.2084L16.2769 26.2427L17.4944 35.9727Z" fill="#00AECE"/>
      <path d="M26.1992 16.1576L26.2336 19.7415L35.991 18.5273L35.9789 17.1852L26.1992 16.1576Z" fill="#00AECE"/>
      <path d="M18.4965 0.0826416L17.1506 0.0947424L16.1201 9.84701L19.714 9.81272L18.4965 0.0826416Z" fill="#00AECE"/>
      <path d="M23.8582 9.52643L28.4087 3.28744L25.2769 1.52576L22.2695 8.62996L22.3868 8.68441C22.8597 8.90678 23.3154 9.16396 23.75 9.45382L23.8582 9.52643Z" fill="#00AECE"/>
    </g>
    <defs>
      <clipPath id="hove-logo-clip">
        <rect width="36" height="36" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const CollapseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 12L4 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 12L8 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDownIcon = ({ open }: { open: boolean }) => (
  <svg
    className="sidebar__chevron"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
    style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}
  >
    <path
      d="M3 5l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
    <path d="M6.5 15H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11.5 12.5l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="15.5" y1="8.5" x2="6.5" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────

export const Sidebar = ({
  product,
  clientName,
  sections,
  activeId,
  onItemClick,
  onCollapse,
  onLogout,
  className,
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Initialise which collapsible sections are open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    sections.forEach((section) => {
      if (section.items) {
        const containsActive = section.items.some((item) => item.id === activeId);
        initial[section.id] = section.defaultOpen ?? containsActive;
      }
    });
    return initial;
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCollapseToggle = () => {
    setIsCollapsed((prev) => !prev);
    onCollapse?.();
  };

  const rootClass = ["sidebar", `sidebar--${product}`, isCollapsed ? "sidebar--collapsed" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      {/* ── Header ── */}
      <div className="sidebar__header">
        {isCollapsed ? (
          <>
            <HoveLogo size={30} />
            <button
              type="button"
              className="sidebar__collapse-btn"
              onClick={handleCollapseToggle}
              aria-label="Développer la sidebar"
              style={{ transform: "rotate(180deg)" }}
            >
              <CollapseIcon />
            </button>
          </>
        ) : (
          <>
            <div className="sidebar__logo-row">
              {product === "insights" ? (
                <InsightsLogo />
              ) : (
                <>
                  <HoveLogo size={26} />
                  <span className="sidebar__product-name">{PRODUCT_LABEL[product]}</span>
                </>
              )}
            </div>
            <button
              type="button"
              className="sidebar__collapse-btn"
              onClick={handleCollapseToggle}
              aria-label="Réduire la sidebar"
            >
              <CollapseIcon />
            </button>
          </>
        )}
      </div>

      {/* ── Client name ── */}
      {!isCollapsed && <p className="sidebar__client">{clientName}</p>}

      {/* ── Navigation ── */}
      <nav className="sidebar__nav" aria-label="Navigation principale">
        {sections.map((section) => {
          const isCollapsible = Boolean(section.items?.length);
          const isOpen = openSections[section.id] ?? false;
          const isActiveSection = !isCollapsible && section.id === activeId;
          // Show dot when the active item belongs to this section
          const hasActiveChild = isCollapsible && section.items!.some((item) => item.id === activeId);
          const showDot = section.notification || hasActiveChild;

          const isActiveSectionCollapsed = isCollapsible && hasActiveChild;

          return (
            <div key={section.id} className="sidebar__section">
              {isCollapsible ? (
                <button
                  type="button"
                  className={`sidebar__section-btn${isCollapsed && isActiveSectionCollapsed ? " sidebar__section-btn--active" : ""}`}
                  onClick={() => isCollapsed ? onItemClick?.(section.id) : toggleSection(section.id)}
                  aria-expanded={!isCollapsed ? isOpen : undefined}
                  title={isCollapsed ? section.label : undefined}
                >
                  <span className="sidebar__section-icon">{section.icon}</span>
                  {!isCollapsed && <span className="sidebar__section-label">{section.label}</span>}
                  {!isCollapsed && showDot && (
                    <span className="sidebar__dot" aria-label="Élément actif dans cette section" />
                  )}
                  {!isCollapsed && <ChevronDownIcon open={isOpen} />}
                </button>
              ) : (
                <button
                  type="button"
                  className={`sidebar__section-btn${isActiveSection ? " sidebar__section-btn--active" : ""}`}
                  onClick={() => onItemClick?.(section.id)}
                  aria-current={isActiveSection ? "page" : undefined}
                  title={isCollapsed ? section.label : undefined}
                >
                  <span className="sidebar__section-icon">{section.icon}</span>
                  {!isCollapsed && <span className="sidebar__section-label">{section.label}</span>}
                </button>
              )}

              {/* Sub-items — hidden when sidebar is collapsed */}
              {isCollapsible && isOpen && !isCollapsed && (
                <ul className="sidebar__items" role="list">
                  {section.items!.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          className={`sidebar__item${isActive ? " sidebar__item--active" : ""}`}
                          onClick={() => {
                            item.onClick?.();
                            onItemClick?.(item.id);
                          }}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <div className="sidebar__footer">
        <button type="button" className="sidebar__logout" onClick={onLogout} title={isCollapsed ? "Se déconnecter" : undefined}>
          <LogoutIcon />
          {!isCollapsed && <span>SE DÉCONNECTER</span>}
        </button>
      </div>
    </div>
  );
};
