import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const PageBreadCrumbs = ({ data }) => {
  return (
    <div>
      <Breadcrumbs separator={<NavigateNext />}>
        {data.map((val, i) => (
          <Link href={val.url} key={i} style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                fontSize: 15,
                fontFamily: roboto.style,
                color: COLORS.BLACK,
              }}
            >
              {val.label}
            </Typography>
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default PageBreadCrumbs;
