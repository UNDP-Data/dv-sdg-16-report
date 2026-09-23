import { Link } from '@tanstack/react-router';
import { Button } from '@undp/design-system-react/Button';
import { cn } from '@undp/design-system-react/cn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@undp/design-system-react/DropdownMenu';
import { H5, P } from '@undp/design-system-react/Typography';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { showNavigation } from '@/Utils/showNavigation';

export default function HeaderEl() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        'relative border-background/10 border-b bg-foreground-soft bg-repeat px-6 py-4 md:px-12',
        mobileOpen && 'z-40',
      )}
      style={{ backgroundImage: "url('/imgs/texture-dark.webp')" }}
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

        {showNavigation() && (
          <>
            <nav className='hidden items-center gap-10 lg:flex'>
              <Link
                to='/'
                className='font-medium text-content-reverse text-sm uppercase tracking-wider transition-colors hover:text-content-secondary'
              >
                Home
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center gap-1 font-medium text-content-reverse text-sm uppercase tracking-wider transition-colors hover:text-content-secondary'>
                  Report
                  <ChevronDown size={14} />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='end'
                  sideOffset={12}
                  collisionPadding={16}
                  className='w-[calc(100vw-3rem)] max-w-72 border border-background/15 bg-foreground-soft p-3 text-content-reverse shadow-xl'
                >
                  <DropdownMenuItem
                    asChild
                    className='cursor-pointer px-3 py-3 text-content-reverse text-sm hover:bg-background/8! focus:bg-background/8'
                  >
                    <Link to='/report/foreword'>Foreword</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className='mx-3 my-2 bg-background/15' />
                  <DropdownMenuLabel className='px-3 pt-3 pb-2 font-semibold text-content-reverse/50 text-xs tracking-[0.12em]'>
                    CHAPTERS
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    asChild
                    className='cursor-pointer px-3 py-3 text-content-reverse text-sm hover:bg-background/8! focus:bg-background/8'
                  >
                    <Link to='/report/peace'>Peace</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className='cursor-pointer px-3 py-3 text-content-reverse text-sm hover:bg-background/8! focus:bg-background/8'
                  >
                    <Link to='/report/justice'>Justice</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className='cursor-pointer px-3 py-3 text-content-reverse text-sm hover:bg-background/8! focus:bg-background/8'
                  >
                    <Link to='/report/inclusion'>Inclusion</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className='mx-3 my-2 bg-background/15' />
                  <DropdownMenuItem
                    asChild
                    className='cursor-pointer px-3 py-3 text-content-reverse text-sm hover:bg-background/8! focus:bg-background/8'
                  >
                    <Link to='/report/sdg16-progress'>SDG 16 Progress</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                to='/impact-stories'
                className='font-medium text-content-reverse text-sm uppercase tracking-wider transition-colors hover:text-content-secondary'
              >
                Data to impact stories
              </Link>
              <Link
                to='/resources'
                className='font-medium text-content-reverse text-sm uppercase tracking-wider transition-colors hover:text-content-secondary'
              >
                Resources
              </Link>
              <Link
                to='/about'
                className='font-medium text-content-reverse text-sm uppercase tracking-wider transition-colors hover:text-content-secondary'
              >
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
        <nav className='absolute inset-x-0 top-full min-h-svh px-6 py-4 text-content-reverse [background:inherit] lg:hidden'>
          <Link to='/' className='block py-3' onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <div className='my-2 border-background/15 border-y py-2'>
            <P
              marginBottom='none'
              size='xs'
              weight='semibold'
              className='pt-3 text-content-reverse/50 tracking-wider'
            >
              REPORT
            </P>
            <Link to='/report/foreword' className='block py-3' onClick={() => setMobileOpen(false)}>
              Foreword
            </Link>
            <Link
              to='/report/peace'
              className='block py-3 pl-4'
              onClick={() => setMobileOpen(false)}
            >
              Peace
            </Link>
            <Link
              to='/report/justice'
              className='block py-3 pl-4'
              onClick={() => setMobileOpen(false)}
            >
              Justice
            </Link>
            <Link
              to='/report/inclusion'
              className='block py-3 pl-4'
              onClick={() => setMobileOpen(false)}
            >
              Inclusion
            </Link>
            <Link
              to='/report/sdg16-progress'
              className='block py-3'
              onClick={() => setMobileOpen(false)}
            >
              SDG 16 Progress
            </Link>
          </div>
          <Link to='/impact-stories' className='block py-3' onClick={() => setMobileOpen(false)}>
            Data to impact stories
          </Link>
          <Link to='/resources' className='block py-3' onClick={() => setMobileOpen(false)}>
            Resources
          </Link>
          <Link to='/about' className='block py-3' onClick={() => setMobileOpen(false)}>
            About
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
