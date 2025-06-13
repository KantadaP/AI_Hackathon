import React from "react";
import Header from "../components/Header";

export default function UpgradePage() {
  return (
    <div className="h-full">
      <Header title="Upgrade" />
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold mb-4">Upgrade Account</h1>
        <p className="text-gray-600">
          This is where you can change your account subscription or upgrade your
          account to access more features. (Future Plans)
        </p>
      </div>
    </div>
  );
}
