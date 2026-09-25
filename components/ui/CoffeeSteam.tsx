import { useId } from "react";

/** A mesma proporção e recorte da foto mantêm xícara e bico alinhados. */
export function CoffeeSteam() {
  const id = useId().replace(/:/g, "");
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 2000 1458" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" focusable="false">
        <defs>
          <linearGradient id={`${id}-ceramic`} x1="0" x2="1">
            <stop stopColor="#a5a39d" />
            <stop offset=".2" stopColor="#e5e2d8" />
            <stop offset=".45" stopColor="#fffdf3" />
            <stop offset=".75" stopColor="#d9d7cd" />
            <stop offset="1" stopColor="#92938d" />
          </linearGradient>
          <radialGradient id={`${id}-coffee`}>
            <stop stopColor="#a66a32" />
            <stop offset=".65" stopColor="#683716" />
            <stop offset="1" stopColor="#351b0e" />
          </radialGradient>
          <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#514735" stopOpacity="0" />
            <stop offset=".7" stopColor="#514735" stopOpacity=".06" />
            <stop offset="1" stopColor="#302a22" stopOpacity=".28" />
          </linearGradient>
          <linearGradient id={`${id}-pour`}>
            <stop stopColor="#301307" />
            <stop offset=".5" stopColor="#ac6b30" />
            <stop offset="1" stopColor="#4b230d" />
          </linearGradient>
          <filter id={`${id}-shadow`} x="-50%" y="-100%" width="200%" height="300%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        {/* Coordinates belong to the photograph: cup base rests on the drip tray.
            Scale uniformly around the base to preserve the cup's proportions. */}
        <ellipse cx="1386" cy="890" rx="44" ry="8" fill="#000" opacity=".42" filter={`url(#${id}-shadow)`} />
        <ellipse cx="1386" cy="889" rx="32" ry="2.7" fill="#16130f" opacity=".55" />
        <g transform="translate(1386 888) scale(.83) translate(-1358 -869)">
        <path d="M1421 776C1493 749 1484 850 1413 835" fill="none" stroke="#979890" strokeWidth="19" />
        <path d="M1423 773C1487 751 1479 840 1416 833" fill="none" stroke="#e8e6dc" strokeWidth="12" />
        <path d="M1286 768C1289 809 1297 851 1316 861C1336 874 1388 874 1407 856C1424 834 1428 801 1431 768Z" fill={`url(#${id}-ceramic)`} />
        <path d="M1286 768C1289 809 1297 851 1316 861C1336 874 1388 874 1407 856C1424 834 1428 801 1431 768Z" fill={`url(#${id}-shade)`} />
        <ellipse cx="1358" cy="768" rx="73" ry="23" fill="#f2efe5" />
        <ellipse cx="1358" cy="769" rx="64" ry="17" fill="#787366" />
        <ellipse cx="1358" cy="772" rx="61" ry="14" fill={`url(#${id}-coffee)`} />
        <path d="M1305 793Q1309 831 1320 844" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="5" strokeLinecap="round" />
        </g>
        <g className="coffee-pour">
          <path d="M1386 624C1385 684 1387 746 1386 807.5" fill="none" stroke={`url(#${id}-pour)`} strokeWidth="5" strokeLinecap="round" />
          <path className="coffee-pour-glint" d="M1386 627L1386 805.5" stroke="#e9b477" strokeOpacity=".5" strokeWidth="1" strokeDasharray="8 21" />
          <ellipse className="coffee-ripple" cx="1386" cy="807.5" rx="10" ry="2.5" fill="none" stroke="#daa05b" strokeWidth="2" />
        </g>
      </svg>
      <div className="coffee-vapor absolute inset-0">
        {[0, 1, 2, 3, 4].map((index) => (
          <span key={index} className={`coffee-vapor-wisp coffee-vapor-wisp-${index}`} />
        ))}
      </div>
    </div>
  );
}
