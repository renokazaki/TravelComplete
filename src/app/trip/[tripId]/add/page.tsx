export default async function AddMemberPage({params}: {params: Promise<{tripId: string}>}) {
    const paramsData = await params;
    
    return <div>メンバー追加ページ {paramsData.tripId}</div>;
}