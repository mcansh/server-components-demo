/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {createContext, useContext} from 'react';

export interface Location {
  selectedId: number | null;
  isEditing: boolean;
  searchText: string;
}

type LocationContext = [
  Location,
  React.Dispatch<React.SetStateAction<Location>>
];

const LocationContext = createContext<LocationContext | undefined>(undefined);

function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      `useLocation must be wrapped in a LocationContext.Provider`
    );
  }
  return context;
}

export {LocationContext, useLocation};
