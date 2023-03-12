import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  // state
  state: () => {
    try {
      const data = JSON.parse(atob(sessionStorage.getItem("piniaState")));
      return {
        user_id: data.user_id,
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        level: data.level,
      };
    } catch (Exception) {
      return {
        user_id: null,
        name: null,
        email: null,
        avatar: null,
        level: null,
      };
    }
  },
});
