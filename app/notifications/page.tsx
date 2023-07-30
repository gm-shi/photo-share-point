import { Header } from "@/components/Header";
import { NotificationsFeed } from "@/components/NotificationsFeed";

const Notifications = () => {
  return (
    <>
      <Header label={"Notifications"} showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export default Notifications;
