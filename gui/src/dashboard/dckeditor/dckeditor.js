import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/ckeditor';
import './dckeditor.scss';

class DCKEditor extends React.Component{
  constructor(props){
    super(props);
    let editorConfig = {
      toolbar: ['fontfamily', 'fontsize', 'fontcolor', 'bold', 'italic', 'bulletedList', 'indent', 'outdent', 
      'numberedList', 'link', 'blockQuote', 'code', 'codeblock', 'imageinsert', 'mediaembed', 'undo', 'redo' ],
      language: 'en',
    };
    this.state = {
      config: editorConfig,
    }
  }

  render(){
    return(
      <div className="CKEditor">
        <CKEditor
          editor={ Editor }
          config={ this.state.config }
          data=""
          onReady={ editor => {
            this.props.getContent(editor);
          } }
          onChange={ ( event, editor ) => {
            //const data = editor.getData();
            //this.props.getContent(data);
          } }
          onBlur={ ( event, editor ) => {
            //console.log( 'Blur.', editor );
          } }
          onFocus={ ( event, editor ) => {
            //console.log( 'Focus.', editor );
          } }
        />
      </div>
      
    );
  }
}

export default DCKEditor;