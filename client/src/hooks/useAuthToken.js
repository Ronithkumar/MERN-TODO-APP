export default function useAuthToken() {
  return localStorage.getItem("authToken");
}
