import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Heart,
  Sparkles,
  LogOut,
  TrendingUp,
  Users,
  HandCoins,
  Crown,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Confetti } from "@/components/confetti";
import { getUser, clearUser, type CoolUser } from "@/lib/demo-auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "The Gala Floor — Cool Charity" },
      {
        name: "description",
        content:
          "Your Cool Charity command center: live impact stats, featured causes, and a donate button engineered for applause.",
      },
      { property: "og:title", content: "The Gala Floor — Cool Charity" },
      {
        property: "og:description",
        content: "Live impact, featured causes, and a donate button built for applause.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const CAMPAIGNS = [
  {
    id: "water",
    title: "Clean Water for Kota Village",
    tag: "Water & Sanitation",
    emoji: "💧",
    raised: 184250,
    goal: 250000,
  },
  {
    id: "books",
    title: "Books & Badges: Rural Schools",
    tag: "Education",
    emoji: "📚",
    raised: 96800,
    goal: 150000,
  },
  {
    id: "meals",
    title: "Midnight Meals Mobile Kitchen",
    tag: "Food Security",
    emoji: "🍜",
    raised: 271900,
    goal: 300000,
  },
  {
    id: "paws",
    title: "Paws & Recover — Animal Aid",
    tag: "Animal Welfare",
    emoji: "🐾",
    raised: 47300,
    goal: 90000,
  },
];

const LEADERBOARD = [
  { name: "Anonymous Whale", amount: 1000000, title: "Mystery Benefactor" },
  { name: "The Tuesday Club", amount: 64000, title: "Punctual Philanthropists" },
  { name: "Meera K.", amount: 25000, title: "Gold Heart" },
  { name: "Ishita R.", amount: 12500, title: "Silver Heart" },
  { name: "Aarav S.", amount: 5000, title: "Rising Star" },
];

const PRESETS = [500, 2000, 10000, 50000];

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<CoolUser | null>(null);
  const [checked, setChecked] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [selected, setSelected] = useState(CAMPAIGNS[0]!);
  const [amount, setAmount] = useState(2000);
  const [custom, setCustom] = useState("");
  const [justDonated, setJustDonated] = useState<number | null>(null);
  const [impact, setImpact] = useState(1284); // lives touched — goes up with you

  // Session check (demo): no user → back to the velvet rope.
  useEffect(() => {
    const u = getUser();
    if (!u) {
      navigate({ to: "/login", replace: true });
    } else {
      setUser(u);
    }
    setChecked(true);
  }, [navigate]);

  const effectiveAmount = useMemo(() => {
    const n = Number(custom);
    return custom.trim() !== "" && !Number.isNaN(n) && n > 0 ? n : amount;
  }, [custom, amount]);

  const donate = () => {
    setImpact((v) => v + Math.max(1, Math.round(effectiveAmount / 100)));
    setJustDonated(effectiveAmount);
    toast.success(`₹${effectiveAmount.toLocaleString("en-IN")} deployed with flair!`, {
      description: `The ${selected.title} team just did a little dance in your honor.`,
    });
  };

  const closeDonate = () => {
    setDonateOpen(false);
    setJustDonated(null);
    setCustom("");
    setAmount(2000);
  };

  const signOut = () => {
    clearUser();
    navigate({ to: "/" });
  };

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Sparkles className="h-6 w-6 animate-spin text-gold" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-gold/10 blur-[130px]" />
        <div className="animate-float absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-emerald-glow/15 blur-[130px] [animation-delay:3s]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <span className="ring-gold-glow flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Heart className="h-5 w-5 text-gold" fill="currentColor" />
            </span>
            <span className="font-display text-2xl font-semibold">
              Cool <span className="text-gilded">Charity</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="hidden border-gold/40 text-gold uppercase tracking-wider sm:inline-flex"
            >
              VIP · {user.name}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="rounded-full text-muted-foreground hover:text-foreground"
            >
              <LogOut className="mr-1 h-4 w-4" /> Exit
            </Button>
          </div>
        </header>

        {/* Hero strip */}
        <section className="glass-card animate-pop-in mt-4 flex flex-col items-start justify-between gap-6 rounded-3xl p-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm tracking-[0.18em] text-gold uppercase">
              Good evening, philanthropist
            </p>
            <h1 className="font-display mt-2 text-4xl font-semibold sm:text-5xl">
              {user.name}, the floor is{" "}
              <span className="text-gilded">yours</span>.
            </h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              You are personally responsible for {impact.toLocaleString("en-IN")}{" "}
              lives touched. Try not to let it go to your head (or do).
            </p>
          </div>
          <Button
            onClick={() => setDonateOpen(true)}
            size="lg"
            className="animate-pulse-ring rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <HandCoins className="mr-2 h-5 w-5" /> Donate, fabulously
          </Button>
        </section>

        {/* Stats */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: TrendingUp, label: "Raised this month", value: "₹8,42,019" },
            { icon: Users, label: "Fellow givers", value: "48,210" },
            { icon: Crown, label: "Your rank", value: "#1 (obviously)" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="glass-card animate-rise flex items-center gap-4 rounded-2xl p-6"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <s.icon className="h-6 w-6 text-gold" />
              </span>
              <div>
                <div className="font-display text-2xl font-semibold">{s.value}</div>
                <div className="text-xs tracking-widest text-muted-foreground uppercase">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Campaigns + leaderboard */}
        <section className="mt-10 grid gap-8 pb-16 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-semibold">
              Causes awaiting your <span className="text-gilded">majesty</span>
            </h2>
            <div className="mt-5 space-y-4">
              {CAMPAIGNS.map((c) => {
                const pct = Math.min(
                  100,
                  Math.round((c.raised / c.goal) * 100),
                );
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelected(c);
                      setDonateOpen(true);
                    }}
                    className="glass-card group w-full rounded-2xl p-5 text-left transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{c.emoji}</span>
                        <div>
                          <div className="font-medium">{c.title}</div>
                          <div className="text-xs tracking-wider text-muted-foreground uppercase">
                            {c.tag}
                          </div>
                        </div>
                      </div>
                      <span className="text-gilded text-lg font-semibold tabular-nums">
                        ₹{c.raised.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-glow to-gold"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="mt-2 text-right text-xs text-muted-foreground">
                      {pct}% funded · tap to donate
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-semibold">
              Hall of <span className="text-gilded">fame</span>
            </h2>
            <div className="glass-card mt-5 rounded-2xl p-5">
              {LEADERBOARD.map((p, i) => (
                <div
                  key={p.name}
                  className={`flex items-center gap-3 py-3 ${i > 0 ? "border-t border-border" : ""}`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                      i === 0
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{p.name}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {p.title}
                    </div>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-gold">
                    ₹{p.amount.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ------- THE fancy donate popup ------- */}
      <Dialog open={donateOpen} onOpenChange={(o) => !o && closeDonate()}>
        <DialogContent className="gradient-border max-w-md rounded-3xl border-none p-0 [&>button]:hidden">
          <div className="gradient-border-ring" />
          {justDonated === null ? (
            <div className="p-8">
              <DialogHeader>
                <DialogTitle className="font-display text-3xl font-semibold">
                  Make it <span className="text-gilded">rain</span>
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  You are donating to{" "}
                  <span className="font-medium text-foreground">
                    {selected.emoji} {selected.title}
                  </span>
                  . Zero fees, all flair.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 grid grid-cols-4 gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setAmount(p);
                      setCustom("");
                    }}
                    className={`rounded-xl border px-2 py-3 text-sm font-semibold tabular-nums transition-all ${
                      effectiveAmount === p && custom.trim() === ""
                        ? "ring-gold-glow border-gold bg-gold/10 text-gold"
                        : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                    }`}
                  >
                    ₹{p.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <Input
                  value={custom}
                  onChange={(e) => setCustom(e.target.value.replace(/[^\d]/g, ""))}
                  placeholder="Or write your own legend… (₹ custom amount)"
                  inputMode="numeric"
                  className="h-12 rounded-xl bg-background/60 text-center focus-visible:ring-gold"
                />
              </div>

              <Button
                onClick={donate}
                className="mt-6 h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground transition-transform hover:bg-primary/90 hover:scale-[1.02]"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Deploy ₹{effectiveAmount.toLocaleString("en-IN")} with style
              </Button>
            </div>
          ) : (
            /* Success state — the showpiece popup */
            <div className="relative p-10 text-center">
              <Confetti />
              <button
                onClick={closeDonate}
                className="absolute top-4 right-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="ring-gold-glow animate-pop-in mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-10 w-10 text-gold" fill="currentColor" />
              </span>
              <h3 className="font-display mt-6 text-3xl font-semibold">
                You absolute <span className="text-gilded">legend</span>.
              </h3>
              <p className="mt-3 text-muted-foreground">
                ₹{justDonated.toLocaleString("en-IN")} is on its way to{" "}
                <span className="font-medium text-foreground">{selected.title}</span>
                . Somewhere, a village just got faster Wi-Fi and better vibes.
              </p>
              <div className="animate-pop-in mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs tracking-widest text-gold uppercase [animation-delay:300ms]">
                <Crown className="h-3.5 w-3.5" /> Impact certificate minted
              </div>
              <Button
                onClick={closeDonate}
                className="mt-6 h-11 w-full rounded-xl bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Take a bow
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
