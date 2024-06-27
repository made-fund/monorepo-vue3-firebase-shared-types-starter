/**
 * the default browser autofocus is not reliable in single page applications.
 * this directive focuses on the element on the mounted hook making it more reliable.
 * use it by adding v-focus to an html element (f.e. an input)
 */
export default {
  name: 'focus',
  mounted(el: any, { value }: any) {
    if (value === false) return

    el.focus()
  },
}
