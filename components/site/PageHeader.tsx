import Image from "next/image";

/** Encabezado compacto para las páginas internas, con la misma estética del hero original. */
export default function PageHeader({ eyebrow, title, subtitle, image }: { eyebrow: string; title: string; subtitle: string; image: string }) {
  return (
    <section className="relative pt-36 pb-20 px-6 overflow-hidden">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--accent)]/30 rounded-full px-4 py-1.5 text-sm text-[var(--accent)] font-medium mb-6">
          <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
          {eyebrow}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">{title}</h1>
        <p className="text-gray-200 text-lg max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </section>
  );
}
