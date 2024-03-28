"use client";
import NewTopicInput from "./NewTopicInput";

export default function Welcome() {
  return (
    <section>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {" "}
          Welcome to your PLUMS app{" "}
        </h5>
        <p className="mb-3 font-normal text-gray-700">
          {" "}
          Take a moment to organize your information.{" "}
        </p>
        <p className="mb-3 font-normal text-gray-700">
          {" "}
          Try adding a new topic ...{" "}
        </p>
        <NewTopicInput newInput={true} />
      </div>
    </section>
  );
}
