"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";

/**
 * Carga los registros activos de una tabla de contenido (servicios / portfolio).
 * Mientras tanto —o si Supabase no responde o está vacío— muestra el contenido original.
 */
export function useActiveRows<T>(table: "servicios" | "portfolio", fallback: T[]) {
  const [rows, setRows] = useState<T[]>(fallback);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    let cancelled = false;
    (async () => {
      try {
        const query = supabase.from(table).select("*").eq("activo", true).order("orden");
        const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), 2500));
        const { data } = await Promise.race([query, timeout]);
        if (!cancelled && data && data.length > 0) setRows(data as T[]);
      } catch {
        /* se mantiene el contenido original */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [table]);

  return rows;
}
