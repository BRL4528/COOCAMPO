import { useAuth } from './auth';

interface UseCanParams {
  permissions?: string[];
  roles?: string[];
}

export function useCan({ permissions, roles }: UseCanParams) {
  const { user } = useAuth();
  console.log(permissions, roles);
  console.log('user', user);

  if (permissions) {
    if (permissions?.length > 0) {
      const hasAllPermissions = permissions?.every(permission => {
        return user.permissions.includes(permission);
      });

      if (!hasAllPermissions) {
        return false;
      }
    }
  }

  if (roles) {
    if (roles?.length > 0) {
      const hasAllroles = roles?.some(role => {
        console.log(user.roles.includes(role));
        return user.roles.includes(role);
      });

      if (!hasAllroles) {
        return false;
      }
    }
  }
  return true;
}
