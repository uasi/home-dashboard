type Props = {
  data: string;
};

export function CommandOutput(props: Props) {
  return (
    <pre class="font-mono p-4 whitespace-pre-wrap bg-slate-200 border-2 rounded-md max-w-screen-xl">
      {props.data}
    </pre>
  );
}
