import { useState } from "react";
import { Link, SegmentedControlAlt, NavigationDropdown, DataVisualization, SecondaryButton } from "hove-cadence-ui";
import "./ScenarioDetail.css";

// ── KPI Cards ─────────────────────────────────────────────────────────────────

interface KpiCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  badge?: { text: string; type: "positive" | "negative" | "neutral" };
  subtext?: string;
}

const KpiCard = ({ icon, label, value, unit, badge, subtext }: KpiCardProps) => (
  <div className="kpi-card">
    <div className="kpi-card__header">
      {icon}
      <span className="kpi-card__label">{label}</span>
    </div>
    <div className="kpi-card__value">
      {value}
      {unit && <span className="kpi-card__unit"> {unit}</span>}
    </div>
    {subtext && <p className="kpi-card__subtext">{subtext}</p>}
    {badge && (
      <span className={`kpi-badge kpi-badge--${badge.type}`}>{badge.text}</span>
    )}
  </div>
);

// ── Icons ─────────────────────────────────────────────────────────────────────

const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7.5" stroke="#6b7280" strokeWidth="1.5"/>
    <path d="M9 5v4l2.5 2.5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconWalk = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="3.5" r="1.5" fill="#6b7280"/>
    <path d="M9 5.5L7 10l2 2.5M9 5.5l2 2-1.5 2.5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 10l-1.5 4M11.5 9.5l1.5 4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconTransfer = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M3 6h12M3 12h12" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13 4l2 2-2 2M5 10l-2 2 2 2" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconAlt = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M3 9h12M9 3l6 6-6 6" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconTarget = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7.5" stroke="#6b7280" strokeWidth="1.5"/>
    <circle cx="9" cy="9" r="4" stroke="#6b7280" strokeWidth="1.5"/>
    <circle cx="9" cy="9" r="1.5" fill="#6b7280"/>
  </svg>
);
const IconExport = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 10v2h10v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconGrid = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="1" y="10" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="10" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="10" y="10" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);
const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12v1.5h12V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" fill="#16a34a"/>
    <path d="M5 8l2.5 2.5L11 5.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconWarning = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" fill="#f59e0b"/>
    <path d="M8 5v4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="8" cy="11" r="0.75" fill="#fff"/>
  </svg>
);
const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconDots = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="4" cy="9" r="1.5" fill="#6b7280"/>
    <circle cx="9" cy="9" r="1.5" fill="#6b7280"/>
    <circle cx="14" cy="9" r="1.5" fill="#6b7280"/>
  </svg>
);
const IconArrow = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" stroke="#d1d5db" strokeWidth="1.5"/>
    <path d="M8 10h4M10 8l2 2-2 2" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const TRANSPORT_MODES = ["Bus", "Métro", "Tramway", "Vélo", "Marche", "Train"];

const BASE_SERIES = [{ label: "Base", color: "#3b82f6", data: [35, 25, 15, 12, 8, 5] }];
const SCENARIO_DATA = [
  { mode: "Bus",     value: 28, delta: -7,  positive: false },
  { mode: "Métro",   value: 30, delta: +5,  positive: true  },
  { mode: "Tramway", value: 18, delta: +3,  positive: true  },
  { mode: "Vélo",    value: 14, delta: +2,  positive: true  },
  { mode: "Marche",  value: 6,  delta: -2,  positive: false },
  { mode: "Train",   value: 4,  delta: -1,  positive: false },
];

interface Props {
  onBack: () => void;
}

const SECTION_OPTIONS = [
  { id: "multicritere", label: "IV MULTICRITÈRE" },
  { id: "dynamique",    label: "IV DYNAMIQUE & ENRICHIE" },
  { id: "intelligente", label: "IV INTELLIGENTE" },
];

const InsightsMulticritereIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M27.3824 34.2002L23.0768 20.1602H25.3492L28.6382 31.3922L31.9272 20.1602H34.1996L29.894 34.2002H27.3824Z" fill="#405E64"/>
    <path d="M12.5996 34.2002V32.3148H15.6295V22.0455H12.6395V20.1602H20.7324V22.0455H17.7424V32.3148H20.7723V34.2002H12.5996Z" fill="#405E64"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M6.0298 1.7998C6.80853 1.7998 7.43983 2.43083 7.43983 3.20922V12.6583C9.08268 13.2387 10.2598 14.8046 10.2598 16.6455C10.2598 18.4864 9.0827 20.0524 7.43983 20.6328V23.8804C7.43983 24.6588 6.80853 25.2898 6.0298 25.2898C5.25108 25.2898 4.61978 24.6588 4.61978 23.8804V20.6328C2.97691 20.0524 1.79981 18.4864 1.7998 16.6455C1.79981 14.8046 2.97693 13.2387 4.61978 12.6583V3.20922C4.61978 2.43083 5.25108 1.79981 6.0298 1.7998ZM6.0298 15.2051C5.23397 15.2051 4.58875 15.85 4.58875 16.6455C4.58876 17.441 5.23397 18.0859 6.0298 18.0859C6.82564 18.0859 7.47085 17.441 7.47086 16.6455C7.47086 15.85 6.82564 15.2051 6.0298 15.2051Z" fill="#BFC9CB"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M25.6498 1.7998C26.4285 1.7998 27.0598 2.43083 27.0598 3.20922V12.6583C28.7027 13.2387 29.8798 14.8046 29.8798 16.6455C29.8798 18.4864 28.7027 20.0524 27.0598 20.6328L26.4282 18.7198H21.9631C21.6173 18.107 21.4198 17.3993 21.4198 16.6455C21.4198 14.8046 22.5969 13.2387 24.2398 12.6583V3.20922C24.2398 2.43083 24.8711 1.79981 25.6498 1.7998ZM25.6498 15.2051C24.854 15.2051 24.2087 15.85 24.2087 16.6455C24.2088 17.441 24.854 18.0859 25.6498 18.0859C26.4456 18.0859 27.0909 17.441 27.0909 16.6455C27.0909 15.85 26.4456 15.2051 25.6498 15.2051Z" fill="#BFC9CB"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M15.8398 1.7998C16.6185 1.7998 17.2498 2.43083 17.2498 3.20922V6.45678C18.8927 7.03725 20.0698 8.60317 20.0698 10.4441C20.0698 12.285 18.8927 13.8509 17.2498 14.4314V18.7198H14.4298V14.4314C12.7869 13.8509 11.6098 12.285 11.6098 10.4441C11.6098 8.60317 12.7869 7.03725 14.4298 6.45678V3.20922C14.4298 2.43083 15.0611 1.79981 15.8398 1.7998ZM15.8398 9.00367C15.044 9.00367 14.3988 9.64862 14.3987 10.4441C14.3987 11.2396 15.044 11.8846 15.8398 11.8846C16.6356 11.8846 17.2809 11.2396 17.2809 10.4441C17.2809 9.64862 16.6356 9.00367 15.8398 9.00367Z" fill="#BFC9CB"/>
  </svg>
);

export default function ScenarioDetail({ onBack }: Props) {
  const [activeView, setActiveView] = useState("observabilite");
  const [activeSection, setActiveSection] = useState("multicritere");

  return (
    <div className="sd-page">

      {/* ── Page header ── */}
      <div className="sd-page-header">
        <div className="sd-page-header__left">
          <div className="sd-breadcrumb-row">
            <span className="sd-breadcrumb-item">Navitia Insights</span>
            <span className="sd-breadcrumb-sep">›</span>
            <NavigationDropdown
              label={SECTION_OPTIONS.find(o => o.id === activeSection)?.label ?? "IV MULTICRITÈRE"}
              items={SECTION_OPTIONS.map(o => ({ id: o.id, label: o.label, active: o.id === activeSection }))}
              onSelect={setActiveSection}
            />
            <span className="sd-breadcrumb-sep">›</span>
            <span className="sd-breadcrumb-item sd-breadcrumb-item--current">Scénario de mobilité 1</span>
          </div>
          <div className="sd-title-row">
            <InsightsMulticritereIcon />
            <h1 className="sd-page-title">IV Multicritère</h1>
          </div>
        </div>
        <SegmentedControlAlt
          options={[
            { value: "observabilite", label: "Observabilité" },
            { value: "cartographie",  label: "Cartographie"  },
            { value: "analyse-od",    label: "Analyse OD"    },
          ]}
          value={activeView}
          onChange={setActiveView}
        />
      </div>

      {/* ── Sub-header ── */}
      <div className="sd-subheader">
        <Link variant="secondary" onClick={onBack}
          icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 13L5 8l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          style={{ whiteSpace: "nowrap" }}
        >
          Retourner à la liste des scénarios
        </Link>
        <h2 className="sd-scenario-name">Scénario de mobilité 1</h2>
      </div>

      {/* ── Résumé global ── */}
      <div className="sd-card">
        <div className="sd-card__header">
          <h3 className="sd-card__title">Résumé global</h3>
          <SecondaryButton label="EXPORTER LE RAPPORT" state="enabled" withIcon="left" icon="download-02" outline />
        </div>
        <div className="sd-kpi-grid">
          <KpiCard icon={<IconClock/>} label="Temps trajet moyen" value="24" unit="min"
            badge={{ text: "-4.2 min vs Base", type: "positive" }} />
          <KpiCard icon={<IconWalk/>} label="Temps de marche" value="7.5" unit="min"
            badge={{ text: "+1.2 min vs Base", type: "negative" }} />
          <KpiCard icon={<IconTransfer/>} label="Correspondances" value="7.5" unit="min"
            badge={{ text: "-0.3 vs Base", type: "positive" }} />
          <KpiCard icon={<IconAlt/>} label="Alternatives" value="3.2"
            subtext="options par trajet" />
          <KpiCard icon={<IconTarget/>} label="Impact global" value="82%"
            badge={{ text: "Trajets améliorés", type: "positive" }} />
        </div>
      </div>

      {/* ── Charts row ── */}
      <div className="sd-charts-row">
        {/* Distribution par Percentiles */}
        <div className="sd-card sd-card--flex">
          <div className="sd-card__header">
            <h3 className="sd-card__title">Distribution par Percentiles</h3>
            <div className="sd-card__actions">
              <button className="sd-icon-btn"><IconGrid /></button>
              <button className="sd-icon-btn"><IconDownload /></button>
            </div>
          </div>
          <DataVisualization
            type="stacked-vertical"
            series={[{ label: "Scénario", color: "#007D79", data: [8, 18, 35, 40, 65, 88] }]}
            categories={["P10", "P25", "P50", "P75", "P90", "P95"]}
            height={240}
            showLegend={false}
            showGridLines={true}
            showValues={true}
          />
        </div>

        {/* Analyse Explicative */}
        <div className="sd-card sd-card--flex">
          <div className="sd-card__header">
            <h3 className="sd-card__title">Analyse Explicative</h3>
            <button className="sd-icon-btn"><IconDots /></button>
          </div>
          <div className="sd-analyses">
            <div className="sd-analysis sd-analysis--success">
              <IconCheck />
              <p>Optimisation des flux sur l&#x2019;axe Nord-Sud via la nouvelle ligne de bus express réduisant les correspondances inutiles.</p>
            </div>
            <div className="sd-analysis sd-analysis--warning">
              <IconWarning />
              <p>Légère augmentation de l&#x2019;attente en Zone C due aux suppressions d&#x2019;arrêts, compensée par un trajet plus direct.</p>
            </div>
          </div>
          <div className="sd-analyses__footer">
            <button className="sd-more-btn">
              <IconPlus /> PLUS D&#x2019;ANALYSES
            </button>
          </div>
        </div>
      </div>

      {/* ── Répartition par mode ── */}
      <div className="sd-card">
        <div className="sd-card__header">
          <h3 className="sd-card__title">Répartition par mode de transport</h3>
          <div className="sd-card__actions">
            <button className="sd-icon-btn"><IconGrid /></button>
            <button className="sd-icon-btn"><IconDownload /></button>
          </div>
        </div>
        <div className="sd-transport-row">
          {/* Base */}
          <div className="sd-transport-col">
            <DataVisualization
              type="horizontal"
              series={BASE_SERIES}
              categories={TRANSPORT_MODES}
              height={220}
              showLegend={false}
              showGridLines={false}
              showValues={true}
            />
          </div>

          <div className="sd-transport-arrow"><IconArrow /></div>

          {/* Scénario */}
          <div className="sd-transport-col">
            {SCENARIO_DATA.map(({ mode, value, delta, positive }) => (
              <div key={mode} className="sd-transport-item">
                <span className="sd-transport-item__mode">{mode}</span>
                <div className="sd-transport-bar-wrap">
                  <div
                    className={`sd-transport-bar sd-transport-bar--${positive ? "positive" : "negative"}`}
                    style={{ width: `${value * 2.5}%` }}
                  />
                </div>
                <span className="sd-transport-item__pct">{value}%</span>
                <span className={`sd-transport-delta sd-transport-delta--${positive ? "positive" : "negative"}`}>
                  {positive ? "+" : ""}{delta}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
