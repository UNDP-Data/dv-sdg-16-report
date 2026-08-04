import { Link } from '@tanstack/react-router';
import { DARK_BLUE, ROUTES } from '../constants';

const footerLinkClass = 'text-sm text-gray-300 transition-colors hover:text-white';

export default function FooterEl() {
  return (
    <footer style={{ backgroundColor: DARK_BLUE }} className='px-6 py-10 md:px-12'>
      <div className='mx-auto flex flex-col items-start justify-between gap-8 md:flex-row md:items-center'>
        <div className='flex items-center gap-6'>
          <div className='flex h-10 w-24 items-center justify-center rounded border border-white/15 text-white/40 text-xs'>
            Logo
          </div>
          <div className='flex h-10 w-24 items-center justify-center rounded border border-white/15 text-white/40 text-xs'>
            Logo
          </div>
        </div>
        <nav className='flex flex-wrap items-center gap-x-6 gap-y-2'>
          <Link to={ROUTES.home} className={footerLinkClass}>
            Home
          </Link>
          <Link to={ROUTES.peace} className={footerLinkClass}>
            Peace
          </Link>
          <Link to={ROUTES.justice} className={footerLinkClass}>
            Justice
          </Link>
          <Link to={ROUTES.inclusion} className={footerLinkClass}>
            Inclusion
          </Link>
          <span className={footerLinkClass}>Impact stories</span>
          <span className={footerLinkClass}>Materials</span>
          <span className={footerLinkClass}>About</span>
        </nav>
      </div>
    </footer>
  );
}
