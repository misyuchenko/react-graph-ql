import { Avatar as RadixAvatar } from "radix-ui";
import { image as FallBackAvatar } from "@/shared/assets/images";
import style from "./Avatar.module.css";

const Avatar: React.FC = () => (
  <div style={{ display: "flex", gap: 20 }}>
    <RadixAvatar.Root className={style.AvatarRoot}>
      <RadixAvatar.Image
        className={style.AvatarImage}
        src={FallBackAvatar}
        alt="avatar"
      />
      <RadixAvatar.Fallback className={style.AvatarFallback} delayMs={600}>
        CT
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  </div>
);

export default Avatar;
