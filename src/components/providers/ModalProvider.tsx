"use client";

import { useEffect, useState } from "react";
import SettingsModal from "../modal/SettingsModal";
import CoverImageModal from "../modal/CoverImageModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
};

export default ModalProvider;
