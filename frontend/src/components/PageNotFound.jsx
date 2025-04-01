import React from "react";

function PageNotFound() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center space-y-1">
        <span className="text-2xl font-bold">404</span>
        <div className="text-xl font-semibold text-green-900">
          Page Not Found
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
