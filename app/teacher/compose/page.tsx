"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, Users, User, Paperclip, ImageIcon, FileText, X } from "lucide-react"
import Link from "next/link"

export default function ComposePage() {
  const [messageType, setMessageType] = useState<"broadcast" | "individual">("broadcast")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [selectedParents, setSelectedParents] = useState<string[]>([])
  const [attachments, setAttachments] = useState<File[]>([])

  const parents = [
    { id: "1", name: "田中太郎の保護者", student: "田中太郎" },
    { id: "2", name: "佐藤花子の保護者", student: "佐藤花子" },
    { id: "3", name: "山田次郎の保護者", student: "山田次郎" },
    { id: "4", name: "鈴木美咲の保護者", student: "鈴木美咲" },
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setAttachments((prev) => [...prev, ...newFiles])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSend = () => {
    // メッセージ送信処理
    alert("メッセージを送信しました！")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/teacher/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                戻る
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900 ml-4">メッセージ作成</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>新しいメッセージ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 送信タイプ選択 */}
            <div className="space-y-3">
              <Label>送信タイプ</Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="broadcast"
                    checked={messageType === "broadcast"}
                    onCheckedChange={() => setMessageType("broadcast")}
                  />
                  <Label htmlFor="broadcast" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    一斉配信
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="individual"
                    checked={messageType === "individual"}
                    onCheckedChange={() => setMessageType("individual")}
                  />
                  <Label htmlFor="individual" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    個別送信
                  </Label>
                </div>
              </div>
            </div>

            {/* 宛先選択 */}
            {messageType === "individual" && (
              <div className="space-y-3">
                <Label>宛先選択</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {parents.map((parent) => (
                    <div key={parent.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={parent.id}
                        checked={selectedParents.includes(parent.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedParents((prev) => [...prev, parent.id])
                          } else {
                            setSelectedParents((prev) => prev.filter((id) => id !== parent.id))
                          }
                        }}
                      />
                      <Label htmlFor={parent.id} className="text-sm">
                        {parent.name}
                        <span className="text-gray-500 ml-1">({parent.student})</span>
                      </Label>
                    </div>
                  ))}
                </div>
                {selectedParents.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedParents.map((parentId) => {
                      const parent = parents.find((p) => p.id === parentId)
                      return (
                        <Badge key={parentId} variant="secondary">
                          {parent?.name}
                        </Badge>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {messageType === "broadcast" && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">全保護者（28名）に送信されます</span>
                </div>
              </div>
            )}

            {/* 件名 */}
            <div className="space-y-2">
              <Label htmlFor="subject">件名</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="件名を入力してください"
              />
            </div>

            {/* 本文 */}
            <div className="space-y-2">
              <Label htmlFor="content">本文</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="メッセージ内容を入力してください"
                rows={8}
              />
            </div>

            {/* 添付ファイル */}
            <div className="space-y-3">
              <Label>添付ファイル</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <Paperclip className="h-4 w-4 mr-2" />
                  ファイル添付
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {attachments.length > 0 && (
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        {file.type.startsWith("image/") ? (
                          <ImageIcon className="h-4 w-4 text-green-600" />
                        ) : (
                          <FileText className="h-4 w-4 text-blue-600" />
                        )}
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 送信ボタン */}
            <div className="flex justify-end gap-3 pt-4">
              <Link href="/teacher/dashboard">
                <Button variant="outline">キャンセル</Button>
              </Link>
              <Button onClick={handleSend} disabled={!subject || !content}>
                <Send className="h-4 w-4 mr-2" />
                送信
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
