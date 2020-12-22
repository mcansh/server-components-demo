/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// @ts-expect-error
import {unstable_getCacheForType, unstable_useCacheRefresh} from 'react';
import {createFromFetch} from 'react-server-dom-webpack';
import type {Location} from './location-context.client';

function createResponseCache() {
  return new Map();
}

function useRefresh() {
  const refreshCache = unstable_useCacheRefresh();
  return function refresh(key: string, seededResponse: any) {
    refreshCache(createResponseCache, new Map([[key, seededResponse]]));
  };
}

function useServerResponse(location: Location) {
  const key = JSON.stringify(location);
  const cache = unstable_getCacheForType(createResponseCache);
  let response = cache.get(key);
  if (response) {
    return response;
  }
  response = createFromFetch(
    fetch('/react?location=' + encodeURIComponent(key))
  );
  cache.set(key, response);
  return response;
}

export {useRefresh, useServerResponse}
