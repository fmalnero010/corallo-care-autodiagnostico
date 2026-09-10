import { LogoMark } from './Icons';

export function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        <LogoMark className="brand-mark" />
        <span className="brand-word">Corallo Care</span>
      </div>
    </header>
  );
}
