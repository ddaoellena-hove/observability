import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export interface MapZone {
  coordinates: [number, number][];
  color?: string;
  fillOpacity?: number;
  label?: string;
}

interface Props {
  className?: string;
  /** Static zones rendered on the map. */
  zones?: MapZone[];
  /** Enable polygon drawing mode. */
  drawMode?: boolean;
  /** Called with the completed polygon coordinates on double-click. */
  onZoneDrawn?: (coords: [number, number][]) => void;
  /** Increment to reset the drawn shape. */
  resetKey?: number;
}

export default function Map({ className, zones = [], drawMode = false, onZoneDrawn, resetKey = 0 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const zonesLayerRef = useRef<L.LayerGroup | null>(null);
  const drawLayerRef = useRef<L.LayerGroup | null>(null);

  // Drawing state (refs to avoid stale closures in event handlers)
  const pointsRef = useRef<[number, number][]>([]);
  const previewPolyRef = useRef<L.Polygon | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);

  // ── Init map once ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [48.872, 2.345],
      zoom: 12,
      zoomControl: true,
      doubleClickZoom: false, // we use dblclick for closing the shape
    });

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { attribution: "Tiles © Esri", maxZoom: 19 }
    ).addTo(map);

    zonesLayerRef.current = L.layerGroup().addTo(map);
    drawLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      zonesLayerRef.current = null;
      drawLayerRef.current = null;
    };
  }, []);

  // ── Render static zones ────────────────────────────────────────────────────
  useEffect(() => {
    const lg = zonesLayerRef.current;
    if (!lg) return;
    lg.clearLayers();
    zones.forEach(({ coordinates, color = "#3b82f6", fillOpacity = 0.18, label }) => {
      const poly = L.polygon(coordinates, {
        color, weight: 2, opacity: 0.9, fillColor: color, fillOpacity,
      });
      if (label) {
        poly.bindTooltip(label, {
          sticky: true, direction: "top", offset: [0, -8], className: "map-zone-tooltip",
        });
      }
      poly.addTo(lg);
    });
  }, [zones]);

  // ── Drawing mode ───────────────────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    const dl = drawLayerRef.current;
    if (!map || !dl) return;

    if (!drawMode) {
      map.off("click");
      map.off("dblclick");
      map.getContainer().style.cursor = "";
      return;
    }

    map.getContainer().style.cursor = "crosshair";

    const redrawPreview = () => {
      if (previewPolyRef.current) dl.removeLayer(previewPolyRef.current);
      if (pointsRef.current.length >= 2) {
        previewPolyRef.current = L.polygon(pointsRef.current, {
          color: "#3b82f6", weight: 2, opacity: 0.9,
          fillColor: "#3b82f6", fillOpacity: 0.18,
          dashArray: "6 4",
        }).addTo(dl);
      }
    };

    const onClick = (e: L.LeafletMouseEvent) => {
      const latlng: [number, number] = [e.latlng.lat, e.latlng.lng];
      pointsRef.current = [...pointsRef.current, latlng];

      // Vertex marker
      const marker = L.circleMarker(latlng, {
        radius: 5, color: "#3b82f6", fillColor: "#fff", fillOpacity: 1, weight: 2,
      }).addTo(dl);
      markersRef.current.push(marker);

      redrawPreview();
    };

    const onDblClick = () => {
      if (pointsRef.current.length < 3) return;

      // Replace dashed preview with solid polygon
      dl.clearLayers();
      L.polygon(pointsRef.current, {
        color: "#3b82f6", weight: 2, opacity: 0.9,
        fillColor: "#3b82f6", fillOpacity: 0.25,
      }).addTo(dl);

      onZoneDrawn?.(pointsRef.current);
      pointsRef.current = [];
      markersRef.current = [];
      previewPolyRef.current = null;
    };

    map.on("click", onClick);
    map.on("dblclick", onDblClick);

    return () => {
      map.off("click", onClick);
      map.off("dblclick", onDblClick);
      map.getContainer().style.cursor = "";
    };
  }, [drawMode, onZoneDrawn]);

  // ── Reset drawn shape ──────────────────────────────────────────────────────
  useEffect(() => {
    const dl = drawLayerRef.current;
    if (!dl) return;
    dl.clearLayers();
    pointsRef.current = [];
    markersRef.current = [];
    previewPolyRef.current = null;
  }, [resetKey]);

  return (
    <div ref={containerRef} className={className} style={{ width: "100%", height: "100%" }} />
  );
}
