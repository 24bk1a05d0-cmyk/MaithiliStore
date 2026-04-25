import { useState } from "react";
import { Plus, Trash2, Printer } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  bullets: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
}

interface Resume {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string;
}

const DEFAULT: Resume = {
  name: "Aryan Kumar",
  title: "Frontend Developer",
  email: "aryan@example.com",
  phone: "+91 98765 43210",
  location: "Patna, India",
  summary:
    "Passionate frontend developer with 2+ years building React apps. Love clean UI, fast load times, and accessibility-first design.",
  experience: [
    {
      id: "1",
      role: "Junior Frontend Developer",
      company: "Acme Tech",
      period: "Jun 2024 — Present",
      bullets:
        "Built dashboard for 10k+ users.\nImproved page load by 40%.\nMentored 2 interns.",
    },
  ],
  education: [
    {
      id: "1",
      degree: "B.Tech, Computer Science",
      school: "IIT Patna",
      period: "2020 — 2024",
    },
  ],
  skills: "React, TypeScript, Tailwind, Node.js, PostgreSQL, Figma",
};

export function ResumeMaker() {
  const [r, setR] = useLocalStorage<Resume>("maithili:resume", DEFAULT);

  function update<K extends keyof Resume>(k: K, v: Resume[K]) {
    setR((cur) => ({ ...cur, [k]: v }));
  }
  function addExp() {
    update("experience", [
      ...r.experience,
      { id: Date.now().toString(), role: "", company: "", period: "", bullets: "" },
    ]);
  }
  function updateExp(id: string, patch: Partial<Experience>) {
    update(
      "experience",
      r.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    );
  }
  function removeExp(id: string) {
    update("experience", r.experience.filter((e) => e.id !== id));
  }
  function addEdu() {
    update("education", [
      ...r.education,
      { id: Date.now().toString(), degree: "", school: "", period: "" },
    ]);
  }
  function updateEdu(id: string, patch: Partial<Education>) {
    update(
      "education",
      r.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    );
  }
  function removeEdu(id: string) {
    update("education", r.education.filter((e) => e.id !== id));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* EDITOR */}
      <div className="space-y-5 print:hidden">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Aapki details
          </p>
          <div className="grid gap-2">
            <Input value={r.name} onChange={(v) => update("name", v)} placeholder="Naam" />
            <Input value={r.title} onChange={(v) => update("title", v)} placeholder="Job title" />
            <div className="grid grid-cols-2 gap-2">
              <Input value={r.email} onChange={(v) => update("email", v)} placeholder="Email" />
              <Input value={r.phone} onChange={(v) => update("phone", v)} placeholder="Phone" />
            </div>
            <Input value={r.location} onChange={(v) => update("location", v)} placeholder="Location" />
            <textarea
              value={r.summary}
              onChange={(e) => update("summary", e.target.value)}
              rows={3}
              placeholder="Short summary about you"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Experience
            </p>
            <button
              type="button"
              onClick={addExp}
              className="inline-flex items-center gap-1 text-xs font-medium text-primary"
            >
              <Plus className="h-3 w-3" /> Add
            </button>
          </div>
          {r.experience.map((e) => (
            <div key={e.id} className="mb-3 space-y-2 rounded-lg bg-secondary/30 p-3">
              <div className="flex justify-between">
                <Input value={e.role} onChange={(v) => updateExp(e.id, { role: v })} placeholder="Role" />
                <button
                  type="button"
                  onClick={() => removeExp(e.id)}
                  className="ml-2 text-muted-foreground hover:text-destructive"
                  aria-label="Remove"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input value={e.company} onChange={(v) => updateExp(e.id, { company: v })} placeholder="Company" />
                <Input value={e.period} onChange={(v) => updateExp(e.id, { period: v })} placeholder="Period" />
              </div>
              <textarea
                value={e.bullets}
                onChange={(ev) => updateExp(e.id, { bullets: ev.target.value })}
                rows={3}
                placeholder="One bullet per line"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Education
            </p>
            <button
              type="button"
              onClick={addEdu}
              className="inline-flex items-center gap-1 text-xs font-medium text-primary"
            >
              <Plus className="h-3 w-3" /> Add
            </button>
          </div>
          {r.education.map((e) => (
            <div key={e.id} className="mb-3 space-y-2 rounded-lg bg-secondary/30 p-3">
              <div className="flex justify-between">
                <Input value={e.degree} onChange={(v) => updateEdu(e.id, { degree: v })} placeholder="Degree" />
                <button
                  type="button"
                  onClick={() => removeEdu(e.id)}
                  className="ml-2 text-muted-foreground hover:text-destructive"
                  aria-label="Remove"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input value={e.school} onChange={(v) => updateEdu(e.id, { school: v })} placeholder="School" />
                <Input value={e.period} onChange={(v) => updateEdu(e.id, { period: v })} placeholder="Period" />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Skills (comma separated)
          </p>
          <textarea
            value={r.skills}
            onChange={(e) => update("skills", e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:-translate-y-0.5 transition-transform"
          data-testid="button-print-resume"
        >
          <Printer className="h-4 w-4" /> Print / PDF save karo
        </button>
      </div>

      {/* PREVIEW */}
      <div className="rounded-2xl border border-border bg-white p-8 text-zinc-900 shadow-sm print:border-0 print:shadow-none">
        <header className="border-b border-zinc-300 pb-4">
          <h1 className="font-serif text-3xl font-bold">{r.name}</h1>
          <p className="text-sm text-zinc-600">{r.title}</p>
          <p className="mt-1 text-xs text-zinc-500">
            {r.email} · {r.phone} · {r.location}
          </p>
        </header>

        {r.summary && (
          <section className="mt-4">
            <h2 className="mb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Summary
            </h2>
            <p className="text-sm leading-relaxed">{r.summary}</p>
          </section>
        )}

        {r.experience.length > 0 && (
          <section className="mt-4">
            <h2 className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Experience
            </h2>
            <div className="space-y-3">
              {r.experience.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{e.role}</p>
                      <p className="text-sm text-zinc-600">{e.company}</p>
                    </div>
                    <p className="text-xs text-zinc-500">{e.period}</p>
                  </div>
                  <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">
                    {e.bullets.split("\n").filter(Boolean).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {r.education.length > 0 && (
          <section className="mt-4">
            <h2 className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Education
            </h2>
            {r.education.map((e) => (
              <div key={e.id} className="flex justify-between">
                <div>
                  <p className="font-semibold">{e.degree}</p>
                  <p className="text-sm text-zinc-600">{e.school}</p>
                </div>
                <p className="text-xs text-zinc-500">{e.period}</p>
              </div>
            ))}
          </section>
        )}

        {r.skills && (
          <section className="mt-4">
            <h2 className="mb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Skills
            </h2>
            <p className="text-sm">{r.skills}</p>
          </section>
        )}
      </div>
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
    />
  );
}
