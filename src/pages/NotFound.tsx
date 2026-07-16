import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24">
      <EmptyState
        icon="error"
        title="Page not found"
        message="The beat dropped, but this page didn't. Let's get you back on track."
        action={
          <Link to="/">
            <Button variant="secondary" icon="drum">
              Back home
            </Button>
          </Link>
        }
      />
    </div>
  );
}
