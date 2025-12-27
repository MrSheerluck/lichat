import { Button } from "@workspace/ui/components/button"
import { Textarea } from "@workspace/ui/components/textarea"
import { useState, useRef, useEffect } from "react"
import { Send, ArrowUp } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

interface ChatInputProps {
    onSend: (message: string) => void
    disabled?: boolean
    placeholder?: string
}

export function ChatInput({ onSend, disabled, placeholder }: ChatInputProps) {
    const [input, setInput] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)


    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'inherit'
            const scrollHeight = textareaRef.current.scrollHeight
            textareaRef.current.style.height = `${Math.min(scrollHeight, 200)}px`
        }
    }, [input])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim() && !disabled) {
            onSend(input.trim())
            setInput('')

            if (textareaRef.current) {
                textareaRef.current.style.height = 'inherit'
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    return (
        <div className="w-full bg-gradient-to-t from-background via-background to-transparent pb-6 pt-2 px-4">
            <div className="max-w-5xl mx-auto relative cursor-text transition-all">
                <form
                    onSubmit={handleSubmit}
                    className={cn(
                        "relative flex items-end w-full p-2 rounded-[26px] bg-background border border-input focus-within:ring-1 focus-within:ring-ring transition-all shadow-sm",
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <Textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder || "Message..."}
                        disabled={disabled}
                        rows={1}
                        className="min-h-[24px] max-h-[200px] w-full resize-none border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-4 py-3 !bg-transparent overflow-hidden text-base placeholder:text-foreground/70"
                        style={{ overflowY: input.length > 200 ? 'auto' : 'hidden' }}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={disabled || !input.trim()}
                        className={cn(
                            "mb-1 mr-1 h-9 w-9 rounded-full shrink-0 transition-all",
                            input.trim() ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted"
                        )}
                    >
                        <ArrowUp className="h-5 w-5" />
                    </Button>
                </form>
                <div className="text-center mt-2.5">
                    <p className="text-[10px] text-muted-foreground/60">
                        AI can make mistakes. Check important info.
                    </p>
                </div>
            </div>
        </div>
    )
}