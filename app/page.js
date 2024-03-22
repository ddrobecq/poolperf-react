import Link from 'next/link'
import { Divider, Stack } from "@mui/material";
import CommandButton from "./lib/button";

export default function Home() {
  return (
    <Stack direction={"column"} spacing={2} justifyContent={'space-around'}>
      <Link href="/games" legacyBehavior >
        <CommandButton >Jouer</CommandButton>
      </Link>
      <Divider />
      <Link href="/users" legacyBehavior >
        <CommandButton >Gérer les joueurs</CommandButton>
      </Link>
    </Stack>
  );
}
