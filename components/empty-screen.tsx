import { UseChatHelpers } from 'ai/react'

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to TaxIntelligence chatbot!
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          This is chatbot designed to help you understand the intricacies of tax
          law.
        </p>
        <p className="mb-2 leading-normal text-muted-foreground">
          <strong>Legal notice:</strong>This chatbot does not constitute legal
          advice. Always consult a qualified tax consultant for legal advice
          regarding the tax law.
        </p>
      </div>
    </div>
  )
}
