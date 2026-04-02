function BookCardSkeleton() {
  return (
    <div className="relative flex flex-col justify-between w-42 h-88 md:w-52 md:h-104 rounded-2xl min-h-40 bg-white">
      {/* Image skeleton */}
      <div className="w-full h-60 md:h-72 overflow-hidden items-center rounded-t-2xl bg-gray-300 animate-pulse"></div>
      
      {/* Title skeleton */}
      <div className="px-4 py-2">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
      </div>
      
      {/* Author skeleton */}
      <div className="px-4 py-1">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
      </div>
      
      {/* Year skeleton */}
      <div className="px-4 pb-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
      </div>
      
      {/* Heart button skeleton */}
      <div className="absolute top-3 right-3 flex justify-center items-center bg-gray-200 w-10 h-10 rounded-full animate-pulse"></div>
    </div>
  );
}

export default BookCardSkeleton;
