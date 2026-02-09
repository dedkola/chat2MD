import React from 'react';
import { ConversionOptions } from '../types';
import { Settings, Calendar, LayoutTemplate } from 'lucide-react';

interface OptionsPanelProps {
    options: ConversionOptions;
    setOptions: React.Dispatch<React.SetStateAction<ConversionOptions>>;
}

export const OptionsPanel: React.FC<OptionsPanelProps> = ({ options, setOptions }) => {

    const toggleOption = (key: keyof ConversionOptions) => {
        setOptions(prev => {
            // Handle boolean toggles
            if (typeof prev[key] === 'boolean') {
                return { ...prev, [key]: !prev[key] };
            }
            return prev;
        });
    };

    const setFormat = (fmt: 'md' | 'mdx') => {
        setOptions(prev => ({ ...prev, format: fmt }));
    };

    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm w-full">
            <div className="flex items-center gap-2 mb-6 text-slate-200">
                <Settings className="w-5 h-5 text-secondary" />
                <h3 className="font-semibold">Conversion Settings</h3>
            </div>

            <div className="space-y-6">
                {/* Output Format */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-400 uppercase tracking-wider">Output Format</label>
                    <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-700/50">
                        <button
                            onClick={() => setFormat('md')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${options.format === 'md'
                                ? 'bg-slate-700 text-white shadow-sm'
                                : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            Markdown (.md)
                        </button>
                        <button
                            onClick={() => setFormat('mdx')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${options.format === 'mdx'
                                ? 'bg-secondary text-white shadow-sm shadow-secondary/20'
                                : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            MDX (.mdx)
                        </button>
                    </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-400 uppercase tracking-wider">Content Options</label>
                    <div className="flex flex-col gap-2">

                        <button
                            onClick={() => toggleOption('includeFrontmatter')}
                            className={`flex items-center justify-between p-3 rounded-xl border transition-all ${options.includeFrontmatter
                                ? 'bg-primary/10 border-primary/50 text-slate-200'
                                : 'bg-slate-900/30 border-slate-700/50 text-slate-400 hover:border-slate-600'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <LayoutTemplate className="w-4 h-4" />
                                <span className="text-sm">Include Frontmatter</span>
                            </div>
                            <div className={`w-4 h-4 rounded-full border ${options.includeFrontmatter ? 'bg-primary border-primary' : 'border-slate-600'}`}></div>
                        </button>

                        <button
                            onClick={() => toggleOption('addTimestamps')}
                            className={`flex items-center justify-between p-3 rounded-xl border transition-all ${options.addTimestamps
                                ? 'bg-primary/10 border-primary/50 text-slate-200'
                                : 'bg-slate-900/30 border-slate-700/50 text-slate-400 hover:border-slate-600'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">Add Timestamps</span>
                            </div>
                            <div className={`w-4 h-4 rounded-full border ${options.addTimestamps ? 'bg-primary border-primary' : 'border-slate-600'}`}></div>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};
