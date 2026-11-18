"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { PERFIL_DEFAULT, type Perfil } from "@/lib/data";

const PerfilContext = createContext<Perfil>(PERFIL_DEFAULT);

/** Carga una sola vez el perfil del negocio desde Supabase y lo comparte con todo el sitio. */
export function PerfilProvider({ children }: { children: React.ReactNode }) {
  const [perfil, setPerfil] = useState<Perfil>(PERFIL_DEFAULT);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    supabase
      .from("perfil")
      .select("*")
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) return;
        // Solo sobrescribe los campos que tengan valor
        const clean = Object.fromEntries(
          Object.entries(data).filter(([, v]) => v !== null && v !== ""),
        ) as Partial<Perfil>;
        setPerfil({ ...PERFIL_DEFAULT, ...clean });
      });
  }, []);

  return <PerfilContext.Provider value={perfil}>{children}</PerfilContext.Provider>;
}

export const usePerfil = () => useContext(PerfilContext);
