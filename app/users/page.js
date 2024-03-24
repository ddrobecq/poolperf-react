'use client';

import { Stack } from "@mui/material";
import useFetch from "../lib/fetchAPI";
import Loader from "../lib/loader";
import UserCard from "./user-card";

export default function Users(props) {
    const [data, isLoading] = useFetch ("/users", "GET", null);

    return (
      <Stack direction={"column"} spacing={2} >
        {isLoading && <Loader />}
        {data && data.map((user, index) => (
            <UserCard key={index} id={user.usr_id} {...props} />
        ))}
      </Stack>
    )
  }