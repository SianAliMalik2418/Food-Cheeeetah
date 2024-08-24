import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

export default Loader;
