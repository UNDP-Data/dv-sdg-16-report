import { P } from '@undp/design-system-react/Typography';

export default function FooterEl() {
  return (
    <footer
      className='bg-foreground-soft bg-repeat px-6 md:px-12'
      style={{ backgroundImage: "url('/imgs/texture-dark.webp')" }}
    >
      <div className='border-content-reverse/20 border-t py-5'>
        <P marginBottom='none' size='sm' className='text-content-reverse'>
          © OHCHR, UNDP, UNICEF, UNODC 2026. All rights reserved.
        </P>
      </div>
    </footer>
  );
}
