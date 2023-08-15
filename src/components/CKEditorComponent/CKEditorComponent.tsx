import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';

const editorConfiguration = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'link',
      'horizontalLine',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'alignment',
      'indent',
      'insertTable',
      'imageInsert',
      '|',
      'fontColor',
      'fontFamily',
      'fontBackgroundColor',
      'fontSize',
      'specialCharacters',
      'highlight',
      'imageUpload',
      'mediaEmbed',
      'selectAll',
      'blockQuote',
      'undo',
      'redo',
    ],
  },
  language: 'pt-br',
  fontSize: {
    options: [9, 11, 13, 'default', 17, 19, 21],
  },
  fontFamily: {
    options: [
      'default',
      'Calibri, Gill Sans MT, Trebuchet MS',
      'Cambria, Cochin, Georgia',
      'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
      'Times New Roman, Times, serif',
      'Helvetica, sans-serif',
      'Economica, sans-serif',
      'Montserrat, sans-serif',
      'Open Sans, sans-serif',
      'Roboto, sans-serif',
      'Nexa, sans-serif',
    ],
    supportAllValues: true,
  },
  image: {
    toolbar: [
      'imageTextAlternative',
      'toggleImageCaption',
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
      'linkImage',
    ],
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
};

const CKEditorComponent = ({ setValue }: any) => {
  return (
    <>
      <CKEditor
        editor={Editor}
        config={editorConfiguration}
        data='<p>Write Anything here!</p>'
        onChange={(event, editor) => {
          const data = editor.getData();
          setValue(data);
        }}
      />
    </>
  );
};

export default CKEditorComponent;
