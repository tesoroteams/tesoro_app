import { useData } from "../../context/DataContext";
import { useToast } from "../../context/ToastContext";
import Icon from "../ui/Icon";

export default function Footer() {
  const { resetDemo } = useData();
  const { toast } = useToast();

  return (
    <footer className="mt-20 border-t border-ink-100/15">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-ink-400 sm:flex-row">
        <div className="flex items-center gap-2">
          <Icon name="treasure" className="h-4 w-4 text-beat-400" />
          <span>
            Tesoro - community-maintained local events. Demo data only.
          </span>
        </div>
        <button
          onClick={() => {
            resetDemo();
            toast("Demo data reset to seed state.", "info");
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-ink-100/20 px-3 py-1.5 text-xs font-medium text-ink-300 transition hover:bg-ink-100/5 hover:text-ink-100"
        >
          <Icon name="refresh" className="h-3.5 w-3.5" />
          Reset demo data
        </button>
      </div>
    </footer>
  );
}
