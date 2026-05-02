import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function EnquiryModal({ title = "Enquire Now", subtitle, onClose }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    toast.success("Enquiry sent! We'll get back to you soon.");
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-obsidian/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="relative bg-card border border-border/50 rounded-2xl p-8 w-full max-w-lg shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="w-8 h-0.5 bg-primary mb-4" />
        <h3 className="font-heading text-xl font-semibold text-foreground mb-1">{title}</h3>
        {subtitle ? <p className="text-primary text-sm mb-6">{subtitle}</p> : <p className="text-muted-foreground text-sm mb-6">Get in touch with our property experts</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">First Name</label>
              <Input placeholder="John" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required className="bg-background border-border/40 focus:border-primary h-10 text-sm" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Last Name</label>
              <Input placeholder="Doe" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required className="bg-background border-border/40 focus:border-primary h-10 text-sm" />
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
            <Input type="email" placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="bg-background border-border/40 focus:border-primary h-10 text-sm" />
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Contact No.</label>
            <div className="flex items-center h-10 rounded-md bg-background border border-border/40 focus-within:border-primary transition-colors overflow-hidden">
              <div className="flex items-center gap-2 px-3 text-muted-foreground text-sm select-none">
                <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" className="shrink-0 rounded-sm overflow-hidden">
                  <rect width="18" height="12" fill="#FF9933" />
                  <rect y="4" width="18" height="4" fill="#FFFFFF" />
                  <rect y="8" width="18" height="4" fill="#128807" />
                  <circle cx="9" cy="6" r="1.3" fill="none" stroke="#000080" strokeWidth="0.7" />
                </svg>
                <span className="text-foreground/80 font-medium">+91</span>
              </div>
              <div className="h-6 w-px bg-border/40" />
              <input
                type="tel"
                inputMode="numeric"
                placeholder="XXXXXXXXXX"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="flex-1 h-full bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Message</label>
            <Textarea placeholder="Tell us about your requirements..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} className="bg-background border-border/40 focus:border-primary resize-none text-sm" />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
          >
            {sending ? (
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" /> Send Enquiry
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

