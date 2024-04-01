'use client';

import { Skeleton, Stack } from "@mui/material";
import useFetch from "../lib/fetchAPI";
import UserCard from "./user-card";

export default function Users(props) {
    const [data, isLoading] = useFetch ("/users", "GET", null);
    const actions = (props.actions === undefined) ? true : props.actions;
    const direction = (props.direction === undefined) ? "row" : props.direction;

    return (
      <Stack direction={"column"} spacing={2} >
        {isLoading && 
          <>
          <Skeleton variant={'rounded'} height={120} />
          <Skeleton variant={'rounded'} height={120}/>
          <Skeleton variant={'rounded'} height={120}/>
          <Skeleton variant={'rounded'} height={120}/>          
          </>
          }
        {data && data.map((user, index) => (
            <UserCard key={index} id={user.usr_id} name={user.usr_name} direction={direction} actions={actions} {...props} />
        ))}
      </Stack>
    )
  }