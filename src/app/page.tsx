
import dynamic from 'next/dynamic';
import React from 'react'
import MainComponent from "../components/MainComponent"

const DynamicMapComponent = dynamic(
  () => import("../components/MainComponent"),
  {
    ssr: false,
  }
);


function Page() {
  return (
    <>
      <DynamicMapComponent />
    </>
  );
}

export default Page