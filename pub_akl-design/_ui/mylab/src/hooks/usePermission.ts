import { useUserStoreWithOut } from '~/stores/user'
import { resetRouter } from '~/routers'
import { isArray } from '~/utils/is'
import { RoleEnum } from '~/apis/model/userModel'

// User permissions related operations
export function usePermission() {
  const userStore = useUserStoreWithOut()

  /**
   * Reset and regain authority resource information
   */
  async function resume() {
    resetRouter()
  }

  /**
   * Determine whether there is permission
   */
  function hasPermission(value?: RoleEnum | RoleEnum[], defaultValue = true): boolean {
    // Visible by default
    if (!value) {
      return defaultValue
    }

    let flag = false

    if (isArray(value)) {
      flag = userStore.getRoles.some((role) => value.includes(role))
    } else {
      flag = userStore.getRoles.includes(value)
    }

    return flag
  }

  return { hasPermission }
}
