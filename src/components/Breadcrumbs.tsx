import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  path?: string;
}

const Breadcrumbs = ({ items }: { items: Crumb[] }) => {
  return (
    <div className="flex items-center text-sm text-muted-foreground mb-6">
      {items.map((item, i) => (
        <div key={i} className="flex items-center">
          {item.path ? (
            <Link to={item.path} className="hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{item.label}</span>
          )}
          {i < items.length - 1 && (
            <ChevronRight className="h-4 w-4 mx-2" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
