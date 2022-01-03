import { Box, Flex, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useRef, useState } from "react";

interface EditorProps {
  callbackEditor: React.MutableRefObject<any>;
  data: string;
  id: number;
  setSavedHandle: (isSaved: boolean) => void;
  isFromHistory?: boolean;
}

const Editor: FC<EditorProps> = ({
  data,
  callbackEditor,
  id,
  setSavedHandle,
  isFromHistory = false,
}) => {
  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, MyEditor }: any = editorRef.current || {};
  // const [content, setContent] = useState("");

  useEffect(() => {
    editorRef.current = {
      // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      //ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
      MyEditor: require("ckeditor5-custom/build/ckeditor"),
      //language: require("@ckeditor/ckeditor5-build-classic/build/translations/lt"),
      //SimpleUploadAdapter: require("@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter"),
    };
    setEditorLoaded(true);
  }, []);

  if (!editorLoaded) {
    return (
      <Flex justifyContent="center" h="100%" align="center">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  //console.log("url:", process.env.NEXT_PUBLIC_BE_URL_BASE);
  console.log(MyEditor.builtinPlugins.map((plugin) => plugin.pluginName));
  return (
    <CKEditor
      editor={MyEditor}
      onReady={(editor) => {
        //console.log("Init: ", editor);
        callbackEditor.current = editor;
      }}
      onChange={(event, editor) => {
        if (event.name === "change:data") {
          setSavedHandle(false);
        }
      }}
      data={data}
      config={{
        mediaEmbed: {
          previewsInData: true,
        },
        simpleUpload: {
          uploadUrl: `${
            process.env.NEXT_PUBLIC_BE_URL_BASE
          }/api/article/upload?id=${id}${
            isFromHistory ? "&fromHistory=true" : ""
          }`,
          withCredentials: true,
        },
        toolbar: {
          items: [
            "heading",
            "alignment",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "outdent",
            "indent",
            "|",
            "imageUpload",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "undo",
            "redo",
          ],
        },
        image: {
          resizeOptions: [
            {
              name: "resizeImage:original",
              value: null,
              icon: "original",
            },
            {
              name: "resizeImage:50",
              value: "50",
              icon: "medium",
            },
            {
              name: "resizeImage:70",
              value: "70",
              icon: "medium",
            },
            {
              name: "resizeImage:30",
              value: "30",
              icon: "medium",
            },
          ],
          toolbar: [
            "resizeImage",
            "toggleImageCaption",
            "imageTextAlternative",
          ],
        },
        indentBlock: {
          offset: 1,
          unit: "em",
        },
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],

          // Configuration of the TableProperties plugin.

          // The default styles for tables in the editor.
          // They should be synchronized with the content styles.
          defaultProperties: {
            borderStyle: "dashed",
            borderColor: "hsl(90, 75%, 60%)",
            borderWidth: "3px",
            alignment: "left",
            width: "550px",
            height: "450px",
          },
          // The default styles for table cells in the editor.
          // They should be synchronized with the content styles.
          tableCellProperties: {
            defaultProperties: {
              horizontalAlignment: "center",
              verticalAlignment: "bottom",
              padding: "10px",
            },
          },
        },
      }}
    />
  );
};

/* 
Needed Plugins:
IndentBlock
listStyle
imageStyles
imageResize
TableProperties
TableCellProperties
*/

export default Editor;
