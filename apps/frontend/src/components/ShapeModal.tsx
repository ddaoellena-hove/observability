import { useEffect } from "react";
import Map, { type MapZone } from "./Map";
import "./ShapeModal.css";

interface Props {
  zones: MapZone[];
  title?: string;
  onClose: () => void;
}

export default function ShapeModal({ zones, title = "Shape", onClose }: Props) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="shape-modal__overlay" onClick={onClose}>
      <div className="shape-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="shape-modal__header">
          <div className="shape-modal__header-left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M17.0445 1.73828L18.7871 9.44591L22.3201 13.3526L15.0664 22.1757L1.9248 17.5256L2.83224 8.69551L8.80249 4.16862L17.0445 1.73828ZM9.71922 5.98344L4.73294 9.76424L4.07516 16.165L14.4118 19.8225L19.6798 13.4148L16.952 10.3985L15.5641 4.25994L9.71922 5.98344Z" fill="#737373"/>
            </svg>
            <span className="shape-modal__title">{title.toUpperCase()}</span>
          </div>
          <button className="shape-modal__close" onClick={onClose} aria-label="Fermer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Map */}
        <div className="shape-modal__map">
          <Map className="shape-modal__canvas" zones={zones} />
        </div>
      </div>
    </div>
  );
}
