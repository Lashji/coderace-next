import React from "react";

export function TermsFooter() {
  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-gray-600">
        By continuing, you agree to our{" "}
        <a href="#" className="font-medium text-blue-500 hover:text-blue-600">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="font-medium text-blue-500 hover:text-blue-600">
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
