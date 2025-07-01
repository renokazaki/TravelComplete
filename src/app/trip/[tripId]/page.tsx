import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Users, Clock, UserPlus } from "lucide-react";
import Link from "next/link";
import { prisma } from "../../../../prisma/prisma";

export default async function TripIdPage({params}: {params: Promise<{tripId: string}>   }) {
   const paramsData = await params;
   const travel = await prisma.travel.findUnique({
    where: {
      id: paramsData.tripId,
    },
   });

   return (
    <div className="container mx-auto py-6 px-4 max-w-6xl space-y-8">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
           {travel?.title}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-sm">
              {/* {travel?.users.length}人参加 */}
            </Badge>
          </div>
        </div>
        <Card className="sm:w-auto">
          <CardContent className="flex items-center justify-center text-center px-6 py-4">
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
               {travel?.startDate?.toLocaleDateString()}
              </p>
              <p className="text-muted-foreground text-sm">2025年7月1日</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 旅行概要 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            旅行概要
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <CalendarDays className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">日程</p>
                <p className="font-medium">
                  {travel?.startDate?.toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">目的地</p>
                <p className="font-medium">未定</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-950">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">参加者</p>
                <p className="font-medium">1人</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950">
              <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">期間</p>
                <p className="font-medium">
                  {travel?.startDate?.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* メンバー管理 */}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">参加メンバー</h3>
                <Link href="/trip/1/add">
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    メンバー追加
                  </Button>
                </Link>
            </div>
           
          </div>
        </CardContent>
      </Card>

    
    </div>
  );
}