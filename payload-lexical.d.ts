declare module "@payloadcms/richtext-lexical/react" {
  import * as React from "react";

  export interface RichTextProps {
    className?: string;
    converters?: any;
    data: any;
  }

  export const RichText: React.FC<RichTextProps>;
  export const defaultJSXConverters: any;
  export type JSXConverters = any;
}
