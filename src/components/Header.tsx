import { Link } from '@tanstack/react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@undp/design-system-react/DropdownMenu';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinkClass = 'text-sm text-surface-md transition-colors hover:text-content-reverse';
const mobileNavLinkClass =
  'block py-3 text-base text-surface-md transition-colors hover:text-content-reverse';

export default function HeaderEl() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className='relative border-background/30 border-b bg-foreground-soft bg-repeat px-6 py-4 md:px-12'
      style={{ backgroundImage: "url('/imgs/paper-texture.webp')" }}
    >
      <div className='mx-auto flex items-center justify-between'>
        <Link to='/' className='font-bold text-content-reverse'>
          SDG16 Report
        </Link>

        <nav className='hidden items-center gap-8 md:flex'>
          <Link to='/' className={navLinkClass}>
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center gap-1 ${navLinkClass}`}>
              Chapters
              <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='border-background/10 bg-surface-4xl text-content-reverse'>
              <DropdownMenuItem asChild className='focus:bg-white/10 focus:font-normal'>
                <Link to='/chapters/peace'>Peace</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='focus:bg-white/10 focus:font-normal'>
                <Link to='/chapters/justice'>Justice</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='focus:bg-white/10 focus:font-normal'>
                <Link to='/chapters/inclusion'>Inclusion</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to='/impact-stories' className={navLinkClass}>
            Impact stories
          </Link>
          <Link to='/materials' className={navLinkClass}>
            Materials
          </Link>
          <Link to='/about' className={navLinkClass}>
            About
          </Link>
        </nav>

        <button
          type='button'
          className='text-content-reverse md:hidden'
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen ? (
        <nav className='absolute inset-x-0 top-full z-40 border-foreground border-t bg-foreground-soft px-6 py-4 md:hidden'>
          <Link to='/' className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link
            to='/chapters/peace'
            className={mobileNavLinkClass}
            onClick={() => setMobileOpen(false)}
          >
            Peace
          </Link>
          <Link
            to='/chapters/justice'
            className={mobileNavLinkClass}
            onClick={() => setMobileOpen(false)}
          >
            Justice
          </Link>
          <Link
            to='/chapters/inclusion'
            className={mobileNavLinkClass}
            onClick={() => setMobileOpen(false)}
          >
            Inclusion
          </Link>
          <Link
            to='/impact-stories'
            className={mobileNavLinkClass}
            onClick={() => setMobileOpen(false)}
          >
            Impact stories
          </Link>
          <Link to='/materials' className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>
            Materials
          </Link>
          <Link to='/about' className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>
            About
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
