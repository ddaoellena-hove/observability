import { useState, useEffect } from "react";
import { Tab, Toggle, PrimaryButton, SecondaryButton, NavigationDropdown, SegmentedControl, TableCard, TableCardAction, AlertToast } from "hove-cadence-ui";
import CreateScenarioForm from "./CreateScenarioForm";
import ScenarioDetail from "./ScenarioDetail";
import MapScenarioPanel from "../components/MapScenarioPanel";
import ScenarioInfoCard, { type ScenarioInfoData } from "../components/ScenarioInfoCard";
import ShapeModal from "../components/ShapeModal";
import { type MapZone } from "../components/Map";
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

/* ── Helpers cellules (calqués sur les stories TableCard) ── */

const DateCell = ({ date, time }: { date: string; time: string }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    <span style={{ fontFamily: "Inter, Helvetica", fontSize: 13, fontWeight: 500, color: "#002830" }}>
      {date}
    </span>
    <span style={{ fontFamily: "Inter, Helvetica", fontSize: 12, color: "#809397" }}>
      {time}
    </span>
  </div>
);

const InfoCard = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ background: "#ECECEC", border: "1px solid #E5E5E5", borderRadius: 10, overflow: "hidden" }}>
    <div style={{ padding: "6px 12px" }}>
      <span style={{ fontFamily: "Inter, Helvetica", fontSize: 11, fontWeight: 600, color: "#737373", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        {label}
      </span>
    </div>
    <div style={{ borderRadius: "10px 10px 0 0", background: "#F7F7F7", boxShadow: "0 0 2px 0 rgba(0,0,0,0.25)", padding: "10px 12px" }}>
      {children}
    </div>
  </div>
);

/* ── Données ── */

const SCENARIOS: { id: string; maj: { date: string; time: string }; debut: { date: string; time: string }; fin: { date: string; time: string }; info: ScenarioInfoData; zones?: MapZone[] }[] = [
  {
    id: "1",
    maj:   { date: "04/06/2026", time: "09h15" },
    debut: { date: "06/06/2026", time: "06h00" },
    fin:   { date: "30/06/2026", time: "22h00" },
    zones: [{ coordinates: [[48.8935,2.328],[48.8945,2.339],[48.892,2.348],[48.8878,2.351],[48.8845,2.3455],[48.8855,2.332],[48.889,2.3265]], color: "#3b82f6", label: "Scénario n°1" }],
    info: {
      title: "Scénario de mobilité n°1",
      poi: { icon: "hospital", name: "Hôpital Bretonneau (Paris)", address: "62 Rue Joseph de Maistre (Paris)" },
      hasShape: true,
      params: {
        exclure: { name: "Gare du Nord", city: "Paris", modes: ["bus", "metro", "rer"] },
        forcer:  { name: "Abbesses",     city: "Paris", modes: ["bus", "metro"] },
        dureeMax: 1200, nbMin: 4, nbMax: 12,
      },
    },
  },
  {
    id: "2",
    maj:   { date: "02/06/2026", time: "14h30" },
    debut: { date: "10/06/2026", time: "08h00" },
    fin:   { date: "20/06/2026", time: "20h00" },
    zones: [{ coordinates: [[48.87,2.338],[48.8715,2.352],[48.866,2.356],[48.8625,2.353],[48.8628,2.339],[48.866,2.334]], color: "#3b82f6", label: "Scénario n°2" }],
    info: {
      title: "Scénario de mobilité n°2",
      poi: { icon: "station", name: "Gare de Lyon (Paris)", address: "Place Louis Armand (Paris)" },
      hasShape: true,
      params: {
        exclure: { name: "Nation",       city: "Paris", modes: ["bus", "metro", "rer", "tram"] },
        forcer:  { name: "Gare de Lyon", city: "Paris", modes: ["rer", "train"] },
        dureeMax: 900, nbMin: 3, nbMax: 10,
      },
    },
  },
  {
    id: "3",
    maj:   { date: "01/06/2026", time: "11h00" },
    debut: { date: "15/06/2026", time: "07h00" },
    fin:   { date: "15/07/2026", time: "23h00" },
    zones: [],
    info: {
      title: "Scénario de mobilité n°3",
      poi: { icon: "landmark", name: "Grands Boulevards (Paris)", address: "Boulevard des Italiens (Paris)" },
      hasShape: false,
      params: {
        exclure: { name: "Richelieu–Drouot", city: "Paris", modes: ["metro"] },
        forcer:  { name: "Bonne Nouvelle",   city: "Paris", modes: ["bus", "metro"] },
        dureeMax: 1800, nbMin: 1, nbMax: 99999,
      },
    },
  },
];

const SortIcon = () => (
  <span className="sm-col-header__sort" aria-hidden="true">
    <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
      <path d="M4 0.5L7.5 4.5H0.5L4 0.5Z" fill="#69797D"/>
    </svg>
    <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
      <path d="M4 4.5L0.5 0.5H7.5L4 4.5Z" fill="#69797D"/>
    </svg>
  </span>
);

/* Largeurs colonnes alignées header ↔ rows */
const COL = { maj: 155, debut: 155, fin: 155 };

export default function ScenariosMobilite() {
  const [activeTab, setActiveTab] = useState<TabId>("en-cours");
  const [mapView, setMapView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [shapeModal, setShapeModal] = useState<{ zones: MapZone[]; title: string } | null>(null);

  const toggleSelected = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  const [activeSection, setActiveSection] = useState("multicritere");
  const [activeView, setActiveView] = useState("scenarios");
  const [toastMounted, setToastMounted] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastProgress, setToastProgress] = useState(0);

  // Dismiss: animate out then unmount
  const dismissToast = () => {
    setToastVisible(false);
    setTimeout(() => setToastMounted(false), 380);
  };

  // Show: mount first, then trigger enter transition on next frame
  const showToast = () => {
    setToastMounted(true);
    setToastProgress(0);
    // rAF ensures the element is in the DOM before we flip is-visible
    requestAnimationFrame(() => requestAnimationFrame(() => setToastVisible(true)));
  };

  // Progress animation + auto-dismiss
  useEffect(() => {
    if (!toastVisible) return;
    const start = performance.now();
    const duration = 3000;
    let rafId: number;
    const tick = (now: number) => {
      const pct = Math.min(100, ((now - start) / duration) * 100);
      setToastProgress(Math.round(pct));
      if (pct < 100) rafId = requestAnimationFrame(tick);
      else dismissToast();
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [toastVisible]);

  const handleSuccess = () => {
    setShowForm(false);
    showToast();
  };

  if (showForm) return <CreateScenarioForm onBack={() => setShowForm(false)} onSuccess={handleSuccess} />;

  return (
    <div className="sm-page">
      {shapeModal && (
        <ShapeModal
          zones={shapeModal.zones}
          title={shapeModal.title}
          onClose={() => setShapeModal(null)}
        />
      )}
      {toastMounted && (
        <div className={`sm-toast-wrap${toastVisible ? " is-visible" : ""}`}>
          <AlertToast
            type="success"
            title="Scénario créé"
            description="Le scénario de mobilité a bien été créé et sera bientôt actif."
            progress={toastProgress}
            dismissible
            onDismiss={dismissToast}
          />
        </div>
      )}
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
        {/* Tabs + actions */}
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
              <span style={{ fontWeight: 500 }}>Affichage cartographique</span>
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

        {/* ── Fichier OD ── */}
        <div className="sm-od-section">
          <p className="sm-od-card__section-label">Fichier OD et analyse</p>
          <div className="sm-od-card">
            <div className="sm-od-card__left">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="12" stroke="#c4cdd0" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round"/>
                <circle cx="14" cy="14" r="5" stroke="#c4cdd0" strokeWidth="1.5"/>
              </svg>
              <div className="sm-od-card__text">
                <span className="sm-od-card__label">Aucun fichier OD chargé</span>
                <span className="sm-od-card__sub">Pour activer l'analyse d'impact, configurez d'abord un fichier OD.</span>
              </div>
            </div>
            <SecondaryButton
              label="Configurer"
              state="enabled"
              size="medium"
              withIcon="left"
              icon="settings-01"
            />
          </div>
        </div>

        {/* ── Vue cartographique ── */}
        {mapView && (
          <div className="sm-map-view">
            <MapScenarioPanel />
          </div>
        )}

        {/* ── Vue tableau ── */}
        {!mapView && (
          <>
            <div className="sm-col-header">
              <div className="sm-col-header__cell" style={{ width: COL.maj }}>
                MISE À JOUR
                <SortIcon />
              </div>
              <div className="sm-col-header__cell" style={{ width: COL.debut }}>
                DÉBUT
                <SortIcon />
              </div>
              <div className="sm-col-header__cell" style={{ width: COL.fin }}>
                FIN
                <SortIcon />
              </div>
              <div className="sm-col-header__cell sm-col-header__cell--flex">INFORMATIONS</div>
            </div>

            <div className="sm-rows">
              {SCENARIOS.map((row) => (
                <div
                  key={row.id}
                  className="sm-row-wrap"
                  onClick={() => toggleSelected(row.id)}
                >
                  <TableCard
                    title={row.info.title}
                    state={selected.has(row.id) ? "selected" : "default"}
                    checkboxState={selected.has(row.id) ? "checked" : "unchecked"}
                    onCheckboxChange={() => toggleSelected(row.id)}
                    actions={
                      <div
                        style={{ display: "flex", alignItems: "center", gap: 4 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <TableCardAction icon="eye" label="Consulter" />
                        <TableCardAction icon="edit-02" label="Modifier" />
                        <TableCardAction icon="copy-01" label="Dupliquer" />
                        <TableCardAction icon="trash" label="Supprimer" destructive />
                      </div>
                    }
                    columns={[
                      {
                        key: "maj",
                        content: <DateCell date={row.maj.date} time={row.maj.time} />,
                        width: COL.maj,
                      },
                      {
                        key: "debut",
                        content: <DateCell date={row.debut.date} time={row.debut.time} />,
                        width: COL.debut,
                      },
                      {
                        key: "fin",
                        content: <DateCell date={row.fin.date} time={row.fin.time} />,
                        width: COL.fin,
                      },
                      {
                        key: "info",
                        flex: 1,
                        content: (
                          <div style={{ width: "100%" }}>
                            <ScenarioInfoCard
                              data={row.info}
                              onShowMap={row.zones && row.zones.length > 0
                                ? () => setShapeModal({ zones: row.zones!, title: row.info.title })
                                : undefined}
                            />
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
