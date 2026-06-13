import React, { useState, useEffect } from 'react';
import { Pencil, X, Palette, Check } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

// Theme options matching the THEMES constant in App.jsx
const THEME_OPTIONS = [
  { key: 'blue', name: 'Ocean Blue', color: '#bfdbfe' },
  { key: 'green', name: 'Fresh Green', color: '#bbf7d0' },
  { key: 'pink', name: 'Soft Pink', color: '#fbcfe8' },
  { key: 'yellow', name: 'Sunny Yellow', color: '#fef08a' },
  { key: 'purple', name: 'Royal Purple', color: '#e9d5ff' },
  { key: 'orange', name: 'Warm Orange', color: '#fed7aa' },
  { key: 'teal', name: 'Cool Teal', color: '#99f6e4' },
  { key: 'rose', name: 'Rose Red', color: '#fecdd3' },
  { key: 'indigo', name: 'Deep Indigo', color: '#c7d2fe' },
  { key: 'slate', name: 'Neutral Slate', color: '#e2e8f0' },
];

export default function CardEditorPanel({ selectedNode, onUpdateNode, onSnapshot, onClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [theme, setTheme] = useState('blue');

  useEffect(() => {
    if (selectedNode) {
      setTitle(selectedNode.title || '');
      setContent(selectedNode.content || '');
      setTheme(selectedNode.theme || 'blue');
    } else {
      setTitle('');
      setContent('');
      setTheme('blue');
    }
  }, [selectedNode?.id]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onUpdateNode({ title: newTitle });
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    onUpdateNode({ content: newContent });
  };

  const handleThemeChange = (newTheme) => {
    if (newTheme === theme) return;
    onSnapshot();
    setTheme(newTheme);
    onUpdateNode({ theme: newTheme });
  };

  return (
    <div className="w-[40vw] bg-white border-l border-slate-200 flex flex-col overflow-hidden shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-slate-50 shrink-0">
        <div className="flex items-center gap-2">
          <Pencil className="w-4 h-4 text-cyan-600" />
          <h3 className="text-sm font-bold text-slate-800">Card Editor</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      {!selectedNode ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-xs text-slate-400 italic text-center">
            Select a single card to edit
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 flex flex-col gap-3">
          {/* Title */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onFocus={() => onSnapshot()}
              className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-300 focus:border-cyan-300"
              placeholder="Card title..."
            />
          </div>

          {/* Content */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Content</label>
            <textarea
              value={content}
              onChange={handleContentChange}
              onFocus={() => onSnapshot()}
              className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 placeholder-slate-400 resize-y focus:outline-none focus:ring-1 focus:ring-cyan-300 focus:border-cyan-300 min-h-[200px]"
              placeholder="Write content here... (supports markdown)"
              rows={10}
            />
          </div>

          {/* Theme Color Picker */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1 mb-1.5">
              <Palette className="w-3 h-3" />
              Theme Color
            </label>
            <div className="grid grid-cols-5 gap-2">
              {THEME_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => handleThemeChange(opt.key)}
                  className={`group relative flex flex-col items-center gap-1 p-1.5 rounded-lg border transition-all ${
                    theme === opt.key
                      ? 'border-cyan-400 bg-cyan-50/50 ring-1 ring-cyan-300'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                  title={opt.name}
                >
                  <div
                    className="w-7 h-7 rounded-full border border-slate-300/60 flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: opt.color }}
                  >
                    {theme === opt.key && (
                      <Check className="w-3.5 h-3.5 text-slate-700" />
                    )}
                  </div>
                  <span className="text-[9px] text-slate-500 truncate w-full text-center leading-tight">
                    {opt.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Markdown Preview */}
          {content && (
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Preview</label>
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 text-xs text-slate-700 overflow-auto max-h-[300px]">
                <MarkdownRenderer content={content} isZoomedIn={true} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
