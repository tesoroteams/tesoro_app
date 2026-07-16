import Modal from "./ui/Modal";
import Icon from "./ui/Icon";
import { useContactModal } from "../context/ContactModalContext";

const EMAIL = "tesoroteams@gmail.com";
const SUBJECT = "I'd like to join Tesoro";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`;
const GMAIL = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(SUBJECT)}`;

export default function ContactModal() {
  const { isOpen, close } = useContactModal();

  return (
    <Modal open={isOpen} onClose={close} title="Get in touch to join">
      <div className="space-y-4">
        <p className="text-ink-300">
          Send us an email and we'll set you up with an account, usually within
          24 hours.
        </p>

        <div className="flex items-center gap-2 rounded-xl border border-ink-100/20 bg-ink-100/5 px-4 py-3">
          <Icon name="globe" className="h-4 w-4 shrink-0 text-beat-300" />
          <span className="font-mono text-sm font-medium text-ink-100 select-all">
            {EMAIL}
          </span>
        </div>

        <div className="flex flex-col gap-2 pt-1 sm:flex-row">
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

        <p className="text-xs text-ink-500">
          Either button will open a pre-filled email. On a phone, "Open mail
          app" uses your default app.
        </p>
      </div>
    </Modal>
  );
}
