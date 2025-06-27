import { UIMessage } from "ai"

export type Chat = {
  id: string
  created_at: Date
  messages: UIMessage[]
}