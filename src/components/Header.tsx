import { LogoMark } from './Icons';

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="https://laboratoriolaca.com" target="_blank" rel="noreferrer">
        <LogoMark className="brand-mark" />
        <span className="brand-word">
          LACA
          <span className="brand-sub">Cosmética Profesional</span>
        </span>
      </a>
    </header>
  );
}
