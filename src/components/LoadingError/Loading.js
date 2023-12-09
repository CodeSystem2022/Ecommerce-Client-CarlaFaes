import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";

const Loading = () => {
  return (
      <Container fixed>
        <Box sx={{ bgcolor: "#b3c5cd", height: "100vh", minWidth:"100vh" }}>
          <div className="flex flex-col justify-center items-center" >
          <Stack spacing={2}>
              <Skeleton
                sx={{ bgcolor: "[#587382]" }}
                variant="text"
                width={"100vh"}
                height={100}
              />
              <Skeleton
                sx={{ bgcolor: "[#587382]" }}
                variant="rounded"
                width={"100vh"}
                height={100}
              />
            <Skeleton
              sx={{ bgcolor: "[#587382]" }}
              variant="rounded"
              width={"100vh"}
              height={100}
            />
            <Skeleton
              sx={{ bgcolor: "[#587382]" }}
              variant="rounded"
              width={"100vh"}
              height={100}
            />
            <Skeleton
              sx={{ bgcolor: "[#587382]" }}
              variant="rounded"
              width={"100vh"}
              height={100}
            />
          </Stack>
          </div>
        </Box>
      </Container>
  );
};

export default Loading;
