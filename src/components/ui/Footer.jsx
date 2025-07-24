import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-theme-secondary border-t border-theme-secondary mt-dental-xl">
      <div className="container mx-auto px-dental-md py-dental-lg grid grid-cols-1 md:grid-cols-3 gap-dental-lg">
        <div>
          <h3 className="text-dental-lg font-semibold text-theme">OdontoLogic</h3>
          <p className="text-theme-secondary mt-dental-sm">Streamlining dental practice management.</p>
        </div>
        <div>
          <h4 className="font-semibold text-theme">Quick Links</h4>
          <ul className="mt-dental-sm space-y-dental-xs">
            <li><Link href="/" className="text-theme-secondary hover:text-theme transition-theme">Home</Link></li>
            <li><Link href="/about" className="text-theme-secondary hover:text-theme transition-theme">About</Link></li>
            <li><Link href="/contact" className="text-theme-secondary hover:text-theme transition-theme">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-theme">Legal</h4>
          <ul className="mt-dental-sm space-y-dental-xs">
            <li><Link href="/privacy" className="text-theme-secondary hover:text-theme transition-theme">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-theme-secondary hover:text-theme transition-theme">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-theme-secondary mt-dental-lg">
        <div className="container mx-auto px-dental-md py-dental-sm text-center text-theme-muted">
          &copy; {new Date().getFullYear()} OdontoLogic. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
