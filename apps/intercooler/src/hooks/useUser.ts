import { useContext } from "react";
import { UserContext } from "src/context/userContext";

export const useUser = () => useContext(UserContext);
