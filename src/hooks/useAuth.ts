const useAuth = () => {
  const token = localStorage.getItem("token");
  if (token) return { user: true };
  return { user: false };
};

export default useAuth;
