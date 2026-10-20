/**
 * ============================================================================
 * RichTextEditor.tsx — the WYSIWYG editor used in the admin article studio.
 * ============================================================================
 *
 * WHAT IT DOES
 *   A contentEditable surface with a formatting toolbar: bold / italic /
 *   underline, Heading / Subheading, quote, bullet & numbered lists, link,
 *   text alignment, IMAGE BY URL, IMAGE UPLOAD (embedded as a data URI), and
 *   clear-formatting. It emits HTML via onChange, which is saved as the article
 *   body and later rendered on the public article page.
 *
 * HOW TO CHANGE IT
 *   • Add/remove a toolbar button → edit the toolbar below; each button calls
 *     exec(command) using the browser's rich-text editing.
 *   • Styling of the typed content → the `.rte` CSS block at the bottom.
 * ============================================================================
 */
import React, { useEffect, useRef } from 'react';
import { theme } from '../theme';
import { useI18n } from '../i18n';
import {
  IconBold, IconItalic, IconUnderline, IconH1, IconH2, IconQuote,
  IconList, IconListOrdered, IconLink, IconImage, IconUpload,
  IconAlignLeft, IconAlignCenter, IconAlignRight, IconEraser,
} from './editorIcons';

export const RichTextEditor: React.FC<{ value: string; onChange: (html: string) => void }> = ({ value, onChange }) => {
  const { t, dir } = useI18n();
  const ref = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // Load initial value once (and when switching to a different article).
  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const emit = () => onChange(ref.current?.innerHTML ?? '');

  // Run a rich-text command on the current selection, then emit the new HTML.
  const exec = (command: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    emit();
  };

  const addLink = () => {
    const url = window.prompt('Link URL (https://…)');
    if (url) exec('createLink', url);
  };
  const addImageUrl = () => {
    const url = window.prompt('Image URL (https://…)');
    if (url) exec('insertImage', url);
  };
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => exec('insertImage', String(reader.result)); // embed as data URI
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const Btn: React.FC<{ title: string; onClick: () => void; children: React.ReactNode }> = ({ title, onClick, children }) => (
    <button type="button" title={title} onMouseDown={(e) => e.preventDefault()} onClick={onClick}
      style={{ width: 38, height: 36, borderRadius: 7, border: `1px solid ${theme.stroke}`, background: '#fff', color: theme.text, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s ease' }}
      onMouseEnter={(ev) => { ev.currentTarget.style.background = 'rgba(1,184,244,0.1)'; ev.currentTarget.style.borderColor = theme.strokeHi; }}
      onMouseLeave={(ev) => { ev.currentTarget.style.background = '#fff'; ev.currentTarget.style.borderColor = theme.stroke; }}>
      {children}
    </button>
  );
  const Sep = () => <span style={{ width: 1, height: 24, background: theme.stroke, margin: '0 2px' }} />;

  return (
    <div style={{ border: `1px solid ${theme.stroke}`, borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
      {/* toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: 10, borderBottom: `1px solid ${theme.stroke}`, background: theme.bg2, position: 'sticky', top: 0, zIndex: 1 }}>
        <Btn title={t('admin.tb.bold')} onClick={() => exec('bold')}><IconBold /></Btn>
        <Btn title={t('admin.tb.italic')} onClick={() => exec('italic')}><IconItalic /></Btn>
        <Btn title={t('admin.tb.underline')} onClick={() => exec('underline')}><IconUnderline /></Btn>
        <Sep />
        <Btn title={t('admin.tb.h1')} onClick={() => exec('formatBlock', 'H2')}><IconH1 /></Btn>
        <Btn title={t('admin.tb.h2')} onClick={() => exec('formatBlock', 'H3')}><IconH2 /></Btn>
        <Btn title={t('admin.tb.quote')} onClick={() => exec('formatBlock', 'BLOCKQUOTE')}><IconQuote /></Btn>
        <Sep />
        <Btn title={t('admin.tb.ul')} onClick={() => exec('insertUnorderedList')}><IconList /></Btn>
        <Btn title={t('admin.tb.ol')} onClick={() => exec('insertOrderedList')}><IconListOrdered /></Btn>
        <Sep />
        <Btn title={t('admin.tb.link')} onClick={addLink}><IconLink /></Btn>
        <Btn title={t('admin.tb.imgUrl')} onClick={addImageUrl}><IconImage /></Btn>
        <Btn title={t('admin.tb.imgUpload')} onClick={() => fileRef.current?.click()}><IconUpload /></Btn>
        <Sep />
        <Btn title={t('admin.tb.align')} onClick={() => exec('justifyLeft')}><IconAlignLeft /></Btn>
        <Btn title={t('admin.tb.align')} onClick={() => exec('justifyCenter')}><IconAlignCenter /></Btn>
        <Btn title={t('admin.tb.align')} onClick={() => exec('justifyRight')}><IconAlignRight /></Btn>
        <Sep />
        <Btn title={t('admin.tb.clear')} onClick={() => exec('removeFormat')}><IconEraser /></Btn>
        <input ref={fileRef} type="file" accept="image/*" onChange={onUpload} style={{ display: 'none' }} />
      </div>

      {/* editable surface */}
      <div
        ref={ref}
        className="rte"
        contentEditable
        suppressContentEditableWarning
        dir={dir}
        onInput={emit}
        onBlur={emit}
        style={{ minHeight: 320, padding: '1.2rem 1.4rem', outline: 'none', color: theme.text, lineHeight: 1.8, fontSize: '1.02rem', textAlign: dir === 'rtl' ? 'right' : 'left' }}
      />

      <style>{`
        .rte:empty:before { content: attr(data-ph); color: ${theme.textFaint}; }
        .rte h2 { font-size: 1.7rem; margin: 1.2rem 0 0.6rem; font-family: 'Playfair Display','Changa',serif; }
        .rte h3 { font-size: 1.3rem; margin: 1rem 0 0.5rem; font-family: 'Playfair Display','Changa',serif; }
        .rte p { margin: 0 0 0.9rem; }
        .rte blockquote { margin: 1rem 0; padding: 0.6rem 1.1rem; border-inline-start: 3px solid ${theme.cyan}; background: rgba(1,184,244,0.06); color: ${theme.textDim}; font-style: italic; }
        .rte img { max-width: 100%; height: auto; border-radius: 8px; margin: 0.8rem 0; }
        .rte a { color: #0A9BE0; text-decoration: underline; }
        .rte ul, .rte ol { padding-inline-start: 1.5rem; margin: 0 0 0.9rem; }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
