"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DietSoda } from "@/generated/prisma";
import { SodaModal } from "./SodaModal";

const BG = "#f6f0e6";
/** Horizontal pitch between grid columns. */
const CELL_X = 340;
/** Vertical pitch (larger than `IMG_H` so images do not touch top-to-bottom). */
const CELL_Y = 400;
const IMG_W = 260;
const IMG_H = 340;
const DRAG_THRESHOLD_PX = 6;
/** Extra margin when computing which grid cells intersect the viewport. */
const GRID_PAD = Math.max(CELL_X, CELL_Y);

function sodaAtCell(i: number, j: number, sodas: DietSoda[]): DietSoda {
  const n = sodas.length;
  const mix = ((i * 92837111) ^ (j * 689287499)) >>> 0;
  return sodas[mix % n];
}

function visibleGridBounds(
  camX: number,
  camY: number,
  vw: number,
  vh: number,
  pad: number,
): { iMin: number; iMax: number; jMin: number; jMax: number } {
  const left = -camX - pad;
  const top = -camY - pad;
  const right = -camX + vw + pad;
  const bottom = -camY + vh + pad;
  return {
    iMin: Math.floor(left / CELL_X),
    iMax: Math.ceil(right / CELL_X),
    jMin: Math.floor(top / CELL_Y),
    jMax: Math.ceil(bottom / CELL_Y),
  };
}

type Props = {
  sodas: DietSoda[];
};

export function SodaInfiniteCanvas({ sodas }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ w: 800, h: 600 });
  const [cam, setCam] = useState({ x: 0, y: 0 });
  const camRef = useRef(cam);

  const [active, setActive] = useState<DietSoda | null>(null);

  const dragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    startCamX: 0,
    startCamY: 0,
    moved: false,
  });

  const pendingThumbRef = useRef<DietSoda | null>(null);

  useEffect(() => {
    camRef.current = cam;
  }, [cam]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setViewport({ w: r.width, h: r.height });
    });
    ro.observe(el);
    const r = el.getBoundingClientRect();
    setViewport({ w: r.width, h: r.height });
    return () => ro.disconnect();
  }, []);

  const cells = useMemo(() => {
    if (sodas.length === 0) return [];
    const { iMin, iMax, jMin, jMax } = visibleGridBounds(cam.x, cam.y, viewport.w, viewport.h, GRID_PAD);
    const out: { key: string; i: number; j: number; soda: DietSoda }[] = [];
    for (let j = jMin; j <= jMax; j++) {
      for (let i = iMin; i <= iMax; i++) {
        out.push({
          key: `${i},${j}`,
          i,
          j,
          soda: sodaAtCell(i, j, sodas),
        });
      }
    }
    return out;
  }, [cam.x, cam.y, viewport.w, viewport.h, sodas]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement;
      if (target.closest("a[href]")) return;

      const thumb = target.closest("[data-soda-thumb]");
      pendingThumbRef.current = thumb?.getAttribute("data-soda-id")
        ? sodas.find((s) => s.id === thumb!.getAttribute("data-soda-id")) ?? null
        : null;

      const d = dragRef.current;
      d.active = true;
      d.pointerId = e.pointerId;
      d.startX = e.clientX;
      d.startY = e.clientY;
      d.startCamX = camRef.current.x;
      d.startCamY = camRef.current.y;
      d.moved = false;

      wrapRef.current?.setPointerCapture(e.pointerId);
    },
    [sodas],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.active || e.pointerId !== d.pointerId) return;

    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.moved && dx * dx + dy * dy > DRAG_THRESHOLD_PX * DRAG_THRESHOLD_PX) {
      d.moved = true;
    }

    setCam({
      x: d.startCamX + dx,
      y: d.startCamY + dy,
    });
  }, []);

  const endPointer = useCallback(
    (e: React.PointerEvent) => {
      const d = dragRef.current;
      if (!d.active || e.pointerId !== d.pointerId) return;

      if (!d.moved && pendingThumbRef.current) {
        setActive(pendingThumbRef.current);
      }

      pendingThumbRef.current = null;
      d.active = false;
      d.moved = false;
      wrapRef.current?.releasePointerCapture(e.pointerId);
    },
    [],
  );

  return (
    <>
      <div
        ref={wrapRef}
        className="fixed inset-0 cursor-grab touch-none overflow-hidden select-none active:cursor-grabbing"
        style={{ backgroundColor: BG }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
      >
        <Link
          href="/admin"
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute right-4 top-4 z-10 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-xs font-medium text-stone-700 shadow-sm backdrop-blur hover:bg-white"
        >
          Manage
        </Link>

        <p className="pointer-events-none absolute left-4 top-4 z-10 max-w-[min(90vw,280px)] text-xs leading-snug text-stone-500">
          Drag to explore · Release on a can without dragging to open details
        </p>

        <div
          className="absolute left-0 top-0 will-change-transform"
          style={{
            transform: `translate(${cam.x}px, ${cam.y}px)`,
          }}
        >
          {cells.map(({ key, i, j, soda }) => {
            const left = i * CELL_X + (CELL_X - IMG_W) / 2;
            const top = j * CELL_Y + (CELL_Y - IMG_H) / 2;
            return (
              <button
                key={key}
                type="button"
                data-soda-thumb
                data-soda-id={soda.id}
                aria-label={`Open ${soda.title}`}
                className="group absolute overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-black/5 transition-transform duration-300 hover:z-20 hover:scale-105 focus-visible:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-800"
                style={{ left, top, width: IMG_W, height: IMG_H }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- CMS URLs */}
                <img
                  src={soda.imageUrl}
                  alt=""
                  draggable={false}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      </div>

      <SodaModal soda={active} onClose={() => setActive(null)} />
    </>
  );
}
