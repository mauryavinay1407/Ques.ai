import React from "react";

const Subscription = () => {
  return (
    <div className="my-2 w-11/12">
      <h1 className="text-black text-2xl font-semibold font-roboto font-bol d">
        Subscriptions
      </h1>
      <div className="w-full bg-gradient-to-r from-slate-50 to-[#d8c5eb] py-3 rounded-md mt-3 flex justify-between items-center px-10 border-2 border-purple-400">
        <p className="text-primary font-roboto">
          Oops! You don't have any active plans.{" "}
          <span className="font-semibold">Upgrade Now!</span>
        </p>
        <button className="bg-primary rounded-md px-3 py-[5px] text-white font-roboto">
          Upgrade
        </button>
      </div>
    </div>
  );
};

export default Subscription;