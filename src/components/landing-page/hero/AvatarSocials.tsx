import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const avatars = [
  {
    src: "/avatars/AutumnTechFocus.jpeg",
    fallback: "CN",
  },
  {
    src: "/avatars/Casual Creative Professional.jpeg",
    fallback: "AB",
  },
  {
    src: "/avatars/Golden Hour Contemplation.jpeg",
    fallback: "FG",
  },
  {
    src: "/avatars/Portrait of a Woman in Rust-Colored Top.jpeg",
    fallback: "PW",
  },
  {
    src: "/avatars/Radiant Comfort.jpeg",
    fallback: "RC",
  },
  {
    src: "/avatars/Relaxed Bearded Man with Tattoo at Cozy Cafe.jpeg",
    fallback: "RB",
  },
];

export default function AvatarSocials() {
  return (
    <div className="mb-4 flex items-center space-x-2">
      <div className="flex items-center -space-x-5 overflow-hidden sm:-space-x-4">
        {avatars.map((avatar, i) => {
          return (
            <Avatar key={i} className="inline-block border-2 border-background">
              <AvatarImage src={avatar.src} className="h-full object-cover" />
              <AvatarFallback>{avatar.fallback}</AvatarFallback>
            </Avatar>
          );
        })}
      </div>
      <span className="text-sm font-medium">Loved by 1k+ customers</span>
    </div>
  );
}
