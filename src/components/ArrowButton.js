"use client"
import React from 'react'
import Image from "next/image";

function ArrowButton({x, getLocation }) {
  return (
    <button type="submit" className="bg-black px-5 rounded-r-xl"  >
      <Image
        alt="arrow"
        height={50}
        width={50}
        src="/icon-arrow.svg"
        className="w-4 h-4  "
      />
    </button>
  );
}

export default ArrowButton