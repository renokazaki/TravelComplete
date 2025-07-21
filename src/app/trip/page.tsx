import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Users, Calendar, Plus } from "lucide-react";
import Link from "next/link";
import { prisma } from "../../../prisma/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
// import { Travel } from "@prisma/client";

export default async function TripPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const travels = await prisma.travelUser.findMany({
    where: {
      user: {
        clerkId: userId,
      },
    },
    include: {
      travel: true,
    },
  });
  console.log(travels);
  const friends = [];
  const activities = [];
  const CreateTripButton = () => {
    return (
      <Link href="/trip/new">
        <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-lg">
          <Plus className="mr-2 h-4 w-4" /> 新しい旅行
        </Button>
      </Link>
    );
  };
  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl space-y-8">
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            マイページ
          </h1>
        </div>
      </div>

      {/* メインコンテンツ */}
      <Tabs defaultValue="trips" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 h-12">
          <TabsTrigger
            value="trips"
            className="flex items-center gap-2 text-sm"
          >
            <Plane className="h-4 w-4" /> 旅行 ({travels.length})
          </TabsTrigger>
          <TabsTrigger
            value="friends"
            className="flex items-center gap-2 text-sm"
          >
            <Users className="h-4 w-4" /> 友達 ({friends.length})
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="flex items-center gap-2 text-sm"
          >
            <Calendar className="h-4 w-4" /> アクティビティ
          </TabsTrigger>
        </TabsList>

        {/* 旅行タブ */}
        <TabsContent value="trips" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">あなたの旅行計画</h2>
            <CreateTripButton />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {travels.map((travelUser) => (
              <Link href={`/trip/${travelUser.travelId}`} key={travelUser.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{travelUser.travel.title}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          {travels.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4">
                <Plane className="h-16 w-16 mx-auto text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                まだ旅行がありません
              </h3>
              <p className="text-gray-500 mb-6">
                最初の旅行を計画してみましょう！
              </p>
              <CreateTripButton />
            </div>
          )}
        </TabsContent>

        {/* 友達タブ */}
        <TabsContent value="friends" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">旅行仲間</h2>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> 友達を招待
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>テスト１</div>
            <div>テスト２</div>
            <div>テスト３</div>
          </div>

          {friends.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                まだ旅行仲間がいません
              </h3>
              <p className="text-gray-500">友達を旅行に招待してみましょう！</p>
            </div>
          )}
        </TabsContent>

        {/* アクティビティタブ */}
        <TabsContent value="activity" className="space-y-6">
          <h2 className="text-2xl font-semibold">最近のアクティビティ</h2>

          <div className="space-y-4">
            <div>ここに友達のアクティビティが表示される</div>
          </div>

          {activities.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                アクティビティがありません
              </h3>
              <p className="text-gray-500">
                旅行の計画を始めると、ここにアクティビティが表示されます。
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
