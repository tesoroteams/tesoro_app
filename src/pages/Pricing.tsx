import { useContactModal } from "../context/ContactModalContext";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";

type Feature = { label: string; included: boolean };

const FREE_FEATURES: Feature[] = [
  { label: "1 text per week", included: true },
  { label: "1 region", included: true },
  { label: "All event categories", included: true },
  { label: "Browse the full directory", included: true },
  { label: "Multiple regions", included: false },
  { label: "Early alerts for new events", included: false },
];

const PRO_FEATURES: Feature[] = [
  { label: "Up to 3 texts per week", included: true },
  { label: "Multiple regions", included: true },
  { label: "Custom category filters", included: true },
  { label: "Early alerts (24h ahead)", included: true },
  { label: "All event categories", included: true },
  { label: "Browse the full directory", included: true },
];

function FeatureRow({ label, included }: Feature) {
  return (
    <li className="flex items-center gap-2.5 py-2 text-sm first:pt-0 last:pb-0">
      {included ? (
        <Icon name="check" className="h-4 w-4 shrink-0 text-beat-400" />
      ) : (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center text-ink-600">
          —
        </span>
      )}
      <span className={included ? "text-ink-200" : "text-ink-500"}>{label}</span>
    </li>
  );
}

function PlanCard({
  name,
  blurb,
  price,
  features,
  highlighted,
  cta,
  onCta,
}: {
  name: string;
  blurb: string;
  price: string;
  features: Feature[];
  highlighted?: boolean;
  cta: string;
  onCta: () => void;
}) {
  return (
    <div
      className={
        highlighted
          ? "flex flex-col rounded-2xl border border-beat-500/50 bg-white/80 p-5 shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_8px_24px_rgba(11,29,85,0.09)] backdrop-blur sm:p-8"
          : "card flex flex-col p-5 sm:p-8"
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-display text-lg font-bold text-ink-100 sm:text-xl">
            {name}
          </h2>
          <p className="mt-0.5 text-sm text-ink-400">{blurb}</p>
        </div>
        <p className="shrink-0 font-display text-3xl font-bold leading-none text-ink-100 sm:text-4xl">
          {price}
          <span className="ml-0.5 text-sm font-medium text-ink-500">/mo</span>
        </p>
      </div>

      <ul className="mt-5 divide-y divide-ink-100/10 border-t border-ink-100/10 pt-4 sm:mt-8 sm:pt-6">
        {features.map((f) => (
          <FeatureRow key={f.label} {...f} />
        ))}
      </ul>

      <div className="mt-5 sm:mt-auto sm:pt-8">
        <Button
          className="w-full"
          variant={highlighted ? "primary" : "subtle"}
          size="lg"
          onClick={onCta}
        >
          {cta}
        </Button>
      </div>
    </div>
  );
}

export default function Pricing() {
  const { open: openContactModal } = useContactModal();

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-beat-300">Pricing</p>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink-100 sm:mt-3 sm:text-4xl">
          Free to start. Upgrade when you want more.
        </h1>
        <p className="mt-2 text-sm text-ink-400 sm:mt-3 sm:text-base">
          One weekly text is free. Go Pro for more alerts and reach.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2">
        <PlanCard
          name="Free"
          blurb="Enough to stay in the loop"
          price="$0"
          features={FREE_FEATURES}
          cta="Get started"
          onCta={openContactModal}
        />
        <PlanCard
          name="Pro"
          blurb="More texts, more reach"
          price="$4"
          features={PRO_FEATURES}
          highlighted
          cta="Enroll in Pro"
          onCta={openContactModal}
        />
      </div>
    </section>
  );
}
