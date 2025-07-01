"use server";

import { prisma } from "../../../prisma/prisma";

export async function reorderItinerary(tripId: string, newOrder: string[]) {


  await prisma.$transaction(
    newOrder.map((itineraryId: string, key: number) =>
      prisma.itinerary.update({
        where: { id: itineraryId },
        data: { order: key },
      })
    )
  );
}