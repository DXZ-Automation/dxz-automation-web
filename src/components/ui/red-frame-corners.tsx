export function RedFrameCorners() {
  return (
    <>
      <span className="absolute -left-1 -top-1 h-2 w-2 bg-red-500 transition-transform duration-300 group-hover:scale-150" />
      <span className="absolute -bottom-1 -left-1 h-2 w-2 bg-red-500 transition-transform duration-300 group-hover:scale-150" />
      <span className="absolute -right-1 -top-1 h-2 w-2 bg-red-500 transition-transform duration-300 group-hover:scale-150" />
      <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-red-500 transition-transform duration-300 group-hover:scale-150" />
    </>
  );
}
