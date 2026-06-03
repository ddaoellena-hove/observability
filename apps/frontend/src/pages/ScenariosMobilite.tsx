import { useState } from "react";
import { Tab, Toggle, PrimaryButton, NavigationDropdown, SegmentedControl } from "hove-cadence-ui";
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
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27.3824 34.2002L23.0768 20.1602H25.3492L28.6382 31.3922L31.9272 20.1602H34.1996L29.894 34.2002H27.3824Z" fill="#405E64"/>
    <path d="M12.5996 34.2002V32.3148H15.6295V22.0455H12.6395V20.1602H20.7324V22.0455H17.7424V32.3148H20.7723V34.2002H12.5996Z" fill="#405E64"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M6.0298 1.7998C6.80853 1.7998 7.43983 2.43083 7.43983 3.20922V12.6583C9.08268 13.2387 10.2598 14.8046 10.2598 16.6455C10.2598 18.4864 9.0827 20.0524 7.43983 20.6328V23.8804C7.43983 24.6588 6.80853 25.2898 6.0298 25.2898C5.25108 25.2898 4.61978 24.6588 4.61978 23.8804V20.6328C2.97691 20.0524 1.79981 18.4864 1.7998 16.6455C1.79981 14.8046 2.97693 13.2387 4.61978 12.6583V3.20922C4.61978 2.43083 5.25108 1.79981 6.0298 1.7998ZM6.0298 15.2051C5.23397 15.2051 4.58875 15.85 4.58875 16.6455C4.58876 17.441 5.23397 18.0859 6.0298 18.0859C6.82564 18.0859 7.47085 17.441 7.47086 16.6455C7.47086 15.85 6.82564 15.2051 6.0298 15.2051Z" fill="#BFC9CB"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M25.6498 1.7998C26.4285 1.7998 27.0598 2.43083 27.0598 3.20922V12.6583C28.7027 13.2387 29.8798 14.8046 29.8798 16.6455C29.8798 18.4864 28.7027 20.0524 27.0598 20.6328L26.4282 18.7198H21.9631C21.6173 18.107 21.4198 17.3993 21.4198 16.6455C21.4198 14.8046 22.5969 13.2387 24.2398 12.6583V3.20922C24.2398 2.43083 24.8711 1.79981 25.6498 1.7998ZM25.6498 15.2051C24.854 15.2051 24.2087 15.85 24.2087 16.6455C24.2088 17.441 24.854 18.0859 25.6498 18.0859C26.4456 18.0859 27.0909 17.441 27.0909 16.6455C27.0909 15.85 26.4456 15.2051 25.6498 15.2051Z" fill="#BFC9CB"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M15.8398 1.7998C16.6185 1.7998 17.2498 2.43083 17.2498 3.20922V6.45678C18.8927 7.03725 20.0698 8.60317 20.0698 10.4441C20.0698 12.285 18.8927 13.8509 17.2498 14.4314V18.7198H14.4298V14.4314C12.7869 13.8509 11.6098 12.285 11.6098 10.4441C11.6098 8.60317 12.7869 7.03725 14.4298 6.45678V3.20922C14.4298 2.43083 15.0611 1.79981 15.8398 1.7998ZM15.8398 9.00367C15.044 9.00367 14.3988 9.64862 14.3987 10.4441C14.3987 11.2396 15.044 11.8846 15.8398 11.8846C16.6356 11.8846 17.2809 11.2396 17.2809 10.4441C17.2809 9.64862 16.6356 9.00367 15.8398 9.00367Z" fill="#BFC9CB"/>
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
          <div className="sm-breadcrumb-row">
            <span className="sm-breadcrumb-item">Navitia Insights</span>
            <span className="sm-breadcrumb-sep">›</span>
            <NavigationDropdown
              label={SECTION_OPTIONS.find(o => o.id === activeSection)?.label ?? "IV MULTICRITÈRE"}
              items={SECTION_OPTIONS.map(o => ({ id: o.id, label: o.label, active: o.id === activeSection }))}
              onSelect={setActiveSection}
            />
            <span className="sm-breadcrumb-sep">›</span>
            <span className="sm-breadcrumb-item sm-breadcrumb-item--current">Scénario de mobilité</span>
          </div>
          <div className="sm-header__title-row">
            <InsightsMulticritereIcon />
            <h1 className="sm-title">IV Multicritère</h1>
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
