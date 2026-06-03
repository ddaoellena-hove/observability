import { useState } from "react";
import { Tab, Toggle, PrimaryButton } from "hove-cadence-ui";
import CreateScenarioForm from "./CreateScenarioForm";
import "./ScenariosMobilite.css";

type TabId = "en-cours" | "a-venir" | "passees" | "brouillon";

const TABS: { id: TabId; label: string }[] = [
  { id: "en-cours", label: "EN COURS" },
  { id: "a-venir", label: "À VENIR" },
  { id: "passees", label: "PASSÉES" },
  { id: "brouillon", label: "BROUILLON" },
];

export default function ScenariosMobilite() {
  const [activeTab, setActiveTab] = useState<TabId>("en-cours");
  const [mapView, setMapView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <CreateScenarioForm onBack={() => setShowForm(false)} />;
  }

  return (
    <div className="sm-page">
      {/* ── Top bar ── */}
      <div className="sm-topbar">
        <div className="sm-topbar__left">
          <span className="sm-breadcrumb">SCÉNARIOS DE MOBILITÉ</span>
          <h1 className="sm-title">Scénario de mobilité</h1>
        </div>
        <div className="sm-topbar__right">
          <div className="sm-badge">OD: aucun fichier</div>
          <button className="sm-btn sm-btn--danger">Redémarrer</button>
          <div className="sm-avatar">BK</div>
        </div>
      </div>

      {/* ── Content card ── */}
      <div className="sm-card">
        {/* Tabs + actions row */}
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

        {/* Table */}
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
