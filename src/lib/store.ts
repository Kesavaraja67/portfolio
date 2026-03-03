import { create } from 'zustand';

interface CursorState {
  isHovering: boolean;
  hoverType: 'default' | 'link' | 'image' | 'text';
  setHoverState: (isHovering: boolean, type?: 'default' | 'link' | 'image' | 'text') => void;
}

export const useCursorStore = create<CursorState>((set) => ({
  isHovering: false,
  hoverType: 'default',
  setHoverState: (isHovering, type = 'default') => set({ isHovering, hoverType: type }),
}));

interface PreloaderState {
  isPreloading: boolean;
  setPreloading: (val: boolean) => void;
}

export const usePreloaderStore = create<PreloaderState>((set) => ({
  isPreloading: true,
  setPreloading: (val) => set({ isPreloading: val }),
}));
