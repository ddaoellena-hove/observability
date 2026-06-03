import { useState } from "react";
import {
  TextInput,
  DatePicker,
  SecondaryButton,
  PrimaryButton,
} from "hove-cadence-ui";
import Map from "../components/Map";
import FileLibraryDrawer from "../components/FileLibraryDrawer";
import "./CreateScenarioForm.css";

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

  return (
    <div className="csf-layout">
      {/* ── Left panel ── */}
      <div className="csf-panel">
        <div className="csf-panel__header">
          <div>
            <h2 className="csf-panel__title">Créer un scénario de mobilité</h2>
            <p className="csf-panel__subtitle">
              Renseignez les paramètres, dessinez la zone et ajoutez le fichier OD.
            </p>
          </div>
          <SecondaryButton
            label="Retour au board"
            state="enabled"
            withIcon="no"
            outline
            onClick={onBack}
          />
        </div>

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
              <select
                className="csf-select"
                value={scenarioApplique}
                onChange={(e) => setScenarioApplique(e.target.value)}
              >
                <option>Départ</option>
                <option>Arrivée</option>
                <option>Départ et arrivée</option>
              </select>
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

      {showLibrary && (
        <FileLibraryDrawer
          onClose={() => setShowLibrary(false)}
          onSelect={(file) => setOdFile(file)}
        />
      )}

      {/* ── Right panel (map placeholder) ── */}
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
  );
}
