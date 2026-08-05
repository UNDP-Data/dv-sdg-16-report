import { Link } from '@tanstack/react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@undp/design-system-react/DropdownMenu';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { DARK_BLUE, ROUTES } from '../constants';

const navLinkClass = 'text-sm text-gray-300 transition-colors hover:text-white';
const mobileNavLinkClass = 'block py-3 text-base text-gray-300 transition-colors hover:text-white';

export default function HeaderEl() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className='relative border-gray-800 border-b px-6 py-4 md:px-12'
      style={{ backgroundColor: DARK_BLUE }}
    >
      <div className='mx-auto flex items-center justify-between'>
        <Link to={ROUTES.home} className='font-bold text-white'>
          SDG16 Report
        </Link>

        <nav className='hidden items-center gap-8 md:flex'>
          <Link to={ROUTES.home} className={navLinkClass}>
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center gap-1 ${navLinkClass}`}>
              Chapters
              <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='border-white/10 bg-[#010C19] text-white'>
              <DropdownMenuItem asChild className='focus:bg-white/10 focus:font-normal'>
                <Link to={ROUTES.peace}>Peace</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='focus:bg-white/10 focus:font-normal'>
                <Link to={ROUTES.justice}>Justice</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='focus:bg-white/10 focus:font-normal'>
                <Link to={ROUTES.inclusion}>Inclusion</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to={ROUTES.impactStories} className={navLinkClass}>
            Impact stories
          </Link>
          <span className={navLinkClass}>Materials</span>
          <span className={navLinkClass}>About</span>
        </nav>

        <button
          type='button'
          className='text-white md:hidden'
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen ? (
        <nav
          className='absolute inset-x-0 top-full z-40 border-gray-800 border-t px-6 py-4 md:hidden'
          style={{ backgroundColor: DARK_BLUE }}
        >
          <Link
            to={ROUTES.home}
            className={mobileNavLinkClass}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            to={ROUTES.peace}
            className={mobileNavLinkClass}
            onClick={() => setMobileOpen(false)}
          >
            Peace
          </Link>
          <Link
            to={ROUTES.justice}
            className={mobileNavLinkClass}
            onClick={() => setMobileOpen(false)}
          >
            Justice
          </Link>
          <Link
            to={ROUTES.inclusion}
            className={mobileNavLinkClass}
            onClick={() => setMobileOpen(false)}
          >
            Inclusion
          </Link>
          <Link
            to={ROUTES.impactStories}
            className={mobileNavLinkClass}
            onClick={() => setMobileOpen(false)}
          >
            Impact stories
          </Link>
          <span className={mobileNavLinkClass}>Materials</span>
          <span className={mobileNavLinkClass}>About</span>
        </nav>
      ) : null}
    </header>
  );
}
