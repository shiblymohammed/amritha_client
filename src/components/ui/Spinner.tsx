// @/components/ui/Spinner.tsx
// NOTE: A small, reusable spinner component.

export const Spinner = () => (
    <div
      role="status"
      aria-label="Loading"
      className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"
    />
  );