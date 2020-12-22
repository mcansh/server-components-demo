/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import TextWithMarkdown from './text-with-markdown';

interface Props {
  body: string;
}

export default function NotePreview({body}: Props) {
  return (
    <div className="note-preview">
      <TextWithMarkdown text={body} />
    </div>
  );
}
