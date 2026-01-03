import Label from "./Label";

export default function FileInput({ id, label, required }) {
  return (
    <div>
      <Label htmlFor={id} required={required}>{label}</Label>
      <input
        id={id}
        name={id}
        type="file"
        className="block w-full cursor-pointer rounded-xl border border-dashed border-gray-300 bg-white/70 p-6 text-center text-sm text-gray-600 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-neutral-900/70 dark:text-gray-300"
      />
    </div>
  );
}
