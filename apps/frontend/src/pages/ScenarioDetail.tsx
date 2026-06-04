import { useState } from "react";
import { Link, SegmentedControl, DataVisualization, SecondaryButton } from "hove-cadence-ui";
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

export default function ScenarioDetail({ onBack }: Props) {
  const [activeView, setActiveView] = useState("observabilite");

  return (
    <div className="sd-page">

      {/* ── Sub-header ── */}
      <div className="sd-subheader">
        <div className="sd-subheader__left">
          <Link variant="secondary" onClick={onBack}
            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 13L5 8l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            style={{ whiteSpace: "nowrap" }}
          >
            Retourner à la liste des scénarios
          </Link>
          <h2 className="sd-scenario-name">Scénario de mobilité 1</h2>
        </div>
        <SegmentedControl
          options={[
            { value: "observabilite", label: "Observabilité" },
            { value: "cartographie",  label: "Cartographie"  },
            { value: "analyse-od",    label: "Analyse OD"    },
          ]}
          value={activeView}
          onChange={setActiveView}
        />
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
