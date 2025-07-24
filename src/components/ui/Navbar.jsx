import Link from 'next/link';
import ThemeToggleButton from './ThemeToggleButton';

const Navbar = () => {
  return (
    <header className="bg-theme-secondary shadow-dental-md sticky top-0 z-sticky">
      <nav className="container mx-auto px-dental-md py-dental-sm flex justify-between items-center">
        <div className="flex items-center space-x-dental-lg">
          <Link href="/" className="text-dental-xl font-bold text-theme">
            OdontoLogic
          </Link>
          <div className="hidden md:flex items-center space-x-dental-md">
            <Link href="/dashboard" className="text-theme-secondary hover:text-theme transition-theme">
              Dashboard
            </Link>
            <Link href="/patients" className="text-theme-secondary hover:text-theme transition-theme">
              Patients
            </Link>
            <Link href="/appointments" className="text-theme-secondary hover:text-theme transition-theme">
              Appointments
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-dental-md">
          <ThemeToggleButton />
          <Link href="/login" className="dental-button-secondary">
            Login
          </Link>
          <Link href="/register" className="dental-button-primary">
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
