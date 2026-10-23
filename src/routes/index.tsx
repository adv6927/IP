import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Heart, Sparkles, ArrowRight, Globe, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cool Charity — Kindness, but make it fabulous" },
      {
        name: "description",
        content:
          "Cool Charity is a dazzling giving platform: fund campaigns, watch impact rise live, and look extremely good while doing it.",
      },
      { property: "og:title", content: "Cool Charity — Kindness, but make it fabulous" },
      {
        property: "og:description",
        content: "Fund campaigns, watch impact rise live, and look extremely good while doing it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CAMPAIGNS = [
  {
    title: "Clean Water for Kota Village",
    tag: "Water & Sanitation",
    raised: 184250,
    goal: 250000,
    emoji: "💧",
    donors: 1204,
  },
  {
    title: "Books & Badges: Rural Schools",
    tag: "Education",
    raised: 96800,
    goal: 150000,
    emoji: "📚",
    donors: 733,
  },
  {
    title: "Midnight Meals Mobile Kitchen",
    tag: "Food Security",
    raised: 271900,
    goal: 300000,
    emoji: "🍜",
    donors: 2188,
  },
  {
    title: "Paws & Recover — Animal Aid",
    tag: "Animal Welfare",
    raised: 47300,
    goal: 90000,
    emoji: "🐾",
    donors: 512,
  },
];

const DONOR_WALL = [
  "Aarav donated ₹5,000 ✦",
  "Meera donated ₹25,000 ✦",
  "Anonymous Whale donated ₹1,00,000 ✦",
  "Dev donated ₹500 ✦",
  "Ishita donated ₹12,500 ✦",
  "The Tuesday Club donated ₹64,000 ✦",
  "Rohan donated ₹2,000 ✦",
  "Grandma Jo donated ₹1,500 ✦",
];

function useCountUp(target: number, duration = 1600) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function StatCounter({ target, label }: { target: number; label: string }) {
  const value = useCountUp(target);
  return (
    <div className="glass-card animate-rise rounded-2xl px-6 py-5 text-center">
      <div className="text-gilded font-display text-4xl font-semibold tabular-nums sm:text-5xl">
        {value.toLocaleString("en-IN")}
      </div>
      <div className="mt-1 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
        {label}
      </div>
    </div>
  );
}

function CampaignCard({
  campaign,
  index,
}: {
  campaign: (typeof CAMPAIGNS)[number];
  index: number;
}) {
  const pct = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));
  return (
    <article
      className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1.5"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="animate-float pointer-events-none absolute -top-4 -right-3 text-6xl opacity-70">
        {campaign.emoji}
      </div>
      <Badge
        variant="outline"
        className="border-gold/40 text-gold uppercase tracking-wider"
      >
        {campaign.tag}
      </Badge>
      <h3 className="font-display mt-4 max-w-[80%] text-2xl font-semibold text-foreground">
        {campaign.title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {campaign.donors.toLocaleString("en-IN")} legendary humans chipped in
      </p>
      <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-glow to-gold transition-[width] duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-gilded text-lg font-semibold tabular-nums">
          ₹{campaign.raised.toLocaleString("en-IN")}
        </span>
        <span className="text-sm text-muted-foreground">
          {pct}% of ₹{campaign.goal.toLocaleString("en-IN")}
        </span>
      </div>
    </article>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-glow/20 blur-[120px]" />
        <div className="animate-float absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-gold/15 blur-[140px] [animation-delay:2s]" />
        <div className="animate-float absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-gold/10 blur-[100px] [animation-delay:4s]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Nav */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <span className="ring-gold-glow flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Heart className="h-5 w-5 text-gold" fill="currentColor" />
            </span>
            <span className="font-display text-2xl font-semibold tracking-tight">
              Cool <span className="text-gilded">Charity</span>
            </span>
          </div>
          <Button
            asChild
            className="animate-pulse-ring rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Link to="/login">
              Enter the Gala <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </header>

        {/* Hero */}
        <section className="pt-16 pb-10 text-center sm:pt-24">
          <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-gold uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Now with 100% more swagger
          </div>
          <h1 className="font-display animate-rise mt-6 text-6xl leading-[1.05] font-semibold sm:text-8xl [animation-delay:120ms]">
            Kindness, but make it{" "}
            <em className="text-gilded not-italic italic">fabulous</em>.
          </h1>
          <p className="animate-rise mx-auto mt-6 max-w-2xl text-lg text-muted-foreground [animation-delay:240ms]">
            The flashiest way to change the world. Pick a cause, smash the donate
            button, and enjoy the confetti you have rightfully earned.
          </p>
          <div className="animate-rise mt-9 flex flex-wrap items-center justify-center gap-4 [animation-delay:360ms]">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/login">Start giving, gorgeously</Link>
            </Button>
            <a
              href="#campaigns"
              className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Peek at the causes
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCounter target={8420190} label="Rupees raised" />
            <StatCounter target={48210} label="Donations" />
            <StatCounter target={37} label="Causes funded" />
            <StatCounter target={1} label="You (incoming)" />
          </div>
        </section>

        {/* Donor marquee */}
        <section className="relative my-14 overflow-hidden rounded-full border border-border bg-card/60 py-3">
          <div className="animate-marquee flex w-max gap-10 whitespace-nowrap px-6 text-sm text-muted-foreground">
            {[...DONOR_WALL, ...DONOR_WALL].map((d, i) => (
              <span key={i} className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                {d}
              </span>
            ))}
          </div>
        </section>

        {/* Campaigns */}
        <section id="campaigns" className="scroll-mt-24 py-10">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">
              Tonight&rsquo;s <span className="text-gilded">featured causes</span>
            </h2>
            <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
              <ShieldCheck className="h-4 w-4 text-emerald-glow" />
              Fully fictional, fully fabulous
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {CAMPAIGNS.map((c, i) => (
              <CampaignCard key={c.title} campaign={c} index={i} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 flex flex-col items-center gap-3 border-t border-border py-10 text-center">
          <Globe className="h-5 w-5 text-gold" />
          <p className="font-display text-xl">
            Cool <span className="text-gilded">Charity</span>
          </p>
          <p className="max-w-md text-sm text-muted-foreground">
            A dazzling demo built to show off. No real money moves here — but
            your taste in fundraising software? Impeccable.
          </p>
        </footer>
      </div>
    </div>
  );
}
