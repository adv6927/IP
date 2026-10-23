import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Sparkles, ArrowLeft, PartyPopper, Check } from "lucide-react";
import { Confetti } from "@/components/confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveUser } from "@/lib/demo-auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Cool Charity" },
      {
        name: "description",
        content:
          "Step into the most glamorous login screen in philanthropy. Cool Charity members only.",
      },
      { property: "og:title", content: "Sign in — Cool Charity" },
      {
        property: "og:description",
        content: "The most glamorous login screen in philanthropy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [celebrating, setCelebrating] = useState(false);
  const [shownName, setShownName] = useState("");

  const fancyName = (n: string, mail: string) =>
    n.trim() ||
    (mail.includes("@")
      ? (mail.split("@")[0] ?? "Distinguished Guest")
      : "Distinguished Guest");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const who = fancyName(name, email);
    saveUser({ name: who, email: email || "vip@coolcharity.org" });
    setShownName(who);
    setCelebrating(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 1900);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Ambient stage lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-gold/15 blur-[130px]" />
        <div className="animate-float absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-emerald-glow/20 blur-[130px] [animation-delay:2.5s]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      </div>

      <div className="relative w-full max-w-md">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to the foyer
        </Link>

        <div className="gradient-border animate-pop-in relative p-8 sm:p-10">
          <div className="gradient-border-ring" />
          <div className="text-center">
            <span className="ring-gold-glow animate-float mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Heart className="h-8 w-8 text-gold" fill="currentColor" />
            </span>
            <h1 className="font-display mt-5 text-4xl font-semibold">
              Cool <span className="text-gilded">Charity</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {mode === "in"
                ? "Present your credentials, philanthropist."
                : "Join the most generous party on the internet."}
            </p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5">
            {mode === "up" && (
              <div className="animate-rise space-y-2">
                <Label htmlFor="name" className="text-muted-foreground">
                  Your legendary name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Lady Ganga of Generosity"
                  className="h-12 rounded-xl border-input bg-background/60 focus-visible:ring-gold"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@generous.inc"
                className="h-12 rounded-xl border-input bg-background/60 focus-visible:ring-gold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-muted-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 rounded-xl border-input bg-background/60 focus-visible:ring-gold"
              />
            </div>

            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground transition-transform hover:bg-primary/90 hover:scale-[1.02]"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {mode === "in" ? "Unlock the vault" : "Bestow generosity"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "in" ? "New here? " : "Already a legend? "}
            <button
              type="button"
              onClick={() => setMode(mode === "in" ? "up" : "in")}
              className="font-medium text-gold underline-offset-4 hover:underline"
            >
              {mode === "in" ? "Request a tiara" : "Sign in instead"}
            </button>
          </p>
          <p className="mt-3 text-center text-xs text-muted-foreground/70">
            This is a showcase — any email and password opens the door.
          </p>
        </div>
      </div>

      {/* Fancy welcome popup */}
      {celebrating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Confetti />
          <div className="glass-card animate-pop-in mx-6 max-w-sm rounded-3xl p-10 text-center ring-gold-glow">
            <PartyPopper className="mx-auto h-14 w-14 text-gold" />
            <h2 className="font-display mt-5 text-3xl font-semibold">
              Welcome, <span className="text-gilded">{shownName}</span>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Your seats at the gala are ready. Rolling out the carpet…
            </p>
            <div className="mt-6 flex justify-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-2 w-2 animate-bounce rounded-full bg-gold"
                  style={{ animationDelay: `${i * 160}ms` }}
                />
              ))}
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs tracking-widest text-gold uppercase">
              <Check className="h-3.5 w-3.5" /> Authenticated with style
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
