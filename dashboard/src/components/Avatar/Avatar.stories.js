import { Avatar } from ".";

export default {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {
    variant: {
      options: ["circle", "rounded", "square"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    variant: "circle",
    badge: true,
    icon: true,
    image: true,
    className: {},
  },
};
