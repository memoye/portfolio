import CustomLogo from "../CustomLogo";

function LoadingComp() {
  return (
    <span className="absolute inset-0 z-[100] flex items-center justify-center bg-background/70 backdrop-blur-sm">
      <span>
        <CustomLogo size="lg" className="animate-pulse" />
      </span>
    </span>
  );
}
export default LoadingComp;
