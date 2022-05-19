import { MyEventsPanel } from "src/component/MyEventsPanel";
import { NextPage } from "next";

const MyEvents: NextPage = () => {
  return (
    <div className="flex w-full flex-auto flex-row justify-center">
      <div className="w-full p-4 md:w-2/3">
        <MyEventsPanel />
      </div>
    </div>
  );
};

export default MyEvents;
