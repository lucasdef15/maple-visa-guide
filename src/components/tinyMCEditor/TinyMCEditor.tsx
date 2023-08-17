import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface EditorRefType {
  getContent: () => string;
}

export default function TinyMCEditor({ setValue, value }: any) {
  const editorRef = useRef<EditorRefType | null>(null);

  const handleEditorChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setValue(content);
    }
  };

  return (
    <>
      <Editor
        apiKey='jq6nhlye7vuu5gyay9xzxyx86nl3nswfxaet7cu6w5yyide1'
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        value={value}
        init={{
          height: 750,
          plugins:
            'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',

          menubar: 'file edit view insert format tools table help',
          toolbar:
            'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
          image_advtab: true,
          image_caption: true,
          toolbar_sticky: true,
          quickbars_selection_toolbar:
            'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
          noneditable_class: 'mceNonEditable',
          toolbar_mode: 'sliding',
          contextmenu: 'link image table',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
        onEditorChange={handleEditorChange}
      />
    </>
  );
}
