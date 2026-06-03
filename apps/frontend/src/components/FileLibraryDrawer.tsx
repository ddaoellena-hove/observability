import { useState, useEffect } from "react";
import { PrimaryButton, SecondaryButton, TextInput } from "hove-cadence-ui";
import "./FileLibraryDrawer.css";

const ALL_FILES = [
  { id: 1, name: "od_city_center_v1.csv", lines: "145 000 LIGNES" },
  { id: 2, name: "od_suburbs_v1.csv", lines: "120 000 LIGNES" },
  { id: 3, name: "od_rural_areas_v1.csv", lines: "80 000 LIGNES" },
  { id: 4, name: "od_peripherie_idfm.csv", lines: "145 000 LIGNES" },
  { id: 5, name: "od_grandes_couronnes.csv", lines: "98 000 LIGNES" },
  { id: 6, name: "od_petite_couronne.csv", lines: "210 000 LIGNES" },
  { id: 7, name: "od_zone_dense.csv", lines: "312 000 LIGNES" },
  { id: 8, name: "od_nuit_idfm.csv", lines: "67 000 LIGNES" },
  { id: 9, name: "od_weekend_v2.csv", lines: "88 000 LIGNES" },
  { id: 10, name: "od_heure_pointe.csv", lines: "175 000 LIGNES" },
  { id: 11, name: "od_heure_creuse.csv", lines: "54 000 LIGNES" },
  { id: 12, name: "od_vacances_scolaires.csv", lines: "43 000 LIGNES" },
];

const PAGE_SIZE = 6;

interface Props {
  onClose: () => void;
  onSelect: (file: { name: string }) => void;
}

const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="3" y="1.5" width="11" height="14" rx="1.5" stroke="#9ca3af" strokeWidth="1.5" />
    <path d="M14 1.5l2.5 2.5V16a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 16V3A1.5 1.5 0 0 1 5 1.5H14z" stroke="#9ca3af" strokeWidth="1.25" />
    <path d="M7 7h6M7 10h4" stroke="#9ca3af" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

export default function FileLibraryDrawer({ onClose, onSelect }: Props) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const filtered = ALL_FILES.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleValidate = () => {
    const file = ALL_FILES.find((f) => f.id === selected);
    if (file) onSelect(file);
    handleClose();
  };

  return (
    <div className={`fld-overlay${visible ? " fld-overlay--visible" : ""}`} onClick={handleClose}>
      <div className={`fld-drawer${visible ? " fld-drawer--visible" : ""}`} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="fld-header">
          <h2 className="fld-title">Sélectionner un fichier</h2>
          <button className="fld-close" onClick={handleClose} aria-label="Fermer">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="fld-search">
          <TextInput
            label=""
            placeholder="Rechercher dans la bibliothèque"
            value={search}
            onChange={handleSearch}
          />
        </div>

        {/* File list */}
        <div className="fld-list">
          {paged.map((file) => (
            <button
              key={file.id}
              className={`fld-item${selected === file.id ? " fld-item--selected" : ""}`}
              onClick={() => setSelected(file.id)}
            >
              <FileIcon />
              <div className="fld-item__info">
                <span className="fld-item__name">{file.name}</span>
                <span className="fld-item__meta">{file.lines}</span>
              </div>
              {selected === file.id && (
                <svg className="fld-item__check" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="8.25" fill="#1b6cff" />
                  <path d="M5.5 9l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Pagination */}
        <div className="fld-pagination">
          <button
            className="fld-page-btn"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Précédent
          </button>
          <div className="fld-page-numbers">
            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={`fld-page-num${page === n ? " fld-page-num--active" : ""}`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
            {totalPages > 3 && <span className="fld-page-ellipsis">…</span>}
          </div>
          <button
            className="fld-page-btn"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Suivant
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 11l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div className="fld-footer">
          <PrimaryButton
            label="Valider"
            state={selected ? "enabled" : "disabled"}
            withIcon="no"
            onClick={handleValidate}
          />
        </div>
      </div>
    </div>
  );
}
