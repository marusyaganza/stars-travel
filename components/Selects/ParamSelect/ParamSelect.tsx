"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler } from "react";
import styles from "./ParamSelect.module.css";
import { paramOptions } from "./paramOptions";

export default function ParamSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get("option") ?? "";

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("option", value);
    } else {
      params.delete("option");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <select value={selected} onChange={handleChange} className={styles.select}>
      <option value="">select your planet.</option>
      {paramOptions.map((opt) => (
        <option key={opt.text} value={opt.value}>
          {opt.text}
        </option>
      ))}
    </select>
  );
}
