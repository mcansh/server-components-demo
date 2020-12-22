/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {fetch} from 'react-fetch';
// import {readFile} from 'react-fs';
import {format} from 'date-fns';
// import path from 'path';

// import {db} from './db.server';
import NotePreview from './note-preview';
import EditButton from './edit-button.client';
import NoteEditor from './note-editor.client';

interface Props {
  selectedId: number | null;
  isEditing: boolean;
}

export default function Note({selectedId, isEditing}: Props) {
  const note =
    selectedId != null
      ? fetch(`http://localhost:4000/notes/${selectedId}`).json()
      : null;

  if (note === null) {
    if (isEditing) {
      return (
        <NoteEditor noteId={null} initialTitle="Untitled" initialBody="" />
      );
    } else {
      return (
        <div className="note--empty-state">
          <span className="note-text--empty-state">
            Click a note on the left to view something! 🥺
          </span>
        </div>
      );
    }
  }

  let {id, title, body, updated_at} = note;
  const updatedAt = new Date(updated_at);

  // We could also read from a file instead.
  // body = readFile(path.resolve(`./notes/${note.id}.md`), 'utf8');

  // Now let's see how the Suspense boundary above lets us not block on this.
  // fetch('http://localhost:4000/sleep/3000');

  if (isEditing) {
    return <NoteEditor noteId={id} initialTitle={title} initialBody={body} />;
  } else {
    return (
      <div className="note">
        <div className="note-header">
          <h1 className="note-title">{title}</h1>
          <div className="note-menu" role="menubar">
            <small className="note-updated-at" role="status">
              Last updated on {format(updatedAt, "d MMM yyyy 'at' h:mm bb")}
            </small>
            <EditButton noteId={id}>Edit</EditButton>
          </div>
        </div>
        <NotePreview body={body} />
      </div>
    );
  }
}
