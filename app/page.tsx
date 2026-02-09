'use client';

import React, { useState } from 'react';
import { Dropzone } from '@/components/Dropzone';
import { OptionsPanel } from '@/components/OptionsPanel';
import { ConversationList } from '@/components/ConversationList';
import { Conversation, ChatSource, ConversionOptions } from '@/types';
import { parseFile, generateFiles } from '@/services/converterService';
import { Bot, FileDown, RefreshCw, Zap, Download, Github } from 'lucide-react';

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [source, setSource] = useState<ChatSource | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const [options, setOptions] = useState<ConversionOptions>({
    format: 'md',
    includeFrontmatter: true,
    separateFiles: true,
    addTimestamps: false,
  });

  const handleFileLoaded = async (file: File) => {
    setIsLoading(true);
    try {
      // Artificial delay for slick feeling if file is too small
      const start = Date.now();
      const result = await parseFile(file);
      const elapsed = Date.now() - start;
      if (elapsed < 600) await new Promise(r => setTimeout(r, 600 - elapsed));

      setConversations(result.conversations);
      setSource(result.source);
    } catch (error) {
      console.error(error);
      alert('Failed to parse file. Ensure it is a valid JSON export.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (conversations.length === 0) return;
    setIsConverting(true);

    try {
      const blob = await generateFiles(conversations, options);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chat-export-${source || 'converted'}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('Error generating zip file.');
    } finally {
      setIsConverting(false);
    }
  };

  const reset = () => {
    setConversations([]);
    setSource(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 selection:text-indigo-200 font-sans relative overflow-hidden">

      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-pink-500/5 rounded-full blur-[80px]"></div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl flex flex-col min-h-screen">

        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
              <Bot className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Chat2MD</h1>
              <p className="text-xs text-slate-400 font-medium">Export Converter</p>
            </div>
          </div>
          <a href="https://github.com/dedkola/chat2MD" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center w-full">

          {conversations.length === 0 ? (
            <div className="w-full flex flex-col items-center animate-fade-in-up">
              <div className="text-center mb-10 max-w-xl">
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-6">
                  Transform your AI chats into standard Markdown.
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Backup, read, or publish your ChatGPT and Claude histories.
                  Privacy-focused: Your data never leaves your browser.
                </p>
              </div>

              <div className="w-full">
                <Dropzone onFileLoaded={handleFileLoaded} isLoading={isLoading} />
              </div>

              {/* Feature Pills */}
              <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>Instant Local Processing</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800">
                  <FileDown className="w-4 h-4 text-blue-500" />
                  <span>Supports MD & MDX</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-8 animate-fade-in">
              {/* Toolbar */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    {source === 'chatgpt' ? 'ChatGPT Export' : source === 'claude' ? 'Claude Export' : 'Unknown Export'}
                    <span className="text-xs font-normal px-2 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                      {conversations.length} chats
                    </span>
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">Ready to convert.</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={reset}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    title="Reset"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Options & List Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Settings */}
                <div className="lg:col-span-1 space-y-6">
                  <OptionsPanel options={options} setOptions={setOptions} />

                  <button
                    onClick={handleDownload}
                    disabled={isConverting}
                    className={`
                      w-full py-4 rounded-xl font-bold text-lg shadow-lg
                      flex items-center justify-center gap-3
                      transition-all duration-300
                      ${isConverting
                        ? 'bg-slate-700 cursor-wait text-slate-400'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white hover:shadow-indigo-500/25 active:scale-[0.98]'
                      }
                    `}
                  >
                    {isConverting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Download Zip
                      </>
                    )}
                  </button>
                </div>

                {/* Right Column: Preview List */}
                <div className="lg:col-span-2">
                  <ConversationList conversations={conversations} />
                </div>
              </div>

            </div>
          )}
        </main>

        <footer className="mt-16 py-6 border-t border-slate-800/50 text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} Chat2MD. Runs entirely in your browser.</p>
        </footer>
      </div>
    </div>
  );
}