import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

import './dckeditor.scss';

class DCKEditor extends React.Component{
  constructor(props){
    super(props);
    let editorConfig = {
      toolbar: ['fontfamily', 'fontsize', 'fontcolor', 'bold', 'italic', 'alignment', 'bulletedList', 'indent', 'outdent', 
      'numberedList', 'link', 'blockQuote', 'code', 'codeblock', 'imageinsert', 'mediaembed', 'undo', 'redo' ],
    };
    this.state = {
      config: editorConfig,
      data: '',
    }
  }

  render(){
    return(
      <div className="CKEditor">
        <CKEditor
          editor={ Editor }
          config={ this.state.config }
          
          onReady={ editor => {
            this.props.getContent(editor);
          } }
          onChange={ ( event, editor ) => {
            editor.change = true
          } }
          onBlur={ ( event, editor ) => {
            const promise = new Promise((resolve) => {resolve(editor.submit)});

            promise.then((submit) => {
              if(!submit && editor.change){
                window.confirm('Are you sure you want to leave?');
                editor.change = false;
              }
            });
            
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