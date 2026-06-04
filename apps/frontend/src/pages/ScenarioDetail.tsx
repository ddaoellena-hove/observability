import { useState } from "react";
import { Link, SegmentedControl, SegmentedControlAlt, NavigationDropdown, DataVisualization, SecondaryButton } from "hove-cadence-ui";
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

const IconTempstrajet = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M16.1996 9.59961C19.8447 9.59961 22.7996 12.5545 22.7996 16.1996C22.7996 19.8447 19.8447 22.7996 16.1996 22.7996C12.5545 22.7996 9.59961 19.8447 9.59961 16.1996C9.59961 12.5545 12.5545 9.59961 16.1996 9.59961ZM15.9839 12.3604C15.6266 12.3604 15.3369 12.6501 15.3369 13.0075V16.7265L18.1146 19.5042C18.3673 19.7569 18.777 19.7569 19.0297 19.5042C19.2824 19.2515 19.2824 18.8419 19.0297 18.5892L16.631 16.1905V13.0075C16.631 12.6501 16.3413 12.3604 15.9839 12.3604Z" fill="#737373"/>
    <path d="M5.13906 15.6918C5.26437 15.6918 5.34359 15.8261 5.28279 15.9355L3.06361 19.9268C2.8384 20.3201 2.33636 20.4567 1.94225 20.232C1.54813 20.0072 1.41118 19.5061 1.63639 19.1128L3.52393 15.7477C3.5433 15.7132 3.57989 15.6918 3.61955 15.6918H5.13906Z" fill="#737373"/>
    <path d="M8.23832 17.3324C8.30456 17.8024 8.41153 18.2593 8.55537 18.6995H4.5642C4.48048 18.6995 4.42767 18.6096 4.46858 18.5367L5.06588 17.4722C5.11433 17.3859 5.20573 17.3324 5.30488 17.3324H8.23832Z" fill="#737373"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12.0999 1.2002C13.2439 1.2002 14.1955 2.07834 14.285 3.21658L14.6846 8.30264C14.3622 8.3641 14.0466 8.44495 13.739 8.54369L13.3504 3.88906C13.3267 3.60564 13.0893 3.38762 12.8044 3.38762H3.40199C3.11702 3.38762 2.87962 3.60563 2.85596 3.88906L2.39934 9.35756C2.37272 9.67638 2.62481 9.94982 2.94537 9.94982H11.1418C9.5802 11.215 8.50214 13.0534 8.22795 15.145H3.93906C2.34156 15.145 1.08287 13.7864 1.20777 12.1969L1.91348 3.21658C2.00293 2.07834 2.95451 1.2002 4.0985 1.2002H12.0999ZM3.99367 11.0435C3.53975 11.0435 3.17178 11.4108 3.17178 11.8638C3.17178 12.3169 3.53975 12.6841 3.99367 12.6841H5.08955C5.54347 12.6841 5.91144 12.3169 5.91145 11.8638C5.91145 11.4108 5.54347 11.0435 5.08955 11.0435H3.99367Z" fill="#737373"/>
  </svg>
);
const IconTempsMarche = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M16.2004 10.2002C19.6798 10.2002 22.5004 13.0208 22.5004 16.5002C22.5004 19.9796 19.6798 22.8002 16.2004 22.8002C12.721 22.8002 9.90039 19.9796 9.90039 16.5002C9.90039 13.0208 12.721 10.2002 16.2004 10.2002ZM15.9945 12.8355C15.6534 12.8355 15.3769 13.1121 15.3769 13.4532V17.0031L18.0284 19.6546C18.2696 19.8958 18.6606 19.8958 18.9018 19.6546C19.143 19.4134 19.143 19.0224 18.9018 18.7811L16.6122 16.4915V13.4532C16.6121 13.1121 16.3356 12.8355 15.9945 12.8355Z" fill="#737373"/>
    <path d="M6.65568 15.5594C6.72944 15.6339 6.75267 15.7447 6.71509 15.8425L5.23144 19.7055C5.01941 20.2576 4.38603 20.5384 3.81675 20.3328C3.24748 20.1272 2.95786 19.513 3.16988 18.961L5.08542 13.9735L6.65568 15.5594Z" fill="#737373"/>
    <path d="M6.10156 5.69967C6.29304 5.60333 6.51525 5.56068 6.74398 5.5884L8.65449 5.82002C8.99818 5.86168 9.29443 6.02212 9.50714 6.25227L10.9787 7.84326L13.3284 8.55529C13.7055 8.66958 13.974 8.96269 14.0658 9.30834C13.2818 9.54071 12.5514 9.89789 11.8975 10.3567L10.3225 9.87945C9.97583 9.77439 9.66185 9.58789 9.40824 9.33717L8.61353 12.9594C8.57471 13.1363 8.62838 13.3209 8.75609 13.4494L9.17457 13.8706C8.86816 14.6889 8.70054 15.5749 8.70054 16.5002C8.70054 16.7577 8.71354 17.0121 8.73886 17.2629L8.36955 16.283C8.31044 16.1262 8.2168 15.9871 8.09392 15.8731C7.39718 15.2266 4.95785 12.9331 4.55656 12.1424C4.44567 11.864 4.41361 11.5519 4.48238 11.2365L5.05724 8.60047L4.68312 8.78375L3.66101 10.9504C3.4083 11.4861 2.75563 11.7218 2.2032 11.4767C1.65077 11.2317 1.4078 10.5987 1.6605 10.063L2.76277 7.72637C2.91846 7.39632 3.18525 7.12739 3.51933 6.96377L6.06968 5.71467C6.08026 5.70949 6.09089 5.70449 6.10156 5.69967Z" fill="#737373"/>
    <path d="M8.0505 1.2002C9.20473 1.2002 10.1404 2.10756 10.1404 3.22684C10.1404 4.34611 9.20472 5.25348 8.0505 5.25348C6.89629 5.25347 5.96064 4.34611 5.96064 3.22684C5.96064 2.10756 6.89629 1.2002 8.0505 1.2002Z" fill="#737373"/>
  </svg>
);
const IconCorrespondances = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12.9308 15.6951C13.212 15.4141 13.6677 15.4141 13.9489 15.6951C14.2301 15.9762 14.2301 16.4317 13.9489 16.7127L12.298 18.3626H22.0798C22.4775 18.3626 22.7998 18.6848 22.7998 19.0822C22.7998 19.4796 22.4775 19.8018 22.0798 19.8018H12.298L13.9489 21.4518C14.2301 21.7328 14.2301 22.1883 13.9489 22.4693C13.6677 22.7503 13.212 22.7503 12.9308 22.4693L10.0508 19.591C9.7696 19.31 9.7696 18.8545 10.0508 18.5734L12.9308 15.6951ZM18.6908 9.7508C18.972 9.46979 19.4277 9.46979 19.7089 9.7508L22.5889 12.6291C22.8701 12.9101 22.8701 13.3656 22.5889 13.6466L19.7089 16.5249C19.4277 16.806 18.972 16.806 18.6908 16.5249C18.4096 16.2439 18.4096 15.7884 18.6908 15.5074L20.3417 13.8574H10.5598C10.1622 13.8574 9.83984 13.5353 9.83984 13.1379C9.83984 12.7405 10.1622 12.4183 10.5598 12.4183H20.3417L18.6908 10.7683C18.4096 10.4873 18.4096 10.0318 18.6908 9.7508Z" fill="#737373"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12.8992 1.37988C14.2454 1.37988 15.3367 2.47305 15.3367 3.82154V4.30986H16.068C16.4718 4.30986 16.7992 4.63785 16.7992 5.0424V6.50736C16.7992 6.91191 16.4718 7.2399 16.068 7.2399C15.6641 7.2399 15.3367 6.91191 15.3367 6.50736V11.2181H14.1127C14.1161 11.1948 14.118 11.1708 14.118 11.1465V4.79824C14.118 4.52854 13.8997 4.30986 13.6305 4.30986H4.36797C4.09873 4.30986 3.88047 4.52854 3.88047 4.79824V11.1465C3.88047 11.4162 4.09873 11.6349 4.36797 11.6349H9.36479C8.93484 11.9769 8.65479 12.4994 8.63986 13.0881L8.63922 13.1377L8.63986 13.1873C8.66617 14.2252 9.51605 15.0573 10.5592 15.0573H11.8707L9.43164 17.4949H6.95172C6.73633 17.4949 6.56172 17.6698 6.56172 17.8856V18.2274C6.56171 18.6319 6.23432 18.9599 5.83047 18.9599H4.36797C3.96412 18.9599 3.63673 18.6319 3.63672 18.2274V17.7376C3.63672 17.5822 3.5751 17.4331 3.46539 17.3232L3.0901 16.9473C2.81583 16.6726 2.66172 16.2999 2.66172 15.9114V6.50736C2.66172 6.91191 2.33433 7.2399 1.93047 7.2399C1.52661 7.2399 1.19922 6.91191 1.19922 6.50736V5.0424C1.19922 4.63785 1.52661 4.30986 1.93047 4.30986H2.66172V3.82154C2.66172 2.47305 3.75303 1.37988 5.09922 1.37988H12.8992ZM5.83047 13.5882C5.42661 13.5882 5.09922 13.9162 5.09922 14.3207C5.09922 14.7253 5.42661 15.0532 5.83047 15.0532H6.80547C7.20933 15.0532 7.53672 14.7253 7.53672 14.3207C7.53672 13.9162 7.20933 13.5882 6.80547 13.5882H5.83047ZM7.53672 2.35652C7.26748 2.35652 7.04922 2.5752 7.04922 2.8449C7.04923 3.11459 7.26749 3.33322 7.53672 3.33322H10.4617C10.731 3.33322 10.9492 3.11459 10.9492 2.8449C10.9492 2.5752 10.731 2.35652 10.4617 2.35652H7.53672Z" fill="#737373"/>
  </svg>
);
const IconAlternatives = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.3452 10.7653C14.2197 9.69321 16.409 9.65021 18.2447 10.457C18.5906 10.609 18.7466 11.0101 18.5931 11.3528C18.4397 11.6955 18.0348 11.8501 17.6889 11.698C16.2364 11.0597 14.5095 11.0952 13.0304 11.9412C10.8676 13.1781 9.95577 15.7372 10.7344 17.9929L10.7977 17.7589C10.8957 17.3968 11.2714 17.1819 11.637 17.2789C12.0026 17.376 12.2195 17.7482 12.1216 18.1103L11.6199 19.965C11.5729 20.1389 11.458 20.2872 11.3006 20.3772C11.1432 20.4672 10.9562 20.4916 10.7806 20.445L8.90846 19.9481C8.5429 19.851 8.32596 19.4788 8.42391 19.1166C8.52186 18.7545 8.89762 18.5396 9.26318 18.6366L9.54069 18.7103C8.37667 15.7877 9.51595 12.3835 12.3452 10.7653ZM19.5809 12.7354C19.6788 12.3733 20.0546 12.1584 20.4201 12.2554L22.2923 12.7524C22.6579 12.8494 22.8748 13.2216 22.7769 13.5838C22.6789 13.9459 22.3032 14.1608 21.9376 14.0638L21.6597 13.99C22.8241 16.9127 21.6848 20.3172 18.8555 21.9354C16.9809 23.0076 14.7916 23.0506 12.956 22.2438C12.61 22.0918 12.454 21.6907 12.6075 21.348C12.7609 21.0053 13.1658 20.8507 13.5118 21.0028C14.9642 21.6411 16.6911 21.6056 18.1702 20.7596C20.3329 19.5227 21.2448 16.9636 20.4662 14.7079L20.403 14.9415C20.3051 15.3036 19.9293 15.5185 19.5638 15.4215C19.1982 15.3245 18.9813 14.9522 19.0792 14.5901L19.5809 12.7354Z" fill="#737373"/>
    <path d="M5.13906 15.6918C5.26437 15.6918 5.34359 15.8261 5.28279 15.9355L3.06361 19.9268C2.8384 20.3201 2.33636 20.4567 1.94225 20.232C1.54813 20.0072 1.41118 19.5061 1.63639 19.1128L3.52393 15.7477C3.5433 15.7132 3.57989 15.6918 3.61955 15.6918H5.13906Z" fill="#737373"/>
    <path d="M7.95115 17.3324C7.96904 17.4698 7.99067 17.6071 8.01625 17.7441C7.68862 17.9681 7.42965 18.2963 7.29572 18.6995H4.5642C4.48048 18.6995 4.42767 18.6096 4.46858 18.5367L5.06588 17.4722C5.11433 17.3859 5.20573 17.3324 5.30488 17.3324H7.95115Z" fill="#737373"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12.0999 1.2002C13.2439 1.2002 14.1955 2.07834 14.285 3.21658L14.7197 8.74953C14.402 8.78552 14.0849 8.84145 13.7703 8.91775L13.3504 3.88906C13.3267 3.60564 13.0893 3.38762 12.8044 3.38762H3.40199C3.11702 3.38762 2.87962 3.60563 2.85596 3.88906L2.39934 9.35756C2.37272 9.67638 2.62481 9.94982 2.94537 9.94982H11.3769C9.49935 11.1666 8.31858 13.0793 7.9852 15.145H3.93906C2.34156 15.145 1.08287 13.7864 1.20777 12.1969L1.91348 3.21658C2.00293 2.07834 2.95451 1.2002 4.0985 1.2002H12.0999ZM3.99367 11.0435C3.53975 11.0435 3.17178 11.4108 3.17178 11.8638C3.17178 12.3169 3.53975 12.6841 3.99367 12.6841H5.08955C5.54347 12.6841 5.91144 12.3169 5.91145 11.8638C5.91145 11.4108 5.54347 11.0435 5.08955 11.0435H3.99367Z" fill="#737373"/>
  </svg>
);
const IconImpact = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M1 12.0002C1 5.92503 5.92487 1.00016 12 1.00016C12.5523 1.00016 13 1.44788 13 2.00016C13 2.55245 12.5523 3.00016 12 3.00016C7.02944 3.00016 3 7.0296 3 12.0002C3 16.9707 7.02944 21.0002 12 21.0002C16.9706 21.0002 21 16.9707 21 12.0002C21 11.4479 21.4477 11.0002 22 11.0002C22.5523 11.0002 23 11.4479 23 12.0002C23 18.0753 18.0751 23.0002 12 23.0002C5.92487 23.0002 1 18.0753 1 12.0002ZM6 12.0002C6 8.68645 8.68629 6.00016 12 6.00016C12.5523 6.00016 13 6.44788 13 7.00016C13 7.55245 12.5523 8.00016 12 8.00016C9.79086 8.00016 8 9.79102 8 12.0002C8 14.2093 9.79086 16.0002 12 16.0002C14.2091 16.0002 16 14.2093 16 12.0002C16 11.4479 16.4477 11.0002 17 11.0002C17.5523 11.0002 18 11.4479 18 12.0002C18 15.3139 15.3137 18.0002 12 18.0002C8.68629 18.0002 6 15.3139 6 12.0002ZM19.1602 1.01286C19.4774 1.06435 19.7508 1.26539 19.8945 1.5529L20.7451 3.25407L22.4473 4.10563C22.7348 4.24939 22.9358 4.52273 22.9873 4.84001C23.0388 5.15727 22.9343 5.47992 22.707 5.70719L19.707 8.70719C19.5195 8.89472 19.2652 9.00015 19 9.00016H16.4141L12.707 12.7072C12.3165 13.0977 11.6835 13.0977 11.293 12.7072C10.9025 12.3167 10.9025 11.6837 11.293 11.2931L15 7.5861V5.00016C15 4.73495 15.1054 4.48067 15.293 4.29313L18.293 1.29313L18.3828 1.21403C18.6012 1.04258 18.8826 0.967817 19.1602 1.01286ZM17 5.41422V7.00016H18.5859L20.3115 5.2736L19.5527 4.89469C19.3592 4.79793 19.2022 4.64095 19.1055 4.44743L18.7256 3.68766L17 5.41422Z" fill="#737373"/>
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

const SECTION_OPTIONS = [
  { id: "multicritere", label: "IV MULTICRITÈRE" },
  { id: "dynamique",    label: "IV DYNAMIQUE & ENRICHIE" },
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

export default function ScenarioDetail({ onBack }: Props) {
  const [activeView, setActiveView] = useState("observabilite");
  const [activeSection, setActiveSection] = useState("multicritere");

  return (
    <div className="sd-page">

      {/* ── Page header ── */}
      <div className="sd-page-header">
        <div className="sd-page-header__left">
          <div className="sd-breadcrumb-row">
            <span className="sd-breadcrumb-item">Navitia Insights</span>
            <span className="sd-breadcrumb-sep">›</span>
            <NavigationDropdown
              label={SECTION_OPTIONS.find(o => o.id === activeSection)?.label ?? "IV MULTICRITÈRE"}
              items={SECTION_OPTIONS.map(o => ({ id: o.id, label: o.label, active: o.id === activeSection }))}
              onSelect={setActiveSection}
            />
            <span className="sd-breadcrumb-sep">›</span>
            <span className="sd-breadcrumb-item sd-breadcrumb-item--current">Scénario de mobilité 1</span>
          </div>
          <div className="sd-title-row">
            <InsightsMulticritereIcon />
            <h1 className="sd-page-title">IV Multicritère</h1>
          </div>
        </div>
        <SegmentedControl
          options={[
            { value: "scenarios", label: "Scénario de mobilité" },
            { value: "bibliotheque", label: "Bibliothèque" },
          ]}
          value="scenarios"
        />
      </div>

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
        <SegmentedControlAlt
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
          <KpiCard icon={<IconTempstrajet/>} label="Temps trajet moyen" value="24" unit="min"
            badge={{ text: "-4.2 min vs Base", type: "positive" }} />
          <KpiCard icon={<IconTempsMarche/>} label="Temps de marche" value="7.5" unit="min"
            badge={{ text: "+1.2 min vs Base", type: "negative" }} />
          <KpiCard icon={<IconCorrespondances/>} label="Correspondances" value="7.5" unit="min"
            badge={{ text: "-0.3 vs Base", type: "positive" }} />
          <KpiCard icon={<IconAlternatives/>} label="Alternatives" value="3.2"
            subtext="options par trajet" />
          <KpiCard icon={<IconImpact/>} label="Impact global" value="82%"
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
