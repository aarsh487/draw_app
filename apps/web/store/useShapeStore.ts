import { create } from 'zustand';
import { Shape } from '../hooks/useDraw';
import { axiosInstance } from '../config';
import { Tool } from '../components/Toolbar';

type Store = {
  allShapes: Shape[];
  history: Shape[][];
  currentIndex: number;
  selectedTool: Tool | null;
  isDrawing: boolean;
  getExistingShapes: (roomId: string) => void;
  setAllShapes: (shape: Shape) => void;
  undo: () => void;
  redo: () => void;
  setSelectedTool: (tool: Tool) => void;
}

export const useShapeStore = create<Store>((set) => ({
  allShapes: [],
  history: [[]], 
  currentIndex: 0,
  selectedTool: null,
  isDrawing: false,


  getExistingShapes: async (roomId: string) => {
    const res = await axiosInstance.get(`/chat/${roomId}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    const databaseShapes = res.data.messages;
    const newShapes = databaseShapes.map((x: { message: string }) => {
      const data = JSON.parse(x.message);
      return data.shape;
    });
    set(() => ({ allShapes: newShapes, history: [newShapes], currentIndex: 0 }));
  },

  setSelectedTool: ((tool: Tool) => {
    set(() => ({ selectedTool: tool }))
  }),


  setAllShapes: (shape) => {
    set((state) => {
      const newAllShapes = [...state.allShapes, shape];
      const newHistory = [...state.history.slice(0, state.currentIndex + 1), newAllShapes];
      return {
        allShapes: newAllShapes,
        history: newHistory,
        currentIndex: state.currentIndex + 1,
      };
    });
  },

 
  undo: () => {
    set((state) => {
      if (state.currentIndex > 0 && state.history.length > 0) {
        return {
          allShapes: state.history[state.currentIndex - 1],
          currentIndex: state.currentIndex - 1,
        };
      }
      return state; 
    });
  },


  redo: () => {
    set((state) => {
      if (state.currentIndex < state.history.length - 1 && state.history.length > 0) {
        return {
          allShapes: state.history[state.currentIndex + 1],
          currentIndex: state.currentIndex + 1,
        };
      }
      return state; 
    });
  },
}));