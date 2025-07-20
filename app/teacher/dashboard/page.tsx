"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Inbox, Users, User, Plus, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function TeacherDashboard() {
  const [messages] = useState([
    {
      id: 1,
      from: "田中太郎の保護者",
      subject: "明日の持ち物について",
      content: "明日の体育の授業で必要な持ち物を教えてください。",
      timestamp: "2024-01-15 14:30",
      read: false,
    },
    {
      id: 2,
      from: "佐藤花子の保護者",
      subject: "欠席連絡",
      content: "風邪のため本日は欠席させていただきます。",
      timestamp: "2024-01-15 08:15",
      read: true,
    },
  ])

  const [sentMessages] = useState([
    {
      id: 1,
      to: "全保護者",
      subject: "来週の遠足について",
      content: "来週火曜日の遠足の詳細をお知らせします...",
      timestamp: "2024-01-14 16:00",
      type: "broadcast",
    },
    {
      id: 2,
      to: "山田次郎の保護者",
      subject: "宿題について",
      content: "宿題の提出が遅れていますので...",
      timestamp: "2024-01-14 15:30",
      type: "individual",
    },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">教師ダッシュボード</h1>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-green-600">
                オンライン
              </Badge>
              <Button variant="outline" size="sm">
                ログアウト
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Inbox className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">未読メッセージ</p>
                  <p className="text-2xl font-bold text-gray-900">{messages.filter((m) => !m.read).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">登録保護者数</p>
                  <p className="text-2xl font-bold text-gray-900">28</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Send className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">今月の送信数</p>
                  <p className="text-2xl font-bold text-gray-900">45</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>メッセージ管理</CardTitle>
                  <div className="flex gap-2">
                    <Link href="/teacher/compose">
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        新規作成
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="inbox">
                  <TabsList>
                    <TabsTrigger value="inbox">受信箱</TabsTrigger>
                    <TabsTrigger value="sent">送信済み</TabsTrigger>
                  </TabsList>

                  <TabsContent value="inbox" className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                          !message.read ? "bg-blue-50 border-blue-200" : "bg-white"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="font-medium text-sm">{message.from}</span>
                            {!message.read && (
                              <Badge variant="secondary" className="text-xs">
                                未読
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">{message.subject}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{message.content}</p>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="sent" className="space-y-4">
                    {sentMessages.map((message) => (
                      <div key={message.id} className="p-4 border rounded-lg bg-white">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            {message.type === "broadcast" ? (
                              <Users className="h-4 w-4 text-green-600" />
                            ) : (
                              <User className="h-4 w-4 text-blue-600" />
                            )}
                            <span className="font-medium text-sm">{message.to}</span>
                            <Badge variant={message.type === "broadcast" ? "default" : "secondary"} className="text-xs">
                              {message.type === "broadcast" ? "一斉配信" : "個別"}
                            </Badge>
                          </div>
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">{message.subject}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{message.content}</p>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>クイックアクション</CardTitle>
                <CardDescription>よく使用する機能</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/teacher/compose?type=broadcast">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="h-4 w-4 mr-2" />
                    一斉配信
                  </Button>
                </Link>
                <Link href="/teacher/compose?type=individual">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <User className="h-4 w-4 mr-2" />
                    個別送信
                  </Button>
                </Link>
                <Link href="/teacher/parents">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="h-4 w-4 mr-2" />
                    保護者管理
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>最近の活動</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>遠足のお知らせを送信</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>新しいメッセージを受信</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>宿題の連絡を送信</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
