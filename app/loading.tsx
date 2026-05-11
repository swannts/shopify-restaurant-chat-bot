export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background z-[200] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-24 h-24 border border-gold/20 rounded-full" />
        <div className="absolute inset-0 w-24 h-24 border-t border-gold rounded-full animate-spin" />
      </div>
      <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-gold animate-pulse">
        Maison Étoile
      </p>
    </div>
  );
}
