import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  // state
  state: () => {
    let encriptedData = sessionStorage.getItem("piniaState");
    var data = '';
    if (encriptedData) {
      data = JSON.parse(atob(encriptedData, 'base64'));
    }
    return {
      user_id: data.user_id || null,
      name: data.name || null,
      email: data.email || null,
      avatar: data.avatar || null,
      level: data.level || null,
    };
  },
});
