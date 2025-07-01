import SortableItinerary from "@/components/itinerary/SortableItinarary";
import { prisma } from "../../../../../prisma/prisma";

export default async function ItineraryPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const paramsData = await params;
 
  const itinerary = await prisma.itinerary.findMany({
    where: {
      travelId: paramsData.tripId,
    },
  });

  return (
    <div>
      ItineraryPage {paramsData.tripId}
      <SortableItinerary itinerary={itinerary} tripId={paramsData.tripId} />
    </div>
  );
}
