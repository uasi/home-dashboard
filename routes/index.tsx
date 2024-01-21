import { getSystemStat, SystemStats } from "../components/SystemStats.tsx";
import CommandPanel from "../islands/CommandPanel.tsx";

export default async function Home() {
  const systemStat = await getSystemStat();

  return (
    <div class="p-8 flex flex-col gap-8">
      <SystemStats systemStat={systemStat} />
      <CommandPanel />
    </div>
  );
}
