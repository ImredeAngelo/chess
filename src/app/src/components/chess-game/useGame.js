import { useContext } from "react";
import context from "./context";

// Hook
export default function useGame() {
    return useContext(context);
}