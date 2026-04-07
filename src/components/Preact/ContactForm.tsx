import { useState } from "preact/hooks";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    try {
      // Replace with your EmailJS credentials:
      // import emailjs from "@emailjs/browser";
      // await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      //   from_name: formData.name,
      //   from_email: formData.email,
      //   message: formData.message,
      // }, "YOUR_PUBLIC_KEY");

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full rounded-xl border bg-surface-200/50 px-5 py-3.5 text-white placeholder-slate-500 outline-none transition-all duration-300 focus:ring-2 ${
      errors[field]
        ? "border-red-500 focus:ring-red-500/30"
        : "border-surface-300/50 focus:border-primary focus:ring-primary/30"
    }`;

  return (
    <form onSubmit={handleSubmit} class="space-y-5" noValidate>
      <div>
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onInput={(e) => {
            setFormData({ ...formData, name: (e.target as HTMLInputElement).value });
            if (errors.name) setErrors({ ...errors, name: undefined });
          }}
          class={inputClass("name")}
        />
        {errors.name && (
          <p class="mt-1 text-sm text-red-400">{errors.name}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onInput={(e) => {
            setFormData({ ...formData, email: (e.target as HTMLInputElement).value });
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          class={inputClass("email")}
        />
        {errors.email && (
          <p class="mt-1 text-sm text-red-400">{errors.email}</p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Your Message"
          rows={5}
          value={formData.message}
          onInput={(e) => {
            setFormData({ ...formData, message: (e.target as HTMLTextAreaElement).value });
            if (errors.message) setErrors({ ...errors, message: undefined });
          }}
          class={`${inputClass("message")} resize-none`}
        />
        {errors.message && (
          <p class="mt-1 text-sm text-red-400">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        class="group relative w-full overflow-hidden rounded-xl bg-primary px-8 py-4 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed"
        data-hover
      >
        <span class="relative z-10">
          {status === "idle" && "Send Message"}
          {status === "sending" && (
            <span class="flex items-center justify-center gap-2">
              <svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </span>
          )}
          {status === "success" && "Message Sent! ✓"}
          {status === "error" && "Failed to send. Try again."}
        </span>
        <div class="absolute inset-0 -translate-x-full bg-primary-dark transition-transform duration-300 group-hover:translate-x-0" />
      </button>

      {status === "success" && (
        <p class="text-center text-sm text-accent">
          Thank you! I'll get back to you soon.
        </p>
      )}
    </form>
  );
}
