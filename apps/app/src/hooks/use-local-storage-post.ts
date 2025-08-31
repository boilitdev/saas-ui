'use client'

import { useDraftPostStore } from '@/stores/draft-post-store'

export default function useLocalStoragePost() {
  const {
    hasContent,
    saveDraft,
    loadDraft,
    clearDraft,
    checkHasContent,
    draftPost,
  } = useDraftPostStore()

  return {
    hasStoredPost: hasContent,
    saveToLocalStorage: saveDraft,
    loadFromLocalStorage: loadDraft,
    clearLocalStorage: clearDraft,
    getStoredPostInfo: () => ({ hasContent: checkHasContent() }),
    draftPost,
  }
}
