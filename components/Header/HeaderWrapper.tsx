import { isMobileDevice } from "@/actions/isMobileDevice";
import { Header } from "./Header";

export async function HeaderWrapper() {
  const isMobile = await isMobileDevice();

  return <Header isMobile={isMobile} />;
}
