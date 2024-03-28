import React from "react";

export default function useGetSelectedUser() {
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    const localStorageData = JSON.parse(
      window.localStorage.getItem("selected-user")
    );
    setUser(localStorageData);
  }, []);
  return user;
}
