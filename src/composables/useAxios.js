// src/composables/useAxios.js
import { ref, onMounted } from 'vue';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //"https://e2.ctpse.info", //"http://localhost:8000",
  withCredentials: true,
  xsrfHeaderName: "X-XSRF-TOKEN", 
});

export default function useAxios() {
  const loading = ref(false);
  const error = ref(null);

  const sendRequest = async (config) => {
    loading.value = true;

    try {
      const response = await axiosInstance(config);
      return response;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  // Example of using onMounted to perform an action when the component is mounted
  // onMounted(() => {
  //   console.log('Component is mounted');
  // });

  return {
    loading,
    error,
    sendRequest,
  };
}
