import { useState } from "react";
import { Tab, Toggle, PrimaryButton, Breadcrumbs, Dropdown, SegmentedControl } from "hove-cadence-ui";
import CreateScenarioForm from "./CreateScenarioForm";
import "./ScenariosMobilite.css";

type TabId = "en-cours" | "a-venir" | "passees" | "brouillon";

const TABS: { id: TabId; label: string }[] = [
  { id: "en-cours", label: "EN COURS" },
  { id: "a-venir", label: "À VENIR" },
  { id: "passees", label: "PASSÉES" },
  { id: "brouillon", label: "BROUILLON" },
];

const SECTION_OPTIONS = [
  { id: "multicritere", label: "IV MULTICRITÈRE" },
  { id: "dynamique", label: "IV DYNAMIQUE & ENRICHIE" },
  { id: "intelligente", label: "IV INTELLIGENTE" },
];

const InsightsMulticritereIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.02 1.2C4.54 1.2 4.96 1.62 4.96 2.14V8.44C6.06 8.83 6.84 9.87 6.84 11.1c0 1.22-.78 2.27-1.88 2.65v2.17c0 .52-.42.94-.94.94s-.94-.42-.94-.94v-2.17C1.98 13.37 1.2 12.32 1.2 11.1c0-1.23.78-2.27 1.88-2.66V2.14C3.08 1.62 3.5 1.2 4.02 1.2zm0 8.94c-.53 0-.96.43-.96.96s.43.96.96.96.96-.43.96-.96-.43-.96-.96-.96z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M17.1 1.2c.52 0 .94.42.94.94V8.44c1.1.39 1.88 1.43 1.88 2.66 0 1.22-.78 2.27-1.88 2.65v2.17c0 .52-.42.94-.94.94s-.94-.42-.94-.94v-2.17c-1.1-.38-1.88-1.43-1.88-2.65 0-1.23.78-2.27 1.88-2.66V2.14c0-.52.42-.94.94-.94zm0 8.94c-.53 0-.96.43-.96.96s.43.96.96.96.96-.43.96-.96-.43-.96-.96-.96z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M10.56 1.2c.52 0 .94.42.94.94v2.16c1.1.39 1.88 1.43 1.88 2.66 0 1.22-.78 2.27-1.88 2.65V12h-1.88V9.61C8.52 9.23 7.74 8.18 7.74 6.96c0-1.23.78-2.27 1.88-2.66V2.14c0-.52.42-.94.94-.94zm0 4.8c-.53 0-.96.43-.96.96s.43.96.96.96.96-.43.96-.96-.43-.96-.96-.96z" fill="currentColor"/>
  </svg>
);

export default function ScenariosMobilite() {
  const [activeTab, setActiveTab] = useState<TabId>("en-cours");
  const [mapView, setMapView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activeSection, setActiveSection] = useState("multicritere");
  const [activeView, setActiveView] = useState("scenarios");

  if (showForm) {
    return <CreateScenarioForm onBack={() => setShowForm(false)} />;
  }

  return (
    <div className="sm-page">
      {/* ── Header ── */}
      <div className="sm-header">
        <div className="sm-header__left">
          <Breadcrumbs
            items={[
              { id: "root", label: "Navitia Insights" },
              { id: "section", label: SECTION_OPTIONS.find(o => o.id === activeSection)?.label ?? "IV MULTICRITÈRE" },
              { id: "current", label: "Scénario de mobilité" },
            ]}
            onNavigate={(id) => { if (id === "root") {} }}
          />
          <div className="sm-header__title-row">
            <InsightsMulticritereIcon />
            <h1 className="sm-title">IV Multicritère</h1>
            <Dropdown
              options={SECTION_OPTIONS}
              value={activeSection}
              onChange={setActiveSection}
              className="sm-section-dropdown"
            />
          </div>
        </div>
        <div className="sm-header__right">
          <SegmentedControl
            options={[
              { value: "scenarios", label: "Scénario de mobilité" },
              { value: "bibliotheque", label: "Bibliothèque" },
            ]}
            value={activeView}
            onChange={setActiveView}
          />
        </div>
      </div>

      {/* ── Content card ── */}
      <div className="sm-card">
        <div className="sm-card__header">
          <nav className="sm-tabs" role="tablist">
            {TABS.map((tab) => (
              <Tab
                key={tab.id}
                label={tab.label}
                variant={activeTab === tab.id ? "active" : "default"}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </nav>
          <div className="sm-card__actions">
            <label className="sm-toggle-label">
              <span>Affichage cartographique</span>
              <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <Toggle
                  state={mapView ? "active" : hovered ? "hover" : "default"}
                  onChange={(next) => setMapView(next)}
                />
              </div>
            </label>
            <PrimaryButton
              label="Créer un scénario de mobilité"
              state="enabled"
              withIcon="no"
              onClick={() => setShowForm(true)}
            />
          </div>
        </div>

        <table className="sm-table">
          <thead>
            <tr>
              <th>MISE À JOUR</th>
              <th>DÉBUT</th>
              <th>FIN</th>
              <th>INFORMATIONS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="sm-table__empty">
                Aucun scénario enregistré pour le moment.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
