const useAuth = () => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) return { user: true };
  return { user: false };
};

export default useAuth;
