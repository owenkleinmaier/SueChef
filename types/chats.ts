import { UIMessage } from "ai"

export type Chat = {
  title: string
  id: string
  created_at: Date
  messages: UIMessage[]
}