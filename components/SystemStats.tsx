import $ from "https://deno.land/x/dax@0.36.0/mod.ts";

type SystemStat = {
  logSize: string;
  lastBackup: string;
  uptime: string;
};

export async function getSystemStat() {
  return {
    logSize: await $`du -h /Users/uasi/var/log`.text(),
    lastBackup:
      await $`date -r /Users/uasi/Dropbox/Data/pg_dumpall/dump.sql "+%Y-%m-%d %H:%M:%S"`
        .text(),
    uptime: await $`uptime`.text(),
  };
}

export function SystemStats(props: { systemStat: SystemStat }) {
  return (
    <pre class="font-mono p-4 whitespace-pre-wrap bg-slate-200 border-2 rounded-md max-w-screen-xl">
        # Log size
        {"\n"}
        {props.systemStat.logSize}
        {"\n\n"}
        # Last back up
        {"\n"}
        {props.systemStat.lastBackup}
        {"\n\n"}
        # Uptime
        {"\n"}
        {props.systemStat.uptime}
    </pre>
  );
}
