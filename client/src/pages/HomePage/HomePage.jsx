import UserList from "../../components/UserList";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function HomePage() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading || !isAuthenticated) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <UserList />
    </div>
  );
}
