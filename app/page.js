import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link'
import { Stack } from "@mui/material";

export default function Page() {
  return (
    <Stack direction={"column"}>
      <Link href="/game">Game</Link>
      <Link href="/user">User</Link>
    </Stack>
  );
}
