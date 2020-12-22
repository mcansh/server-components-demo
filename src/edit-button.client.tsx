/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// @ts-expect-error
import {unstable_useTransition} from 'react';

import {useLocation} from './location-context.client';

interface Props {
  noteId: number | null;
}

const EditButton: React.FC<Props> = ({noteId, children}) => {
  const [, setLocation] = useLocation();
  const [startTransition, isPending] = unstable_useTransition();
  const isDraft = noteId == null;
  return (
    <button
      className={[
        'edit-button',
        isDraft ? 'edit-button--solid' : 'edit-button--outline',
      ].join(' ')}
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          setLocation((loc) => ({
            selectedId: noteId,
            isEditing: true,
            searchText: loc.searchText,
          }));
        });
      }}
      role="menuitem">
      {children}
    </button>
  );
};

export default EditButton;
