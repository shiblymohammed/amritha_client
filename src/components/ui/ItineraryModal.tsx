// @/components/ui/ItineraryModal.tsx
// NOTE: This is the lazy-loaded modal component.

import React, { useState, useEffect, useRef, useCallback } from "react";
// To render the AI's markdown response safely, install react-markdown:
// npm install react-markdown
import ReactMarkdown from "react-markdown";
import { generateItinerary } from "../services/itineraryService"; // Updated path
import { Spinner } from "./Spinner"; // Updated path

interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sub-component for the input form
const ItineraryForm = ({
  onGenerate,
  isLoading,
}: {
  onGenerate: (interests: string, days: number) => void;
  isLoading: boolean;
}) => {
  const [interests, setInterests] = useState("");
  const [days, setDays] = useState(3);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interests || days < 1) {
      setError("Please provide your interests and a valid number of days.");
      return;
    }
    setError("");
    onGenerate(interests, days);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="interests"
          className="font-poppins text-sm font-medium text-foreground block mb-2"
        >
          What are your interests?
        </label>
        <input
          id="interests"
          type="text"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="e.g., history, relaxation, local food"
          className="w-full p-3 bg-background border border-border-interactive rounded-lg focus:ring-2 focus:ring-accent focus:outline-none transition-all duration-300 hover:border-accent"
        />
      </div>
      <div>
        <label
          htmlFor="days"
          className="font-poppins text-sm font-medium text-foreground block mb-2"
        >
          How many days are you staying?
        </label>
        <input
          id="days"
          type="number"
          value={days}
          onChange={(e) => setDays(Math.max(1, parseInt(e.target.value, 10) || 1))}
          min="1"
          className="w-full p-3 bg-background border border-border-interactive rounded-lg focus:ring-2 focus:ring-accent focus:outline-none transition-all duration-300 hover:border-accent"
        />
      </div>
      {error && <p className="text-red-500 text-sm animate-fade-in">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full py-3 px-6 text-lg font-medium flex items-center justify-center gap-2 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Spinner />
            <span>Generating...</span>
          </>
        ) : (
          "✨ Generate Itinerary"
        )}
      </button>
    </form>
  );
};

// Sub-component for displaying the generated itinerary
const ItineraryDisplay = ({ content }: { content: string }) => (
  <div className="prose prose-invert max-w-none font-cormorant text-foreground animate-fade-in-up">
    {/* Using ReactMarkdown is secure and avoids dangerouslySetInnerHTML */}
    <ReactMarkdown>{content}</ReactMarkdown>
  </div>
);

const ItineraryModal: React.FC<ItineraryModalProps> = ({ isOpen, onClose }) => {
  const [itinerary, setItinerary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Focus trapping for accessibility
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);
  
  const handleGenerate = useCallback(async (interests: string, days: number) => {
    setIsLoading(true);
    setItinerary("");
    setError("");

    try {
      const result = await generateItinerary(interests, days);
      setItinerary(result);
    } catch (err) {
      setError(
        "Sorry, we couldn't generate your itinerary. Please try again later."
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose} // Close on overlay click
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1} // Make div focusable
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        className="glassmorphic rounded-3xl shadow-soft-sunlight-lg w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in-up focus:outline-none"
      >
        <header className="p-6 border-b border-border flex justify-between items-center shrink-0">
          <h3 id="modal-title" className="font-playfair text-h3-sm text-foreground">
            Personalize Your Stay
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-foreground-subtle hover:text-foreground text-3xl leading-none transition-all duration-300 hover:rotate-90"
          >
            &times;
          </button>
        </header>

        <main className="p-6 overflow-y-auto">
          {itinerary ? (
            <ItineraryDisplay content={itinerary} />
          ) : (
            <ItineraryForm onGenerate={handleGenerate} isLoading={isLoading} />
          )}
          {error && !isLoading && (
             <p className="text-red-500 text-sm mt-4 text-center animate-fade-in">{error}</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default ItineraryModal;