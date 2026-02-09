import { Conversation, Message, ChatGPTConversation, ClaudeConversation, ChatSource, ConversionOptions } from '../types';
import JSZip from 'jszip';

// --- Detect Source ---
export const detectSource = (json: any): ChatSource => {
    if (Array.isArray(json) && json.length > 0) {
        if (json[0].mapping && json[0].current_node) return 'chatgpt';
        if (json[0].chat_messages && json[0].uuid) return 'claude';
    }
    return 'unknown';
};

// --- Parsers ---

const parseChatGPT = (data: ChatGPTConversation[]): Conversation[] => {
    return data.map((chat) => {
        const messages: Message[] = [];
        let currentNodeId = chat.current_node;

        // Traverse backwards from current_node to root
        while (currentNodeId) {
            const node = chat.mapping[currentNodeId];
            if (!node) break;

            if (node.message && node.message.content && node.message.content.parts && node.message.content.parts.length > 0) {
                const textContent = node.message.content.parts.join('\n');
                if (textContent.trim()) {
                    messages.unshift({
                        role: (node.message.author.role as any) || 'system',
                        content: textContent,
                        date: node.message.create_time ? new Date(node.message.create_time * 1000).toISOString() : undefined
                    });
                }
            }
            currentNodeId = node.parent!;
        }

        return {
            id: chat.current_node, // Using current node as unique ID proxy since ChatGPT exports don't always have a top-level ID easily accessible in this list view
            title: chat.title || 'Untitled Chat',
            messages: messages,
            createTime: chat.create_time * 1000,
            updateTime: chat.update_time * 1000
        };
    });
};

const parseClaude = (data: ClaudeConversation[]): Conversation[] => {
    return data.map((chat) => ({
        id: chat.uuid,
        title: chat.name || 'Untitled Chat',
        createTime: new Date(chat.created_at).getTime(),
        updateTime: new Date(chat.updated_at).getTime(),
        messages: chat.chat_messages.map((msg) => ({
            role: msg.sender === 'human' ? 'user' : 'assistant',
            content: msg.text,
            date: msg.created_at
        }))
    }));
};

export const parseFile = async (file: File): Promise<{ conversations: Conversation[], source: ChatSource }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result as string);
                const source = detectSource(json);

                let conversations: Conversation[] = [];
                if (source === 'chatgpt') {
                    conversations = parseChatGPT(json as ChatGPTConversation[]);
                } else if (source === 'claude') {
                    conversations = parseClaude(json as ClaudeConversation[]);
                } else {
                    throw new Error('Unsupported JSON format. Please upload a standard ChatGPT or Claude export.');
                }
                resolve({ conversations, source });
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
};

// --- Markdown Generators ---

const generateFrontmatter = (c: Conversation, format: 'md' | 'mdx'): string => {
    const dateStr = c.createTime ? new Date(c.createTime).toISOString().split('T')[0] : 'unknown';
    // Escape quotes in title
    const safeTitle = c.title.replace(/"/g, '\\"');

    return `---
title: "${safeTitle}"
date: ${dateStr}
id: ${c.id}
---

`;
};

const formatMessage = (msg: Message, options: ConversionOptions): string => {
    const roleHeader = msg.role === 'user' ? '## User' : '## Assistant';
    const timestamp = options.addTimestamps && msg.date ? ` *(${new Date(msg.date).toLocaleString()})*` : '';

    return `${roleHeader}${timestamp}\n\n${msg.content}\n\n`;
};

export const generateFiles = async (conversations: Conversation[], options: ConversionOptions): Promise<Blob> => {
    const zip = new JSZip();

    conversations.forEach((conv) => {
        let fileContent = '';

        if (options.includeFrontmatter) {
            fileContent += generateFrontmatter(conv, options.format);
        } else {
            fileContent += `# ${conv.title}\n\n`;
        }

        conv.messages.forEach(msg => {
            fileContent += formatMessage(msg, options);
        });

        // Sanitize filename
        const safeFilename = conv.title.replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 50) || 'untitled';
        zip.file(`${safeFilename}.${options.format}`, fileContent);
    });

    return await zip.generateAsync({ type: 'blob' });
};
