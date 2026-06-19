"use client";

import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";

function ContactForm() {
  const [status, setStatus] = useState("");

  // Track the actual input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Track if a user has clicked into and out of a field
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  // Handle typing
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle clicking away from an input
  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Simple regex to check for a valid email structure
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Custom error messages
  const errors = {
    name:
      touched.name && !formData.name.trim()
        ? "I need to know who I'm talking to!"
        : "",
    email:
      touched.email && !formData.email.trim()
        ? "Where should I send my reply?"
        : touched.email && !isValidEmail(formData.email)
          ? "Hold up, that doesn't look like a real email."
          : "",
    subject:
      touched.subject && !formData.subject.trim()
        ? "What's this regarding?"
        : "",
    message:
      touched.message && !formData.message.trim()
        ? "Don't be shy, write something!"
        : "",
  };

  // The form is only valid if all fields have text AND the email is actually an email
  const isFormValid =
    formData.name.trim() !== "" &&
    isValidEmail(formData.email) &&
    formData.subject.trim() !== "" &&
    formData.message.trim() !== "";

  // Typed as a Form Submission Event
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Touch all fields to trigger validation visuals
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    // Stop if the form is invalid and focus the first invalid field
    if (!formData.name.trim()) {
      const el = document.getElementById("name");
      el?.focus();
      return;
    }
    if (!isValidEmail(formData.email)) {
      const el = document.getElementById("email");
      el?.focus();
      return;
    }
    if (!formData.subject.trim()) {
      const el = document.getElementById("subject");
      el?.focus();
      return;
    }
    if (!formData.message.trim()) {
      const el = document.getElementById("message");
      el?.focus();
      return;
    }

    setStatus("Sending...");

    const submitData = new FormData(e.currentTarget);
    const accessKey = process.env.NEXT_PUBLIC_FORM_ACCESS_KEY;

    if (!accessKey) {
      console.error("Missing Web3Forms Access Key");
      setStatus("Configuration error.");
      return;
    }

    submitData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Message sent successfully!");
        // Reset everything
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTouched({
          name: false,
          email: false,
          subject: false,
          message: false,
        });

        // Reset the actual form DOM element
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("Error sending message.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative z-10 flex flex-col gap-6 w-full max-w-lg"
    >
      {/* Name Field */}
      <div className="flex flex-col gap-1.5 group w-full text-left">
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={!!errors.name}
          placeholder="Name"
          className={`bg-transparent border-b pb-2 text-white placeholder:text-zinc-600 focus:outline-none transition-all duration-300 text-sm md:text-base ${
            errors.name
              ? "border-crimson-bright focus:border-crimson-bright"
              : "border-white/20 focus:border-crimson-bright"
          }`}
        />
        {errors.name && (
          <span
            id="name-error"
            className="text-[11px] text-crimson-bright tracking-wide font-medium mt-1 flex items-center gap-1.5"
            role="alert"
          >
            <AlertCircle size={12} />
            {errors.name}
          </span>
        )}
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-1.5 group w-full text-left">
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={!!errors.email}
          placeholder="Email"
          className={`bg-transparent border-b pb-2 text-white placeholder:text-zinc-600 focus:outline-none transition-all duration-300 text-sm md:text-base ${
            errors.email
              ? "border-crimson-bright focus:border-crimson-bright"
              : "border-white/20 focus:border-crimson-bright"
          }`}
        />
        {errors.email && (
          <span
            id="email-error"
            className="text-[11px] text-crimson-bright tracking-wide font-medium mt-1 flex items-center gap-1.5"
            role="alert"
          >
            <AlertCircle size={12} />
            {errors.email}
          </span>
        )}
      </div>

      {/* Subject Field */}
      <div className="flex flex-col gap-1.5 group w-full text-left">
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          aria-invalid={!!errors.subject}
          placeholder="Subject"
          className={`bg-transparent border-b pb-2 text-white placeholder:text-zinc-600 focus:outline-none transition-all duration-300 text-sm md:text-base ${
            errors.subject
              ? "border-crimson-bright focus:border-crimson-bright"
              : "border-white/20 focus:border-crimson-bright"
          }`}
        />
        {errors.subject && (
          <span
            id="subject-error"
            className="text-[11px] text-crimson-bright tracking-wide font-medium mt-1 flex items-center gap-1.5"
            role="alert"
          >
            <AlertCircle size={12} />
            {errors.subject}
          </span>
        )}
      </div>

      {/* Message Field */}
      <div className="flex flex-col gap-1.5 group w-full text-left">
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={!!errors.message}
          placeholder="Message"
          rows={4}
          className={`bg-transparent border-b pb-2 text-white placeholder:text-zinc-600 focus:outline-none transition-all duration-300 resize-none text-sm md:text-base ${
            errors.message
              ? "border-crimson-bright focus:border-crimson-bright"
              : "border-white/20 focus:border-crimson-bright"
          }`}
        ></textarea>
        {errors.message && (
          <span
            id="message-error"
            className="text-[11px] text-crimson-bright tracking-wide font-medium mt-1 flex items-center gap-1.5"
            role="alert"
          >
            <AlertCircle size={12} />
            {errors.message}
          </span>
        )}
      </div>

      {/* Submit Button & Status messages */}
      <div className="pt-4 flex flex-col items-stretch md:items-end gap-4 w-full">
        <button
          type="submit"
          disabled={status === "Sending..."}
          className="group/btn flex items-center justify-center gap-3 bg-crimson-bright hover:bg-crimson-dark disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white px-8 py-4 rounded-none transition-all duration-300 font-roboto font-bold text-xs tracking-widest uppercase cursor-pointer w-full md:w-auto"
        >
          <span>{status === "Sending..." ? "SENDING..." : "SUBMIT"}</span>
          <Send
            size={14}
            className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300"
          />
        </button>

        {/* Dynamic Status Notification Banner */}
        {status && status !== "Sending..." && (
          <div
            className={`flex items-center gap-2 px-4 py-3 text-xs w-full justify-center rounded-none font-roboto border transition-all duration-300 ${
              status.includes("successfully")
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "bg-crimson-bright/10 border-crimson-bright/30 text-crimson-bright"
            }`}
          >
            {status.includes("successfully") ? (
              <CheckCircle2 size={14} />
            ) : (
              <AlertCircle size={14} />
            )}
            <span className="font-medium text-center">{status}</span>
          </div>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
