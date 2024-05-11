import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
// import { auth } from '@/auth'
import { getChat } from '@/lib/chat_actions'
import { Chat } from '@/components/chat'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { authConfig } from '@/config/server-config'
import { toSession } from '@/lib/user'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const tokens = await getTokens(cookies(), authConfig)

  if (!tokens?.decodedToken.user_id) {
    return {}
  }
  const session = toSession(tokens)
  const chat = await getChat(params.id, session.user.id)
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const tokens = await getTokens(cookies(), authConfig)
  if (!tokens) {
    redirect(`/login?next=/chat/${params.id}`)
  }
  const session = toSession(tokens)
  const chat = await getChat(params.id, session.user.id)

  if (!chat) {
    return <Chat id={params.id} />
  }

  if (chat?.userId !== session?.user?.id) {
    notFound()
  }

  return <Chat id={chat.id} initialMessages={chat.messages} />
}
