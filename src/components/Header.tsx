import { LogoMark } from './Icons';

export function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        <LogoMark className="brand-mark" />
        <span className="brand-word">
          Corallo Care
          <span className="brand-sub">Autodiagnóstico de piel</span>
        </span>
      </div>
    </header>
  );
}
