import { useState } from "react";
import {
  TextInput,
  DatePicker,
  SecondaryButton,
  PrimaryButton,
  NavigationDropdown,
  Dropdown,
  SegmentedControl,
} from "hove-cadence-ui";
import Map from "../components/Map";
import FileLibraryDrawer from "../components/FileLibraryDrawer";
import "./CreateScenarioForm.css";

const SECTION_OPTIONS = [
  { id: "multicritere", label: "IV MULTICRITÈRE" },
  { id: "dynamique", label: "IV DYNAMIQUE & ENRICHIE" },
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

interface Props {
  onBack: () => void;
}

export default function CreateScenarioForm({ onBack }: Props) {
  const [titre, setTitre] = useState("");
  const [dateSimulation, setDateSimulation] = useState<Date | null>(null);
  const [exclureObjet, setExclureObjet] = useState("stop_area:IDFM:482835");
  const [forcerObjet, setForcerObjet] = useState("stop_area:IDFM:482835");
  const [dureeMax, setDureeMax] = useState("1800");
  const [nbMin, setNbMin] = useState("1");
  const [nbMax, setNbMax] = useState("99999");
  const [scenarioApplique, setScenarioApplique] = useState("Départ");
  const [dateDebut, setDateDebut] = useState<Date | null>(null);
  const [dateFin, setDateFin] = useState<Date | null>(null);
  const [odFile, setOdFile] = useState<{ name: string } | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [urlNavitia, setUrlNavitia] = useState("https://api.navitia.io/v1/coverage/fr-idf");
  const [token, setToken] = useState("");
  const [tailleOD, setTailleOD] = useState("120");
  const [concurrence, setConcurrence] = useState("6");
  const [paramsAvances, setParamsAvances] = useState(`{"wheelchair": true, "first_section_mode[]": ["walking"]}`);
  const [status, setStatus] = useState("Prêt.");
  const [activeSection, setActiveSection] = useState("multicritere");
  const [activeView, setActiveView] = useState("scenarios");

  return (
    <div className="csf-wrapper">
      {/* ── Page header ── */}
      <div className="csf-page-header">
        <div className="csf-page-header__left">
          <div className="csf-breadcrumb-row">
            <span className="csf-breadcrumb-item">Navitia Insights</span>
            <span className="csf-breadcrumb-sep">›</span>
            <NavigationDropdown
              label={SECTION_OPTIONS.find(o => o.id === activeSection)?.label ?? "IV MULTICRITÈRE"}
              items={SECTION_OPTIONS.map(o => ({ id: o.id, label: o.label, active: o.id === activeSection }))}
              onSelect={setActiveSection}
            />
            <span className="csf-breadcrumb-sep">›</span>
            <span className="csf-breadcrumb-item csf-breadcrumb-item--current">Nouveau scénario de mobilité</span>
          </div>
          <div className="csf-header__title-row">
            <InsightsMulticritereIcon />
            <h1 className="csf-page-title">IV Multicritère</h1>
          </div>
        </div>
        <SegmentedControl
          options={[
            { value: "scenarios", label: "Scénario de mobilité" },
            { value: "bibliotheque", label: "Bibliothèque" },
          ]}
          value={activeView}
          onChange={setActiveView}
        />
      </div>

      <div className="csf-layout">
      {/* ── Left panel ── */}
      <div className="csf-panel">
        <div className="csf-sections">
          {/* ── Section 1 ── */}
          <section className="csf-section">
            <h3 className="csf-section__title">1. Définissez le titre du scénario de mobilité</h3>
            <div className="csf-field">
              <TextInput
                label="Titre du scénario"
                placeholder="Saisissez un titre"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
              />
            </div>
            <div className="csf-field">
              <label className="csf-label">Date de simulation (requête Navitia)</label>
              <DatePicker
                value={dateSimulation}
                onChange={setDateSimulation}
                placeholder="jj/mm/aaaa --:--"
                withTime
                labelConfirm="Valider"
              />
            </div>
          </section>

          {/* ── Section 2 ── */}
          <section className="csf-section">
            <h3 className="csf-section__title">2. Définissez votre zone impactée</h3>
            <p className="csf-section__desc">
              Dessinez un shape sur la carte à droite. La zone servira au filtrage et au calcul du barycentre.
            </p>
            <SecondaryButton
              label="Réinitialiser la zone"
              state="enabled"
              withIcon="no"
              outline
            />
          </section>

          {/* ── Section 3 ── */}
          <section className="csf-section">
            <h3 className="csf-section__title">3. Attribuez des paramètres à la zone impactée</h3>
            <div className="csf-field">
              <label className="csf-label">Exclure un objet</label>
              <textarea
                className="csf-textarea"
                value={exclureObjet}
                onChange={(e) => setExclureObjet(e.target.value)}
                rows={3}
              />
            </div>
            <div className="csf-field">
              <label className="csf-label">Forcer l'usage d'un objet</label>
              <textarea
                className="csf-textarea"
                value={forcerObjet}
                onChange={(e) => setForcerObjet(e.target.value)}
                rows={3}
              />
            </div>
            <div className="csf-row3">
              <div className="csf-field">
                <TextInput
                  label="Durée maximale marche à pied en rabattement (s)"
                  value={dureeMax}
                  onChange={(e) => setDureeMax(e.target.value)}
                  type="number"
                />
              </div>
              <div className="csf-field">
                <TextInput
                  label="Nombre minimal de propositions d'itinéraire"
                  value={nbMin}
                  onChange={(e) => setNbMin(e.target.value)}
                  type="number"
                />
              </div>
              <div className="csf-field">
                <TextInput
                  label="Nombre maximal de propositions d'itinéraire"
                  value={nbMax}
                  onChange={(e) => setNbMax(e.target.value)}
                  type="number"
                />
              </div>
            </div>
            <div className="csf-field">
              <label className="csf-label">Scénario appliqué à</label>
              <Dropdown
                options={[
                  { id: "depart", label: "Départ" },
                  { id: "arrivee", label: "Arrivée" },
                  { id: "depart-arrivee", label: "Départ et arrivée" },
                ]}
                value={scenarioApplique}
                onChange={setScenarioApplique}
              />
            </div>
          </section>

          {/* ── Section 4 ── */}
          <section className="csf-section">
            <h3 className="csf-section__title">4. Sélectionnez la période d'application</h3>
            <div className="csf-row2">
              <div className="csf-field">
                <label className="csf-label">Date et heure de début d'application</label>
                <DatePicker
                  value={dateDebut}
                  onChange={setDateDebut}
                  placeholder="jj/mm/aaaa --:--"
                  withTime
                  labelConfirm="Valider"
                />
              </div>
              <div className="csf-field">
                <label className="csf-label">Date et heure de fin d'application</label>
                <DatePicker
                  value={dateFin}
                  onChange={setDateFin}
                  placeholder="jj/mm/aaaa --:--"
                  withTime
                  labelConfirm="Valider"
                />
              </div>
            </div>
          </section>

          {/* ── Section 5 ── */}
          <section className="csf-section">
            <h3 className="csf-section__title">
              5. Fichier OD unique <span className="csf-optional">(optionnel)</span>
            </h3>
            <div className="csf-field">
              <label className="csf-label">Fichier</label>
              <div
                className={`csf-dropzone${dragOver ? " csf-dropzone--over" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const file = e.dataTransfer.files[0];
                  if (file) setOdFile(file);
                }}
              >
                <div className="csf-dropzone__icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="6" fill="#e8edf5"/>
                    <path d="M12 16V8M12 8l-3 3M12 8l3 3" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 18h12" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="csf-dropzone__text">
                  <strong>Glissez et déposez un fichier au format .csv</strong>
                </p>
                <p className="csf-dropzone__or">ou</p>
                <SecondaryButton
                  label="Choisir dans la bibliothèque"
                  state="enabled"
                  withIcon="no"
                  onClick={() => setShowLibrary(true)}
                />
              </div>
              <div className="csf-dropzone__meta">
                <span>Format supporté : CSV</span>
                <span>Taille du fichier max. : 25 MB</span>
              </div>
              <div className="csf-dropzone__status">
                {odFile ? odFile.name : "Aucun fichier chargé."}
              </div>
              <div className="csf-info-box">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="csf-info-icon">
                  <circle cx="9" cy="9" r="8" stroke="#888" strokeWidth="1.5"/>
                  <path d="M9 8v5" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="9" cy="5.5" r="0.75" fill="#888"/>
                </svg>
                <p className="csf-info-text">
                  Le fichier doit contenir les colonnes obligatoires :{" "}
                  <span className="csf-tag">LATITUDE</span>{" "}
                  <span className="csf-tag">LONGITUDE</span>{" "}
                  et optionnellement{" "}
                  <span className="csf-tag csf-tag--muted">NAMES</span>
                </p>
              </div>
            </div>
          </section>

          {/* ── Section 6 ── */}
          <section className="csf-section">
            <h3 className="csf-section__title">6. Connexion et paramètres avancés</h3>
            <div className="csf-field">
              <TextInput
                label="URL Navitia (coverage)"
                value={urlNavitia}
                onChange={(e) => setUrlNavitia(e.target.value)}
                placeholder="https://api.navitia.io/v1/coverage/fr-idf"
              />
            </div>
            <div className="csf-field">
              <TextInput
                label="Token Navitia"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Votre token"
                type="password"
              />
            </div>
            <div className="csf-row2">
              <div className="csf-field">
                <TextInput
                  label="Taille échantillon OD"
                  value={tailleOD}
                  onChange={(e) => setTailleOD(e.target.value)}
                  type="number"
                />
              </div>
              <div className="csf-field">
                <TextInput
                  label="Concurrence requêtes"
                  value={concurrence}
                  onChange={(e) => setConcurrence(e.target.value)}
                  type="number"
                />
              </div>
            </div>
            <div className="csf-field">
              <label className="csf-label">Paramètres avancés (JSON, optionnel)</label>
              <textarea
                className="csf-textarea"
                value={paramsAvances}
                onChange={(e) => setParamsAvances(e.target.value)}
                rows={4}
              />
            </div>
          </section>
        </div>

        <div className="csf-footer">
          <section className="csf-section csf-footer__section">
            <PrimaryButton
              label="Réinitialiser"
              state="enabled"
              withIcon="no"
              outline
              onClick={() => setStatus("Réinitialisé.")}
            />
            <PrimaryButton
              label="Suivant"
              state="enabled"
              withIcon="no"
            />
          </section>
          <p className="csf-status">{status}</p>
        </div>
      </div>

      {/* ── Right panel (map) ── */}
      <div className="csf-map">
        <div className="csf-map__inner">
          <div className="csf-map__header">
            <span className="csf-map__breadcrumb">Création / Paramétrage</span>
            <h2 className="csf-map__title">Définissez votre scénario et dessinez la zone impactée</h2>
            <p className="csf-map__subtitle">
              La carte à droite vous permet de tracer le shape puis de visualiser le périmètre OD.
            </p>
          </div>
          <Map className="csf-map__canvas" />
        </div>
      </div>
      </div>

      {showLibrary && (
        <FileLibraryDrawer
          onClose={() => setShowLibrary(false)}
          onSelect={(file) => setOdFile(file)}
        />
      )}
    </div>
  );
}
