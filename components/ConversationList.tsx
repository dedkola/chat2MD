import React from 'react';
import { Conversation } from '../types';
import { MessageSquare, Clock } from 'lucide-react';

interface ConversationListProps {
    conversations: Conversation[];
}

export const ConversationList: React.FC<ConversationListProps> = ({ conversations }) => {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 font-medium text-sm uppercase tracking-wider">
                    Found {conversations.length} Conversations
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {conversations.slice(0, 50).map((conv) => (
                    <div key={conv.id} className="bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 transition-colors group">
                        <div className="flex items-start justify-between mb-2">
                            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:text-indigo-300 transition-colors">
                                <MessageSquare className="w-4 h-4" />
                            </div>
                            <span className="text-xs text-slate-500 font-mono">
                                {conv.messages.length} msgs
                            </span>
                        </div>
                        <h4 className="text-slate-200 font-medium text-sm truncate mb-1" title={conv.title}>
                            {conv.title}
                        </h4>
                        {conv.createTime && (
                            <div className="flex items-center text-xs text-slate-500 gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(conv.createTime).toLocaleDateString()}
                            </div>
                        )}
                    </div>
                ))}
                {conversations.length > 50 && (
                    <div className="flex items-center justify-center p-4 text-slate-500 text-sm italic">
                        And {conversations.length - 50} more...
                    </div>
                )}
            </div>
        </div>
    );
};
