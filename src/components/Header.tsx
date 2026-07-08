import {
  Header,
  HeaderLogoUnit,
  HeaderMainNavUnit,
  HeaderMenuUnit,
} from '@undp/design-system-react/Header';
import { Link } from '@tanstack/react-router';

export default function HeaderEl() {
  return (
    <Header>
      <HeaderLogoUnit hyperlink='/' siteName='SDG 16 Report' />
      <HeaderMainNavUnit>
        <HeaderMenuUnit>
          <Link to='/'>Home</Link>
          <Link to='/query-demo'>Query demo</Link>
        </HeaderMenuUnit>
      </HeaderMainNavUnit>
    </Header>
  );
}
