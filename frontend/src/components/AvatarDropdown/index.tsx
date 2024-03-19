import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/router";
import { useLogoutMutation, useProfileQuery } from "@/graphql/generated/schema";
import useUserStore from "@/store/user.store";

const AvatarDropdown = () => {
  const router = useRouter();
  const user = useUserStore((state) => state);
  const [logout] = useLogoutMutation();
  const { client } = useProfileQuery({
    errorPolicy: "all",
  });

  const onPressLogout = async () => {
    await logout();
    client.resetStore();
    router.push("/login");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="uppercase">
              {user?.firstname && user?.firstname[0]}
              {user?.lastname && user?.lastname[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-medium leading-none">
              <p>
                {user?.firstname && user?.firstname}{" "}
                {user?.lastname && user?.lastname}
              </p>
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email && user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onPressLogout}>Déconnexion</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
