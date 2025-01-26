import { HomeOutlined, List } from "@mui/icons-material";
import userManagement from "@/icons/userManagement.png";
import road from "@/icons/road.png";
import home from "@/icons/home.png";
import Image from "next/image";
import notification from "@/icons/notification.png";
import coach from "@/icons/coach.png";
import curriculum from "@/icons/curriculum.png";
import subscription from "@/icons/subscription.png";
import coupon from "@/icons/coupon.png";
import internship from "@/icons/internship.png";
import waitlist from "@/icons/waitlist.png";
export const SIDEBARADATA = [
  {
    avatar: <Image src={home} />,
    label: "Dashboard",
    url: "/dashboard",
  },
  {
    avatar: <Image src={userManagement} />,
    label: "User Management",
    modules: true,
    subModules: [
      {
        label: "Students",
        url: "/user-management/students",
      },
      {
        label: "Parents",
        url: "/user-management/parents",
      },
      {
        label: "Mentors",
        url: "/user-management/mentors",
      },
    ],
  },
  {
    avatar: <Image src={road} />,
    label: "Roadmap Management",
    modules: true,
    subModules: [
      {
        label: "Metadata",
        url: "/roadmap-management/metadata",
      },
      {
        label: "Content Library",
        url: "/roadmap-management/content-library",
      },
      {
        label: "Create/View Roadmaps",
        url: "/roadmap-management",
      },
    ],
  },
  {
    avatar: <Image src={notification} />,
    label: "Notification Management",
    modules: true,
    subModules: [
      {
        label: "Ad List",
        url: "/notification-management/ad-list",
      },
      {
        label: "View Notifications",
      },
    ],
  },
  {
    avatar: <Image src={coach} />,
    label: "Coach",
    url: "/coach",
  },
  {
    avatar: <Image src={curriculum} />,
    label: "Curriculum Management",
    // url: "/curriculum-management",
    modules: true,
    subModules: [
      {
        label: "View Curriculum",
        url: "/curriculum-management",
      },
      {
        label: "Add Curriculum",
        url: "/curriculum-management/add-curriculum",
      },
      {
        label: "Edit Curriculum",
        url: "/curriculum-management/edit-curriculum",
      },
    ],
  },
  {
    avatar: <Image src={subscription} />,
    label: "Subscription Management",
    url: "/subscription-management",
  },
  {
    avatar: <Image src={coupon} />,
    label: "Coupon Management",
    url: "/coupon-management",
  },
  {
    avatar: <Image src={internship} />,
    label: "Internship Management",
    url: "/internship-management",
  },
  {
    avatar: <Image src={waitlist} />,
    label: "Waitlist",
    url: "/waitlist",
  },
];
