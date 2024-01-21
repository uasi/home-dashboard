import { getSystemStat, SystemStats } from "../components/SystemStats.tsx";

export default async function Home() {
  const systemStat = await getSystemStat();

  return (
    <div class="p-8">
      <SystemStats systemStat={systemStat} />
    </div>
  );
}
