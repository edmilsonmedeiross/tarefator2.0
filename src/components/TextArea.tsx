import React, { HTMLProps } from 'react';

function TextArea({ ...rest }: HTMLProps<HTMLTextAreaElement>) {
  return (
    <textarea
      className="w-full resize-none h-24 rounded-md outline-none p-2"
      {...rest}
    ></textarea>
  );
}

export default TextArea;
