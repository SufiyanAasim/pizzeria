import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface px-5 py-10 text-center md:px-8">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-steel">
        Forged Nightly · Served Like Family
      </p>
      <div className="mt-4 flex items-center justify-center gap-6 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-steel">
        <Link href="/menu" className="hover:text-tomato-2">
          Menu
        </Link>
        <Link href="/about" className="hover:text-tomato-2">
          About
        </Link>
        <Link href="/contact" className="hover:text-tomato-2">
          Order
        </Link>
        <Link href="/credits" className="hover:text-tomato-2">
          Credits
        </Link>
      </div>
      <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-steel/70">
        &copy; {new Date().getFullYear()} PIZZEria — Mohammad Sufiyan Aasim
      </p>
    </footer>
  );
}
