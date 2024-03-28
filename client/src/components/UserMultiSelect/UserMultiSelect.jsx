import React from "react";
import Select, { NonceProvider } from "react-select";
import { useAllUsers } from "../../hooks";
import { capitalizeName } from "../../../../server/utils";
import { useAuth0 } from "@auth0/auth0-react";

const UserMultiSelect = ({ handleSelectUser, ...props }) => {
  const { user } = useAuth0();

  const users = useAllUsers();

  const userArray = React.useMemo(() => {
    return users
      ?.filter((i) => i.name !== user.username)
      .map((user) => {
        return { value: user.name, label: capitalizeName(user.name) };
      });
  }, [user, users]);

  return (
    <Select
      onChange={handleSelectUser}
      placeholder="Select users..."
      options={userArray}
      isMulti
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          boxShadow: "none",
          border: "none",
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused ? "#646cff" : null,
          color: state.isFocused ? "white" : "black",
        }),
      }}
      {...props}
    />
  );
};

export default UserMultiSelect;
