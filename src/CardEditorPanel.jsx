import React, { useState, useEffect } from 'react';
import { Pencil, X, Check } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

// Color palette matching the THEMES used by the canvas renderer
const THEME_COLORS = [
  { id: 'blue', name: 'Ocean Blue', swatch: 'bg-blue-500' },
  { id: 'green', name: 'Fresh Green', swatch: 'bg-emerald-500' },
  { id: 'pink', name: 'Soft Pink', swatch: 'bg-pink-500' },
  { id: 'yellow', name: 'Sunny Yellow', swatch: 'bg-yellow-500' },
  { id: 'purple', name: 'Royal Purple', swatch: 'bg-purple-500' },
  { id: 'orange', name: 'Warm Orange', swatch: 'bg-orange-500' },
  { id: 'teal', name: 'Cool Teal', swatch: 'bg-teal-500' },
  { id: 'rose', name: 'Rose Red', swatch: 'bg-rose-500' },
  { id: 'indigo', name: 'Deep Indigo', swatch: 'bg-indigo-500' },
  { id: 'slate', name: 'Neutral Slate', swatch: 'bg-slate-500' },
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

  const handleColorChange = (colorId) => {
    setTheme(colorId);
    onUpdateNode({ theme: colorId });
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

          {/* Color */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Color</label>
            <div className="flex flex-wrap gap-2">
              {THEME_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleColorChange(c.id)}
                  title={c.name}
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${c.swatch} ${
                    theme === c.id
                      ? 'ring-2 ring-offset-2 ring-cyan-500 scale-110 border-white'
                      : 'border-transparent hover:scale-110 hover:ring-1 hover:ring-offset-1 hover:ring-slate-300'
                  }`}
                >
                  {theme === c.id && <Check className="w-3 h-3 text-white" />}
                </button>
              ))}
            </div>
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
