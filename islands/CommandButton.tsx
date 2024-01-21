import { JSX } from "preact";

export default function CommanadButton(
  props: JSX.HTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      type="button"
      {...props}
      class="text-2xl text-white active:text-black bg-black hover:bg-gray-600 active:bg-gray-300 rounded-md px-8 transition-colors"
    >
    </button>
  );
}
