import { Link } from "wouter";
import { motion } from "framer-motion";
import { Heart, Lock, Zap, Users, Coffee, ArrowRight } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { withBase } from "@/lib/utils";

const PROMISES = [
  {
    icon: Lock,
    title: "Login nahi maangenge",
    body: "Tool kholo, kaam karo, ja. Bas. Account banane ki zaroorat nahi.",
  },
  {
    icon: Zap,
    title: "Sab browser mein chalega",
    body: "Data tumhare device par rehta hai. Server pe nahi jaata. Bina internet ke bhi kuch tools chalte hain.",
  },
  {
    icon: Heart,
    title: "Hamesha free",
    body: "Core tools free the, hain, aur rahenge. Koi premium wall nahi.",
  },
  {
    icon: Coffee,
    title: "Bina ad ke",
    body: "Concentration tumhari hai. Hum beech mein nahi aate.",
  },
];

const PRINCIPLES = [
  {
    no: "01",
    name: "Hick's Law",
    body: "Kam choices, jaldi decision. Categories chhoti rakhi hain — tum decision se thakte nahi.",
  },
  {
    no: "02",
    name: "Fitts's Law",
    body: "Tap karne layak buttons. Sab cheez phone par bhi pakad mein aati hai — 44px se chhota nahi.",
  },
  {
    no: "03",
    name: "Jakob's Law",
    body: "Jaisi expectation, waisi reality. Search top par. Filter side mein. Wahi jagah jahan dimaag dhundhta hai.",
  },
  {
    no: "04",
    name: "Miller's Law",
    body: "Saat se zyaada cheez ek baar mein nahi dikhati. Lists chhoti rakhi hain. Brain thaak nahi jaata.",
  },
  {
    no: "05",
    name: "Aesthetic-Usability",
    body: "Sundar lage toh aasaan lage. Ivory background, warm red accents — relax karte hain.",
  },
];

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="About"
        description="Maithili Store ke peeche ki kahaani, principles aur promises. Ek warm, simple jagah jahan har kaam ka tool mile."
      />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-primary">
            Hamari kahaani
          </p>
          <h1 className="font-serif text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Ek dukan jaisa,
            <br />
            <span className="italic text-primary">par bina counter ke.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Maithili Store internet ka woh muhalla hai jahan har gali mein ek
            kaam ka tool mile. Bina shor ke. Bina puchhe. Bina pareshani ke.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <h2 className="mb-6 font-serif text-3xl font-semibold md:text-4xl">
          Yeh shuru kaise hua?
        </h2>
        <div className="space-y-5 text-base leading-relaxed text-foreground/90 md:text-lg">
          <p>
            Ek raat, ek student ne JSON formatter dhundha. Pehla result —{" "}
            <em>"Sign up to format JSON"</em>. Doosra — popups. Teesra — ads.
            Chautha — toh free tha, par UI itna confusing tha ki samajh hi nahi
            aaya.
          </p>
          <p>
            Yeh story tumne bhi jeeyi hogi. <strong>Maithili Store</strong> waqt
            ki izzat karne wala ek choti si pahel hai. Yahaan tum aate ho, kaam
            karte ho, chale jaate ho. Itna hi.
          </p>
          <p>
            Naam <em>Maithili</em> kyun? Maithili ek puraani bhasha hai —
            seedhi, gehri, bina dikhawe ke. Hum bhi waisi hi technology banana
            chahte the.
          </p>
        </div>
      </section>

      {/* PROMISES */}
      <section className="bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-primary">
            Hamare 4 vaade
          </p>
          <h2 className="mb-10 font-serif text-3xl font-semibold tracking-tight md:text-4xl">
            Yeh hum kabhi nahi todenge.
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {PROMISES.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-2xl border border-card-border bg-card p-7"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-serif text-xl font-semibold">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-6">
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-primary">
          UX laws — apnaye gaye
        </p>
        <h2 className="mb-10 font-serif text-3xl font-semibold tracking-tight md:text-4xl">
          Saat principles, ek soch.
        </h2>
        <div className="space-y-5">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.no}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-5 rounded-2xl border border-card-border bg-card p-6"
            >
              <span className="font-mono text-2xl font-bold text-primary">
                {p.no}
              </span>
              <div>
                <h3 className="font-serif text-lg font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHO */}
      <section className="bg-secondary/30 py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <Users className="mb-3 h-8 w-8 text-primary" />
          <h2 className="mb-4 font-serif text-3xl font-semibold md:text-4xl">
            Yeh kis ke liye hai?
          </h2>
          <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
            School ka student jisko resume banana hai, college student jisko
            citation chahiye, freelance designer jo invoice bhejna chahta hai,
            developer jo regex test karna chahta hai, naya creator jo hashtag
            list chahta hai — sab. Sab ke liye. Bas tum yahan ho — yeh kaafi hai.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="rounded-3xl bg-foreground p-10 text-center text-background md:p-16">
          <h2 className="font-serif text-3xl font-bold leading-tight md:text-5xl">
            Aao, tools dekho.
            <br />
            <span className="italic text-accent">Login nahi maangenge.</span>
          </h2>
          <Link href={withBase("/tools")} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:-translate-y-0.5 transition-transform">
              All tools
              <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
      </section>
    </>
  );
}
