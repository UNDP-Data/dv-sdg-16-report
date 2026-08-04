import { Link } from '@tanstack/react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@undp/design-system-react/DropdownMenu';
import { ChevronDown } from 'lucide-react';

const navLinkClass = 'text-sm text-gray-300 transition-colors hover:text-white';

export default function HeaderEl() {
  return (
    <header className='bg-black px-6 py-4 md:px-12'>
      <div className='mx-auto flex items-center justify-between'>
        <Link to='/' className='font-bold text-white'>
          SDG16 Report
        </Link>
        <nav className='flex items-center gap-8'>
          <Link to='/' className={navLinkClass}>
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center gap-1 ${navLinkClass}`}>
              Chapters
              <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to='/chapters/peace'>Peace</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to='/chapters/justice'>Justice</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to='/chapters/inclusion'>Inclusion</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className={navLinkClass}>Impact stories</span>
          <span className={navLinkClass}>Materials</span>
          <span className={navLinkClass}>About</span>
        </nav>
      </div>
    </header>
  );
}
