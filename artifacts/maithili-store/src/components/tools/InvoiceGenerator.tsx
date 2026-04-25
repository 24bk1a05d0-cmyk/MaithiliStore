import { useMemo, useState } from "react";
import { Plus, Trash2, Printer } from "lucide-react";

interface Item {
  id: string;
  description: string;
  qty: number;
  rate: number;
}

export function InvoiceGenerator() {
  const today = new Date().toISOString().slice(0, 10);
  const [from, setFrom] = useState({
    name: "Aapka Naam",
    email: "you@example.com",
    address: "City, India",
  });
  const [to, setTo] = useState({
    name: "Client ka Naam",
    email: "client@example.com",
    address: "Address",
  });
  const [meta, setMeta] = useState({
    invoiceNo: "INV-001",
    date: today,
    dueDate: today,
    currency: "₹",
  });
  const [items, setItems] = useState<Item[]>([
    { id: "1", description: "Web design — landing page", qty: 1, rate: 25000 },
    { id: "2", description: "Logo refresh", qty: 1, rate: 8000 },
  ]);
  const [taxPct, setTaxPct] = useState(18);
  const [notes, setNotes] = useState("Payment within 7 days. UPI: yourupi@bank");

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.qty * it.rate, 0),
    [items],
  );
  const tax = (subtotal * taxPct) / 100;
  const total = subtotal + tax;

  function update(id: string, patch: Partial<Item>) {
    setItems((arr) => arr.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }
  function addItem() {
    setItems((arr) => [
      ...arr,
      { id: Date.now().toString(), description: "", qty: 1, rate: 0 },
    ]);
  }
  function remove(id: string) {
    setItems((arr) => arr.filter((it) => it.id !== id));
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:-translate-y-0.5 transition-transform"
          data-testid="button-print-invoice"
        >
          <Printer className="h-4 w-4" /> Print / PDF save karo
        </button>
      </div>

      <div className="rounded-3xl border border-border bg-card p-8 print:border-0 print:p-4">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row">
          <div>
            <p className="font-serif text-3xl font-bold">INVOICE</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {meta.invoiceNo}
            </p>
          </div>
          <div className="text-right text-sm">
            <Row label="Issue date" value={meta.date} onChange={(v) => setMeta({ ...meta, date: v })} type="date" />
            <Row label="Due date" value={meta.dueDate} onChange={(v) => setMeta({ ...meta, dueDate: v })} type="date" />
            <Row label="Number" value={meta.invoiceNo} onChange={(v) => setMeta({ ...meta, invoiceNo: v })} />
          </div>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              From
            </p>
            <EditableLine value={from.name} onChange={(v) => setFrom({ ...from, name: v })} className="font-serif text-lg font-semibold" />
            <EditableLine value={from.email} onChange={(v) => setFrom({ ...from, email: v })} className="text-sm text-muted-foreground" />
            <EditableLine value={from.address} onChange={(v) => setFrom({ ...from, address: v })} className="text-sm text-muted-foreground" />
          </div>
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Bill to
            </p>
            <EditableLine value={to.name} onChange={(v) => setTo({ ...to, name: v })} className="font-serif text-lg font-semibold" />
            <EditableLine value={to.email} onChange={(v) => setTo({ ...to, email: v })} className="text-sm text-muted-foreground" />
            <EditableLine value={to.address} onChange={(v) => setTo({ ...to, address: v })} className="text-sm text-muted-foreground" />
          </div>
        </div>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <th className="py-2">Description</th>
              <th className="py-2 w-16 text-right">Qty</th>
              <th className="py-2 w-28 text-right">Rate</th>
              <th className="py-2 w-28 text-right">Amount</th>
              <th className="w-8 print:hidden"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-b border-border">
                <td className="py-2 pr-3">
                  <input
                    value={it.description}
                    onChange={(e) => update(it.id, { description: e.target.value })}
                    className="w-full bg-transparent outline-none focus:border-primary"
                  />
                </td>
                <td className="py-2 pr-3 text-right">
                  <input
                    type="number"
                    value={it.qty}
                    onChange={(e) => update(it.id, { qty: Number(e.target.value) })}
                    className="w-full bg-transparent text-right outline-none"
                  />
                </td>
                <td className="py-2 pr-3 text-right">
                  <input
                    type="number"
                    value={it.rate}
                    onChange={(e) => update(it.id, { rate: Number(e.target.value) })}
                    className="w-full bg-transparent text-right outline-none"
                  />
                </td>
                <td className="py-2 text-right font-mono">
                  {meta.currency}
                  {(it.qty * it.rate).toLocaleString("en-IN")}
                </td>
                <td className="print:hidden">
                  <button
                    type="button"
                    onClick={() => remove(it.id)}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="button"
          onClick={addItem}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary print:hidden"
        >
          <Plus className="h-3 w-3" /> Item add karo
        </button>

        <div className="mt-6 ml-auto w-full max-w-xs space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-mono">
              {meta.currency}
              {subtotal.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Tax{" "}
              <input
                type="number"
                value={taxPct}
                onChange={(e) => setTaxPct(Number(e.target.value))}
                className="w-12 rounded bg-secondary px-1 text-center text-xs print:bg-transparent"
              />
              %
            </span>
            <span className="font-mono">
              {meta.currency}
              {tax.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 font-serif text-xl font-bold">
            <span>Total</span>
            <span className="font-mono">
              {meta.currency}
              {total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Notes
          </p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary print:border-0 print:bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}

function EditableLine({
  value,
  onChange,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`block w-full bg-transparent outline-none ${className}`}
    />
  );
}

function Row({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="flex items-center justify-end gap-2 text-sm">
      <span className="text-muted-foreground">{label}:</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-right font-mono outline-none"
      />
    </div>
  );
}
