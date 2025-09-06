import { HeaderWrapper } from "@/components/Header/HeaderWrapper";
import { Footer } from "@/components/Footer/Footer";
import { MainHeader } from "@/components/MainHeader/MainHeader";
import dynamic from "next/dynamic";
import styles from "./layout.module.css";

// Dynamically import the chatbot component only when needed
const StarWarsChatbot = dynamic(() =>
  import("@/components/StarWarsChatbot/StarWarsChatbot").then((mod) => ({
    default: mod.StarWarsChatbot,
  }))
);

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if chatbot feature is enabled
  const isChatbotEnabled = process.env.NEXT_PUBLIC_ENABLE_CHATBOT === "true";

  return (
    <>
      <MainHeader />
      <HeaderWrapper />
      <main className={styles.page}>{children}</main>
      <Footer />
      {isChatbotEnabled && <StarWarsChatbot />}
    </>
  );
}
