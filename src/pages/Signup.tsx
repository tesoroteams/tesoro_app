import { useEffect } from "react";
import Icon from "../components/ui/Icon";
import { useContactModal } from "../context/ContactModalContext";

const EMAIL = "tesoroteams@gmail.com";
const SUBJECT = "I'd like to join Tesoro";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`;
const GMAIL = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(SUBJECT)}`;

const PERKS = [
  "Suggest edits to any listing (queued for review at first)",
  "Confirm and report events to keep them accurate",
  "Earn reputation to unlock instant edits at 100 pts",
];

export default function Signup() {
  const { open } = useContactModal();

  // Open the modal automatically if someone navigates directly to /signup.
  useEffect(() => {
    open();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-14 lg:grid-cols-2">
      <div className="card p-8">
        <h1 className="font-display text-2xl font-bold text-ink-100">
          Join the community
        </h1>
        <p className="mt-1 text-sm text-ink-400">
          Send us an email and we'll set you up with an account.
        </p>

        <div className="mt-6 flex items-center gap-2 rounded-xl border border-ink-100/20 bg-ink-100/5 px-4 py-3">
          <Icon name="globe" className="h-4 w-4 shrink-0 text-beat-300" />
          <span className="font-mono text-sm font-medium text-ink-100 select-all">
            {EMAIL}
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <a
            href={MAILTO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-beat-500 px-5 py-3 text-sm font-medium text-white shadow-[0_6px_20px_-6px_rgba(59,130,246,0.5)] transition-all hover:bg-beat-600"
          >
            <Icon name="telegram" className="h-4 w-4" />
            Open mail app
          </a>
          <a
            href={GMAIL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-ink-100/20 bg-ink-100/5 px-5 py-3 text-sm font-medium text-ink-100 transition-all hover:bg-ink-100/10"
          >
            <Icon name="globe" className="h-4 w-4" />
            Open Gmail
          </a>
        </div>

        <p className="mt-4 text-xs text-ink-500">
          Either button will open a pre-filled email. On a phone, "Open mail
          app" uses your default app.
        </p>
      </div>

      <div className="card p-8">
        <div className="mb-4 flex items-center gap-2">
          <Icon name="trophy" className="h-4 w-4 text-beat-400" />
          <h2 className="font-display text-lg font-semibold text-ink-100">
            What you can do
          </h2>
        </div>
        <ul className="space-y-3">
          {PERKS.map((p) => (
            <li key={p} className="flex items-start gap-3 text-sm text-ink-200">
              <Icon name="check-circle" className="mt-0.5 h-4 w-4 shrink-0 text-beat-400" />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-xl border border-ink-100/20 bg-ink-100/5 p-4 text-xs text-ink-400">
          New accounts start as <span className="text-ink-200">Newcomers</span>.
          Your edits are reviewed by moderators until you build a track record,
          just like Wikipedia.
        </div>
      </div>
    </div>
  );
}
