import { useContext } from "react";
import context from "./stateContext";

// Hook
export default function useGame() {
    return useContext(context);
}