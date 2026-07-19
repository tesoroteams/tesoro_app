import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useContactModal } from "../../context/ContactModalContext";
import Button from "../ui/Button";
import Icon from "../ui/Icon";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? "bg-beat-500/10 text-beat-600" : "text-ink-300 hover:bg-ink-100/5 hover:text-ink-100"
  }`;

export default function Navbar() {
  const { open: openContactModal } = useContactModal();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100/15 bg-ink-950/80 backdrop-blur-lg">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-center px-4 md:justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-beat-500 text-white shadow-[0_6px_20px_-6px_rgba(59,130,246,0.6)]">
            <Icon name="treasure" className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink-100">
            tesoro app
          </span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <NavLink to="/pricing" className={navLinkClass}>
            Pricing
          </NavLink>
          <Button size="sm" onClick={openContactModal}>
            Sign up
          </Button>
        </div>

        <button
          className="absolute right-4 rounded-lg p-2 text-ink-200 hover:bg-ink-100/5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-100/15 bg-ink-950/95 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            <NavLink
              to="/pricing"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Pricing
            </NavLink>
            <button
              className={navLinkClass({ isActive: false })}
              onClick={() => {
                openContactModal();
                setOpen(false);
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
