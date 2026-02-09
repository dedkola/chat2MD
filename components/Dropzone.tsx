import React, { useRef, useState } from 'react';
import { UploadCloud, FileJson, AlertCircle } from 'lucide-react';

interface DropzoneProps {
    onFileLoaded: (file: File) => void;
    isLoading: boolean;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onFileLoaded, isLoading }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const processFile = (file: File) => {
        if (!file.name.endsWith('.json')) {
            setError('Please upload a JSON file.');
            return;
        }
        setError(null);
        onFileLoaded(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
          relative group cursor-pointer 
          rounded-3xl border-2 border-dashed 
          transition-all duration-300 ease-out
          flex flex-col items-center justify-center
          p-12 md:p-16
          ${isDragging
                        ? 'border-secondary bg-secondary/10 scale-[1.02]'
                        : 'border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 bg-slate-900/50'
                    }
          ${isLoading ? 'opacity-50 pointer-events-none' : ''}
        `}
            >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

                <div className="bg-slate-800 p-4 rounded-full mb-4 shadow-xl ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300">
                    <UploadCloud className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-xl font-semibold text-slate-100 mb-2 text-center">
                    Upload Chat Export
                </h3>
                <p className="text-slate-400 text-center max-w-sm text-sm">
                    Drag & drop your <span className="text-slate-300 font-medium">ChatGPT</span> or <span className="text-slate-300 font-medium">Claude</span> JSON export here, or click to browse.
                </p>

                {error && (
                    <div className="mt-4 flex items-center text-red-400 bg-red-400/10 px-4 py-2 rounded-lg text-sm">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {error}
                    </div>
                )}

                <input
                    type="file"
                    accept=".json"
                    ref={fileInputRef}
                    onChange={handleInputChange}
                    className="hidden"
                />
            </div>
        </div>
    );
};
