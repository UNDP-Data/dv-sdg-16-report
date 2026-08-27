import { Link, useLocation, useSearch } from '@tanstack/react-router';
import { Button } from '@undp/design-system-react/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@undp/design-system-react/DropdownMenu';
import { H5, P } from '@undp/design-system-react/Typography';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { isAfterReleaseDate } from '@/Utils/isAfterReleasefDate';

const navLinkClass =
  'text-sm font-medium uppercase tracking-wider text-content-reverse transition-colors hover:text-content-secondary';
const mobileNavLinkClass =
  'block py-3 text-base text-content-reverse transition-colors hover:text-content-reverse';

export default function HeaderEl() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const { bypassCounter } = useSearch({ from: '/' });

  const showNav = pathname !== '/' || isAfterReleaseDate() || bypassCounter;

  return (
    <header
      className='relative border-background/30 border-b bg-cover bg-foreground-soft px-6 py-4 md:px-12'
      style={{ backgroundImage: "url('/imgs/paper-texture.webp')" }}
    >
      <div className='mx-auto flex items-center justify-between'>
        <Link to='/' className='flex items-center gap-3'>
          <H5 weight='semibold' marginBottom='none' className='text-content-reverse'>
            SDG 16
          </H5>
          <P
            weight='medium'
            size='xs'
            marginBottom='none'
            className='border-background/30 border-l pl-3 text-content-reverse uppercase leading-tight tracking-widest'
          >
            Global Progress Report
            <br />
            2026
          </P>
        </Link>

        {showNav && (
          <>
            <nav className='hidden items-center gap-10 lg:flex'>
              <Link to='/' className={navLinkClass}>
                Home
              </Link>
              <Link to='/foreword' className={navLinkClass}>
                Foreword
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
                Data to impact stories
              </Link>
              <Link to='/resources' className={navLinkClass}>
                Resources
              </Link>
              <Link to='/about' className={navLinkClass}>
                About
              </Link>
            </nav>

            <Button
              type='button'
              variant='icon'
              className='p-0 text-content-reverse lg:hidden'
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X size={32} /> : <Menu size={32} />}
            </Button>
          </>
        )}
      </div>

      {mobileOpen ? (
        <nav className='absolute inset-x-0 top-full z-40 border-foreground border-t bg-foreground-soft px-6 py-4 lg:hidden'>
          <Link to='/' className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link to='/foreword' className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>
            Foreword
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
            Data to impact stories
          </Link>
          <Link to='/resources' className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>
            Resources
          </Link>
          <Link to='/about' className={mobileNavLinkClass} onClick={() => setMobileOpen(false)}>
            About
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
