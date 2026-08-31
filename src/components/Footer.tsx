import { P } from '@undp/design-system-react/Typography';
import { showNavigation } from '@/Utils/showNavigation';

export default function FooterEl() {
  if (!showNavigation()) return null;

  return (
    <footer className='bg-foreground px-6 md:px-12'>
      <div className='border-content-reverse/20 border-t py-5'>
        <P marginBottom='none' size='sm' className='text-content-reverse'>
          © 2026 Global Progress Report on SDG 16. All rights reserved.
        </P>
      </div>
    </footer>
  );
}
