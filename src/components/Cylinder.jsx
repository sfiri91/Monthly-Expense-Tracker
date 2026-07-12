import React from 'react';

const CYLL_BOT = 218;
const CYLL_H   = 200;

function gradColor(spentPct) {
  if (spentPct >= 1)    return { liquid: '#e05252', meniscus: '#f07070' };
  if (spentPct >= 0.75) return { liquid: '#e09a30', meniscus: '#f0b855' };
  return                       { liquid: '#3b9ee8', meniscus: '#5ab4f0' };
}

function GradMarks() {
  const marks = [];
  for (let i = 0; i <= 10; i++) {
    const y     = CYLL_BOT - (i / 10) * CYLL_H;
    const major = i % 5 === 0;
    marks.push(
      <line
        key={`tick-${i}`}
        x1={major ? 10 : 12} y1={y} x2={14} y2={y}
        stroke="rgba(140,190,230,0.4)"
        strokeWidth={major ? 1 : 0.7}
      />
    );
    if (major) {
      marks.push(
        <text
          key={`label-${i}`}
          x={8} y={y + 3.5}
          textAnchor="end"
          fontFamily="'DM Mono', monospace"
          fontSize={6.5}
          fill="rgba(140,190,230,0.6)"
        >
          {i * 10}%
        </text>
      );
    }
  }
  return <>{marks}</>;
}

export default function Cylinder({ spentPct }) {
  const fillPct = Math.max(1 - Math.min(spentPct, 1), 0);
  const fillH   = Math.round(fillPct * CYLL_H);
  const newY    = CYLL_BOT - fillH;
  const { liquid, meniscus } = gradColor(spentPct);

  return (
    <svg
      viewBox="0 0 80 240"
      style={{ width: 80, height: 240, overflow: 'visible', display: 'block' }}
    >
      <defs>
        <clipPath id="cylClip">
          <rect x={14} y={18} width={52} height={200} rx={2} />
        </clipPath>
      </defs>

      <GradMarks />

      <g clipPath="url(#cylClip)">
        {/* Liquid body */}
        <rect
          x={14} y={newY} width={52} height={fillH}
          fill={liquid}
          style={{
            transition: 'height 0.7s cubic-bezier(0.4,0,0.2,1), y 0.7s cubic-bezier(0.4,0,0.2,1), fill 0.5s ease',
          }}
        />
        {/* Meniscus curve */}
        <ellipse
          cx={40} cy={newY} rx={26} ry={5}
          fill={meniscus}
          style={{ transition: 'cy 0.7s cubic-bezier(0.4,0,0.2,1), fill 0.5s ease' }}
        />
        {/* Foam highlight */}
        <ellipse
          cx={40} cy={newY - 2} rx={26} ry={3}
          fill="rgba(140,200,255,0.18)"
          style={{ transition: 'cy 0.7s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </g>

      {/* Glass body */}
      <rect
        x={14} y={18} width={52} height={200} rx={3}
        fill="rgba(180,220,255,0.06)"
        stroke="rgba(180,220,255,0.3)"
        strokeWidth={1}
      />
      {/* Glass shine */}
      <rect x={18} y={21} width={6} height={194} rx={2} fill="rgba(255,255,255,0.06)" />
      {/* Top rim */}
      <ellipse cx={40} cy={18} rx={26} ry={6}
        fill="rgba(180,220,255,0.10)"
        stroke="rgba(180,220,255,0.32)" strokeWidth={1}
      />
      {/* Bottom ellipse */}
      <ellipse cx={40} cy={218} rx={26} ry={6}
        fill="rgba(140,190,230,0.12)"
        stroke="rgba(140,190,230,0.22)" strokeWidth={0.8}
      />
      {/* Base plate */}
      <rect x={8} y={222} width={64} height={10} rx={4}
        fill="rgba(140,190,230,0.12)"
        stroke="rgba(180,220,255,0.2)" strokeWidth={0.8}
      />
    </svg>
  );
}
