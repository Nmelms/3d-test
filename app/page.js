"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";

import Model from "./model/Model";

export default function Home() {
  return (
    <>
      <Model />
    </>
  );
}
