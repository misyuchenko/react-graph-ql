import { Avatar as RadixAvatar } from "radix-ui";
import { image as FallBackAvatar } from "@/shared/assets/images";
import styles from "./Avatar.module.css";

const Avatar: React.FC = () => (
  <div style={{ display: "flex", gap: 20 }}>
    <RadixAvatar.Root className={styles.AvatarRoot}>
      <RadixAvatar.Image
        className={styles.AvatarImage}
        src={FallBackAvatar}
        alt="avatar"
      />
      <RadixAvatar.Fallback className={styles.AvatarFallback} delayMs={600}>
        CT
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  </div>
);

export default Avatar;
