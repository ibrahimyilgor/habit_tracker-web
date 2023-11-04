import { useRouter } from "next/router";
import { useAuthContext } from "src/contexts/auth-context";
import { AuthGuard } from "src/guards/auth-guard";
import { items } from "src/layouts/dashboard/config";
import Page from "src/pages/404";

export const withAuthGuard = (Component) => (props) => {
  const router = useRouter();
  const state = useAuthContext();
  const { isAuthenticated } = useAuthContext();

  console.log(
    "igipram",
    items.filter((item) => item.path === router.pathname),
    state?.user?.user?.role,
    !items
      .filter((item) => item.path === router.pathname)?.[0]
      ?.permission?.includes(state?.user?.user?.role),
  );

  if (
    router?.pathname.startsWith("/branchMenu") ||
    router?.pathname.startsWith("/auth/change-password") ||
    !isAuthenticated ||
    (!router?.pathname.startsWith("/branchMenu") &&
      items.filter((item) => item.path === router.pathname).length > 0 &&
      items
        .filter((item) => item.path === router.pathname)?.[0]
        .permission.includes(state?.user?.user?.role) &&
      !items
        .filter((item) => item.path === router.pathname)?.[0]
        .not_permitted_plan_ids.includes(state?.user?.user?.plan_id?._id))
  ) {
    return (
      <AuthGuard>
        <Component {...props} />
      </AuthGuard>
    );
  } else {
    return <Page />;
  }
};
