export type ChatSource = 'chatgpt' | 'claude' | 'unknown';

export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    date?: string;
}

export interface Conversation {
    id: string;
    title: string;
    messages: Message[];
    createTime?: number;
    updateTime?: number;
}

export interface ConversionOptions {
    format: 'md' | 'mdx';
    includeFrontmatter: boolean;
    separateFiles: boolean; // If false, combine into one massive file (less recommended but possible)
    addTimestamps: boolean;
}

// ChatGPT Export Types
export interface ChatGPTNode {
    id: string;
    message?: {
        author: { role: string };
        create_time: number;
        content: { parts: string[] };
    };
    parent: string | null;
    children: string[];
}

export interface ChatGPTConversation {
    title: string;
    create_time: number;
    update_time: number;
    mapping: Record<string, ChatGPTNode>;
    current_node: string;
}

// Claude Export Types
export interface ClaudeMessage {
    sender: string;
    text: string;
    created_at: string;
    updated_at: string;
}

export interface ClaudeConversation {
    uuid: string;
    name: string;
    created_at: string;
    updated_at: string;
    chat_messages: ClaudeMessage[];
}
