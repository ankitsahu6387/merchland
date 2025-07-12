import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui/button";

export function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
        <p className="text-xl text-gray-400 mb-8">Oops! Page not found</p>
        <p className="text-gray-500 mb-8">
          The merch you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button className="bg-red-600 hover:bg-red-700">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
