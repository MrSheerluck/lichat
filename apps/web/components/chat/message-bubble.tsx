import { cn } from "@workspace/ui/lib/utils"
import ReactMarkdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MessageBubbleProps {
    role: 'user' | 'assistant' | 'system'
    content: string
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
    const isUser = role === 'user'

    return (
        <div className={cn(
            "w-full flex py-4",
            isUser ? "justify-end" : "justify-start"
        )}>
            <div className={cn(
                "relative max-w-[90%] md:max-w-[85%] flex gap-3",
                isUser ? "flex-row-reverse" : "flex-row"
            )}>

                {!isUser && (
                    <div className="flex-shrink-0 mt-0.5">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary border border-primary/20">
                            AI
                        </div>
                    </div>
                )}


                <div className={cn(
                    "flex flex-col",
                    isUser ? "items-end" : "items-start",
                    "max-w-full overflow-hidden"
                )}>
                    {!isUser && (
                        <span className="text-xs text-muted-foreground mb-1 ml-1 font-medium">Assistant</span>
                    )}

                    <div className={cn(
                        "rounded-2xl px-5 py-2.5 shadow-sm text-sm leading-relaxed max-w-full",
                        isUser
                            ? "bg-primary text-primary-foreground rounded-tr-md"
                            : "bg-muted/50 text-foreground rounded-tl-md border border-border/50",
                        "overflow-hidden"
                    )}>
                        <div className={cn(
                            "prose prose-sm dark:prose-invert max-w-none break-words",
                            isUser && "prose-headings:text-primary-foreground prose-p:text-primary-foreground prose-strong:text-primary-foreground prose-code:text-primary-foreground prose-ul:text-primary-foreground prose-ol:text-primary-foreground prose-a:text-primary-foreground/90"
                        )}>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code({ className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '')
                                        const isInline = !match

                                        if (isInline) {
                                            return (
                                                <code
                                                    className={cn(className, "bg-muted/30 rounded px-1 py-0.5", isUser && "bg-primary-foreground/20")}
                                                    {...props}
                                                >
                                                    {children}
                                                </code>
                                            )
                                        }

                                        return (
                                            <div className="rounded-md overflow-hidden my-2 not-prose">
                                                <div className="flex items-center justify-between px-3 py-1 bg-stone-900 border-b border-white/5">
                                                    <span className="text-xs text-stone-400 font-medium">{match?.[1] || 'code'}</span>
                                                </div>
                                                <SyntaxHighlighter
                                                    style={vscDarkPlus}
                                                    language={match?.[1]}
                                                    PreTag="div"
                                                    customStyle={{ margin: 0, padding: '1rem', fontSize: '0.875rem' }}
                                                    wrapLines={true}
                                                    wrapLongLines={true}
                                                >
                                                    {String(children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>
                                            </div>
                                        )
                                    },
                                    table({ children }) {
                                        return (
                                            <div className="overflow-x-auto my-4 border rounded-lg">
                                                <table className="w-full text-sm text-left">
                                                    {children}
                                                </table>
                                            </div>
                                        )
                                    },
                                    thead({ children }) {
                                        return <thead className="text-xs uppercase bg-muted/50">{children}</thead>
                                    },
                                    th({ children }) {
                                        return <th className="px-4 py-3 font-medium">{children}</th>
                                    },
                                    td({ children }) {
                                        return <td className="px-4 py-3 border-t border-border/50">{children}</td>
                                    }
                                } as Components}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}