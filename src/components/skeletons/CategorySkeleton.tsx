const CategorySkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl overflow-hidden border">
      <div className="h-40 bg-muted" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-3 bg-muted rounded w-full" />
      </div>
    </div>
  );
};

export default CategorySkeleton;
