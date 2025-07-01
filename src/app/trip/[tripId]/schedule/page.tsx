export default async function SchedulePage({params}: {params:Promise<{id: string}>}) {
   const paramsData = await params;
   
    return <div>SchedulePage {paramsData.id}</div>;
}