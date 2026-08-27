import { Link } from '@tanstack/react-router';

const footerLinkClass = 'text-sm text-content-reverse transition-colors hover:text-foreground';

export default function FooterEl() {
  return (
    <footer
      className='border-background/30 border-t bg-cover bg-foreground-soft px-6 py-4 md:px-12'
      style={{ backgroundImage: "url('/imgs/paper-texture.webp')" }}
    >
      <div className='mx-auto flex flex-col items-start justify-between gap-8 md:flex-row md:items-center'>
        <div className='flex items-center gap-6'>
          <div className='flex h-10 w-24 items-center justify-center rounded border border-background/30 text-content-reverse text-xs'>
            Logo
          </div>
          <div className='flex h-10 w-24 items-center justify-center rounded border border-background/30 text-content-reverse text-xs'>
            Logo
          </div>
        </div>
        <nav className='flex flex-wrap items-center gap-x-6 gap-y-2'>
          <Link to='/' className={footerLinkClass}>
            Home
          </Link>
          <Link to='/foreword' className={footerLinkClass}>
            Foreword
          </Link>
          <Link to='/chapters/peace' className={footerLinkClass}>
            Peace
          </Link>
          <Link to='/chapters/justice' className={footerLinkClass}>
            Justice
          </Link>
          <Link to='/chapters/inclusion' className={footerLinkClass}>
            Inclusion
          </Link>
          <Link to='/impact-stories' className={footerLinkClass}>
            Impact stories
          </Link>
          <Link to='/' className={footerLinkClass}>
            Materials
          </Link>
          <Link to='/' className={footerLinkClass}>
            About
          </Link>
        </nav>
      </div>
    </footer>
  );
}
