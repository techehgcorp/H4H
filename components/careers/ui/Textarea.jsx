export default function Textarea({ className = "", rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      {...props}
      className={
        "w-full rounded-xl border border-gray-300 bg-white/90 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-neutral-900/90 " +
        className
      }
    />
  );
}
