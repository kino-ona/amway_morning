/**
 * Global authority directive
 * Used for fine-grained control of component permissions
 * @Example v-auth="RoleEnum.TEST"
 */
import { RoleEnum } from '~/apis/model/userModel'
import type { App, Directive, DirectiveBinding } from 'vue'

import { usePermission } from '~/hooks/usePermission'

function checkAuth(el: HTMLElement, binding: DirectiveBinding<RoleEnum>) {
  const { hasPermission } = usePermission()

  const value = binding.value
  if (!value) return
  if (!hasPermission(value)) {
    el.parentNode?.removeChild(el)
  }
}

const authDirective: Directive<HTMLElement, RoleEnum> = {
  mounted(el, binding) {
    checkAuth(el, binding)
  },
}

export function setupPermissionDirective(app: App) {
  app.directive('auth', authDirective)
}

export default authDirective
