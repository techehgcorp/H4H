export default function Label({ htmlFor, children, required }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
    >
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}
