import { create } from "zustand";
interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}
type UserState = Partial<User>;
const initialState = {
  id: 0,
  firstname: "",
  lastname: "",
  email: "",
  role: "",
};
const useUserStore = create<UserState>(() => initialState);
export const setUser = (user: Partial<User>) =>
  useUserStore.setState((state) => ({
    ...state,
    ...user,
  }));
export default useUserStore;
