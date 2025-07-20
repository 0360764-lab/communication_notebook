"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Inbox, Send, User, Clock, CheckCircle, Reply, Download, ImageIcon, FileText } from "lucide-react"

export default function ParentDashboard() {
  const [messages] = useState([
    {
      id: 1,
      from: "担任の先生",
      subject: "来週の遠足について",
      content:
        "来週火曜日の遠足についてお知らせします。集合時間は午前8時30分、場所は学校正門前です。持ち物リストを添付しましたのでご確認ください。",
      timestamp: "2024-01-14 16:00",
      read: false,
      attachments: [{ name: "持ち物リスト.pdf", type: "pdf", size: "245KB" }],
    },
    {
      id: 2,
      from: "担任の先生",
      subject: "宿題について",
      content: "今週の宿題の提出状況についてご連絡します。算数のプリントの提出をお願いします。",
      timestamp: "2024-01-14 15:30",
      read: true,
      attachments: [],
    },
  ])

  const [replyContent, setReplyContent] = useState("")
  const [replySubject, setReplySubject] = useState("")
  const [showReplyForm, setShowReplyForm] = useState(false)

  const handleReply = () => {
    // 返信処理
    alert("返信を送信しました！")
    setReplyContent("")
    setReplySubject("")
    setShowReplyForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">保護者ダッシュボード</h1>
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <Send className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">今月の送信数</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">お子様</p>
                  <p className="text-lg font-bold text-gray-900">田中太郎</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>メッセージ</CardTitle>
                <CardDescription>先生からの連絡事項</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border rounded-lg ${!message.read ? "bg-blue-50 border-blue-200" : "bg-white"}`}
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
                      <h4 className="font-medium text-gray-900 mb-2">{message.subject}</h4>
                      <p className="text-sm text-gray-600 mb-3">{message.content}</p>

                      {message.attachments.length > 0 && (
                        <div className="space-y-2 mb-3">
                          <p className="text-xs font-medium text-gray-700">添付ファイル:</p>
                          {message.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                              {attachment.type === "pdf" ? (
                                <FileText className="h-4 w-4 text-red-600" />
                              ) : (
                                <ImageIcon className="h-4 w-4 text-green-600" />
                              )}
                              <span className="text-sm">{attachment.name}</span>
                              <span className="text-xs text-gray-500">({attachment.size})</span>
                              <Button variant="ghost" size="sm" className="ml-auto">
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setShowReplyForm(!showReplyForm)}>
                          <Reply className="h-3 w-3 mr-1" />
                          返信
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {showReplyForm && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>返信メッセージ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reply-subject">件名</Label>
                    <Input
                      id="reply-subject"
                      value={replySubject}
                      onChange={(e) => setReplySubject(e.target.value)}
                      placeholder="件名を入力してください"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reply-content">メッセージ</Label>
                    <Textarea
                      id="reply-content"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="返信内容を入力してください"
                      rows={6}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleReply} disabled={!replyContent || !replySubject}>
                      <Send className="h-4 w-4 mr-2" />
                      送信
                    </Button>
                    <Button variant="outline" onClick={() => setShowReplyForm(false)}>
                      キャンセル
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>お子様情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">お名前</p>
                    <p className="text-lg font-semibold">田中太郎</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">クラス</p>
                    <p className="text-lg font-semibold">3年A組</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">担任の先生</p>
                    <p className="text-lg font-semibold">山田先生</p>
                  </div>
                </div>
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
                    <span>遠足のお知らせを受信</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>宿題について返信</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>欠席連絡を送信</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>緊急連絡</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-transparent" variant="outline">
                  <Send className="h-4 w-4 mr-2" />
                  緊急連絡を送信
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
