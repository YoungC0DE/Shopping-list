import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  // state
  state: () => {
    let encriptedData = sessionStorage.getItem("piniaState");
    var data = '';
    if (encriptedData) {
      data = JSON.parse(atob(encriptedData, "base64"));
    }
    return {
      user_id: data.user_id || '',
      name: data.name || '',
      email: data.email || '',
      avatar: data.avatar || '',
      level: data.level || '',
    };
  },
});
